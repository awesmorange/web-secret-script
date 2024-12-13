import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from "path";

let pastName = "vue3-app";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd() //  process.cwd()返回当前工作目录
  const env = loadEnv(mode, root)
  let config = {
    // base: env.VITE_BASE_API,
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      qiankun(
        'sub-vue3',  // 微应用名字，与主应用注册的微应用名字保持一致
        { useDevMode: true }
      )
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    server: {
      open: true, //自动打开浏览器
      host: true, // 暴露内网ip
      port: 5202,
      // cors: true,
      // origin: mode === 'development' ? env.VITE_ORIGIN_DEV : env.VITE_BASE_API
    },
    devServer: {
      Headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${pastName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${pastName}`
    }
  }

  return config
})
