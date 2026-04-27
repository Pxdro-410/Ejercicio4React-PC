import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function SkinCard({ skin }) {
  const { toggleFavorite, isFavorite } = useAppContext()
  const favorite = isFavorite(skin.id)

  return (
    <div className={`skin-card ${favorite ? 'skin-card--favorite' : ''}`}>
      <img
        src={skin.images?.icon}
        alt={skin.name}
        className="skin-card__image"
      />
      <div className="skin-card__info">
        <h3 className="skin-card__name">{skin.name}</h3>
        <span className={`skin-card__rarity rarity--${skin.rarity?.value ?? 'common'}`}>
          {skin.rarity?.displayValue ?? 'Común'}
        </span>
      </div>
      <div className="skin-card__actions">
        <Link to={`/items/${skin.id}`} className="skin-card__btn skin-card__btn--detail">
          Ver detalle
        </Link>
        <button
          className={`skin-card__btn skin-card__btn--fav ${favorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(skin)}
        >
          {favorite ? 'Quitar favorito' : 'Agregar favorito'}
        </button>
      </div>
    </div>
  )
}

SkinCard.propTypes = {
  skin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.shape({
      icon: PropTypes.string
    }),
    rarity: PropTypes.shape({
      value: PropTypes.string,
      displayValue: PropTypes.string
    })
  }).isRequired
}

export default SkinCard