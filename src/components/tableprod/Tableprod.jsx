import { useEffect, useState } from "react";
import axios from "axios";
import "./tableprod.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress"; // Spinner para carga
import { useParams } from "react-router-dom"; // Obtener ID de la URL
import { Button } from "@mui/material";
//Esta parte es para mostrar los productos por id de tienda
const Listprod = () => {
  const { id } = useParams(); // Obtener el ID de la tienda desde la URL
  const [rows, setRows] = useState([]); // Estado para productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/tienda/productos/${id}`; // URL dinámica para la API

  // Validación inicial de ID
  useEffect(() => {
    if (!id) {
      console.error("ID de tienda no proporcionado");
      setLoading(false);
      return;
    }

    let isMounted = true; // Para evitar actualizaciones si el componente se desmonta
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        if (isMounted) setRows(response.data); // Solo actualiza si está montado
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        if (isMounted) setLoading(false); // Detiene la carga
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // Limpiar para evitar fugas de memoria
    };
  }, [id, url]);

  // Eliminar producto
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/administrador/producto/${productId}`);
      setRows(rows.filter((row) => row._id !== productId));
      alert("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  // Formatear fecha
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "Fecha inválida" : parsedDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Producto</TableCell>
            <TableCell className="tableCell">Categoría</TableCell>
            <TableCell className="tableCell">Imagen</TableCell>
            <TableCell className="tableCell">Estado</TableCell>
            <TableCell className="tableCell">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.Nombre}</TableCell>
              <TableCell className="tableCell">{row.Categoria}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={row.imagenUrl || "https://via.placeholder.com/150"}
                    alt={row.Nombre}
                    className="image"
                  />
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.Estado ? "Active" : "Inactive"}`}>
                  {row.Estado ? "Activo" : "Inactivo"}
                </span>
              </TableCell>
              <TableCell className="tableCell">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(row._id)}
                  size="small"
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Listprod;
