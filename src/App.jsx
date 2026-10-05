import { useCallback, useRef, useState } from "react";
import { PRODUCTOS } from "./data";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Carrito from "./components/Carrito";
import Toasts from "./components/Toasts";

const MSG_MAX = "Este es el máximo de producto disponible en stock";
const MSG_MIN_CARD = "La cantidad mínima es 1.";
const MSG_MIN_CARRITO = "Esta es la cantidad mínima (1). ¿Desea eliminar el producto?";

export default function App() {
  const [carrito, setCarrito] = useState([]); // [{ id, cantidad }]
  const [abierto, setAbierto] = useState(false);
  const [toasts, setToasts] = useState([]);
  const contadorToast = useRef(0);

  const cerrarToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const mostrarToast = useCallback(
    (mensaje, accion = null) => {
      const id = ++contadorToast.current;
      setToasts((t) => [...t.filter((x) => x.mensaje !== mensaje), { id, mensaje, accion }]);
      setTimeout(() => cerrarToast(id), accion ? 8000 : 4000);
    },
    [cerrarToast]
  );

  const cantidadEn = (id) => carrito.find((i) => i.id === id)?.cantidad ?? 0;

  const fijarCantidad = (id, n) =>
    setCarrito((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, cantidad: n } : i))
        : [...prev, { id, cantidad: n }]
    );

  const eliminar = (id) => setCarrito((prev) => prev.filter((i) => i.id !== id));

  const avisoMax = () => mostrarToast(MSG_MAX);
  const avisoMinCarrito = (id) =>
    mostrarToast(MSG_MIN_CARRITO, { texto: "Sí, eliminar", ejecutar: () => eliminar(id) });

  // Punto 3 y 5: una sola línea por producto, sin superar el stock
  const agregar = (producto, cantidad) => {
    const nueva = cantidadEn(producto.id) + cantidad;
    if (nueva > producto.stock) {
      fijarCantidad(producto.id, producto.stock);
      avisoMax();
    } else {
      fijarCantidad(producto.id, nueva);
    }
  };

  const lineas = carrito.map((i) => ({ ...PRODUCTOS.find((p) => p.id === i.id), cantidad: i.cantidad }));
  const totalUnidades = lineas.reduce((s, l) => s + l.cantidad, 0);
  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);

  return (
    <>
      <Navbar totalUnidades={totalUnidades} onAbrirCarrito={() => setAbierto(true)} />
      <main className="catalogo">
        <h1>Productos típicos de la región</h1>
        <div className="grid">
          {PRODUCTOS.map((p) => (
            <ProductCard
              key={p.id}
              producto={p}
              enCarrito={cantidadEn(p.id)}
              onAgregar={agregar}
              onMinimo={() => mostrarToast(MSG_MIN_CARD)}
              onMax={avisoMax}
            />
          ))}
        </div>
      </main>
      <Carrito
        abierto={abierto}
        lineas={lineas}
        totalUnidades={totalUnidades}
        total={total}
        onCerrar={() => setAbierto(false)}
        onFijar={fijarCantidad}
        onMax={avisoMax}
        onMinimo={avisoMinCarrito}
        onEliminar={eliminar}
      />
      <Toasts toasts={toasts} onClose={cerrarToast} />
    </>
  );
}
