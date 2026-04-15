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

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('saraswati_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
    setLoading(false)
  }, [])

  const signup = async (name, email, password, phone) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem('saraswati_users') || '[]')
        if (existingUsers.find(u => u.email === email)) {
          reject('Email already registered')
          return
        }
        const newUser = { id: Date.now(), name, email, phone, createdAt: new Date().toISOString() }
        existingUsers.push({ ...newUser, password }) // In real app, hash password
        localStorage.setItem('saraswati_users', JSON.stringify(existingUsers))
        
        // Auto login after signup
        setUser(newUser)
        localStorage.setItem('saraswati_user', JSON.stringify(newUser))
        showToast('Account created successfully!', 'success')
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

  const value = { user, loading, signup, login, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}