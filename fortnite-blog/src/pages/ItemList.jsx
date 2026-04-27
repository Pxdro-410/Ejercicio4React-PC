import { useEffect, useState } from 'react'
import { fetchSkins } from '../data/api'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'
import SkinCard from '../components/SkinCard'
import SearchBar from '../components/SearchBar'
import RandomButton from '../components/RandomButton'

const RARITIES = ['Todas', 'common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'icon']
const PAGE_SIZE = 20

function ItemList() {
  const location = useLocation()
  const [skins, setSkins] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [rarity, setRarity] = useState('Todas')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { darkMode, favorites } = useAppContext()

  const params = new URLSearchParams(location.search)
  const [showFavs, setShowFavs] = useState(params.get('filter') === 'favorites')

  useEffect(() => {
    async function loadSkins() {
      try {
        setLoading(true)
        const data = await fetchSkins()
        setSkins(data)
        setFiltered(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadSkins()
  }, [])

  useEffect(() => {
    const p = new URLSearchParams(location.search)
    setShowFavs(p.get('filter') === 'favorites')
  }, [location.search])

  useEffect(() => {
    let result = showFavs ? favorites : skins

    if (search.trim()) {
      result = result.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (rarity !== 'Todas') {
      result = result.filter(s => s.rarity?.value === rarity)
    }

    setFiltered(result)
    setPage(1)
  }, [search, rarity, skins, showFavs, favorites])

  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length

  if (loading) return <div className="status-msg">Cargando skins...</div>
  if (error) return <div className="status-msg error">Error: {error}</div>

  return (
    <main className={`item-list ${darkMode ? 'dark' : 'light'}`}>
      <div className="item-list__header">
        <h1>Skins de Fortnite</h1>
        <p>{filtered.length} skins encontradas</p>
      </div>

      <div className="item-list__controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar skin por nombre..."
        />
        <div className="item-list__filters">
          <select
            className="rarity-select"
            value={rarity}
            onChange={e => setRarity(e.target.value)}
          >
            {RARITIES.map(r => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
          <button
            className={`fav-toggle ${showFavs ? 'active' : ''}`}
            onClick={() => setShowFavs(prev => !prev)}
          >
            {showFavs ? 'Mis favoritos' : 'Ver favoritos'}
          </button>
          <RandomButton skins={skins} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="status-msg">No se encontraron skins</div>
      ) : (
        <>
          <div className="skins-grid">
            {paginated.map(skin => (
              <SkinCard key={skin.id} skin={skin} />
            ))}
          </div>
          {hasMore && (
            <button className="load-more" onClick={() => setPage(prev => prev + 1)}>
              Cargar más skins
            </button>
          )}
        </>
      )}
    </main>
  )
}

export default ItemList