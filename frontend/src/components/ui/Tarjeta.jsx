import { Link } from 'react-router-dom'
import ImagenConCredito from './ImagenConCredito'
import './ui.css'

// Tarjeta enlazable para listados de especies y lugares.
export default function Tarjeta({ a, titulo, subtitulo, imagen }) {
  return (
    <article className="tarjeta">
      <Link to={a} className="tarjeta__enlace">
        <ImagenConCredito src={imagen?.ruta} alt={imagen?.texto_alt} />
        <div className="tarjeta__texto">
          <h3>{titulo}</h3>
          {subtitulo && <p className="tarjeta__subtitulo">{subtitulo}</p>}
        </div>
      </Link>
    </article>
  )
}
