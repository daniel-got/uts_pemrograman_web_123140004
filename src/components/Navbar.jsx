import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './style/Navbar.css'
import logoImage from '../assets/favicon/android-chrome-512x512.png'
function Navbar() {
  const { state, toggleTheme } = useApp()
  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0)
  
  // State untuk hamburger menu
  const [isOpen, setIsOpen] = useState(false)

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close menu ketika link diklik
  const closeMenu = () => {
    setIsOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  const handleTheme = () => {
    toggleTheme()
    closeMenu()
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" onClick={closeMenu}>
            <img src={logoImage} alt="ShooLux Logo" className="navbar-logo" width="163" height="35" />
          </NavLink>
        </div>
        
        {/* Hamburger Icon */}
        <div 
          className={`hamburger ${isOpen ? 'toggle' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          role="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Navigation Links - Full Screen Overlay */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li className={isOpen ? 'fade' : ''}>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className={isOpen ? 'fade' : ''}>
            <NavLink 
              to="/products"
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={closeMenu}
            >
              Products
            </NavLink>
          </li>
              <li className={isOpen ? 'fade' : ''}>
            <NavLink 
              to="/contact"
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>

          <li className={isOpen ? 'fade' : ''}>
            <NavLink to="/cart" 
              className="cart-button" 
              onClick={closeMenu}>
              Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </NavLink>
          </li>
          
          <li className={isOpen ? 'fade' : ''}>
            <button className="theme-toggle-btn" onClick={handleTheme}>
              {state.theme==='dark' ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
