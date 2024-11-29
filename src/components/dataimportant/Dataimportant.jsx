import "./dataimportant.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [data, setData] = useState([]);

  // Obtener los datos de la API
  const listarmoderadores = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/moderadores`;
      const respuesta = await axios.get(url);
      setData(
        respuesta.data.map((moderador) => ({
          id: moderador._id, // ID necesario para DataGrid
          nombre: moderador.nombre,
          direccion: moderador.direccion,
          estado: moderador.estado ? "Activa" : "Inactiva", // Usa el campo correcto
          email: moderador.email,
        }))
      );
    } catch (error) {
      console.error("Error al obtener los moderadores:", error);
    }
  };
  

 // Eliminar un moderador de la API
const eliminarModerador = async (idModerador) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/moderadores/${idModerador}`;
    await axios.delete(url);
    setData(data.filter((moderador) => moderador.id !== idModerador));
  } catch (error) {
    console.error("Error al eliminar el moderador:", error);
  }
};

// Confirmar eliminación
const confirmarEliminacion = (idModerador) => {
  Swal.fire({
    title: "¿Desea realmente eliminar este moderador?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No, cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarModerador(idModerador);
      Swal.fire("¡Eliminado!", "El moderador ha sido eliminado.", "success");
    }
  });
};


  useEffect(() => {
    listarmoderadores();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 180,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/moderadores/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Ver</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => confirmarEliminacion(params.row.id)}
          >
            Eliminar
          </div>
        </div>
      ),
    },
  ];

  const columns = [
    { field: "id", headerName: "ID de Moderador", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "direccion", headerName: "Dirección", width: 300 },
    { field: "estado", headerName: "Estado", width: 100 }
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Añadir Nuevo Moderador
        <Link to="/moderadores/add" className="link">
          Registrar Nuevo
        </Link>
      </div>
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
