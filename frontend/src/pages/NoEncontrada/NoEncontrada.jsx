import { Link } from 'react-router-dom'

// RNF08: ruta inexistente -> aviso controlado y camino de vuelta.
export default function NoEncontrada() {
  return (
    <div className="contenedor pagina">
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe o fue movida.</p>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </div>
  )
}
