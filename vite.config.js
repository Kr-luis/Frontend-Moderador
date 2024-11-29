import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
    port: process.env.PORT || 3000, // Utiliza el puerto proporcionado por Render o el puerto 3000
  },
  resolve: {
    alias: {
      // Asegura que MUI use styled-components en lugar de @emotion
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
});
