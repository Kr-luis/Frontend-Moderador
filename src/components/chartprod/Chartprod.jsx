import './chartprod.scss';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chartpro = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API

  useEffect(() => {
    // Definir la URL con la variable de entorno
    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/productos/por-mes`;

    // Función para obtener los datos desde la API
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Verifica la estructura de los datos
        console.log(result);

        // Transformamos los datos para que coincidan con el formato esperado por el gráfico
        const transformedData = result.map(item => ({
          name: getMonthName(item.mes), // Convertir el número del mes en nombre
          Total: item.total // Suponiendo que la propiedad total es la cantidad de productos
        }));

        console.log(transformedData); // Verifica los datos en el frontend
        setData(transformedData); // Actualizar el estado con los datos procesados
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); // Llamar a la función para obtener los datos
  }, []); // Este efecto se ejecutará solo una vez cuando el componente se monte

  // Función para convertir el número del mes en su nombre
  const getMonthName = (monthNumber) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthNumber - 1]; // Los meses están indexados desde 1 (Enero = 1)
  };

  return (
    <div className='chart'>
      <div className="title">Productos registrados por mes</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart 
          width={730} 
          height={250} 
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }} // Aumentar el margen inferior si es necesario
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke='gray' 
            tickFormatter={(tick) => tick} // Mostrar los nombres correctamente
            angle={-45} // Rotar las etiquetas si se solapan
            textAnchor="end" // Alineación de las etiquetas
          />
          <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
          <Tooltip />
          <Area 
            type="monotone"
            dataKey="Total" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#total)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chartpro;
