function TarjetaMetrica({ titulo, valor }) {
  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      <p className="valor-metrica">{valor}</p>
    </div>
  );
}

export default TarjetaMetrica;