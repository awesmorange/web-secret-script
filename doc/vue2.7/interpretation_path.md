# 文件夹解读
```
+---compiler-sfc                # 编译单文件
+---dist
+---packages
|   \---compiler-sfc
|       +---dist
|       +---node_modules
|       |   \---.bin
|       +---src
|       |   +---stylePlugins
|       |   \---templateCompilerModules
|       \---test
|           \---__snapshots__
+---src
|   +---compiler                # 模版解析和编译相关的文件
|   |   +---codegen
|   |   +---directives
|   |   \---parser
|   +---core                    # 核心代码 vue架构 内置组件 全局api 观察者 vdom
|   |   +---components
|   |   +---global-api
|   |   +---instance
|   |   |   \---render-helpers
|   |   +---observer
|   |   +---util
|   |   \---vdom
|   |       +---helpers
|   |       \---modules
|   +---platforms                # 平台相关的内容
|   |   \---web
|   |       +---compiler
|   |       |   +---directives
|   |       |   \---modules
|   |       +---runtime
|   |       |   +---components
|   |       |   +---directives
|   |       |   \---modules
|   |       \---util
|   +---shared                  # 公共工具
|   +---types
|   \---v3
|       +---reactivity
|       \---sfc-helpers
\---types
```