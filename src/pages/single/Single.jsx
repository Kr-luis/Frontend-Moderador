import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/navbar";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom"; // Importar useParams
import { useState, useEffect } from "react";
import axios from "axios";
import Listprod from "../../components/tableprod/Tableprod";
import Chartpro from "../../components/chartprod/Chartprod";

const Single = () => {
  const { id } = useParams(); // Obtener el id de la tienda desde la URL
  const [tienda, setTienda] = useState(null); // Estado para almacenar los datos de la tienda

  // Función para obtener los datos de la tienda desde la API
  useEffect(() => {
    const obtenerTienda = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/administrador/tienda/${id}`);
        setTienda(response.data); // Almacenar los datos de la tienda en el estado
      } catch (error) {
        console.error("Error al obtener los datos de la tienda:", error);
      }
    };
    
    obtenerTienda();
  }, [id]); // Volver a ejecutar la función cuando el id cambie

  if (!tienda) {
    return <div>Cargando...</div>; // Mostrar un mensaje mientras se cargan los datos
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={tienda.imagen || "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"} // Usar la imagen de la tienda, si existe
                alt={tienda.nombre_tienda}
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{tienda.nombre_tienda}</h1>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue">{tienda.Nombre}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Dirección:</span>
                  <span className="itemValue">{tienda.Direccion}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estado:</span>
                  <span className="itemValue">{tienda.Verificado ? "Activa" : "Inactiva"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chartpro aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Productos Registrados</h1>
          <Listprod />
        </div>
      </div>
    </div>
  );
};

export default Single;
