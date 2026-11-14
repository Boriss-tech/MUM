import BloquesContenido from '../../components/ui/BloquesContenido'

// RF08 / RN04: las recomendaciones vigentes van separadas de la historia del lugar,
// para que los relatos antiguos no se lean como permisos actuales.
export default function Visitantes() {
  return (
    <div className="contenedor pagina">
      <h1>Información para visitantes</h1>

      <section aria-labelledby="titulo-recomendaciones">
        <h2 id="titulo-recomendaciones">Recomendaciones vigentes</h2>
        <BloquesContenido seccion="visitantes" nivelTitulo={3} />
      </section>

      <section aria-labelledby="titulo-historia">
        <h2 id="titulo-historia">Historia del humedal</h2>
        <p className="aviso">Los relatos históricos describen usos del pasado y no son recomendaciones actuales.</p>
        <BloquesContenido seccion="historia" nivelTitulo={3} />
      </section>
    </div>
  )
}
