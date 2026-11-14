import './ui.css'

// Muestra un aviso controlado mientras carga, si falla la API o si no hay datos (RNF08).
// Uso: <EstadoCarga cargando={c} error={e} vacio={!datos?.length} onReintentar={recargar}>...</EstadoCarga>
export default function EstadoCarga({ cargando, error, vacio, mensajeVacio, onReintentar, children }) {
  if (cargando) {
    return (
      <p className="aviso" role="status">
        Cargando…
      </p>
    )
  }
  if (error) {
    const noExiste = error.estado === 404
    return (
      <div className="aviso aviso--error" role="alert">
        <p>{noExiste ? 'No encontramos el contenido solicitado.' : 'No pudimos cargar esta información en este momento.'}</p>
        {!noExiste && onReintentar && (
          <button type="button" className="boton boton--secundario" onClick={onReintentar}>
            Reintentar
          </button>
        )}
      </div>
    )
  }
  if (vacio) {
    return <p className="aviso">{mensajeVacio || 'Aún no hay contenido publicado en esta sección.'}</p>
  }
  return children
}
