import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true)
  const [favorites, setFavorites] = useState([])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const toggleFavorite = (skin) => {
    setFavorites(prev =>
      prev.some(f => f.id === skin.id)
        ? prev.filter(f => f.id !== skin.id)
        : [...prev, skin]
    )
  }

  const isFavorite = (id) => favorites.some(f => f.id === id)

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, favorites, toggleFavorite, isFavorite }}>
      <div className={darkMode ? 'app dark' : 'app light'}>
        {children}
      </div>
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}