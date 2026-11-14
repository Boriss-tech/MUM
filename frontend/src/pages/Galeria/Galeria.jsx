import { galeriaApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import EstadoCarga from '../../components/ui/EstadoCarga'
import ImagenConCredito from '../../components/ui/ImagenConCredito'
import ReproductorVideo from '../../components/ui/ReproductorVideo'

// RF05: fotos autorizadas en el orden de `archivo.orden_galeria`.
// RF06: al menos un video autorizado.
export default function Galeria() {
  const fotos = useApi(() => galeriaApi.listar(), [])
  const videos = useApi(() => galeriaApi.videos(), [])

  return (
    <div className="contenedor pagina">
      <h1>Galería</h1>

      <EstadoCarga
        cargando={fotos.cargando}
        error={fotos.error}
        vacio={!fotos.datos?.length}
        mensajeVacio="Aún no hay fotografías publicadas."
        onReintentar={fotos.recargar}
      >
        <div className="grilla">
          {fotos.datos?.map((f) => (
            <ImagenConCredito key={f.id_archivo} src={f.ruta} alt={f.texto_alt} credito={f.credito} />
          ))}
        </div>
      </EstadoCarga>

      <h2>Video</h2>
      <EstadoCarga cargando={videos.cargando} error={videos.error} onReintentar={videos.recargar}>
        {videos.datos?.length ? (
          videos.datos.map((v) => <ReproductorVideo key={v.id_archivo} video={v} />)
        ) : (
          <ReproductorVideo video={null} />
        )}
      </EstadoCarga>
    </div>
  )
}
