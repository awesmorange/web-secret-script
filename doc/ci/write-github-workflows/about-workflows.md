# 快速了解 workflows
## 配置私密变量
在github里面配置变量，通过`secrets`对象取
``` yaml
jobs:
  example-job:
    runs-on: ubuntu-latest
    steps:
      - name: Retrieve secret
        env:
          super_secret: ${{ secrets.SUPERSECRET }}
        run: |
          example-command "$super_secret"
```
## 配置jobs执行顺序
jobs默认同时执行，可以通过`needs`来调整先后依赖顺序
也可以用`if`配置条件语句
``` yaml
# 下面是setup, build, test三个jobs
# 执行顺序为setup -> build -> test
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - run: ./setup_server.sh
  build:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - run: ./build_server.sh
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./test_server.sh
```
## .yaml局部变量
在`strategy`关键字模块内声明变量
``` yaml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [14, 16]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
```
## 依赖缓存
如果jobs需要重复使用依赖项，考虑讲这些利来文件缓存起来

``` yaml
# 举例如何缓存~/.npm目录
jobs:
  example-job:
    steps:
      - name: Cache node modules
        uses: actions/cache@v3
        env:
          cache-name: cache-node-modules
        with:
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
```
## 使用数据库和服务资源
有使用数据库或缓存服务，可以使用`services`关键字去创建一个
临时容器来托管该服务。生成的容器可以用于该 job 的所有步骤，并在 job 完成后删除。
``` yaml
# 示例如何使用 services 创建 postgres 容器
# 然后用 node 连接到 service
jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:10.18-jessie
    services:
      postgres:
        image: postgres
    steps:
      - name: Check out repository code
        uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Connect to PostgreSQL
        run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: 5432
```
## 使用标签来引导workflows
当需要特定环境的runner执行job，可以使用labels去控制jobs执行环境。除了默认的`self-hosted`的标签（label）,还支持在 YAML workflow 指定标签，来设置你想要job执行的方式。
``` yaml
# 示例 workflow 使用 labels指定需要执行的 runner 环境
jobs:
  example-job:
    runs-on: [self-hosted, linux, x64, gpu]
```
## 复用 workflows
可以复用，参考后面章节
## workflows 的安全性设置
有，后面章节会讲到
## 环境变量使用
后面会学习到使用环境变量分环境管理 workflows