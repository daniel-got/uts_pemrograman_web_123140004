import { Link } from 'react-router-dom'
import './style/Footer.css'
import logoImage from '../assets/favicon/android-chrome-512x512.png'


// Komponen Footer
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Kolom 1: About */}
        <div className="footer-column">
          <img src={logoImage} alt="ShooLux Logo" className="navbar-logo" width="104.5" height="40.5" />
          <p>
            Your one-stop shop for premium quality products at unbeatable prices.
          </p>
        </div>

        {/* Kolom 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Follow Us */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul className="footer-socials">
            <li><a href="https://github.com/daniel-got/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className="footer-bottom-bar">
        <hr />
        <p>© {currentYear} ShooLux. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
