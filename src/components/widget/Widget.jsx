import "./widget.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useEffect, useState } from 'react';


const Widget = ({type}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // URL para obtener los datos del backend
  const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/estadisticas`;
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;  // Opcional: Muestra un loading mientras carga
  
  let widgetData;

  switch(type){
    case "user":
      widgetData = {
        title: "USUARIOS",
        isMoney: false,
        // link: "Ver todos los usuarios",
        value: data.cantidadUsuarios,  // Mostrar cantidad de usuarios
        icon: <PersonOutlinedIcon className="icon" style={{color:"crimson", background:"rgba(255,0,0,0.2)"}}/>
      };
      break;
    case "order":
      widgetData = {
        title: "TIENDAS",
        isMoney: false,  
        // link: "Ver todas las tiendas",
        value: data.cantidadTiendasRegistradas,  // Mostrar cantidad de tiendas registradas
        icon: <ShoppingCartOutlinedIcon className="icon" style={{color:"goldenrod", background:"rgba(218,165,32,0.2)"}}/>
      };
      break;
    // case "earning":
    //   widgetData = {
    //     title: "PROPIETARIOS",
    //     isMoney: false,
    //     value: data.cantidadUsuariosPropietarios,  // Mostrar cantidad de propietarios
    //     icon: <AssignmentIndIcon className="icon" style={{color:"green", background:"rgba(0,128,0,0.2)"}}/>
    //   };
    //   break;
    case "balance":
      widgetData = {
        title: "PRODUCTOS",
        isMoney: false,
        value: data.cantidadProductos,  // Mostrar cantidad de productos
        icon: <InventoryIcon className="icon" style={{color:"purple", background:"rgba(128,0,128,0.2)"}}/>
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{widgetData.title}</span>
        <span className="counter">
          {widgetData.isMoney && "$"}{widgetData.value}
        </span>
        <span className="link">{widgetData.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
        {widgetData.icon}
      </div>
    </div>
  );
}

export default Widget;
