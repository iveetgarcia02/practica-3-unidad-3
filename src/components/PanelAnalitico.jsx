import { useState } from 'react';
import { obtenerSerieDeTiempo } from '../services/dataService';

function PanelAnalitico() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const manejarConsulta = async () => {
    setCargando(true);
    setError(null);

    try {
      const resultado = await obtenerSerieDeTiempo();
      setDatos(resultado);
    } catch (err) {
      setError('Error al conectar con la API de datos. Verifica tu conexión o la URL.');
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Panel Analítico: Serie de Tiempo Climática</h2>
      <p>Pronóstico de temperaturas máximas y mínimas (Próximos 7 días).</p>

      <button
        onClick={manejarConsulta}
        disabled={cargando}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: cargando ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {cargando ? 'Consultando...' : 'Obtener Datos Analíticos'}
      </button>

      {cargando && (
        <div style={{ padding: '15px', backgroundColor: '#e3f2fd', color: '#0d47a1', borderRadius: '5px' }}>
          ⏳ <strong>Analizando datos...</strong> Por favor espera un momento.
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a', borderRadius: '5px' }}>
          ⚠️ <strong>Error:</strong> {error}
        </div>
      )}

      {!cargando && !error && datos.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fecha</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Temp. Máxima (°C)</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Temp. Mínima (°C)</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{fila.fecha}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{fila.tempMax} °C</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{fila.tempMin} °C</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PanelAnalitico;