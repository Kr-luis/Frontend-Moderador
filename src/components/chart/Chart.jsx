import './chart.scss';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/usuarios/por-mes`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const result = await response.json();
        
        const transformedData = result.map(item => ({
          name: getMonthName(item.mes),
          Total: item.total
        }));

        console.log(transformedData);
        setData(transformedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const getMonthName = (monthNumber) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthNumber - 1];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='chart'>
      <div className="title">Usuarios registrados por mes</div>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <AreaChart 
          width={730} 
          height={250} 
          data={data}
          margin={{ top: 10, right: 30, left: 40, bottom: 40 }}
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
            tickFormatter={(tick) => tick} 
            angle={-45}
            textAnchor="end"
          />
          <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
          <Tooltip content={<CustomTooltip />} />
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

export default Chart;
