import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Navbar() {
  const { darkMode, toggleDarkMode, favorites } = useAppContext()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fortnite Blog by PC</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/items">Skins</Link>
        <Link to="/items?filter=favorites">
          Favoritos ({favorites.length})
        </Link>
      </div>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Claro' : 'Oscuro'}
      </button>
    </nav>
  )
}

export default Navbar