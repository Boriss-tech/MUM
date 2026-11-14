import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  // Al navegar, volver al inicio de la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#contenido" className="saltar-contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1} style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
