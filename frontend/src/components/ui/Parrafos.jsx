// Convierte un texto de la BD con saltos de línea en párrafos.
export default function Parrafos({ texto }) {
  if (!texto) return null
  return texto
    .split(/\n{1,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => <p key={i}>{p}</p>)
}
