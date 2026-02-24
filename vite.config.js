import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'

// custom PostCSS plugin that ensures the base layer directive is present
function ensureBaseLayer() {
  return {
    postcssPlugin: 'ensure-base-layer',
    Once(root) {
      let hasBase = false
      root.walkAtRules('tailwind', rule => {
        if (rule.params.trim() === 'base') hasBase = true
      })
      if (!hasBase) {
        // prepend the missing directive so Tailwind can resolve @layer base
        root.prepend(postcss.atRule({ name: 'tailwind', params: 'base' }))
      }
    }
  }
}
ensureBaseLayer.postcss = true

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [ensureBaseLayer()]
    }
  },
  plugins: [react(), tailwindcss()],
})
