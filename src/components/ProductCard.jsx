import { useState } from "react";
import CantidadInput from "./CantidadInput";
import { formatoCOP } from "../data";

export default function ProductCard({ producto, enCarrito, onAgregar, onMinimo, onMax }) {
  const [cantidad, setCantidad] = useState(1);
  const disponible = producto.stock - enCarrito;
  const agotado = disponible <= 0;

  const agregar = () => {
    onAgregar(producto, cantidad);
    setCantidad(1);
  };

  return (
    <article className="card">
      <h3>{producto.nombre}</h3>
      <p className="precio">{formatoCOP(producto.precio)}</p>
      <p className="stock">{agotado ? "Sin unidades disponibles" : `Disponibles: ${disponible}`}</p>
      <div className="card-acciones">
        <CantidadInput
          value={cantidad}
          max={producto.stock}
          onChange={setCantidad}
          onZero={() => onMinimo()}
          onMax={onMax}
          label={`Cantidad de ${producto.nombre}`}
        />
        <button className="btn" onClick={agregar} disabled={agotado}>
          Agregar
        </button>
      </div>
    </article>
  );
}
