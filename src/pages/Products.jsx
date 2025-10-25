import { useState, useEffect, useMemo, useCallback } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { Loading, ErrorMessage } from '../components/Loading'
import './style/Products.css'

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { state } = useApp()
  
  // Fetch products
  const { 
    data: products, 
    loading: productsLoading, 
    error: productsError,
    refetch: refetchProducts
  } = useFetch('https://fakestoreapi.com/products')
  
  // Fetch categories
  const { data: categories, loading: categoriesLoading } = useFetch(
    'https://fakestoreapi.com/products/categories'
  )

  // useCallback untuk handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query.toLowerCase())
  }, [])

  // useCallback untuk handle category change
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  // useMemo untuk filter products
  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      )
    }

    return filtered
  }, [products, selectedCategory, searchQuery])

  // Loading state
  if (productsLoading || categoriesLoading) {
    return <Loading message="Loading products..." />
  }

  // Error state
  if (productsError) {
    return (
      <ErrorMessage 
        message={productsError} 
        onRetry={refetchProducts}
      />
    )
  }

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      {/* Search & Filter Section */}
      <div className="products-controls">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search products..."
        />

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories?.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Count */}
      <div className="products-info">
        <p>
          Showing {filteredProducts.length} of {products?.length || 0} products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
          <button 
            className="btn-secondary"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
