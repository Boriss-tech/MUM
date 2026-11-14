// Endpoints que el frontend espera de la API Express.
// Contrato acordado con Backend: la API solo devuelve registros en estado 'aprobado' (RN01).
import { obtener } from './api'

export const categoriasApi = {
  listar: () => obtener('/categorias'),
}

export const especiesApi = {
  // categoria = slug ('aves', 'otra-fauna', 'flora'); opcional
  listar: (categoria) => obtener('/especies', { categoria }),
  detalle: (slug) => obtener(`/especies/${encodeURIComponent(slug)}`),
}

export const lugaresApi = {
  listar: () => obtener('/lugares'),
  detalle: (slug) => obtener(`/lugares/${encodeURIComponent(slug)}`),
}

export const galeriaApi = {
  listar: () => obtener('/galeria'),
  videos: () => obtener('/videos'),
}

export const contenidosApi = {
  // seccion: 'inicio' | 'proyecto' | 'historia' | 'visitantes' | 'creditos' | 'aplicacion'
  porSeccion: (seccion) => obtener('/contenidos', { seccion }),
}

export const aplicacionApi = {
  enlaces: () => obtener('/enlaces-app'),
}

export const creditosApi = {
  fuentes: () => obtener('/fuentes'),
}
