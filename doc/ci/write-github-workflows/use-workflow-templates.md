# 使用 workflow 模板
## 什么是 workflow 模板
顾名思义模板示例，详见链接

| https://docs.github.com/en/actions/writing-workflows/using-workflow-templates#about-workflow-templates
## 选择和使用 workflow 模板
一共九步

1. 打开项目主页
2. 点击项目下的 `Actions` 选项
3. 如果已经有workflow了，点击 New workflow
4. 在`Choose a workflow`页选择一个推荐的模板，点击`Configure`进行配置。你可以在页面搜索或者选择分类进行筛选你想要的模版
5. 根据模版推荐的步骤来书写执行命令
6. 有些模板会使用私密变量，如`${{ secrets.npm_token }}`，你需要去配置相关的私密变量和值
7. 加一些自定义的命令
8. 点击 `start commit`
9. 写commit 信息，并且推到你想要的分支

|  https://docs.github.com/en/actions/writing-workflows/using-workflow-templates#choosing-and-using-a-workflow-template