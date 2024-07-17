import { defineConfig } from 'vite'
import envCompatible from "vite-plugin-env-compatible"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  "envPrefix":"REACT_APP_",
  plugins: [
    envCompatible(),
    react()],
    // server: {
    //   proxy: {
        // '/posts': {
        //   target: 'http://localhost:4000/api/', 
        //   changeOrigin: true,
        //   secure: false,
        // },
        // '/user': {
        //   target: 'http://localhost:4000/api/', 
        //   changeOrigin: true,
        //   secure: false,
        // },
        // '/auth': {
        //   target: 'http://localhost:4000/api/', 
        //   changeOrigin: true,
        //   secure: false,
        // },
    //   },
    // },
})
