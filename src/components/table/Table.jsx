import { useEffect, useState } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const [rows, setRows] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para el loading

  // Usar la URL de entorno para la API
  const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/ultimos-productos`; // Aquí está la URL configurada

  // UseEffect para hacer la solicitud al backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url); // Usamos la URL construida con el entorno
        setRows(response.data); // Actualiza los productos con la respuesta de la API
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Deja de mostrar el loading una vez que los datos se hayan cargado
      }
    };

    fetchProducts();
  }, [url]); // Dependemos de la URL para asegurarnos que la solicitud se hace correctamente

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "Invalid Date"; // Devuelve "Invalid Date" si el valor no es válido
    }
    return parsedDate.toLocaleDateString(); // Devuelve la fecha formateada
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Producto</TableCell>
            <TableCell className="tableCell">Categoria</TableCell>
            <TableCell className="tableCell">Imagen</TableCell>
            <TableCell className="tableCell">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}> {/* Usamos _id para identificar cada producto */}
              <TableCell className="tableCell">{row.Nombre_producto}</TableCell>
              <TableCell className="tableCell">{row.Categoria}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.imagenUrl} alt={row.Nombre_producto} className="image" />
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.Estado ? "Active" : "Inactive"}`}>
                  {row.Estado ? "Active" : "Inactive"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
