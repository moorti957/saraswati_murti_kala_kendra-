import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '../components/Toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([]) // reactive wishlist state

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('saraswati_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
    setLoading(false)
  }, [])

  // Load wishlist whenever user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`saraswati_wishlist_${user.id}`)
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
    } else {
      setWishlist([])
    }
  }, [user])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`saraswati_wishlist_${user.id}`, JSON.stringify(wishlist))
    }
  }, [wishlist, user])

  const signup = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem('saraswati_users') || '[]')
        if (existingUsers.find(u => u.email === email)) {
          reject('Email already registered')
          return
        }
        const newUser = { id: Date.now(), name, email, createdAt: new Date().toISOString() }
        existingUsers.push({ ...newUser, password })
        localStorage.setItem('saraswati_users', JSON.stringify(existingUsers))

        // Initialize empty wishlist & orders
        localStorage.setItem(`saraswati_wishlist_${newUser.id}`, JSON.stringify([]))
        localStorage.setItem(`saraswati_orders_${newUser.id}`, JSON.stringify([]))

        setUser(newUser)
        localStorage.setItem('saraswati_user', JSON.stringify(newUser))
        showToast(`Welcome ${newUser.name}! Your account has been created.`, 'success')
        resolve(newUser)
      }, 800)
    })
  }

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('saraswati_users') || '[]')
        const found = users.find(u => u.email === email && u.password === password)
        if (!found) {
          reject('Invalid email or password')
          return
        }
        const { password: _, ...userWithoutPassword } = found
        setUser(userWithoutPassword)
        localStorage.setItem('saraswati_user', JSON.stringify(userWithoutPassword))
        showToast(`Welcome back, ${userWithoutPassword.name}!`, 'success')
        resolve(userWithoutPassword)
      }, 800)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('saraswati_user')
    showToast('Logged out successfully', 'info')
  }

  // Wishlist actions (reactive)
  const addToWishlist = (product) => {
    if (!user) {
      showToast('Please login to add items to wishlist', 'info')
      return false
    }
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product])
      showToast(`${product.name} added to wishlist ❤️`, 'success')
      return true
    }
    return false
  }

  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId)
    if (product) {
      setWishlist(prev => prev.filter(item => item.id !== productId))
      showToast(`${product.name} removed from wishlist ❌`, 'info')
      return true
    }
    return false
  }

  const toggleWishlist = (product) => {
    if (!user) {
      showToast('Please login to manage wishlist', 'info')
      return false
    }
    const exists = wishlist.some(item => item.id === product.id)
    if (exists) {
      removeFromWishlist(product.id)
      return false
    } else {
      addToWishlist(product)
      return true
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  // Orders (simplified)
  const getOrders = () => {
    if (!user) return []
    const orders = localStorage.getItem(`saraswati_orders_${user.id}`)
    return orders ? JSON.parse(orders) : []
  }

  const addOrder = (order) => {
    if (!user) return
    const orders = getOrders()
    const newOrders = [order, ...orders]
    localStorage.setItem(`saraswati_orders_${user.id}`, JSON.stringify(newOrders))
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
    wishlist,           // reactive array
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getOrders,
    addOrder
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}