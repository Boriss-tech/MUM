import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Inicio from './pages/Inicio/Inicio'

// Las páginas se cargan bajo demanda para no descargar todo al abrir la portada (RNF04).
const Biodiversidad = lazy(() => import('./pages/Biodiversidad/Biodiversidad'))
const FichaEspecie = lazy(() => import('./pages/Biodiversidad/FichaEspecie'))
const Lugares = lazy(() => import('./pages/Lugares/Lugares'))
const FichaLugar = lazy(() => import('./pages/Lugares/FichaLugar'))
const Galeria = lazy(() => import('./pages/Galeria/Galeria'))
const Aplicacion = lazy(() => import('./pages/Aplicacion/Aplicacion'))
const Visitantes = lazy(() => import('./pages/Visitantes/Visitantes'))
const Creditos = lazy(() => import('./pages/Creditos/Creditos'))
const Privacidad = lazy(() => import('./pages/Creditos/Privacidad'))
const NoEncontrada = lazy(() => import('./pages/NoEncontrada/NoEncontrada'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className="contenedor pagina">Cargando…</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="biodiversidad" element={<Biodiversidad />} />
            <Route path="biodiversidad/:slug" element={<FichaEspecie />} />
            <Route path="lugares" element={<Lugares />} />
            <Route path="lugares/:slug" element={<FichaLugar />} />
            <Route path="galeria" element={<Galeria />} />
            <Route path="aplicacion" element={<Aplicacion />} />
            <Route path="visitantes" element={<Visitantes />} />
            <Route path="creditos" element={<Creditos />} />
            <Route path="privacidad" element={<Privacidad />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
