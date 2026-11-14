import { useSearchParams } from 'react-router-dom'
import { categoriasApi, especiesApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import EstadoCarga from '../../components/ui/EstadoCarga'
import Tarjeta from '../../components/ui/Tarjeta'
import './Biodiversidad.css'

// RF03: catálogo por categoría (aves, otra fauna, flora). El filtro vive en la URL
// (?categoria=aves) para que el enlace se pueda compartir (RF02).
export default function Biodiversidad() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') || ''

  const categorias = useApi(() => categoriasApi.listar(), [])
  const especies = useApi(() => especiesApi.listar(categoria), [categoria])

  const elegir = (slug) => setParams(slug ? { categoria: slug } : {})

  return (
    <div className="contenedor pagina">
      <h1>Biodiversidad del humedal</h1>

      {categorias.datos?.length > 0 && (
        <div className="filtros" role="group" aria-label="Filtrar por categoría">
          <button type="button" aria-pressed={!categoria} onClick={() => elegir('')}>
            Todas
          </button>
          {categorias.datos.map((c) => (
            <button type="button" key={c.slug} aria-pressed={categoria === c.slug} onClick={() => elegir(c.slug)}>
              {c.nombre}
            </button>
          ))}
        </div>
      )}

      <EstadoCarga
        cargando={especies.cargando}
        error={especies.error}
        vacio={!especies.datos?.length}
        mensajeVacio="Aún no hay especies publicadas en esta categoría."
        onReintentar={especies.recargar}
      >
        <div className="grilla">
          {especies.datos?.map((e) => (
            <Tarjeta
              key={e.slug}
              a={`/biodiversidad/${e.slug}`}
              titulo={e.nombre_comun}
              subtitulo={e.nombre_cientifico}
              imagen={e.portada}
            />
          ))}
        </div>
      </EstadoCarga>
    </div>
  )
}
