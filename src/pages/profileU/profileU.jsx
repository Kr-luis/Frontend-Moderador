import "./profileu.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileU = () => {
  const { id } = useParams(); // Obtén el ID del usuario desde la URL
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/usuario/${id}`;
        const response = await axios.get(url);
        setUsuario(response.data); // Guarda los datos del usuario
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="profileContent">
          <h1 className="title">Perfil del Usuario</h1>
          <div className="profileDetails">
            {/* Verifica si existe la imagen del usuario y usa una imagen por defecto si no */}
            <img
              src={usuario.ImagenUrl || "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
              alt="Foto del Usuario"
              className="profileImg"
            />
            <div className="details">
              {/* Verifica si los datos existen antes de mostrarlos */}
              <h1 className="name">{usuario.nombre} {usuario.apellido}</h1>
              <p className="info"><strong>Email:</strong> {usuario.email || "No disponible"}</p>
              {/* Verificación adicional para el estado */}
              <p className="info">
                <strong>Estado:</strong> {usuario.estado === "activo" ? "Activo" : usuario.estado === "inactivo" ? "Inactivo" : "Activo"}
              </p>
              <p className="info">
                <strong>Propietario:</strong> 
                {usuario.propietario !== undefined ? (usuario.propietario ? "Sí" : "No") : "No definido"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileU;
