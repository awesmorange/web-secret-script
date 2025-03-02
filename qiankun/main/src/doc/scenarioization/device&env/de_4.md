# 使用同一个链接，如何实现 PC 打开是 web 应用、手机打开是一个 H5 应用?
> **答：前端可以根据``navigation.userAgent``来判断设备类型，再返回对应的页面；后端可以根据``Request Header`` 中的 ``user-agent``来判断设备类型返回对应的接口数据。**

可以通过根据请求来源(``user-Agent``)来判断访问设备的类型，然后在服务器端进行适配。例如，可以在服务器端使用 ``Node.js`` 的 ``Express`` 框架，在路由中对不同的 ``User-Agent`` 进行判断，返回不同的页面或数据。具体实现可以参考以下步骤:

1. 根据 ``User-Agent`` 判断访问设备的类型，例如判断是否为移动设备。可以使用第三方库如 ``ua-parser-js`` 进行 ``User-Agent`` 的解析。

2. 如果是移动设备，可以返回一个 H5 页面或接口数据。

3. 如果是 PC设备，可以返回一个web 应用页面或接口数据。

具体实现方式还取决于应用的具体场景和需求，以上只是一个大致的思路。