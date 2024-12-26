# 使用条件句控制job执行
示例使用if条件句控制`production-deploy`可以运行的时候. 只在仓库名为`octo-org/octo-repo-prod`的时候运行。其他情况则会跳过这个`production-deploy`不执行。
``` yaml
name: example-workflow
on: [push]
jobs:
  production-deploy:
    if: github.repository == 'octo-org/octo-repo-prod'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '14'
      - run: npm install -g bats

```