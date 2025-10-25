import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import './style/Cart.css'

// Komponen Halaman Cart
function Cart() {
  const { state, removeFromCart, cartTotal } = useApp()
  const { cart } = state

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>You seem dont add any products yet.</p>
        <Link to="/products" className="btn-explore">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        {/* Daftar Item */}
        <div className="cart-item-list">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Ringkasan Total */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn-explore checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
