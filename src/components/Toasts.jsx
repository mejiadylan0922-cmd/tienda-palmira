// Mensajes emergentes: se cierran solos (App) o con el botón ×
export default function Toasts({ toasts, onClose }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <p>{t.mensaje}</p>
          {t.accion && (
            <button
              className="btn btn-peligro"
              onClick={() => {
                t.accion.ejecutar();
                onClose(t.id);
              }}
            >
              {t.accion.texto}
            </button>
          )}
          <button className="toast-cerrar" aria-label="Cerrar mensaje" onClick={() => onClose(t.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
