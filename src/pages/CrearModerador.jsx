import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CrearModerador = () => {
  const [moderadorInfo, setModeradorInfo] = useState({
    nombre: '',
    email: '',  // Cambié 'correo' a 'email' para ser consistente con el modelo
    telefono: '',
    password: '',  // Cambié 'contraseña' a 'password' para ser consistente con el modelo
    role: 'moderador', // Cambié 'permisos' a 'role' para ser consistente con el modelo
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModeradorInfo({
      ...moderadorInfo,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    // Verificar si todos los campos están llenos
    if (!moderadorInfo.nombre || !moderadorInfo.email || !moderadorInfo.telefono || !moderadorInfo.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Usar la URL desde las variables de entorno para la solicitud POST
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/administrador/crear-moderador`;
      
      // Hacer una solicitud POST para crear el moderador
      const response = await axios.post(apiUrl, moderadorInfo);
      
      // Si la solicitud es exitosa
      setSuccess('Moderador creado con éxito');
      setError('');
      console.log("Moderador creado:", response.data);
    } catch (err) {
      // Si ocurre un error durante la solicitud
      setError('Hubo un error al crear el moderador.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/Moderador.png')] bg-no-repeat bg-cover bg-center">
      {/* Sidebar */}
      <div className="bg-yellow-200 bg-opacity-90 p-6 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
        <h2 className='text-4xl font-black text-center text-gray-800'>QuitoTech</h2>
        <hr className="border-yellow-400" />
        <ul className="mt-5 flex flex-col space-y-4">
          <li className="text-center">
            <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
              <Link to="/dashboardadmin">Inicio</Link>
            </div>
          </li>
          <li className="text-center">
            <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700">
              <Link to="/dashboardadmin/listartiendaadmin">Tiendas</Link>
            </div>
          </li>
        </ul>
      </div>

      {/* Formulario de Creación de Moderador */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-yellow-200 bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center gap-4 border border-yellow-300">
          <hr className='my-2 w-full border-yellow-400' />
          <h2 className='text-3xl font-extrabold text-center text-gray-800 mb-1'>Crear Moderador</h2>
          <hr className='my-2 w-full border-yellow-400' />
          <p className='text-gray-700 text-base mb-1'>
            Llena los siguientes campos para registrar un nuevo moderador en la plataforma.
          </p>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex flex-col space-y-4 w-full">
            <div>
              <label htmlFor="nombre" className="text-gray-800">Nombre del Moderador</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={moderadorInfo.nombre}
                onChange={handleChange}
                placeholder="Nombre del Moderador"
                className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg w-full border border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-800">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={moderadorInfo.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg w-full border border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="text-gray-800">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={moderadorInfo.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg w-full border border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-800">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={moderadorInfo.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg w-full border border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="role" className="text-gray-800">Permisos</label>
              <select
                id="role"
                name="role"
                value={moderadorInfo.role}
                onChange={handleChange}
                className="bg-yellow-100 text-gray-800 px-4 py-2 rounded-lg w-full border border-yellow-400 focus:outline-none"
              >
                <option value="moderador">Moderador</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCreate}
            className="bg-yellow-600 px-4 py-2 text-gray-800 font-bold rounded-lg hover:bg-yellow-700 transition-all mt-4"
          >
            Crear Moderador
          </button>
        </div>
      </div>

      {/* Botón de Salida */}
      <div className="absolute bottom-4 left-4">
        <Link to="/" onClick={() => localStorage.clear()}>
          <img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" />
        </Link>
      </div>
    </div>
  );
};

export default CrearModerador;
