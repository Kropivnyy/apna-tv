import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// import * as fs from 'fs'
import * as path from 'path'

// const appDirectory = fs.realpathSync(process.cwd())
// const resolveApp = (relative) => path.resolve(appDirectory, relative)
// const root = path.resolve(__dirname, resolveApp('src'))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // const isProduction = env.VITE_ENVIRONMENT === 'production'
  // const isDevelopment = env.VITE_ENVIRONMENT === 'development'
  // const isAnalyze = env.VITE_ENVIRONMENT === 'analyze'
  // const buildVersion = env.VITE_BUILD_VERSION

  return {
    base: '/',
    ...(env.VITE_PORT
      ? {
          server: {
            port: Number(env.VITE_PORT),
          },
        }
      : {}),
    publicDir: 'static',
    plugins: [
      vue(),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: '[name]',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "src/styles/base/_functions.scss";
          @import "src/styles/base/_mixins.scss";
          @import "src/styles/base/_placeholders.scss";
          @import "src/styles/base/_media.scss";
        `,
        },
      },
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
