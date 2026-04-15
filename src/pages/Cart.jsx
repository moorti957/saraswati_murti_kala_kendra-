import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../components/Toast'

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const { showToast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleUpdateQty = (id, currentQty, delta) => {
    const newQty = currentQty + delta
    if (newQty >= 1) {
      updateQty(id, newQty)
    }
  }

  const handleRemoveItem = (id, name) => {
    removeFromCart(id)
    showToast(`${name} removed from cart`, 'info')
  }

  const handleClearCart = () => {
    if (cart.length > 0) {
      clearCart()
      showToast('Cart cleared', 'info')
    }
  }

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return

    setIsCheckingOut(true)

    // Create order summary message
    let message = "🛕 *Saraswati Murti Kala Kendra* 🛕\n\n"
    message += "*Order Details:*\n"
    cart.forEach((item, idx) => {
      const priceStr = item.price > 0 ? `₹${(item.price * item.qty).toLocaleString('en-IN')}` : 'Quote required'
      message += `${idx + 1}. ${item.name} x ${item.qty} = ${priceStr}\n`
    })
    message += `\n*Total Items:* ${totalItems}\n`
    message += `*Total Amount:* ₹${totalPrice.toLocaleString('en-IN')}\n\n`
    message += "Please share shipping details and confirm availability."
    message += "\n\n🙏 Thank you for choosing us!"

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/919672232736?text=${encodedMessage}`, '_blank')

    setIsCheckingOut(false)
  }

  if (cart.length === 0) {
    return (
      <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Your Cart</h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
          </div>
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="font-cinzel text-xl text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Explore our divine collection of marble masterpieces</p>
            <Link to="/products" className="btn-gold px-6 py-3 rounded-xl font-cinzel text-sm inline-flex items-center gap-2">
              Browse Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Your Cart</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="glass rounded-2xl p-5 flex flex-wrap sm:flex-nowrap items-center gap-4">
                {/* Product Emoji/Image */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gold/10">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-cinzel text-white text-sm font-semibold truncate">{item.name}</h4>
                  <p className="text-gray-500 text-xs">{item.height} • {item.material.split(' ')[0]}</p>
                  <p className="text-gold font-cinzel font-bold text-sm mt-1">
                    {item.price > 0 ? `₹${item.price.toLocaleString('en-IN')}` : 'Custom Quote'}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty, -1)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-white text-sm w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty, 1)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right min-w-[80px]">
                  <p className="text-white font-semibold text-sm">
                    {item.price > 0 ? `₹${(item.price * item.qty).toLocaleString('en-IN')}` : '—'}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.id, item.name)}
                  className="text-gray-500 hover:text-red-400 transition-colors p-2"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClearCart}
                className="text-gray-500 hover:text-red-400 text-sm transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} /> Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-28">
              <h3 className="font-cinzel text-gold text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-white font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Shipping</span>
                  <span className="text-gray-400 text-sm">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">GST (18%)</span>
                  <span className="text-gray-400 text-sm">Included in price</span>
                </div>
              </div>

              <div className="gold-line my-4"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-semibold">Total</span>
                <span className="text-gold font-cinzel text-xl font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="text-xs text-gray-500 text-center mb-4">
                * Free shipping on orders above ₹50,000
              </div>

              <button
                onClick={handleWhatsAppOrder}
                disabled={isCheckingOut}
                className="btn-gold w-full py-4 rounded-xl font-cinzel text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                {isCheckingOut ? 'Processing...' : 'Order via WhatsApp'}
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                We'll confirm availability and shipping details on WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mt-8">
          <Link to="/products" className="text-gold text-sm hover:underline inline-flex items-center gap-1">
            ← Continue Shopping
          </Link>
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
        .glass:hover {
          border-color: rgba(212,175,55,0.3);
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
        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
      `}</style>
    </section>
  )
}

export default Cart