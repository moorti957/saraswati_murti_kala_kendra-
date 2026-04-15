import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [priceSort, setPriceSort] = useState('default')
  const [filteredProducts, setFilteredProducts] = useState([])

  // Size options
  const sizeOptions = [
    { value: 'all', label: 'All Sizes' },
    { value: 'small', label: 'Small (6-12 inch)' },
    { value: 'medium', label: 'Medium (12-24 inch)' },
    { value: 'large', label: 'Large (24-48 inch)' },
    { value: 'xlarge', label: 'Extra Large (48+ inch)' },
  ]

  // Sort options
  const sortOptions = [
    { value: 'default', label: 'Sort by Price' },
    { value: 'low', label: 'Low to High' },
    { value: 'high', label: 'High to High' },
  ]

  // Initialize category from URL query param
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [searchParams])

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Filter by size
    if (sizeFilter !== 'all') {
      result = result.filter(p => p.size === sizeFilter)
    }

    // Sort by price (custom items have price 0, they go to end for low sort, beginning for high sort)
    if (priceSort === 'low') {
      result.sort((a, b) => {
        if (a.price === 0 && b.price === 0) return 0
        if (a.price === 0) return 1
        if (b.price === 0) return -1
        return a.price - b.price
      })
    } else if (priceSort === 'high') {
      result.sort((a, b) => {
        if (a.price === 0 && b.price === 0) return 0
        if (a.price === 0) return 1
        if (b.price === 0) return -1
        return b.price - a.price
      })
    }

    setFilteredProducts(result)
  }, [activeCategory, sizeFilter, priceSort])

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    // Update URL query param
    if (categoryId === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', categoryId)
    }
    setSearchParams(searchParams)
  }

  const handleSizeChange = (e) => {
    setSizeFilter(e.target.value)
  }

  const handleSortChange = (e) => {
    setPriceSort(e.target.value)
  }

  const clearFilters = () => {
    setActiveCategory('all')
    setSizeFilter('all')
    setPriceSort('default')
    searchParams.delete('category')
    setSearchParams(searchParams)
  }

  return (
    <section className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">Our Collection</span>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white">
            Marble Masterpieces
          </h1>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {/* <button
            onClick={() => handleCategoryChange('all')}
            className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
          >
            All
          </button> */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Size and Sort Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <select
            value={sizeFilter}
            onChange={handleSizeChange}
            className="glass rounded-lg px-4 py-2 text-sm text-gray-300 bg-transparent cursor-pointer border border-gold/20 focus:border-gold/50 focus:outline-none"
          >
            {sizeOptions.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: '#1A1A1A' }}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={priceSort}
            onChange={handleSortChange}
            className="glass rounded-lg px-4 py-2 text-sm text-gray-300 bg-transparent cursor-pointer border border-gold/20 focus:border-gold/50 focus:outline-none"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: '#1A1A1A' }}>
                {opt.label}
              </option>
            ))}
          </select>

          {(activeCategory !== 'all' || sizeFilter !== 'all' || priceSort !== 'default') && (
            <button
              onClick={clearFilters}
              className="text-gold text-sm hover:underline px-3"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No statues found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="btn-gold px-6 py-3 rounded-xl font-cinzel text-sm mt-6"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="text-right text-gray-500 text-sm mb-4">
              Showing {filteredProducts.length} of {products.length} masterpieces
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} delay={idx * 0.05} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Inline styles (if not already in global CSS) */}
      <style>{`
        .filter-chip {
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,0.3);
          color: #999;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          background: transparent;
        }
        .filter-chip:hover {
          background: rgba(212,175,55,0.15);
          border-color: #D4AF37;
          color: #D4AF37;
        }
        .filter-chip.active {
          background: rgba(212,175,55,0.15);
          border-color: #D4AF37;
          color: #D4AF37;
        }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.15);
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
      `}</style>
    </section>
  )
}

export default Products