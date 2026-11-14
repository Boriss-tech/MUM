import { useParams } from 'react-router-dom'
import { especiesApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import EstadoCarga from '../../components/ui/EstadoCarga'
import ImagenConCredito from '../../components/ui/ImagenConCredito'
import Parrafos from '../../components/ui/Parrafos'
import Volver from '../../components/ui/Volver'
import '../../styles/ficha.css'

// Atributos opcionales de la ficha: solo se muestran si vienen en los datos (RN02).
const ATRIBUTOS = [
  ['distribucion_geografica', 'Distribución'],
  ['habitat_ecosistema', 'Dónde verla en el humedal'],
  ['alimentacion', 'Alimentación'],
  ['habito', 'Hábito y comportamiento'],
  ['reproduccion', 'Reproducción'],
]

export default function FichaEspecie() {
  const { slug } = useParams()
  const { datos: e, cargando, error, recargar } = useApi(() => especiesApi.detalle(slug), [slug])
  const imagenes = e?.imagenes || []
  const portada = imagenes.find((i) => i.es_portada) || imagenes[0]

  return (
    <div className="contenedor pagina">
      <Volver a={e?.categoria ? `/biodiversidad?categoria=${e.categoria.slug}` : '/biodiversidad'} />

      <EstadoCarga cargando={cargando} error={error} onReintentar={recargar}>
        {e && (
          <article className="ficha">
            <div>
              <ImagenConCredito src={portada?.ruta} alt={portada?.texto_alt} credito={portada?.credito} carga="eager" />
              {imagenes.length > 1 && (
                <div className="ficha__miniaturas">
                  {imagenes
                    .filter((i) => i !== portada)
                    .map((i) => (
                      <ImagenConCredito key={i.id_archivo} src={i.ruta} alt={i.texto_alt} credito={i.credito} proporcion="1 / 1" />
                    ))}
                </div>
              )}
            </div>

            <div>
              {e.categoria && <span className="ficha__categoria">{e.categoria.nombre}</span>}
              <h1>{e.nombre_comun}</h1>
              {e.nombre_cientifico && <p className="ficha__cientifico">{e.nombre_cientifico}</p>}
              <Parrafos texto={e.descripcion} />

              <dl>
                {ATRIBUTOS.filter(([campo]) => e[campo]).map(([campo, etiqueta]) => (
                  <div key={campo}>
                    <dt>{etiqueta}</dt>
                    <dd>{e[campo]}</dd>
                  </div>
                ))}
              </dl>

              {e.fuente && (
                <p className="ficha__fuente">
                  Fuente: {e.fuente.titulo}
                  {e.fuente.autor_institucion && ` · ${e.fuente.autor_institucion}`}
                </p>
              )}
            </div>
          </article>
        )}
      </EstadoCarga>
    </div>
  )
}
