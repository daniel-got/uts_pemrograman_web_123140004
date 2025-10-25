import { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

function SearchBar({ onSearch, placeholder = 'Search products...' }) {
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef(null)

  // useCallback untuk memoize function
  const handleSearch = useCallback((value) => {
    setSearchTerm(value)
    onSearch(value)
  }, [onSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        
        {searchTerm && (
          <button 
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default SearchBar
