import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchNews, fetchSkins } from '../data/api'
import { useAppContext } from '../context/AppContext'
import RandomButton from '../components/RandomButton'

function Home() {
  const [news, setNews] = useState([])
  const [featuredSkins, setFeaturedSkins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { darkMode } = useAppContext()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [newsData, skinsData] = await Promise.all([
          fetchNews(),
          fetchSkins()
        ])
        setNews(newsData.slice(0, 3))
        setFeaturedSkins(skinsData.slice(0, 6))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="status-msg">Cargando...</div>
  if (error) return <div className="status-msg error">Error: {error}</div>

  return (
    <main className={`home ${darkMode ? 'dark' : 'light'}`}>
      <section className="home__hero">
        <h1 className="home__title">Fortnite Blog by PC</h1>
        <p className="home__subtitle">
          Explora todas las skins, cosméticos y noticias del universo Fortnite
        </p>
        <div className="home__actions">
          <Link to="/items" className="btn btn--primary">
            Ver todas las skins
          </Link>
          <RandomButton skins={featuredSkins} />
        </div>
      </section>

      <section className="home__news">
        <h2>Noticias recientes</h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className="news-card">
              {item.image && (
                <img src={item.image} alt={item.title} className="news-card__img" />
              )}
              <div className="news-card__body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home__featured">
        <h2>Skins destacadas</h2>
        <div className="featured-grid">
          {featuredSkins.map(skin => (
            <Link to={`/items/${skin.id}`} key={skin.id} className="featured-card">
              <img
                src={skin.images?.icon}
                alt={skin.name}
                className="featured-card__img"
              />
              <span className="featured-card__name">{skin.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home