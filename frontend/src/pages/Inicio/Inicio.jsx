import { Link } from 'react-router-dom'
import BloquesContenido from '../../components/ui/BloquesContenido'
import './Inicio.css'

// RF01: qué es el MUM, dónde está y qué puede consultar el visitante.
const ACCESOS = [
  { a: '/biodiversidad', titulo: 'Biodiversidad', texto: 'Aves, otra fauna y flora del humedal.' },
  { a: '/lugares', titulo: 'Lugares', texto: 'Los sectores de interés del Humedal Mayaca.' },
  { a: '/aplicacion', titulo: 'Aplicación móvil', texto: 'Recorre el museo desde tu teléfono.' },
]

export default function Inicio() {
  return (
    <>
      <section className="portada">
        <div className="contenedor">
          <h1>Museo Urbano del Mayaca</h1>
          <p className="portada__bajada">Un museo a cielo abierto en el Humedal Mayaca, entre Quillota y La Cruz.</p>
        </div>
      </section>

      <div className="contenedor pagina">
        <BloquesContenido seccion="inicio" />

        <h2>¿Qué puedes explorar?</h2>
        <ul className="accesos">
          {ACCESOS.map(({ a, titulo, texto }) => (
            <li key={a}>
              <Link to={a} className="acceso">
                <strong>{titulo}</strong>
                <span>{texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
