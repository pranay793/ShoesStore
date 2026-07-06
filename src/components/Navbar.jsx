import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, BarChart3, Search, User, X, ChevronDown, Trash2, Plus, Minus
} from 'lucide-react';

export const Navbar = () => {
  const { 
    cart, wishlist, compareList, getSubtotal, removeFromCart, updateCartQuantity,
    searchQuery, setSearchQuery 
  } = useContext(ShopContext);

  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    navigate('/catalog');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <header className="sticky-top" style={{ zIndex: 1040 }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-2 px-md-5" style={{
          background: 'rgba(17, 17, 17, 0.9) !important',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div className="container-fluid">
            {/* Brand Logo Integration */}
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <motion.img
                whileHover={{ scale: 1.03 }}
                src="/logo.png"
                alt="FluxRun Logo"
                style={{
                  height: '64px',
                  objectFit: 'contain',
                  filter: 'invert(1) hue-rotate(180deg)'
                }}
              />
            </Link>

            {/* Mobile Toggler */}
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
              <ul className="navbar-nav mx-auto gap-4">
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => `nav-link nav-link-animated fw-semibold text-white px-2 ${isActive ? 'active-nav-link text-primary' : ''}`}>
                    Home
                  </NavLink>
                </li>

                {/* Mega Menu Dropdown */}
                <li className="nav-item dropdown dropdown-mega">
                  <NavLink to="/catalog" className={({ isActive }) => `nav-link nav-link-animated fw-semibold text-white px-2 d-flex align-items-center gap-1 ${isActive ? 'active-nav-link text-primary' : ''}`}>
                    Shop <ChevronDown size={14} />
                  </NavLink>
                  <div className="dropdown-mega-menu dropdown-menu bg-dark text-white p-4">
                    <div className="container-fluid">
                      <div className="row">
                        {/* Sports Columns */}
                        <div className="col-md-3">
                          <h6 className="text-primary fw-bold text-uppercase tracking-wider small mb-3">Shop by Sport</h6>
                          <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><Link to="/catalog?category=Running" className="text-light text-decoration-none hover-white small">Running Shoes</Link></li>
                            <li><Link to="/catalog?category=Training" className="text-light text-decoration-none hover-white small">Gym & Training</Link></li>
                            <li><Link to="/catalog?category=Trail Running" className="text-light text-decoration-none hover-white small">Trail & Off-Road</Link></li>
                            <li><Link to="/catalog?category=Walking" className="text-light text-decoration-none hover-white small">Daily Walking</Link></li>
                            <li><Link to="/catalog?category=Lifestyle" className="text-light text-decoration-none hover-white small">Lifestyle Sneakers</Link></li>
                          </ul>
                        </div>
                        
                        {/* Featured Collections */}
                        <div className="col-md-3">
                          <h6 className="text-primary fw-bold text-uppercase tracking-wider small mb-3">Collections</h6>
                          <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><Link to="/catalog?sort=newest" className="text-light text-decoration-none hover-white small">New Arrivals</Link></li>
                            <li><Link to="/catalog?rating=4.8" className="text-light text-decoration-none hover-white small">Top Rated Performance</Link></li>
                            <li><Link to="/catalog?category=Professional" className="text-light text-decoration-none hover-white small">Professional Racers</Link></li>
                            <li><Link to="/catalog?discount=10" className="text-light text-decoration-none hover-white small">Special Offers</Link></li>
                          </ul>
                        </div>

                        {/* Brand Tech */}
                        <div className="col-md-3">
                          <h6 className="text-primary fw-bold text-uppercase tracking-wider small mb-3">Innovation</h6>
                          <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><span className="text-light small d-block">FluxCarbon Plate™</span></li>
                            <li><span className="text-light small d-block">EnergyFloat Midsole™</span></li>
                            <li><span className="text-light small d-block">AirWeave Knit Upper™</span></li>
                            <li><span className="text-light small d-block">VibramGrip Outsole™</span></li>
                          </ul>
                        </div>

                        {/* Promo Card Banner */}
                        <div className="col-md-3">
                          <div className="bg-primary p-3 rounded-4 position-relative overflow-hidden h-100 d-flex flex-column justify-content-between" style={{ minHeight: '160px' }}>
                            <div className="position-absolute" style={{ right: '-20px', bottom: '-20px', opacity: 0.15, transform: 'rotate(-25deg)' }}>
                              <ShoppingBag size={120} />
                            </div>
                            <div>
                              <span className="badge bg-white text-primary rounded-pill mb-2 fw-bold">PROMO CODE</span>
                              <h5 className="fw-bold mb-1">Use FLUX20</h5>
                              <p className="small text-white-50 mb-0">Get 20% off on all premium sneakers.</p>
                            </div>
                            <Link to="/catalog" className="btn btn-light btn-sm rounded-pill fw-bold text-primary align-self-start mt-2">Shop Now</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <span className="nav-link text-white-50 px-1">|</span>
                </li>

                <li className="nav-item">
                  <Link to="/catalog" className="nav-link fw-semibold text-white px-2">
                    All Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Action Icons */}
            <div className="d-flex align-items-center gap-3">
              {/* Search Toggle */}
              <button 
                onClick={() => setShowSearch(true)}
                className="btn btn-link text-white p-2 border-0 position-relative"
                aria-label="Search items"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Link */}
              <Link 
                to="/catalog?filter=wishlist" 
                className="btn btn-link text-white p-2 border-0 position-relative"
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="position-absolute top-1 start-70 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '10px', padding: '3px 6px' }}
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>

              {/* Compare Link */}
              <Link 
                to="/catalog?filter=compare" 
                className="btn btn-link text-white p-2 border-0 position-relative"
                title="Compare Shoes"
              >
                <BarChart3 size={20} />
                {compareList.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="position-absolute top-1 start-70 translate-middle badge rounded-pill bg-info text-dark fw-bold"
                    style={{ fontSize: '10px', padding: '3px 6px' }}
                  >
                    {compareList.length}
                  </motion.span>
                )}
              </Link>

              {/* Cart Drawer Trigger Button (Fixed responsive click drawer) */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="btn btn-link text-white p-2 border-0 position-relative"
                aria-label="Shopping Cart Drawer"
              >
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="position-absolute top-1 start-70 translate-middle badge rounded-pill bg-primary"
                    style={{ fontSize: '10px', padding: '3px 6px', boxShadow: '0 0 10px var(--flux-primary)' }}
                  >
                    {cart.reduce((qty, item) => qty + item.quantity, 0)}
                  </motion.span>
                )}
              </button>

              {/* Profile/Login Link */}
              <Link to="/checkout" className="btn btn-link text-white p-2 border-0 d-none d-md-block" title="User Profile">
                <User size={20} />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {showMobileMenu && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1045,
            display: 'flex'
          }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="bg-dark text-white p-4 d-flex flex-column justify-content-between"
              style={{
                position: 'relative',
                width: '300px',
                height: '100%',
                boxShadow: '10px 0 30px rgba(0,0,0,0.2)'
              }}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <img
                    src="/logo.png"
                    alt="FluxRun Logo"
                    style={{ height: '36px', filter: 'invert(1) hue-rotate(180deg)' }}
                  />
                  <button onClick={() => setShowMobileMenu(false)} className="btn btn-link text-white p-1 border-0">
                    <X size={24} />
                  </button>
                </div>
                <div className="d-flex flex-column gap-4">
                  <Link to="/" onClick={() => setShowMobileMenu(false)} className="text-white text-decoration-none h5 fw-bold">Home</Link>
                  <Link to="/catalog" onClick={() => setShowMobileMenu(false)} className="text-white text-decoration-none h5 fw-bold">Shop Shoes</Link>
                  <Link to="/catalog?category=Running" onClick={() => setShowMobileMenu(false)} className="text-white-50 text-decoration-none ms-3">Running</Link>
                  <Link to="/catalog?category=Training" onClick={() => setShowMobileMenu(false)} className="text-white-50 text-decoration-none ms-3">Training</Link>
                  <Link to="/catalog?category=Trail Running" onClick={() => setShowMobileMenu(false)} className="text-white-50 text-decoration-none ms-3">Trail Running</Link>
                  <Link to="/catalog?category=Lifestyle" onClick={() => setShowMobileMenu(false)} className="text-white-50 text-decoration-none ms-3">Lifestyle</Link>
                  <Link to="/cart" onClick={() => setShowMobileMenu(false)} className="text-white text-decoration-none h5 fw-bold">Shopping Cart</Link>
                  <Link to="/checkout" onClick={() => setShowMobileMenu(false)} className="text-white text-decoration-none h5 fw-bold">Checkout</Link>
                </div>
              </div>
              <div className="text-white-50 small">
                © {new Date().getFullYear()} FluxRun. Move Faster. Go Further.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PREMIUM SLIDING CART DRAWER (Fits desktop & mobile perfectly) */}
      <AnimatePresence>
        {isCartOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1500,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(6px)'
              }}
            />

            {/* Right Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="bg-dark text-white p-4 d-flex flex-column justify-content-between"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px', // Perfect desktop width, collapses to full screen on mobile
                height: '100%',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: 1510
              }}
            >
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" />
                  <h5 className="fw-bold mb-0 font-display text-uppercase tracking-wider small">Shopping Bag</h5>
                  <span className="badge bg-primary-glow text-primary rounded-pill font-monospace" style={{ fontSize: '11px', backgroundColor: 'var(--flux-primary-glow)' }}>
                    {cart.reduce((qty, item) => qty + item.quantity, 0)} Items
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="btn btn-link text-white p-1 border-0"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable list of items */}
              <div className="flex-grow-1 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 280px)', overflowX: 'hidden' }}>
                {cart.length === 0 ? (
                  <div className="text-center py-5 my-5 text-white-50">
                    <ShoppingBag size={54} className="mb-3 opacity-20 text-primary mx-auto" />
                    <p className="small mb-0">Your bag is currently empty.</p>
                    <Link to="/catalog" onClick={() => setIsCartOpen(false)} className="btn btn-outline-light btn-sm rounded-pill px-4 mt-3">Shop Catalog</Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="d-flex align-items-start gap-3 mb-4 pb-3 border-bottom border-secondary-50">
                      {/* Product Thumbnail */}
                      <Link to={`/product/${item.product.id}`} onClick={() => setIsCartOpen(false)} className="bg-light rounded-3 p-1 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '60px', minWidth: '64px' }}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="img-fluid"
                          style={{ maxHeight: '50px', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                        />
                      </Link>

                      {/* Info & Quantity controls */}
                      <div className="flex-grow-1 overflow-hidden">
                        <Link to={`/product/${item.product.id}`} onClick={() => setIsCartOpen(false)} className="text-decoration-none text-white">
                          <h6 className="small fw-bold mb-0 text-truncate text-white hover-primary" style={{ transition: 'color 0.2s' }}>{item.product.name}</h6>
                        </Link>
                        <span className="text-white-50 small font-monospace d-block" style={{ fontSize: '11px' }}>Size {item.selectedSize} | {item.selectedColor.name}</span>
                        
                        {/* Drawer Qty Controls */}
                        <div className="d-flex align-items-center gap-2 mt-2">
                          <div className="d-flex align-items-center border border-secondary rounded-pill" style={{ height: '24px', overflow: 'hidden' }}>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity - 1)}
                              className="btn btn-sm text-white-50 px-2 py-0 border-0 bg-transparent"
                              style={{ fontSize: '10px' }}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="small font-monospace text-white px-1" style={{ minWidth: '12px', textAlign: 'center', fontSize: '11px' }}>{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity + 1)}
                              className="btn btn-sm text-white-50 px-2 py-0 border-0 bg-transparent"
                              style={{ fontSize: '10px' }}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-primary small fw-bold font-monospace ms-auto">${item.product.price * item.quantity}</span>
                        </div>
                      </div>

                      {/* Trash action */}
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                        className="btn btn-link text-white-50 hover-danger p-0"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer footer details */}
              {cart.length > 0 && (
                <div className="border-top border-secondary pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-white-50 small">Subtotal:</span>
                    <span className="h5 fw-bold text-primary font-monospace">${getSubtotal()}</span>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link to="/cart" onClick={() => setIsCartOpen(false)} className="btn btn-outline-light w-100 rounded-pill py-2 small fw-bold">View Bag</Link>
                    </div>
                    <div className="col-6">
                      <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="btn btn-primary w-100 rounded-pill py-2 small fw-bold">Checkout</Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(17, 17, 17, 0.95)',
              backdropFilter: 'blur(12px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <button 
              onClick={() => setShowSearch(false)}
              className="btn btn-link text-white p-2 border-0"
              style={{ position: 'absolute', top: '30px', right: '30px' }}
            >
              <X size={32} />
            </button>
            <div className="container" style={{ maxWidth: '600px' }}>
              <form onSubmit={handleSearchSubmit}>
                <h4 className="text-center text-white mb-4 fw-light font-display">SEARCH THE <span className="text-primary fw-bold">FLUXRUN</span> CATALOG</h4>
                <div className="input-group input-group-lg border-bottom border-primary pb-2" style={{ background: 'transparent' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by category, color, name (e.g. Velocity)..."
                    className="form-control bg-transparent text-white border-0 shadow-none px-0 py-3"
                    style={{ fontSize: '1.5rem', fontWeight: 300 }}
                    autoFocus
                  />
                  {searchQuery && (
                    <button type="button" onClick={clearSearch} className="btn bg-transparent border-0 text-white-50">
                      <X size={20} />
                    </button>
                  )}
                  <button type="submit" className="btn bg-transparent border-0 text-primary">
                    <Search size={24} />
                  </button>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-3 text-white-50 small">
                  <span>Try:</span>
                  <Link to="/catalog?search=Velocity" onClick={() => { setSearchQuery('Velocity'); setShowSearch(false); }} className="text-white text-decoration-none border-bottom border-secondary pb-0">Velocity</Link>
                  <Link to="/catalog?search=Red" onClick={() => { setSearchQuery('Red'); setShowSearch(false); }} className="text-white text-decoration-none border-bottom border-secondary pb-0">Red</Link>
                  <Link to="/catalog?search=Trail" onClick={() => { setSearchQuery('Trail'); setShowSearch(false); }} className="text-white text-decoration-none border-bottom border-secondary pb-0">Trail</Link>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
