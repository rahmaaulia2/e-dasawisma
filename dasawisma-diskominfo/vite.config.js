import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ],
  optimizeDeps: {
    include: ['jquery', 'select2'],
  }
  // server:{
  //   host: "0.0.0.0",
  //   port: 3000,
  // }
})
