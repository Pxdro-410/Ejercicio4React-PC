import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchSkinById, fetchSkins } from '../data/api'
import { useAppContext } from '../context/AppContext'
import RandomButton from '../components/RandomButton'

function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [skin, setSkin] = useState(null)
  const [allSkins, setAllSkins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { darkMode, toggleFavorite, isFavorite } = useAppContext()
  const favorite = skin ? isFavorite(skin.id) : false

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [skinData, skinsData] = await Promise.all([
          fetchSkinById(id),
          fetchSkins()
        ])
        setSkin(skinData)
        setAllSkins(skinsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) return <div className="status-msg">Cargando skin...</div>
  if (error) return <div className="status-msg error">Error: {error}</div>
  if (!skin) return <div className="status-msg">Skin no encontrada</div>

  return (
    <main className={`item-detail ${darkMode ? 'dark' : 'light'}`}>
      <div className="item-detail__nav">
        <button className="btn btn--back" onClick={() => navigate(-1)}>
          Volver
        </button>
        <Link to="/items" className="btn btn--secondary">
          Ver todas las skins
        </Link>
        <RandomButton skins={allSkins} />
      </div>

      <div className="item-detail__card">
        <div className="item-detail__images">
          {skin.images?.featured ? (
            <img
              src={skin.images.featured}
              alt={skin.name}
              className="item-detail__img item-detail__img--featured"
            />
          ) : (
            <img
              src={skin.images?.icon}
              alt={skin.name}
              className="item-detail__img item-detail__img--icon"
            />
          )}
        </div>

        <div className="item-detail__info">
          <div className="item-detail__header">
            <h1 className="item-detail__name">{skin.name}</h1>
            <button
              className={`fav-btn ${favorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(skin)}
            >
              {favorite ? 'En favoritos' : 'Agregar a favoritos'}
            </button>
          </div>

          <span className={`skin-card__rarity rarity--${skin.rarity?.value ?? 'common'}`}>
            {skin.rarity?.displayValue ?? 'Común'}
          </span>

          {skin.description && (
            <p className="item-detail__description">{skin.description}</p>
          )}

          <div className="item-detail__meta">
            {skin.type?.displayValue && (
              <div className="meta-item">
                <span className="meta-label">Tipo</span>
                <span className="meta-value">{skin.type.displayValue}</span>
              </div>
            )}
            {skin.set?.value && (
              <div className="meta-item">
                <span className="meta-label">Set</span>
                <span className="meta-value">{skin.set.text}</span>
              </div>
            )}
            {skin.introduction?.text && (
              <div className="meta-item">
                <span className="meta-label">Introducción</span>
                <span className="meta-value">{skin.introduction.text}</span>
              </div>
            )}
            {skin.added && (
              <div className="meta-item">
                <span className="meta-label">Añadida</span>
                <span className="meta-value">
                  {new Date(skin.added).toLocaleDateString('es-ES')}
                </span>
              </div>
            )}
          </div>

          {skin.images?.other && Object.keys(skin.images.other).length > 0 && (
            <div className="item-detail__variants">
              <h3>Variantes</h3>
              <div className="variants-grid">
                {Object.entries(skin.images.other).map(([key, url]) => (
                  <img key={key} src={url} alt={key} className="variant-img" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ItemDetail