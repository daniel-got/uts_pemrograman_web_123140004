import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist.</p>
        
        <div className="not-found-actions">
          <button 
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>

        <div className="not-found-illustration">
          🔍 🛒 ❌
        </div>
      </div>
    </div>
  )
}

export default NotFound
