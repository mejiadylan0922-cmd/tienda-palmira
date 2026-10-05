import CantidadInput from "./CantidadInput";
import { formatoCOP } from "../data";

export default function Carrito({ abierto, lineas, totalUnidades, total, onCerrar, onFijar, onMax, onMinimo, onEliminar }) {
  return (
    <>
      {abierto && <div className="overlay" onClick={onCerrar} />}
      <aside className={`panel ${abierto ? "abierto" : ""}`} aria-hidden={!abierto} aria-label="Carrito de compras">
        <div className="panel-cabecera">
          <h2>Tu carrito</h2>
          <button className="icono-btn" aria-label="Cerrar carrito" onClick={onCerrar}>×</button>
        </div>

        <div className="panel-lineas">
          {lineas.length === 0 && <p className="vacio">Tu carrito está vacío. Agrega productos del catálogo.</p>}
          {lineas.map((l) => (
            <div className="linea" key={l.id}>
              <div className="linea-info">
                <strong>{l.nombre}</strong>
                <span>{formatoCOP(l.precio)} c/u</span>
              </div>
              <div className="linea-controles">
                <button
                  className="icono-btn"
                  aria-label={`Restar una unidad de ${l.nombre}`}
                  onClick={() => (l.cantidad <= 1 ? onMinimo(l.id) : onFijar(l.id, l.cantidad - 1))}
                >
                  −
                </button>
                <CantidadInput
                  value={l.cantidad}
                  max={l.stock}
                  onChange={(n) => onFijar(l.id, n)}
                  onZero={() => onMinimo(l.id)}
                  onMax={onMax}
                  label={`Cantidad de ${l.nombre} en el carrito`}
                />
                <button
                  className="icono-btn"
                  aria-label={`Sumar una unidad de ${l.nombre}`}
                  onClick={() => (l.cantidad >= l.stock ? onMax() : onFijar(l.id, l.cantidad + 1))}
                >
                  +
                </button>
              </div>
              <div className="linea-pie">
                <span className="subtotal">{formatoCOP(l.precio * l.cantidad)}</span>
                <button className="btn-link" onClick={() => onEliminar(l.id)}>Quitar</button>
              </div>
            </div>
          ))}
        </div>

        <div className="panel-totales">
          <p>Total de unidades: <strong>{totalUnidades}</strong></p>
          <p className="total">Total: <strong>{formatoCOP(total)}</strong></p>
        </div>
      </aside>
    </>
  );
}
