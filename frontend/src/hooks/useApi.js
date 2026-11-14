import { useCallback, useEffect, useState } from 'react'

// Ejecuta una llamada a la API y expone { datos, cargando, error, recargar }.
// `dependencias` controla cuándo se vuelve a pedir (ej. al cambiar el slug de la URL).
export function useApi(llamada, dependencias = []) {
  const [estado, setEstado] = useState({ datos: null, cargando: true, error: null })
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let activo = true
    setEstado((previo) => ({ ...previo, cargando: true, error: null }))
    llamada()
      .then((datos) => activo && setEstado({ datos, cargando: false, error: null }))
      .catch((error) => activo && setEstado({ datos: null, cargando: false, error }))
    return () => {
      activo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, version])

  const recargar = useCallback(() => setVersion((v) => v + 1), [])
  return { ...estado, recargar }
}
