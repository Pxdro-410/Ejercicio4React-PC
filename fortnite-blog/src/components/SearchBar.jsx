import PropTypes from 'prop-types'

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="searchbar">
      <span className="searchbar__icon">Buscar: </span>
      <input
        type="text"
        className="searchbar__input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="searchbar__clear" onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

SearchBar.defaultProps = {
  placeholder: 'Buscar...'
}

export default SearchBar