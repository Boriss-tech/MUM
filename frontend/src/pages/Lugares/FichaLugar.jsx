import { useParams } from 'react-router-dom'
import { lugaresApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import EstadoCarga from '../../components/ui/EstadoCarga'
import ImagenConCredito from '../../components/ui/ImagenConCredito'
import Parrafos from '../../components/ui/Parrafos'
import Volver from '../../components/ui/Volver'
import '../../styles/ficha.css'

export default function FichaLugar() {
  const { slug } = useParams()
  const { datos: l, cargando, error, recargar } = useApi(() => lugaresApi.detalle(slug), [slug])
  const imagenes = l?.imagenes || []
  const portada = imagenes.find((i) => i.es_portada) || imagenes[0]
  // RN03: el enlace al mapa solo se muestra si la ubicación está confirmada
  const ubicacion = l?.coordenada?.confirmada ? l.coordenada : null

  return (
    <div className="contenedor pagina">
      <Volver a="/lugares" />

      <EstadoCarga cargando={cargando} error={error} onReintentar={recargar}>
        {l && (
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
              {l.ciudad && <span className="ficha__categoria">{l.ciudad}</span>}
              <h1>{l.nombre}</h1>
              <Parrafos texto={l.descripcion} />

              {ubicacion && (
                <p>
                  <a
                    className="boton"
                    href={
                      ubicacion.url_mapa ||
                      `https://www.openstreetmap.org/?mlat=${ubicacion.latitud}&mlon=${ubicacion.longitud}#map=17/${ubicacion.latitud}/${ubicacion.longitud}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver ubicación en el mapa
                  </a>
                </p>
              )}
            </div>
          </article>
        )}
      </EstadoCarga>
    </div>
  )
}
