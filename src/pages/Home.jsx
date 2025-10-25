import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useApp } from '../context/AppContext'
import { Loading } from '../components/Loading'

// Komponen Home
function Home() {
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const [showDetail, setShowDetail] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef(null)

  const { data: products, loading } = useFetch(
    'https://fakestoreapi.com/products?limit=6'
  )

  const [carouselItems, setCarouselItems] = useState([])

  useEffect(() => {
    if (products) {
      setCarouselItems(products)
    }
  }, [products])

  // Fungsi handleNext
  const handleNext = useCallback(() => {
    setIsAnimating(prevIsAnimating => {
      if (prevIsAnimating) {
        return true;
      }

      setCarouselItems(prevItems => {
        const newItems = [...prevItems]
        const firstItem = newItems.shift()
        newItems.push(firstItem)
        return newItems
      })

      setTimeout(() => setIsAnimating(false), 1500)
      return true;
    });
  }, [])

  // Fungsi handlePrev
  const handlePrev = useCallback(() => {
    setIsAnimating(prevIsAnimating => {
      if (prevIsAnimating) {
        return true;
      }

      setCarouselItems(prevItems => {
        const newItems = [...prevItems]
        const lastItem = newItems.pop()
        newItems.unshift(lastItem)
        return newItems
      })

      setTimeout(() => setIsAnimating(false), 1500)
      return true;
    });
  }, [])

  // Efek untuk autoplay carousel
  useEffect(() => {
    if (showDetail) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    } else {
      intervalRef.current = setInterval(() => {
        handleNext()
      }, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [showDetail, handleNext])

  // Fungsi handleSeeMore
  const handleSeeMore = () => {
    setShowDetail(true)
  }

  // Fungsi handleBack
  const handleBack = () => {
    setShowDetail(false)
  }

  // Fungsi handleAddToCart
  const handleAddToCart = (product) => {
    addToCart(product)
    alert(`${product.title} added to cart!`)
  }

  if (loading) {
    return <Loading message="Loading amazing products..." />
  }

  if (!carouselItems.length) return null

  const activeProduct = carouselItems[1] || carouselItems[0]

  return (
    <div className="home-carousel-page">
      {/* Hero Header */}
      <div className="carousel-hero">
        <h1 className="hero-title">Discover Amazing Products</h1>
        <p className="hero-subtitle">Premium quality at unbeatable prices</p>
      </div>

      {/* 3D Carousel */}
      <div className={`carousel-3d ${showDetail ? 'show-detail' : ''} ${isAnimating ? 'animating' : ''}`}>
        <div className="carousel-list">
          {carouselItems.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item position-${index + 1}`}
            >
              <img src={product.image} alt={product.title} />

              {/* Introduce Section - Visible on 2nd item */}
              {index === 1 && !showDetail && (
                <div className="item-introduce">
                  <div className="intro-label">HOT SALE</div>
                  <div className="intro-title">{product.category}</div>
                  <div className="intro-description">
                    {product.description}
                  </div>
                  <button className="btn-see-more" onClick={handleSeeMore}>
                    SEE MORE ↗
                  </button>
                </div>
              )}

              {/* Detail Section - Visible when showDetail */}
              {index === 1 && showDetail && (
                <div className="item-detail">
                  <div className="detail-title">{product.title}</div>
                  <div className="detail-description">
                    {product.description}
                  </div>

                  <div className="specifications">
                    <div className="spec-item">
                      <p>Category</p>
                      <p>{product.category}</p>
                    </div>
                    <div className="spec-item">
                      <p>Rating</p>
                      <p>⭐ {product.rating?.rate || 0}</p>
                    </div>
                    <div className="spec-item">
                      <p>Reviews</p>
                      <p>{product.rating?.count || 0}</p>
                    </div>
                    <div className="spec-item">
                      <p>Price</p>
                      <p>${product.price}</p>
                    </div>
                  </div>

                  <div className="detail-actions">
                    <button
                      className="btn-add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      ADD TO CART
                    </button>
                    <button
                      className="btn-checkout"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="carousel-arrows">
          <button
            className="arrow-btn"
            id="prev-btn"
            onClick={handlePrev}
            disabled={isAnimating || showDetail}
          >
            &lt;
          </button>
          <button
            className="arrow-btn"
            id="next-btn"
            onClick={handleNext}
            disabled={isAnimating || showDetail}
          >
            &gt;
          </button>
          <button
            className="back-btn"
            onClick={() => navigate('/products')}
            style={{ opacity: showDetail ? 1 : 0 }}
          >
            See All Products ↗
          </button>
        </div>
      </div>


      <section className="features-grid">
        <div className="feature-box">
          <span className="feature-icon">🚚</span>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>

        <div className="feature-box">
          <span className="feature-icon">💳</span>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>

        <div className="feature-box">
          <span className="feature-icon">🔄</span>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>

        <div className="feature-box">
          <span className="feature-icon">⭐</span>
          <h3>Top Quality</h3>
          <p>Premium products only</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Explore Our Full Collection</h2>
        <button
          className="btn-explore"
          onClick={() => navigate('/products')}
        >
          Browse All Products
        </button>
      </section>
    </div>
  )
}

export default Home
