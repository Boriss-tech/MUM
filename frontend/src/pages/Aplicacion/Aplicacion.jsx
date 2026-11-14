import { aplicacionApi } from '../../services/mumApi'
import { useApi } from '../../hooks/useApi'
import BloquesContenido from '../../components/ui/BloquesContenido'
import EstadoCarga from '../../components/ui/EstadoCarga'

const PLATAFORMAS = { android: 'Google Play (Android)', ios: 'App Store (iOS)' }

// RF07 / RN06: solo se enlaza a la tienda si el enlace está disponible y verificado en la BD.
export default function Aplicacion() {
  const { datos, cargando, error, recargar } = useApi(() => aplicacionApi.enlaces(), [])

  return (
    <div className="contenedor pagina">
      <h1>Aplicación móvil del MUM</h1>
      <BloquesContenido seccion="aplicacion" />

      <h2>Descarga</h2>
      <EstadoCarga cargando={cargando} error={error} vacio={!datos?.length} onReintentar={recargar}>
        <ul>
          {datos?.map((e) => (
            <li key={e.plataforma}>
              {e.disponible && e.verificado && e.url ? (
                <a href={e.url} target="_blank" rel="noopener noreferrer">
                  Descargar en {PLATAFORMAS[e.plataforma]}
                </a>
              ) : (
                <span>{PLATAFORMAS[e.plataforma]}: disponibilidad pendiente.</span>
              )}
            </li>
          ))}
        </ul>
      </EstadoCarga>
    </div>
  )
}
