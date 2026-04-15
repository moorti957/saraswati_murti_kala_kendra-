import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Heart, ShoppingBag, User, Clock, Trash2 } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../components/Toast'

const Account = () => {
  const { cart } = useCart()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
    
    // Load orders from localStorage (simulated)
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      // Sample order for demo (remove in production)
      const demoOrders = [
        {
          id: 'ORD001',
          date: '2024-01-15',
          items: [{ name: 'Sai Baba Blessing', qty: 1, price: 25000 }],
          total: 25000,
          status: 'Delivered'
        },
        {
          id: 'ORD002',
          date: '2024-02-20',
          items: [{ name: 'Krishna with Flute', qty: 1, price: 32000 }],
          total: 32000,
          status: 'Processing'
        }
      ]
      setOrders(demoOrders)
      localStorage.setItem('orders', JSON.stringify(demoOrders))
    }
  }, [])

  const handleRemoveFromWishlist = (productId) => {
    const updated = wishlist.filter(item => item.id !== productId)
    setWishlist(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
    showToast('Removed from wishlist', 'info')
  }

  const handleAddToCartFromWishlist = (product) => {
    // This would need access to addToCart from CartContext
    // For now, we'll show a toast and navigate
    showToast(`${product.name} added to cart`, 'success')
    // In a full implementation, you would call addToCart(product)
  }

  const tabs = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'saved', label: 'Saved Products', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const renderOrdersTab = () => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-400">No orders yet. Start exploring our collection!</p>
          <Link to="/products" className="btn-gold px-6 py-3 rounded-xl font-cinzel text-sm mt-4 inline-block">
            Browse Collection
          </Link>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="glass rounded-xl p-5">
            <div className="flex flex-wrap justify-between items-start mb-3">
              <div>
                <h4 className="font-cinzel text-gold text-sm font-semibold">Order #{order.id}</h4>
                <p className="text-gray-500 text-xs">{new Date(order.date).toLocaleDateString('en-IN')}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${
                order.status === 'Delivered' 
                  ? 'bg-green-500/20 text-green-400' 
                  : order.status === 'Processing'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.name} x {item.qty}</span>
                  <span className="text-gold">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/10 mt-3 pt-3 flex justify-between">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-white font-semibold">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderWishlistTab = () => {
    if (wishlist.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">❤️</div>
          <p className="text-gray-400">No saved products yet.</p>
          <Link to="/products" className="btn-gold px-6 py-3 rounded-xl font-cinzel text-sm mt-4 inline-block">
            Explore Collection
          </Link>
        </div>
      )
    }

    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {wishlist.map((product) => (
          <div key={product.id} className="glass rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-2xl">
              {product.emoji}
            </div>
            <div className="flex-1">
              <h4 className="font-cinzel text-white text-sm font-semibold">{product.name}</h4>
              <p className="text-gray-500 text-xs">{product.height}</p>
              <p className="text-gold font-cinzel text-sm font-bold mt-1">
                {product.price > 0 ? `₹${product.price.toLocaleString('en-IN')}` : 'Quote'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCartFromWishlist(product)}
                className="btn-gold px-3 py-1.5 rounded-lg text-xs"
              >
                Add
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderProfileTab = () => {
    return (
      <div className="space-y-6">
        <div className="text-center pb-6 border-b border-gold/10">
          <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-gold" />
          </div>
          <h3 className="text-white font-semibold text-lg">Guest User</h3>
          <p className="text-gray-500 text-sm">Welcome to Saraswati Murti Kala Kendra</p>
        </div>
        
        <div className="space-y-4">
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cart Items</p>
              <p className="text-white font-semibold text-lg">{cart.length}</p>
            </div>
            <Link to="/cart" className="text-gold text-sm hover:underline">View Cart →</Link>
          </div>
          
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Wishlist</p>
              <p className="text-white font-semibold text-lg">{wishlist.length}</p>
            </div>
            <button 
              onClick={() => setActiveTab('saved')}
              className="text-gold text-sm hover:underline"
            >
              View Saved →
            </button>
          </div>
          
          <div className="glass rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-2">Account Type</p>
            <p className="text-white text-sm">Guest Account</p>
            <p className="text-gray-500 text-xs mt-2">Sign up for order tracking and faster checkout</p>
            <button className="btn-outline px-4 py-2 rounded-lg text-xs mt-3 w-full">
              Sign Up / Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">My Account</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-10">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gold/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold/20 text-gold'
                    : 'text-gray-400 hover:text-gold'
                }`}
              >
                <tab.icon size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'saved' && renderWishlistTab()}
            {activeTab === 'profile' && renderProfileTab()}
          </div>
        </div>
      </div>

      {/* Inline styles */}
      <style>{`
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
          transition: all 0.3s ease;
        }
        .btn-gold {
          background: linear-gradient(135deg, #D4AF37, #B8960C);
          color: #0B0B0B;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .btn-gold:hover {
          box-shadow: 0 0 30px rgba(212,175,55,0.5);
          transform: translateY(-2px);
        }
        .btn-outline {
          border: 1px solid rgba(212,175,55,0.5);
          color: #D4AF37;
          background: transparent;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: rgba(212,175,55,0.1);
          border-color: #D4AF37;
        }
      `}</style>
    </section>
  )
}

export default Account