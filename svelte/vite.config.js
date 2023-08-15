import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: '../serve',
  plugins: [svelte()],
})
