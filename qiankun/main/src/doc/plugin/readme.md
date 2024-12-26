## npm 依赖有问题时，自行打补丁修复
### 使用插件
[patch-package](https://www.npmjs.com/package/patch-package)
### 使用步骤
- 安装patch-package
``` shell
npm i patch-package postinstall-postinstall --save-dev
```
- package.json文件scripts内添加命令
``` json
"scripts": {
    "postinstall": "patch-package",
    "adapt-packages": "npx patch-package lamejs"
    //"adapt-packages": "npx patch-package [package-name]"
}
```
- 到node_modules找到对应的包，进行修改
- 插入代码后，使用patch-package打个补丁
``` shell
npm run adapt-packages
## 补丁完成后删除依赖重新安装依赖
rm -rf node_modules
npm i
```
[参考文档1](https://blog.csdn.net/qq_18643245/article/details/141157889?spm=1001.2014.3001.5506)

[官方文档](https://www.npmjs.com/package/patch-package)

！根据本文操作，或者参考文档1+官方文档配合使用

## 移动端px转视宽比例
### 插件
[postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport)
### 使用方法
TODO
## vite相关的插件
vue2: [@vitejs/plugin-vue2](https://www.npmjs.com/package/@vitejs/plugin-vue2)

vue2-jsx: [@vitejs/plugin-vue2-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue2-jsx)

vue3: [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue)

vue3-jsx: [@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)

react: [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)

