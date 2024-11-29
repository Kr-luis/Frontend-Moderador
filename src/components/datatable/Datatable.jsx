import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [data, setData] = useState([]);

  // Obtener los datos de la API
  const listarTiendas = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/listartiendas`;
      const respuesta = await axios.get(url);
      setData(
        respuesta.data.map((tienda) => ({
          id: tienda._id, // ID necesario para DataGrid
          nombre: tienda.Nombre,
          direccion: tienda.Direccion,
          estado: tienda.Verificado ? "Activa" : "Inactiva", // Dependiendo de Verificado
        }))
      );
    } catch (error) {
      console.error("Error al obtener las tiendas:", error);
    }
  };

  // Desactivar una tienda de la API (actualización del campo "verificado" a false)
  const desactivarTienda = async (idTienda) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/tienda/${idTienda}/desactivar`; // Ruta para desactivar
      await axios.put(url); // Cambiar DELETE por PUT

      // Actualizar el estado de la tienda en la tabla (marcar como Inactiva)
      setData(data.map((tienda) => 
        tienda.id === idTienda ? { ...tienda, estado: "Inactiva" } : tienda
      ));
    } catch (error) {
      console.error("Error al desactivar la tienda:", error);
    }
  };

  // Confirmar desactivación
  const confirmarDesactivacion = (idTienda) => {
    Swal.fire({
      title: "¿Desea realmente desactivar esta tienda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        desactivarTienda(idTienda);
        Swal.fire("¡Desactivada!", "La tienda ha sido desactivada.", "success");
      }
    });
  };

  useEffect(() => {
    listarTiendas();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/tiendas/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Ver</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => confirmarDesactivacion(params.row.id)} // Cambiar función de eliminación por desactivación
          >
            Desactivar
          </div>
        </div>
      ),
    },
  ];

  const columns = [
    { field: "id", headerName: "ID de Tienda", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "direccion", headerName: "Dirección", width: 300 },
    { field: "estado", headerName: "Estado", width: 200 },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">Tiendas Registradas</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
