# 跨域

跨域是指浏览器从一个域名的网页去请求另一个不同域名的资源时，由于同源策略的限制而出现的问题。“源” 由协议、域名和端口组成，如果两个 URL 的协议、域名和端口都完全相同，那么它们就是同源的；否则，就是不同源的。以下是跨域的常见情况和解决方式：

## 跨域的常见情况
- **不同域名** ：例如，当前页面的域名为``http://example.com``，而请求的资源在``http://anotherdomain.com``，这两个域名不同，会产生跨域问题。
- **不同协议** ：如果页面使用http协议，而请求的资源在``https://secure.example.com``，由于协议不同（http和https），也会出现跨域。
- **不同端口** ：假设页面在``http://example.com:8080``，请求的资源在``http://example.com:8081``，端口号不同会导致跨域。

## 解决跨域的方式

1. **JSONP（JSON with Padding）** ：利用``<script>``标签没有跨域限制的特性来实现跨域数据请求。它的原理是在页面中动态创建一个``<script>``标签，通过该标签的``src``属性指向一个跨域的接口，服务器返回一个包含回调函数调用的 ``JavaScript`` 代码，在页面中事先定义好这个回调函数，就可以接收到数据。这种方式只支持 ``GET`` 请求，不支持 ``POST`` 等其他请求方式。示例代码如下：
``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>JSONP示例</title>
</head>
<body>
    <script>
        function handleResponse(data) {
            console.log('接收到的数据:', data);
        }
    </script>
    <script src="http://example.com/api/data?callback=handleResponse"></script>
</body>
</html>
```

2. **CORS（Cross - Origin Resource Sharing，跨源资源共享）** ：这是一种现代浏览器支持的跨域解决方案，需要服务器端进行配置。服务器通过设置响应头中的``Access-Control-Allow-Origin``字段，指定允许跨域的源。如果要允许所有源访问，可以设置为``*``；也可以指定具体的域名，如``http://example.com``。此外，还可以设置其他相关的响应头，如``Access-Control-Allow-Methods``来指定允许的请求方法，``Access-Control-Allow-Headers``来指定允许的请求头。在前端使用``fetch``等方式发送请求时，浏览器会根据这些响应头来判断是否允许跨域。示例代码（``Node.js`` 服务器端设置）：
``` javascript
const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://example.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/api/data', (req, res) => {
    res.send('响应数据');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

3. **代理服务器** ：在前端和目标服务器之间搭建一个代理服务器，前端请求代理服务器，代理服务器再请求目标服务器，由于代理服务器和前端属于同源，所以不存在跨域问题。在开发中，常用的如 ``Webpack`` 的``devServer``配置代理，在``webpack.config.js``中可以这样配置：
``` javascript
module.exports = {
    //...其他配置
    devServer: {
        proxy: {
            '/api': {
                target: 'http://example.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
```

4. **WebSocket** ：``WebSocket`` 是一种双向通信协议，它不受同源策略的限制。通过 ``WebSocket``，客户端和服务器可以在不同源的情况下进行实时通信。在前端可以使用``WebSocket API`` 来创建连接，示例代码如下：
``` javascript
const socket = new WebSocket('ws://example.com/socket');
socket.onopen = function () {
    console.log('WebSocket连接已建立');
    socket.send('Hello, Server!');
};
socket.onmessage = function (event) {
    console.log('接收到服务器消息:', event.data);
};
socket.onclose = function () {
    console.log('WebSocket连接已关闭');
};
```

5. **postMessage** ：用于在不同窗口（如``<iframe>``）或页面之间进行跨域通信。可以在一个窗口中使用``postMessage``方法发送消息，在另一个窗口中通过监听``message``事件来接收消息。示例代码如下：
``` html
<!-- 父页面 -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>父页面</title>
</head>
<body>
    <iframe id="iframe" src="http://anotherdomain.com/child.html"></iframe>
    <script>
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage('Hello from parent', 'http://anotherdomain.com');
    </script>
</body>
</html>
```
``` html
<!-- 子页面 -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>子页面</title>
</head>
<body>
    <script>
        window.addEventListener('message', function (event) {
            if (event.origin === 'http://example.com') {
                console.log('接收到父页面消息:', event.data);
            }
        });
    </script>
</body>
</html>
```
