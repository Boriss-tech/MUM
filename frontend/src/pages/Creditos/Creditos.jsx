import { creditosApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import BloquesContenido from '../../components/ui/BloquesContenido'
import EstadoCarga from '../../components/ui/EstadoCarga'

// RF12: autores e instituciones que aportan contenidos al sitio.
export default function Creditos() {
  const { datos, cargando, error, recargar } = useApi(() => creditosApi.fuentes(), [])

  return (
    <div className="contenedor pagina">
      <h1>Créditos y fuentes</h1>
      <BloquesContenido seccion="creditos" />

      <h2>Fuentes de información</h2>
      <EstadoCarga cargando={cargando} error={error} vacio={!datos?.length} onReintentar={recargar}>
        <ul>
          {datos?.map((f) => (
            <li key={f.id_fuente}>
              {f.url ? (
                <a href={f.url} target="_blank" rel="noopener noreferrer">
                  {f.titulo}
                </a>
              ) : (
                f.titulo
              )}
              {f.autor_institucion && ` · ${f.autor_institucion}`}
            </li>
          ))}
        </ul>
      </EstadoCarga>
    </div>
  )
}
