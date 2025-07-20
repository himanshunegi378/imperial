import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  compression({
    algorithms: [
      defineAlgorithm('gz', {
        level: 9
      })
    ]

  })
  ],
})
