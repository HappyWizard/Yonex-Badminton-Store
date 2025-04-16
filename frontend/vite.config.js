import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"https://yonex-badminton-store.onrender.com"
      }
    }
  }
})
// this means whenevr the /api is used, it will prefix it with the http://localhost:5000


