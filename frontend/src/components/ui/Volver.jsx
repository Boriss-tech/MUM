import { Link } from 'react-router-dom'
import './ui.css'

// Enlace para regresar al listado desde una ficha (RF02).
export default function Volver({ a, texto = 'Volver al listado' }) {
  return (
    <Link to={a} className="volver">
      ← {texto}
    </Link>
  )
}
