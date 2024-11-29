import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Mensaje from "./Alertas.jsx";

const TablaProductosAdmin = ({ tiendaId }) => { // Recibe tiendaId como prop
  const [productos, setProductos] = useState([]);

  const listarProductos = async () => {
    if (!tiendaId) {
      console.error("ID de tienda no definido");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/listartiendas/productos/${tiendaId}`;
      const respuesta = await axios.get(url);
      console.log(respuesta.data); // Verifica la estructura de los datos aquí
      setProductos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (idProducto) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/tienda/producto/${idProducto}`;
      await axios.delete(url);
      setProductos(productos.filter(producto => producto._id !== idProducto));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const confirmarEliminacion = (idProducto) => {
    Swal.fire({
      title: '¿Desea realmente eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(idProducto);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    listarProductos();
  }, [tiendaId]);

  return (
    <>
      {productos.length === 0 ? (
        <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="mt-4 min-w-full bg-gray-700 bg-opacity-70">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-900 text-white">ID de Producto</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Nombre</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Estado</th>
                <th className="py-2 px-4 border-b border-gray-900 text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">{producto._id}</td>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">{producto.Nombre_producto}</td>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${producto.Estado ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}
                    >
                      {producto.Estado ? "Disponible" : "No Disponible"}
                    </span>
                  </td>
                  <td className="text-center py-2 px-4 border-b border-gray-900 text-white">
                    <button 
                      onClick={() => confirmarEliminacion(producto._id)} 
                      className="px-3 py-1 rounded-full bg-red-500 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TablaProductosAdmin;
