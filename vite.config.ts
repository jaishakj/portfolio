import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Automatically compresses any image dropped into /public or imported
    // in source at build time — covers the "compress images" requirement
    // for whatever you add later (anime1.png, anime2.png, og-cover.png,
    // favicons). Doesn't touch anything that isn't there yet.
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
})
