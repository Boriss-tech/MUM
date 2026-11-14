import { useState } from 'react'
import './ui.css'

// Video autorizado (RF06): con controles, sin reproducción automática ni sonido al cargar.
// Si el archivo no está o falla, se muestra un aviso en vez de un reproductor roto.
export default function ReproductorVideo({ video }) {
  const [fallo, setFallo] = useState(false)

  if (!video?.ruta || fallo) {
    return <p className="aviso">El video no está disponible en este momento.</p>
  }
  return (
    <figure className="video">
      <video controls preload="metadata" playsInline onError={() => setFallo(true)} aria-label={video.titulo}>
        <source src={video.ruta} />
        Tu navegador no puede reproducir este video.
      </video>
      <figcaption>
        {video.titulo}
        {video.credito && ` · ${video.credito}`}
      </figcaption>
    </figure>
  )
}
