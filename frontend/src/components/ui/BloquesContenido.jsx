import { contenidosApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import EstadoCarga from './EstadoCarga'
import Parrafos from './Parrafos'

// Muestra los textos de la tabla `contenido` de una sección, en su orden.
export default function BloquesContenido({ seccion, nivelTitulo = 2 }) {
  const { datos, cargando, error, recargar } = useApi(() => contenidosApi.porSeccion(seccion), [seccion])
  const Titulo = `h${nivelTitulo}`

  return (
    <EstadoCarga cargando={cargando} error={error} vacio={!datos?.length} onReintentar={recargar}>
      {datos?.map((bloque) => (
        <section key={bloque.id_contenido} className="bloque-contenido">
          <Titulo>{bloque.titulo}</Titulo>
          <Parrafos texto={bloque.texto} />
        </section>
      ))}
    </EstadoCarga>
  )
}
