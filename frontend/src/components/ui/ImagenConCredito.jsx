import './ui.css'

// Toda foto publicada muestra su crédito y texto alternativo (RF05, RN05).
// Si no hay imagen, se muestra un espacio neutro sin romper el diseño (RF03).
export default function ImagenConCredito({ src, alt, credito, proporcion = '4 / 3', carga = 'lazy' }) {
  if (!src) {
    return (
      <div className="imagen imagen--vacia" style={{ aspectRatio: proporcion }} role="img" aria-label="Imagen no disponible">
        <span aria-hidden="true">Sin imagen</span>
      </div>
    )
  }
  return (
    <figure className="imagen">
      <img src={src} alt={alt || ''} loading={carga} decoding="async" style={{ aspectRatio: proporcion }} />
      {credito && <figcaption>Fotografía: {credito}</figcaption>}
    </figure>
  )
}
