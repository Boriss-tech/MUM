// Cliente HTTP único para la API REST de Express.
// Todas las vistas obtienen los datos por aquí: no hay datos escritos en los componentes (RF09).

const BASE_URL = import.meta.env.VITE_API_URL || '/api'
const TIEMPO_MAXIMO_MS = 10000

export class ErrorApi extends Error {
  constructor(mensaje, estado) {
    super(mensaje)
    this.name = 'ErrorApi'
    this.estado = estado // código HTTP (404, 500...) o 0 si no hubo respuesta
  }
}

export async function obtener(ruta, parametros) {
  const url = new URL(BASE_URL + ruta, window.location.origin)
  if (parametros) {
    Object.entries(parametros).forEach(([clave, valor]) => {
      if (valor !== undefined && valor !== null && valor !== '') url.searchParams.set(clave, valor)
    })
  }

  const control = new AbortController()
  const temporizador = setTimeout(() => control.abort(), TIEMPO_MAXIMO_MS)
  try {
    const respuesta = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: control.signal,
    })
    if (!respuesta.ok) {
      throw new ErrorApi(`La API respondió ${respuesta.status}`, respuesta.status)
    }
    return await respuesta.json()
  } catch (error) {
    if (error instanceof ErrorApi) throw error
    throw new ErrorApi('No fue posible conectar con el servidor', 0)
  } finally {
    clearTimeout(temporizador)
  }
}
