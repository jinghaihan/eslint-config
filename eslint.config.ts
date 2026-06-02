import { defineConfig } from './src'

export default defineConfig({
  markdown: false,
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
  },
})
