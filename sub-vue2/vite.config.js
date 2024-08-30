import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd() //  process.cwd()返回当前工作目录
  const env = loadEnv(mode, root)
  let config = {
    // base: env.VITE_BASE_API,
    plugins: [vue()],
    server: {
      open: true, //自动打开浏览器
      host: true, // 暴露内网ip
      port: 5201,
      // cors: true,
      // origin: mode === 'development' ? env.VITE_ORIGIN_DEV : env.VITE_BASE_API
    }
  }

  return config
})
