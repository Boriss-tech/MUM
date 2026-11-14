import { Link } from 'react-router-dom'
import logoBlanco from '../../assets/logos/mum-logo-blanco.svg'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer__contenido">
        <img src={logoBlanco} alt="Museo Urbano del Mayaca" width="140" height="34" />
        <p>Humedal Mayaca · Quillota y La Cruz, Región de Valparaíso</p>
        <nav aria-label="Pie de página">
          <Link to="/creditos">Créditos y fuentes</Link>
          <Link to="/privacidad">Aviso de privacidad</Link>
        </nav>
      </div>
    </footer>
  )
}
