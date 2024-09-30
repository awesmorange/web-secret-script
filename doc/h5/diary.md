# 坑
## Android与IOS调用调用h5的全局方法，全局方法写法不同
- IOS必须返回一个值，无所谓值是什么
- Android不能返回值
```
window.gloablFunc = () => {
        // TODO:
        // ...
        if (/ios|iphone|ipod|pad/i.test(navigator.userAgent)) {
            return '' // IOS要求返回语句
        }
    }
```
## h5调用Android与IOS的方法，写法不同
```
//调用APP扫描二维码
if(window.AndroidBridge) { // 安卓平板
    window.AndroidBridge.startScan();
} else if (/android/i.test(navigator.userAgent)) { // 安卓手机
    window.android.startScan();
} else if (/ios|iphone|ipod|pad/i.test(navigator.userAgent)) { // IOS
    window.webkit.messageHandlers.startScan.postMessage(null)
    // postMessage必须要放参数，null也可以
}
```
## devicePixelRatio
vant图片预览组件，有的手机定位偏移
