import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function RandomButton({ skins }) {
  const navigate = useNavigate()

  const goToRandom = () => {
    if (!skins || skins.length === 0) return
    const random = skins[Math.floor(Math.random() * skins.length)]
    navigate(`/items/${random.id}`)
  }

  return (
    <button className="random-btn" onClick={goToRandom} disabled={!skins?.length}>
      Skin aleatoria
    </button>
  )
}

RandomButton.propTypes = {
  skins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired
}

export default RandomButton