import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const ProductCard = ({ product, delay = 0 }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const priceStr = product.price > 0 
    ? `₹${product.price.toLocaleString('en-IN')}` 
    : 'Get Quote'

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    // You can also trigger a toast notification here if you have a toast context
  }

  const handleSaveWishlist = (e) => {
    e.stopPropagation()
    // Implement wishlist functionality if needed
    alert('Added to wishlist ❤️')
  }

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
      onClick={handleViewDetails}
    >
      {/* Image / Emoji Container */}
      <div className="product-img-wrap h-48 sm:h-56 flex items-center justify-center bg-black">
  <img
  src={product.images ? product.images[0] : product.image}
  alt={product.name}
  className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
/>
</div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-cinzel text-white font-semibold text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
          <button 
            onClick={handleSaveWishlist}
            className="text-gray-500 hover:text-gold transition-colors flex-shrink-0"
            aria-label={`Save ${product.name}`}
          >
            <Heart size={16} />
          </button>
        </div>

        <p className="text-gray-500 text-xs capitalize mb-3">
          {product.category.replace('-', ' ')} • {product.height}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gold font-cinzel font-bold">
            {priceStr}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handleViewDetails}
              className="btn-outline px-3 py-1.5 rounded-lg text-xs font-medium"
            >
              View
            </button>
            <button 
              onClick={handleAddToCart}
              className="btn-gold px-3 py-1.5 rounded-lg text-xs font-medium"
            >
              {product.price > 0 ? 'Add' : 'Enquire'}
            </button>
          </div>
        </div>
      </div>

      {/* Inline styles for animations (if not in global CSS) */}
      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212,175,55,0.12);
          transition: all 0.4s ease;
        }
        .glass-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(212,175,55,0.35);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1);
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
          box-shadow: 0 0 20px rgba(212,175,55,0.2);
        }
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ProductCard