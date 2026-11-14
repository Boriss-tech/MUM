import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logos/mum-logo.svg'
import './Header.css'

export const MENU = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/biodiversidad', texto: 'Biodiversidad' },
  { ruta: '/lugares', texto: 'Lugares' },
  { ruta: '/galeria', texto: 'Galería' },
  { ruta: '/aplicacion', texto: 'Aplicación' },
  { ruta: '/visitantes', texto: 'Visitantes' },
]

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()

  // Cierra el menú móvil al cambiar de página
  useEffect(() => {
    setAbierto(false)
  }, [pathname])

  return (
    <header className="header">
      <div className="contenedor header__barra">
        <Link to="/" className="header__logo" aria-label="Museo Urbano del Mayaca, ir al inicio">
          <img src={logo} alt="Logotipo Museo Urbano del Mayaca" width="160" height="38" />
        </Link>

        <button
          type="button"
          className="header__boton-menu"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto((a) => !a)}
        >
          <span className="solo-lector">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span aria-hidden="true">{abierto ? '✕' : '☰'}</span>
        </button>

        <nav id="menu-principal" className={`header__nav ${abierto ? 'header__nav--abierto' : ''}`} aria-label="Principal">
          <ul>
            {MENU.map(({ ruta, texto }) => (
              <li key={ruta}>
                <NavLink to={ruta} end={ruta === '/'}>
                  {texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
