import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
// import './index.css'; // Descomenta esto si necesitas aplicar estilos globales

// Asegúrate de que el contexto y el componente `App` estén correctamente importados y configurados.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);
