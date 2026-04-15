import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Heart } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useCart } from '../contexts/CartContext'
import whatsapp_img from "../assets/images/whatsapp.png";

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState('specs')
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Gallery states
  const [mainImage, setMainImage] = useState('')
  const [activeThumbIndex, setActiveThumbIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      // Determine images array or fallback to single image
      const images = foundProduct.images?.length
        ? foundProduct.images
        : [foundProduct.image || foundProduct.emojiPlaceholder] // fallback
      setMainImage(images[0])
      setActiveThumbIndex(0)

      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    } else {
      navigate('/products')
    }
  }, [id, navigate])

  // Get images array (safe)
  const getProductImages = () => {
    if (product?.images?.length) return product.images
    if (product?.image) return [product.image]
    return [] // fallback empty
  }

  const images = getProductImages()
  const hasMultipleImages = images.length > 1

  const handleThumbClick = (img, index) => {
    setImageLoading(true)
    setMainImage(img)
    setActiveThumbIndex(index)
    // Simulate transition – you can add a fade effect in CSS
    setTimeout(() => setImageLoading(false), 150)
  }

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <div className="text-4xl mb-4">🕉️</div>
        <p className="text-gray-400">Loading masterpiece...</p>
      </div>
    )
  }

  const priceStr = product.price > 0
    ? `₹${product.price.toLocaleString('en-IN')}`
    : 'Request Quote'

  const handleAddToCart = () => addToCart(product)
  const handleWishlist = () => setIsWishlisted(!isWishlisted)

  const specs = [
    { label: 'Material', value: product.material },
    { label: 'Height', value: product.height },
    { label: 'Finish', value: product.finish },
    { label: 'Weight', value: product.weight },
    { label: 'Category', value: product.category.replace('-', ' ') },
    { label: 'Base Material', value: 'Premium Marble' },
  ]

  const careInstructions = [
    'Wipe with a soft, dry cloth regularly to maintain the natural shine',
    'Avoid direct sunlight exposure for painted surfaces to prevent fading',
    'Do not use chemical cleaners or abrasive materials',
    'For outdoor placement, apply marble sealant annually',
    'Handle with care during transportation and installation',
    'Use a mild soap solution for deep cleaning if necessary',
  ]

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="btn-outline px-4 py-2 rounded-lg text-sm mb-8 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>

        {/* Product Main Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Dynamic Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="zoom-container rounded-2xl overflow-hidden glass h-96 flex items-center justify-center bg-gradient-to-br from-gold/5 to-obsidian-mid/80 relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian/50 z-10">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={mainImage}
                alt={product.name}
                className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setImageLoading(false)}
              />
            </div>

            {/* Thumbnails – dynamic based on available images */}
            {hasMultipleImages && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbClick(img, idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden glass transition-all duration-200 ${
                      activeThumbIndex === idx
                        ? 'ring-2 ring-gold scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* If only one image, show a simple note */}
            {!hasMultipleImages && (
              <div className="flex gap-3 mt-4">
                <div className="flex-1 h-20 rounded-xl glass flex items-center justify-center text-gray-500 text-xs">
                  Only one view available
                </div>
              </div>
            )}

            <p className="text-gray-500 text-xs text-center mt-4">
              * Actual product may vary slightly. Contact us for customizations.
            </p>
          </div>

          {/* Right Column - Product Details (unchanged) */}
          <div className="space-y-6">
            {/* ... same as your existing code ... */}
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase">
                {product.category.replace('-', ' ')}
              </span>
              <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
                {product.name}
              </h1>
              <div className="text-gold font-cinzel text-2xl font-bold mt-4">
                {priceStr}
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed font-cormorant text-lg">
              {product.desc}
            </p>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gold/10 pb-0">
              <button
                onClick={() => setActiveTab('specs')}
                className={`detail-tab ${activeTab === 'specs' ? 'active' : ''}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`detail-tab ${activeTab === 'care' ? 'active' : ''}`}
              >
                Care Guide
              </button>
            </div>

            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, idx) => (
                  <div key={idx} className="glass rounded-xl p-4">
                    <span className="text-gray-500 text-xs">{spec.label}</span>
                    <div className="text-white text-sm mt-1 font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="glass rounded-xl p-6">
                <ul className="space-y-2">
                  {careInstructions.map((instruction, idx) => (
                    <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="btn-gold px-8 py-4 rounded-xl font-cinzel text-sm tracking-wider flex-1 sm:flex-none"
              >
                {product.price > 0 ? 'Add to Cart' : 'Request Quote'}
              </button>
              <button
                onClick={handleWishlist}
                className={`btn-outline px-6 py-4 rounded-xl text-sm font-medium inline-flex items-center gap-2 flex-1 sm:flex-none justify-center transition-all ${
                  isWishlisted ? 'text-red-500 border-red-500' : ''
                }`}
              >
                <Heart size={16} className={isWishlisted ? 'fill-red-500' : ''} />
                {isWishlisted ? 'Saved' : 'Save'}
              </button>
              <a
                href={`https://wa.me/919672232736?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-6 py-4 rounded-xl text-sm font-medium inline-flex items-center gap-2 justify-center"
              >
                <img
  src={whatsapp_img}
  alt="WhatsApp"
  className="w-6 h-6"
/> WhatsApp
              </a>
              <a
                href="tel:+919672232736"
                className="btn-outline px-6 py-4 rounded-xl text-sm font-medium inline-flex items-center gap-2 justify-center"
              >
                <Phone size={16} /> Call
              </a>
            </div>

            <div className="glass rounded-xl p-4 mt-4">
              <p className="text-gray-500 text-xs text-center">
                ✨ Free shipping on orders above ₹50,000 • 100% secure packaging • Pan India delivery
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h3 className="font-cinzel text-2xl font-bold text-white mb-8">
              Related Masterpieces
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, idx) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} delay={idx * 0.1} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* Your existing styles plus a fade transition */
        .zoom-container img {
          transition: opacity 0.3s ease;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Keep all existing styles (glass, btn-gold, etc.) */
      `}</style>
    </section>
  )
}

export default ProductDetail