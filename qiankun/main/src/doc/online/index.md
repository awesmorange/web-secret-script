# 部署前端项目到服务器（腾讯云）
## 前置条件
- 服务器已注册/购买
- 服务器端口开放
- 项目可以打包成功到dist目录
## 部署
1. 在服务器上创建一个文件夹，作为项目的根目录

文件夹路径：``usr/local/nginx/web-secret-script/dist/``

2. 将项目打包到dist目录后，将dist目录下的所有文件复制到服务器上的文件夹中

3. 安装nginx
```bash
yum install nginx
```

4. 写nginx配置文件
在``/etc/nginx/nginx.conf``文件中添加以下配置

修改user为root

```bash
http {
# 其他配置
    server {
        listen       5200; # 端口号
        server_name  localhost;

        location / {
            root /usr/local/nginx/web-secret-script/dist;
            index index.html;
        }

        # 代理配置
        location /api {
            proxy_pass http://backend_server;
        }
    }
}
```

5. 启动nginx(CentOS)
```bash
# 检查nginx配置是否正确
sudo nginx -t
# 启动nginx
sudo systemctl start nginx.service
# 停止nginx
sudo systemctl stop nginx.service
# 重启nginx
sudo systemctl restart nginx.service
```

6. 检查nginx是否启动成功
打开浏览器输入ip:5200，查看是否成功?

## 如果失败？
- 检查nginx是否在监听指定端口
  ``netstat -tulnp | grep nginx``
- 如果输出结果为空，则说明nginx没有在监听指定端口，先启动nginx
  ``sudo systemctl start nginx.service``
- 如果报错，查看nginx状态，可以查看具体错误
  ``sudo systemctl status nginx.service``
- 修改之后重启nginx

## 如果还无法访问？
检查服务器是否开放端口？（操作省略）