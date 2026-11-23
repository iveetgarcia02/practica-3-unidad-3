function TablaDatos({ datos }) {
  return (
    <div className="contenedor-tabla">
      <h2>Detalle de Ventas por Mes</h2>
      <table>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Ventas ($)</th>
            <th>Unidades Vendidas</th>
            <th>Precio Promedio ($)</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id}>
              <td>{fila.etiqueta}</td>
              <td>${fila.ventas.toLocaleString()}</td>
              <td>{fila.unidades}</td>
              <td>${fila.precioPromedio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatos;