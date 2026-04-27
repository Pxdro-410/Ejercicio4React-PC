import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function NotFound() {
  const { darkMode } = useAppContext()

  return (
    <main className={`not-found ${darkMode ? 'dark' : 'light'}`}>
      <div className="not-found__content">
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__title">Ruta no encontrada</h2>
        <p className="not-found__msg">
          Este apartado no existe, intenta nuevamente.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            Ir al inicio
          </Link>
          <Link to="/items" className="btn btn--secondary">
            Ver skins
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound