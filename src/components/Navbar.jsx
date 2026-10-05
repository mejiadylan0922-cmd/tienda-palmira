export default function Navbar({ totalUnidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <span className="navbar-marca">Tienda Palmira</span>
      <button className="carrito-btn" aria-label={`Abrir carrito, ${totalUnidades} unidades`} onClick={onAbrirCarrito}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 7H6" />
        </svg>
        {totalUnidades > 0 && <span className="contador">{totalUnidades}</span>}
      </button>
    </header>
  );
}
