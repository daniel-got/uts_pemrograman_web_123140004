import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useApp } from '../context/AppContext'
import { Loading, ErrorMessage } from '../components/Loading'
import './style/ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const [quantity, setQuantity] = useState(1)

  // Fetch product detail
  const { 
    data: product, 
    loading, 
    error,
    refetch 
  } = useFetch(`https://fakestoreapi.com/products/${id}`)

  const handleAddToCart = () => {
    if (product) {
      // Add product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      alert(`${quantity} x ${product.title} added to cart!`)
    }
  }

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  // Loading state
  if (loading) {
    return <Loading message="Loading product details..." />
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={refetch}
      />
    )
  }

  // Product not found
  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      {/* Back Button */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail-container">
        {/* Product Image */}
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <div className="product-category-badge">
            {product.category}
          </div>

          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-rating">
            <span className="stars">
              {'⭐'.repeat(Math.round(product.rating?.rate || 0))}
            </span>
            <span className="rating-text">
              {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="product-price-section">
            <span className="product-detail-price">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={() => handleQuantityChange('increase')}>
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="product-actions">
            <button 
              className="btn-add-to-cart-large"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="btn-buy-now"
              onClick={() => {
                handleAddToCart()
                navigate('/products')
              }}
            >
              Buy Now
            </button>
          </div>

          {/* Product Features */}
          <div className="product-features">
            <div className="feature-item">
              <span>✓</span> Free shipping on orders over $50
            </div>
            <div className="feature-item">
              <span>✓</span> 30-day return policy
            </div>
            <div className="feature-item">
              <span>✓</span> Secure payment
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
