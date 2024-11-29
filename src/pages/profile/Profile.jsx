import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [moderador, setModerador] = useState(null); // Estado para los datos del moderador
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    // Obtener el ID del moderador desde localStorage
    const modId = localStorage.getItem("id_usuario");

    const fetchModerador = async () => {
      try {
        if (!modId) {
          throw new Error("No se encontró el ID del moderador en localStorage.");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/administrador/moderador/${modId}`
        );
        setModerador(response.data); // Guardamos los datos del moderador
      } catch (err) {
        console.error("Error fetching moderador data:", err);
        setError("No se pudo cargar la información del moderador.");
      } finally {
        setLoading(false); // Cambiamos el estado de carga
      }
    };

    fetchModerador(); // Llama a la función para obtener los datos del moderador
  }, []);

  if (loading) {
    return <div>Cargando datos del moderador...</div>; // Muestra un mensaje mientras carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra el mensaje de error
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="profileContent">
          <h1 className="title">Información del Moderador</h1>
          <div className="profileDetails">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="Foto del Moderador"
              className="profileImg"
            />
            <div className="details">
              <h1 className="name">{moderador.nombre}</h1>
              <p className="info"><strong>Email:</strong> {moderador.email}</p>
              <p className="info"><strong>Teléfono:</strong> {moderador.telefono}</p>
              <p className="info"><strong>Dirección:</strong> {moderador.direccion}</p>
              <p className="info"><strong>País:</strong> {moderador.pais}</p>
              <p className="info"><strong>Rol:</strong> {moderador.role}</p>
              <p className="info"><strong>Estado:</strong> {moderador.estado ? "Activo" : "Inactivo"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
