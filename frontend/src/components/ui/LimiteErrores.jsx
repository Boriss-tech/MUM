import { Component } from 'react'

// Si un componente falla al renderizar, se muestra un aviso en vez de una página en blanco (RNF08).
export default class LimiteErrores extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Error en la interfaz:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="contenedor pagina" role="alert">
          <h1>Algo salió mal</h1>
          <p>Ocurrió un problema al mostrar esta página.</p>
          <a href="/" className="boton">
            Volver al inicio
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
