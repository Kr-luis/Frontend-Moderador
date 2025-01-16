import "./datausers.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [data, setData] = useState([]);

  const listarUsuarios = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/listausuarios`;
      const respuesta = await axios.get(url);
      setData(
        respuesta.data.map((usuario) => ({
          id: usuario._id,
          nombre: `${usuario.nombre} ${usuario.apellido}`,
          email: usuario.email,
          estado: usuario.estado === "activo" ? "Activo" : "Inactivo",
          propietario: usuario.propietario,
        }))
      );
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const eliminarUsuario = async (idUsuario) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/usuario/${idUsuario}`;
      await axios.delete(url);
      setData(data.filter((usuario) => usuario.id !== idUsuario));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const confirmarEliminacion = (idUsuario) => {
    Swal.fire({
      title: "¿Desea realmente eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUsuario(idUsuario);
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
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
    { field: "id", headerName: "ID de Usuario", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "email", headerName: "Correo Electrónico", width: 300 },
    { field: "propietario", headerName: "Propietario", width: 200 },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Usuarios Registrados
        {/* <Link to="/users/newu" className="link">
          Agregar Nuevo
        </Link> */}
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
