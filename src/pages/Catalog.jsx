import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Grid, List, SlidersHorizontal, Search, Trash2, RotateCcw, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Catalog = () => {
  const { products, searchQuery, setSearchQuery, wishlist, compareList, toggleCompare, addToCart } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState(200);
  const [selectedRating, setSelectedRating] = useState(null);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // newest, price-low, price-high, rating
  const [layoutMode, setLayoutMode] = useState('grid'); // grid, list

  // View state filter overrides
  const [activeFilter, setActiveFilter] = useState('all'); // all, wishlist, compare

  // Handle URL parameters
  useEffect(() => {
    const catParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const filterParam = searchParams.get('filter');

    if (catParam) setSelectedCategory(catParam);
    if (searchParam) setSearchQuery(searchParam);
    if (filterParam) setActiveFilter(filterParam);
  }, [searchParams]);

  // Synchronize activeFilter parameter change
  const handleActiveFilterChange = (mode) => {
    setActiveFilter(mode);
    setSearchParams(mode === 'all' ? {} : { filter: mode });
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setPriceRange(200);
    setSelectedRating(null);
    setOnlyInStock(false);
    setSearchQuery('');
    setSearchParams({});
    setActiveFilter('all');
  };

  // Filter & Sort Logic
  const getFilteredProducts = () => {
    let result = [...products];

    // Filter by wishlist view override
    if (activeFilter === 'wishlist') {
      return wishlist;
    }

    // Filter by compare view override
    if (activeFilter === 'compare') {
      return compareList;
    }

    // Search query matching (name, category, descriptions, colors)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.colors.some((col) => col.name.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Color
    if (selectedColor) {
      result = result.filter((p) => p.colors.some((col) => col.name === selectedColor));
    }

    // Size
    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Max Price
    result = result.filter((p) => p.price <= priceRange);

    // Min Rating
    if (selectedRating) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Availability
    if (onlyInStock) {
      result = result.filter((p) => p.stock > 5); // Low stock (<=5) acts as limited/out
    }

    // Sort operations
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id); // higher IDs are new additions
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="container py-5">
      {/* HEADER SECTION */}
      <div className="row mb-5 align-items-end">
        <div className="col-md-6">
          <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>FluxRun Showroom</span>
          <h1 className="fw-bold mb-1 font-display text-uppercase">
            {activeFilter === 'wishlist' ? 'Your Wishlist' : activeFilter === 'compare' ? 'Shoe Comparison' : 'FLUX CATALOG'}
          </h1>
          <p className="text-muted mb-0">
            {activeFilter === 'wishlist' 
              ? `You have saved ${wishlist.length} performance shoes.` 
              : activeFilter === 'compare' 
              ? 'Compare specifications and metrics side by side.' 
              : `Showing ${filteredProducts.length} premium athletic shoes.`}
          </p>
        </div>

        {/* Tab Buttons for Views */}
        <div className="col-md-6 d-flex justify-content-md-end gap-2 mt-3 mt-md-0">
          <button 
            onClick={() => handleActiveFilterChange('all')}
            className={`btn btn-sm rounded-pill px-4 py-2 small fw-bold font-monospace text-uppercase transition-all border ${activeFilter === 'all' ? 'bg-dark text-white border-dark' : 'bg-white text-secondary'}`}
          >
            All Products
          </button>
          <button 
            onClick={() => handleActiveFilterChange('wishlist')}
            className={`btn btn-sm rounded-pill px-4 py-2 small fw-bold font-monospace text-uppercase transition-all border ${activeFilter === 'wishlist' ? 'bg-danger text-white border-danger' : 'bg-white text-secondary'}`}
          >
            Wishlist ({wishlist.length})
          </button>
          <button 
            onClick={() => handleActiveFilterChange('compare')}
            className={`btn btn-sm rounded-pill px-4 py-2 small fw-bold font-monospace text-uppercase transition-all border ${activeFilter === 'compare' ? 'bg-info text-dark border-info' : 'bg-white text-secondary'}`}
          >
            Compare ({compareList.length})
          </button>
        </div>
      </div>

      {/* SEARCH AND GRID ACTION PANEL */}
      {activeFilter === 'all' && (
        <div className="row mb-4 align-items-center g-3">
          {/* Quick Search */}
          <div className="col-md-6 col-lg-4">
            <div className="input-group glass-panel" style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              padding: '2px 8px'
            }}>
              <span className="input-group-text bg-transparent border-0 text-muted"><Search size={18} /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="form-control bg-transparent border-0 shadow-none py-2"
                style={{ fontSize: '14px' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="btn bg-transparent border-0 text-muted">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Result Tag Summary */}
          <div className="col-md-6 col-lg-4 d-flex flex-wrap gap-2 align-items-center">
            {selectedCategory && (
              <span className="badge bg-light text-dark border p-2 d-flex align-items-center gap-1 rounded-pill small">
                {selectedCategory}
                <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory(null)} />
              </span>
            )}
            {selectedColor && (
              <span className="badge bg-light text-dark border p-2 d-flex align-items-center gap-1 rounded-pill small">
                {selectedColor}
                <X size={12} className="cursor-pointer" onClick={() => setSelectedColor(null)} />
              </span>
            )}
            {selectedSize && (
              <span className="badge bg-light text-dark border p-2 d-flex align-items-center gap-1 rounded-pill small">
                Size {selectedSize}
                <X size={12} className="cursor-pointer" onClick={() => setSelectedSize(null)} />
              </span>
            )}
          </div>

          {/* Layout Mode & Sorting Dropdown */}
          <div className="col-12 col-md-12 col-lg-4 d-flex justify-content-lg-end align-items-center gap-3">
            <div className="d-flex align-items-center gap-1">
              <span className="small text-muted font-monospace text-uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select bg-white border border-light shadow-sm rounded-pill py-2 px-3 small font-semibold cursor-pointer"
                style={{ width: '180px', fontSize: '13px' }}
              >
                <option value="newest">Newest Drop</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CATALOG PANEL */}
      {activeFilter === 'compare' ? (
        /* COMPARISON TABLE VIEW */
        compareList.length === 0 ? (
          <div className="text-center py-5 glass-panel" style={{ backgroundColor: '#ffffff' }}>
            <Info size={48} className="text-muted mb-3" />
            <h4 className="fw-bold">No Shoes to Compare</h4>
            <p className="text-muted">Click the compare icon on product cards in the catalog to select shoes.</p>
            <button onClick={() => handleActiveFilterChange('all')} className="btn btn-flux-primary btn-sm rounded-pill px-4 mt-2">Go to Catalog</button>
          </div>
        ) : (
          <div className="table-responsive glass-panel p-4" style={{ backgroundColor: '#ffffff', borderRadius: '24px' }}>
            <table className="table table-bordered align-middle text-center mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '200px' }} className="text-start">Metric / Specs</th>
                  {compareList.map((p) => (
                    <th key={p.id}>
                      <div className="d-flex flex-column align-items-center gap-2 p-2">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          style={{ width: '80px', height: '60px', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                        />
                        <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: '160px' }}>{p.name}</h6>
                        <button 
                          onClick={() => toggleCompare(p)} 
                          className="btn btn-link text-danger p-0 small text-decoration-none d-flex align-items-center gap-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Price</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="h5 fw-bold text-primary font-monospace">${p.price}</td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Category</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="small"><span className="badge bg-dark rounded-pill px-3 py-2">{p.category}</span></td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Rating</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="small fw-semibold">{p.rating} ★ ({p.reviewCount} reviews)</td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Weight</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="small">{p.specifications["Weight"] || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Heel Drop</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="small">{p.specifications["Heel-to-Toe Drop"] || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Cushioning</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="small">{p.specifications["Cushioning"] || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Best For</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="small">{p.specifications["Best For"] || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="fw-bold text-start text-uppercase tracking-wider small">Action</td>
                  {compareList.map((p) => (
                    <td key={p.id}>
                      <button 
                        onClick={() => addToCart(p, p.colors[0], p.sizes[0], 1)}
                        className="btn btn-flux-primary btn-sm rounded-pill font-monospace"
                      >
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )
      ) : activeFilter === 'wishlist' ? (
        /* WISHLIST COLLECTION GRID */
        wishlist.length === 0 ? (
          <div className="text-center py-5 glass-panel" style={{ backgroundColor: '#ffffff' }}>
            <Info size={48} className="text-muted mb-3" />
            <h4 className="fw-bold">Your Wishlist is Empty</h4>
            <p className="text-muted">Save your favorite styles while browsing the catalog by clicking the heart button.</p>
            <button onClick={() => handleActiveFilterChange('all')} className="btn btn-flux-primary btn-sm rounded-pill px-4 mt-2">Explore Shoes</button>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )
      ) : (
        /* STANDARD CATALOG WITH SIDEBAR FILTERS */
        <div className="row g-4">
          {/* Filter Sidebar (Desktop) */}
          <div className="col-lg-3 d-none d-lg-block">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product Grid Panel */}
          <div className="col-lg-9">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-5 glass-panel"
                  style={{ backgroundColor: '#ffffff', borderRadius: '24px' }}
                >
                  <RotateCcw size={48} className="text-muted mb-3" />
                  <h4 className="fw-bold">No Shoes Found</h4>
                  <p className="text-muted">No shoes matched your current criteria. Try loosening your price limit or sizing filters.</p>
                  <button onClick={handleResetFilters} className="btn btn-flux-primary btn-sm rounded-pill px-4 mt-2">Reset All Filters</button>
                </motion.div>
              ) : (
                <motion.div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
