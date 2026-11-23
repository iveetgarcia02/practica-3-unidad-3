import datosLocales from '../data/dataset.json';
import apiClient from './apiClient';




// Simula una petición HTTP devolviendo una Promesa con el JSON local
export const obtenerDatosVisualizacion = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datosLocales);
    }, 500);
  });
};

// Formatea y prepara los datos (etiquetas y valores numéricos) para el renderizado
export const procesarDatos = (datos) => {
  return datos.map((item) => ({
    id: item.id,
    etiqueta: item.mes.toUpperCase(),
    ventas: item.ventas,
    unidades: item.unidades,
    precioPromedio: Number((item.ventas / item.unidades).toFixed(2))
  }));
};

export const obtenerSerieDeTiempo = async (latitud = 19.26, longitud = -98.89) => {
  const respuesta = await apiClient.get('/forecast', {
    params: {
      latitude: latitud,
      longitude: longitud,
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
    },
  });

  const { time, temperature_2m_max, temperature_2m_min } = respuesta.data.daily;

  const datosLimpios = time.map((fecha, indice) => ({
    fecha: fecha,
    tempMax: temperature_2m_max[indice],
    tempMin: temperature_2m_min[indice],
  }));

  return datosLimpios;
};