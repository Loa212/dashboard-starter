import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 10000,
    strictPort: true,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),
  ],
})
