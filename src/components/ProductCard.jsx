import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PropTypes from 'prop-types'
import './style/ProductCard.css'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useApp()

  const handleAddToCart = (e) => {
    e.stopPropagation() // Prevent navigation when clicking button
    addToCart(product)
    alert(`${product.title} added to cart!`)
  }

  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  // Truncate title if too long
  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength 
      ? title.substring(0, maxLength) + '...' 
      : title
  }

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">
          {truncateTitle(product.title)}
        </h3>
        
        <div className="product-category">
          {product.category}
        </div>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          
          <button 
            className="btn-add-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        
        <div className="product-rating">
          ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    })
  }).isRequired
}

export default ProductCard
