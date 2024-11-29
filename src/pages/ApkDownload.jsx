import React from 'react';
import apkIcon from '../assets/apk-icon.png';
import { Link } from 'react-router-dom';

const ApkDownload = () => {
  return (
    <>
      {/* Estilos CSS en línea */}
      <style>{`
        body {
          background-color: #515d6e; /* gris oscuro */
          color: white;
          min-height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>

      <div className="relative flex items-center justify-center min-h-screen text-white">
        
        {/* Fondo completo con desenfoque */}
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-2xl"></div>

        {/* Contenedor del contenido */}
        <div className="relative z-10 max-w-md w-full bg-gray-800 bg-opacity-95 text-white p-6 rounded-lg shadow-lg">
          
          {/* Título */}
          <h1 className="text-3xl font-bold text-purple-500 mb-4 text-center">
            ¡Descarga la App de QuitoTECH!
          </h1>
          
          {/* Descripción */}
          <p className="text-center text-gray-300 mb-6">
            Accede a productos gamer en Quito, realiza compras, encuentra tiendas cercanas y aprovecha ofertas exclusivas, todo desde tu dispositivo móvil.
          </p>
          
          {/* Ícono APK */}
          <div className="flex justify-center mb-6">
            <img src={apkIcon} alt="APK Icon" className="w-20 h-20 bg-purple-600 p-3 rounded-full" />
          </div>
          
          {/* Botón de descarga */}
          <div className="flex justify-center mb-6">
            <Link to="/apk-file-path" download className="py-2 px-6 bg-purple-600 rounded text-lg font-semibold hover:bg-purple-700 transition duration-200">
              Descargar APK
            </Link>
          </div>
          
          {/* Información adicional */}
          <div className="text-center text-gray-400 mb-6">
            <p>Versión: 1.0.0</p>
            <p>Tamaño: 25 MB</p>
            <p>Última actualización: Octubre 2024</p>
          </div>

          {/* Sección de ayuda */}
          <div className="bg-gray-700 p-4 rounded-lg text-center mb-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">¿Necesitas ayuda?</h3>
            <p className="text-gray-300 mb-2">
              Si tienes problemas para instalar la aplicación, consulta <Link to="/ayuda-instalacion" className="text-purple-500 underline hover:text-purple-400">nuestra guía de instalación</Link>.
            </p>
            <p className="text-gray-300">
              Contáctanos en nuestro <Link to="/contacto" className="text-purple-500 underline hover:text-purple-400">Centro de Ayuda</Link> para cualquier otra pregunta.
            </p>
          </div>

          {/* Botón de regresar */}
          <div className="flex justify-center">
            <Link to="/" className="py-2 px-4 bg-purple-600 rounded text-lg font-semibold hover:bg-purple-700 transition duration-200">
              Regresar a la pantalla inicial
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ApkDownload;
