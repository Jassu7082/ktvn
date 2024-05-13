import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.apiKey': JSON.stringify(env.apiKey),
    'process.env.authDomain': JSON.stringify(env.authDomain),
    'process.env.projectId': JSON.stringify(env.projectId),
    'process.env.storageBucket': JSON.stringify(env.storageBucket),
    'process.env.messagingSenderId': JSON.stringify(env.messagingSenderId),
    'process.env.appId': JSON.stringify(env.appId),
    'process.env.measurementId': JSON.stringify(env.measurementId),
    },
    plugins: [react()],
  }
})
