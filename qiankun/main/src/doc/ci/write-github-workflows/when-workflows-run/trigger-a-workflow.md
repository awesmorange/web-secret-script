# 触发workflow
## 了解workflow触发条件
### 触发workflow的几种方式
- 事件触发
- git提交代码触发事件
- 定时触发
- 手动触发
### 以下步骤可以触发workflow
1. 提交代码和git引用的操作
2. 在根目录找到.github/workflows目录下有相应的提交和git ref的workflow文件
3. 有与触发事件相匹配的`on:`值的任何工作流，都会触发workflow。某些事件要求工作流文件存在于存储库的默认分支上才能运行。
## 事件触发workflow
### 单个事件触发
`on: push`
### 多个事件触发
`on: [push, fork]`
### 动态类型和过滤器实现多事件触发
``` yaml
# 创建标签
# 向存储库中的main分支进行推送
# 向启用了GitHub Pages的分支进行推送
on:
  label:
    types:
      - created
  push:
    branches:
      - main
  page_build:
```
## 动态类型事件
`issue_comment`:`created`,`edited`,`deleted`
``` yaml
# 只在created时触发，edited，delete不会触发
on:
  label:
    types:
      - created
```
## 使用过滤器
``` yaml
# 只在main、和releases/开头的分支触发
on:
  push:
    branches:
      - main
      - 'releases/**'
```
### 对指定分支的pull事件使用过滤器
| 包含分支
``` yaml
on:
  pull_request:
    branches:
      - main
      - 'mona/octocat'
      - 'releases/**'
```
| 排除分支
``` yaml
on:
  pull_request:
    branches-ignore:
      - 'mona/octocat'
      - 'releases/**-alpha'
```
| 包含和排除简略写法
``` yaml
on:
  pull_request:
    branches:
      - 'releases/**'
      - '!releases/**-alpha'
```
### 对指定分支和tags的push事件使用过滤器
| 包含
``` yaml
on:
  push:
    branches:
      - main
      - 'mona/octocat'
      - 'releases/**'
    # Sequence of patterns matched against refs/tags
    tags:
      - v2
      - v1.*
```
| 排除
``` yaml
on:
  push:
    branches-ignore:
      - 'mona/octocat'
      - 'releases/**-alpha'
    # Sequence of patterns matched against refs/tags
    tags-ignore:
      - v2
      - v1.*
```
| 包含和排除简略写法
``` yaml
on:
  push:
    branches:
      - 'releases/**'
      - '!releases/**-alpha'
```
### 对指定路径的 pull 和 push 事件使用过滤器
| 包含路径
``` yaml
on:
  push:
    paths:
      - '**.js'
```
| 排除路径
``` yaml
on:
  push:
    paths-ignore:
      - 'docs/**'
```
| 包含和排除简略写法
``` yaml
on:
  push:
    paths:
      - 'sub-project/**'
      - '!sub-project/docs/**'
```
### Git diff 比较
! 如果推送commit超过1000条，或者github因为网络超时没有生成diff对比，workflow依然会执行。

! diffs限制文件数量为300.如果文件数目大于300，workflow会不执行。可以写过滤器实现自动触发执行。
### workflow运行事件在指定分支使用过滤器
使用`workflow_run`事件时，可以指定触发工作流必须在哪些分支上运行才能触发工作流。

| 包含
``` yaml
on:
  workflow_run:
    workflows: ["Build"]
    types: [requested]
    branches:
      - 'releases/**'
```
| 排除
``` yaml
on:
  workflow_run:
    workflows: ["Build"]
    types: [requested]
    branches-ignore:
      - "canary"
```
| 简写
``` yaml
on:
  workflow_run:
    workflows: ["Build"]
    types: [requested]
    branches:
      - 'releases/**'
      - '!releases/**-alpha'
```
## 自定义手动触发工作流的输入
使用`workflow_dispatch`事件时，您可以选择指定传递给工作流的输入。
此触发器仅在工作流文件位于默认分支上时接收事件。触发的工作流在`inputs`上下文中接收输入。

! 工作流还将接收`github.event.inputs`上下文中的输入。除了`inputs`上下文将布尔值保留为布尔值，而不是将其转换为字符串。选择类型解析为字符串，是一个可选择的选项以外，`inputs`上下文和`github.event.inputs`上下文中的信息是相同的。

! `inputs`的顶层属性的最大数量为10。

! `inputs`的最大有效载荷为65535个字符。
``` yaml
on:
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'warning'
        type: choice
        options:
          - info
          - warning
          - debug
      print_tags:
        description: 'True to print to STDOUT'
        required: true
        type: boolean
      tags:
        description: 'Test scenario tags'
        required: true
        type: string
      environment:
        description: 'Environment to run tests against'
        type: environment
        required: true

jobs:
  print-tag:
    runs-on: ubuntu-latest
    if:  ${{ inputs.print_tags }} 
    steps:
      - name: Print the input tag to STDOUT
        run: echo  The tags are ${{ inputs.tags }} 
```
## 定义输入、输出、私密变量实现可复用的workflows
后面章节会讲到
## 使用事件信息
### 查看事件的所有属性
``` yaml
jobs:
  print_context:
    runs-on: ubuntu-latest
    steps:
      - env:
          EVENT_CONTEXT: ${{ toJSON(github.event) }}
        run: |
          echo $EVENT_CONTEXT
```
### 获取和使用事件属性
``` yaml
on:
  pull_request:
    types:
      - opened
    paths:
      - '.github/workflows/**'
      - '.github/CODEOWNERS'
      - 'package*.json'

jobs:
  triage:
    if: >-
      github.event.pull_request.user.login != 'octobot' &&
      github.event.pull_request.user.login != 'dependabot[bot]'
    runs-on: ubuntu-latest
    steps:
      - name: "Comment about changes we can't accept"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PR: ${{ github.event.pull_request.html_url }}
        run: |
          gh pr edit $PR --add-label 'invalid'
          gh pr comment $PR --body 'It looks like you edited `package*.json`, `.github/CODEOWNERS`, or `.github/workflows/**`. We do not allow contributions to these files. Please review our [contributing guidelines](https://github.com/octo-org/octo-repo/blob/main/CONTRIBUTING.md) for what contributions are accepted.'
```
## 进一步控制workflow的运行方式
### 使用条件语句
| 使用事件携带的参数

运行workflow时，向问题添加指定标签，则可以在`issues labeled`事件动态类型，并使用条件语句来检查是什么标签触发了workflow。当向workflow存储库中的问题添加任何标签时，将运行以下workflow，但`run_if_label_matches`作业仅在标签命名为`bug`时才会执行。
``` yaml
on:
  issues:
    types:
      - labeled

jobs:
  run_if_label_matches:
    if: github.event.label.name == 'bug'
    runs-on: ubuntu-latest
    steps:
      - run: echo 'The label was bug'
```
| 使用事件类型

例如，如果要根据触发workflow的事件运行不同的作业或步骤，可以使用条件来检查事件上下文中是否存在特定的事件类型。每当关闭问题或拉取请求时，将运行以下workflow。如果workflow运行是因为问题已关闭，则`github.event`上下文将包含issue的值，但不包含`pull_request`的值。因此，`if_issue`步骤将运行，但`if_pr`步骤不会运行。相反，如果workflow是因为拉取请求关闭而运行的，则`if_pr`步骤将运行，但`if_issue`步骤不会运行。
``` yaml
on:
  issues:
    types:
      - closed
  pull_request:
    types:
      - closed

jobs:
  state_event_type:
    runs-on: ubuntu-latest
    steps:
    - name: if_issue
      if: github.event.issue
      run: |
        echo An issue was closed
    - name: if_pr
      if: github.event.pull_request
      run: |
        echo A pull request was closed
```
### 使用环境手动触发workflow作业
每当有向main推送时，将运行以下workflow。构建作业将始终运行。`publish`作业只有在`build`作业成功完成（由于需要：[build]）并且在称为`production`通过的环境的所有规则（包括所需的审阅者）通过（由于环境：`production`）后才会运行。

``` yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: build
        echo 'building'

  publish:
    needs: [build]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: publish
        echo 'publishing'
```
## 可用的事件
https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows