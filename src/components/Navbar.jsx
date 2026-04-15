import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, LogOut, UserCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/images/images-Photoroom.png'
import { motion } from "framer-motion"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Collection' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-obsidian/95 backdrop-blur-xl border-b border-gold/20'
          : 'bg-obsidian/85 backdrop-blur-xl border-b border-gold/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-gold-dark animate-pulse-gold">
              <img 
                src={logo} 
                alt="logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-cinzel text-gold text-sm font-bold tracking-wider">
                Saraswati Murti
              </div>
              <div className="text-[10px] text-gold-light tracking-[0.3em] uppercase opacity-70">
                Kala Kendra
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm font-medium tracking-wide cursor-pointer transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(link.path)
                    ? 'text-gold after:w-full'
                    : 'text-gray-400 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Button */}
            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gold transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-obsidian text-xs font-bold flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Account / User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="p-2 text-gray-400 hover:text-gold transition-colors flex items-center gap-1">
                    <UserCircle size={20} />
                    <span className="hidden sm:inline text-sm font-medium">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>
                </motion.div>
                <div className="absolute right-0 mt-2 w-48 glass rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-gold hover:bg-white/5 transition-colors"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gold hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="w-5 h-5 text-gray-400 hover:text-gold transition-colors" />
                </motion.div>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 flex flex-col gap-4 border-t border-gold/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-gray-300 hover:text-gold transition-colors font-medium py-2 ${
                isActive(link.path) ? 'text-gold' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile auth links */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-gold transition-colors font-medium py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-gold transition-colors font-medium py-2"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left text-gray-300 hover:text-gold transition-colors font-medium py-2 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.3); }
          50% { box-shadow: 0 0 40px rgba(212,175,55,0.6); }
        }
        .animate-pulse-gold {
          animation: pulse-gold 3s infinite;
        }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
        }
      `}</style>
    </nav>
  )
}

export default Navbar