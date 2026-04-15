import { createContext, useContext, useReducer, useEffect } from 'react'

// Create Context
const CartContext = createContext()

// Initial state
const initialState = {
  items: []
}

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, qty: item.qty + 1 }
            : item
        )
        return { ...state, items: updatedItems }
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, qty: 1 }]
        }
      }
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, qty } = action.payload
      if (qty < 1) return state
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, qty } : item
        )
      }
    }
    
    case 'CLEAR_CART': {
      return { ...state, items: [] }
    }
    
    case 'LOAD_CART': {
      return { ...state, items: action.payload }
    }
    
    default:
      return state
  }
}

// Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('saraswati_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('saraswati_cart', JSON.stringify(state.items))
  }, [state.items])
  
  // Action creators
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }
  
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }
  
  const updateQuantity = (id, qty) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, qty } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  // Derived state
  const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.qty), 0)
  
  const value = {
    cart: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext