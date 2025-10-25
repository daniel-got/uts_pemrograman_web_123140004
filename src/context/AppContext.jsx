import { createContext, useContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext()

// Reducer function untuk manage state
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Cek apakah item sudah ada di cart
      const existingItem = state.cart.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      }

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      }

    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload
      }

    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      return {
        ...state,
        theme: newTheme
      }

    default:
      return state
  }
}

// Initial state
const initialState = {
  cart: [],
  searchTerm: '',
  selectedCategory: 'all',
  theme: 'dark'
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    if (state.theme==='light') {
      document.documentElement.classList.add('light-mode')
    }else{
      document.documentElement.classList.remove('light-mode')
    }
  }, [state.theme])

  // Helper functions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term })
  }

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category })
  }

  const toggleTheme = () => {
    dispatch({type: 'TOGGLE_THEME'})
  }

  // Calculate cart total
  const cartTotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const value = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    clearCart,
    setSearchTerm,
    setCategory,
    cartTotal,
    toggleTheme
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// Custom hook untuk menggunakan context
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export default AppContext
