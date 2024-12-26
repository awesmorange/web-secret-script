# 微前端使用qiankun实现，react主应用同时兼顾react，vue3，umi子应用
[参考链接](https://blog.csdn.net/jyl919221lc/article/details/130110455?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-130110455-blog-125187863.235^v43^pc_blog_bottom_relevance_base2&spm=1001.2101.3001.4242.2&utm_relevant_index=4)

## 什么是微前端
我们可以简单理解为微前端是将一个项目拆分成多个模块，每个微前端模块可以由不同的团队进行管理，并可以自主选择框架，并且有自己的仓库，可以独立部署上线

## 应用场景
+ 当公司代码较老需要使用新的技术栈时我们可以使用微前端。
+ 多个团队同时开发时，每个团队单独维护模块。
+ 新增业务模块时，直接创建一个新的项目根据团队情况选择技术栈

## 优点
团队自治，兼容老项目，独立开发/部署，技术灵活

## iframe、single-spa、qiankun的区别
### iframe
iframe是最早可以实现主应用嵌套子引用的标签，每个子应用通过iframe标签来嵌入到父应用中，iframe具有天然的隔离属性，各个子应用之间以及子应用和父应用之间都可以做到互不影响。
#### iframe缺点
+ url不同步，如果刷新页面，iframe中的页面的路由会丢失
+ 全局上下文完全隔离，内存变量不共享。(父应用和子应用window对象不一致)
+ UI不同步，在子应用使用ui组件时只在子应用范围内生效，不会占用父应用空间。
+ 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程
### single-spa
single-spa是最早的微前端框架，可以兼容很多技术栈。解决了iframeURL不同步和UI不同步的情况
#### single-spa缺点
+ 没有实现js隔离和css隔离
+ 需要修改大量的配置，包括基座和子应用的，不能开箱即用
### qiankun
qiankun是阿里开源的一个微前端的框架，在阿里内部已经经过一批线上应用的充分检验及打磨了，所以可以放心使用
#### qiankun优势
+ 基于single-spa封装的，提供了更加开箱即用的API
+ 技术栈无关，任意技术栈的应用均可使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
+ HTML Entry的方式接入，像使用iframe一样简单
+ 实现了single-spa不具备的样式隔离和js隔离
+ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。


## qiankun应用
### 样式隔离
qiankun实现了各个子应用之间的样式隔离，但是基座和子应用之间的样式隔离没有实现，所以基座和子应用之前的样式还会有冲突和覆盖的情况。

解决方案：每个应用的样式使用固定的格式，通过css-module的方式给每个应用自动加上前缀

### 子应用的跳转
+ 主应用和微应用都是 hash 模式，主应用根据 hash 来判断微应用，则不用考虑这个问题。
+ history模式下微应用之间的跳转，或者微应用跳主应用页面，直接使用微应用的路由实例是不行的，原因是微应用的路由实例跳转都基于路由的 base。有两种办法可以跳转：

    ① history.pushState()

    ② 将主应用的路由实例通过 props 传给微应用，微应用这个路由实例跳转。

### 全局状态管理
``` javascript
// 基座初始化
import { initGlobalState } from 'qiankun';
const actions = initGlobalState(state);
// 主项目项目监听和修改
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
```
``` javascript
// 子项目监听和修改
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  props.setGlobalState(state);
}
```
