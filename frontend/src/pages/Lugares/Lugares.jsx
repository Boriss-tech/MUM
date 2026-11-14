import { lugaresApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import EstadoCarga from '../../components/ui/EstadoCarga'
import Tarjeta from '../../components/ui/Tarjeta'

// RF04: listado de los sectores del humedal, en el orden definido en la BD.
export default function Lugares() {
  const { datos, cargando, error, recargar } = useApi(() => lugaresApi.listar(), [])

  return (
    <div className="contenedor pagina">
      <h1>Lugares del humedal</h1>
      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={!datos?.length}
        mensajeVacio="Aún no hay lugares publicados."
        onReintentar={recargar}
      >
        <div className="grilla">
          {datos?.map((l) => (
            <Tarjeta key={l.slug} a={`/lugares/${l.slug}`} titulo={l.nombre} subtitulo={l.ciudad} imagen={l.portada} />
          ))}
        </div>
      </EstadoCarga>
    </div>
  )
}
