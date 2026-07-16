import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ShoppingBag, Heart, BarChart3, Truck, RefreshCw, ShieldAlert,
  ChevronDown, MessageSquare, ShieldCheck, ChevronRight
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist, addToRecentlyViewed, recentlyViewed } = useContext(ShopContext);

  // Find product by URL param
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
        <Link to="/catalog" className="btn btn-primary mt-3">Back to Catalog</Link>
      </div>
    );
  }

  // Active configurations
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // specs, reviews, shipping
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const mainBuyBtnRef = useRef(null);

  // Track product in recently viewed and reset states on ID change
  useEffect(() => {
    addToRecentlyViewed(product);
    setActiveImage(product.image);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
  }, [id]);

  // Monitor scroll position for sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (mainBuyBtnRef.current) {
        const rect = mainBuyBtnRef.current.getBoundingClientRect();
        // Show sticky bar when main buy button leaves viewport top
        setShowStickyBar(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Image zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  // Find related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Dynamic delivery date estimate
  const getDeliveryEstimate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ backgroundColor: 'var(--flux-background)' }} className="position-relative">
      
      {/* BREADCRUMB */}
      <div className="container pt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/catalog" className="text-decoration-none text-muted">Shop</Link></li>
            <li className="breadcrumb-item"><Link to={`/catalog?category=${product.category}`} className="text-decoration-none text-muted">{product.category}</Link></li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">{product.name}</li>
          </ol>
        </nav>
      </div>

      <div className="container py-4 pb-5">
        <div className="row gx-4 gx-md-5 gy-5">
          
          {/* GALLERY COLUMN (Left) */}
          <div className="col-lg-6">
            <div className="sticky-lg-top" style={{ top: '100px', zIndex: 1 }}>
              {/* Main Zoom Display */}
              <div 
                className="zoom-container bg-light d-flex align-items-center justify-content-center mb-3"
                style={{ 
                  height: '420px', 
                  borderRadius: '24px',
                  background: 'radial-gradient(circle, rgba(0, 162, 255, 0.04) 0%, rgba(248, 249, 252, 1) 100%)',
                  overflow: 'hidden'
                }}
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="zoom-image"
                  style={{
                    transform: zoomed ? 'scale(1.8)' : 'scale(1)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    maxHeight: '320px',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))'
                  }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'; }}
                />
              </div>

              {/* Thumbnails */}
              <div className="d-flex gap-3 justify-content-center">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className="btn p-0 border-0 overflow-hidden bg-light rounded-3 transition-all"
                    style={{
                      width: '80px',
                      height: '70px',
                      border: activeImage === img ? '2px solid var(--flux-primary)' : '1px solid rgba(0,0,0,0.05)',
                      padding: '4px'
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx}`} 
                      className="w-100 h-100 object-fit-contain"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CONFIGURATION COLUMN (Right) */}
          <div className="col-lg-6">
            <div>
              <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>
                {product.category.toUpperCase()}
              </span>
              <h1 className="fw-bold mb-2 font-display">{product.name}</h1>
              
              {/* Ratings */}
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex text-warning me-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(product.rating) ? "var(--flux-warning)" : "none"} 
                      color="var(--flux-warning)" 
                    />
                  ))}
                </div>
                <span className="text-secondary fw-semibold small me-3">{product.rating} / 5.0</span>
                <span className="text-white-50">|</span>
                <span className="text-muted small ms-3">{product.reviewCount} verified athlete reviews</span>
              </div>

              {/* Pricing & Stock */}
              <div className="d-flex align-items-baseline mb-4 gap-3">
                <span className="h2 fw-bold text-primary font-monospace mb-0">${product.price}</span>
                {product.discount > 0 && (
                  <>
                    <span className="h5 text-muted text-decoration-line-through font-monospace mb-0">${product.originalPrice}</span>
                    <span className="badge bg-danger rounded-pill px-3 py-1 fw-bold">-{product.discount}% OFF</span>
                  </>
                )}
                
                {product.stock <= 5 ? (
                  <span className="badge bg-danger-glow text-danger rounded-pill px-3 py-1 ms-auto fw-bold" style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)' }}>
                    🔥 ONLY {product.stock} LEFT (LOW STOCK)
                  </span>
                ) : (
                  <span className="badge bg-success-glow text-success rounded-pill px-3 py-1 ms-auto fw-bold" style={{ backgroundColor: 'rgba(0, 200, 83, 0.1)' }}>
                    ✓ IN STOCK (SKU: {product.sku})
                  </span>
                )}
              </div>

              <p className="text-muted mb-4">{product.description}</p>

              {/* Color Select */}
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase small tracking-wider mb-2">Color Selected: {selectedColor.name}</h6>
                <div className="d-flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: c.code,
                        border: selectedColor.name === c.name ? '2px solid var(--flux-primary)' : '1px solid rgba(0, 0, 0, 0.1)',
                        outline: selectedColor.name === c.name ? '2px solid #fff' : 'none',
                        outlineOffset: '-4px',
                        boxShadow: selectedColor.name === c.name ? '0 0 8px var(--flux-primary)' : 'none'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Select */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <h6 className="fw-bold text-uppercase small tracking-wider mb-0">Size (US): {selectedSize}</h6>
                  <button 
                    onClick={() => alert("Standard sizing fits true to size. Choose your standard running shoe measurement.")} 
                    className="btn btn-link text-decoration-underline p-0 small text-muted text-uppercase fw-bold"
                    style={{ fontSize: '11px' }}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className="btn d-flex align-items-center justify-content-center fw-bold transition"
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '12px',
                        border: selectedSize === s ? '2px solid var(--flux-primary)' : '1px solid rgba(0, 0, 0, 0.08)',
                        backgroundColor: selectedSize === s ? 'var(--flux-primary)' : 'transparent',
                        color: selectedSize === s ? '#ffffff' : 'var(--flux-secondary)'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buy Action Buttons */}
              <div ref={mainBuyBtnRef} className="d-flex gap-3 mb-4">
                <div className="d-flex align-items-center border rounded-pill bg-white" style={{ height: '54px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn px-3 h-100 border-0 bg-transparent text-secondary"
                  >-</button>
                  <span className="px-2 fw-bold" style={{ minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="btn px-3 h-100 border-0 bg-transparent text-secondary"
                  >+</button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="btn btn-flux-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                  style={{ height: '54px' }}
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 border"
                  style={{
                    width: '54px',
                    height: '54px',
                    backgroundColor: isWishlisted ? 'var(--flux-danger)' : 'transparent',
                    color: isWishlisted ? '#ffffff' : 'var(--flux-secondary)',
                    borderColor: isWishlisted ? 'var(--flux-danger)' : 'rgba(0,0,0,0.15)'
                  }}
                >
                  <Heart size={20} fill={isWishlisted ? '#ffffff' : 'none'} />
                </button>
              </div>

              {/* Shipping Badges */}
              <div className="glass-panel p-3 border-light mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Truck size={16} className="text-primary" />
                  <span className="small text-dark">Estimated Courier Delivery: <strong className="text-primary">{getDeliveryEstimate()}</strong></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <RefreshCw size={16} className="text-primary" />
                  <span className="small text-dark">Hassle-Free Exchange: <strong className="text-primary">30-day sizing return guarantee</strong></span>
                </div>
              </div>

              {/* Collapsible Tabs (Specs, Reviews, FAQs) */}
              <div className="glass-panel" style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>
                <div className="d-flex border-bottom border-light">
                  {['specs', 'reviews', 'faqs'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`btn border-0 py-3 flex-grow-1 small fw-bold font-monospace text-uppercase text-center rounded-0`}
                      style={{
                        backgroundColor: activeTab === tab ? '#ffffff' : '#f8f9fc',
                        color: activeTab === tab ? 'var(--flux-primary)' : 'var(--flux-text-muted)',
                        borderBottom: activeTab === tab ? '3px solid var(--flux-primary)' : 'none'
                      }}
                    >
                      {tab === 'specs' ? 'Specs' : tab === 'reviews' ? 'Reviews' : 'FAQs'}
                    </button>
                  ))}
                </div>
                <div className="p-4">
                  {activeTab === 'specs' && (
                    <div className="row g-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="col-12 d-flex justify-content-between border-bottom border-light pb-2 mb-2 small">
                          <span className="text-muted fw-semibold">{key}</span>
                          <span className="text-dark fw-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div>
                      <div className="d-flex align-items-center gap-3 border-bottom border-light pb-3 mb-3">
                        <h4 className="display-4 fw-bold mb-0 text-primary">{product.rating}</h4>
                        <div>
                          <div className="d-flex text-warning small mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill="var(--flux-warning)" color="var(--flux-warning)" />
                            ))}
                          </div>
                          <span className="text-muted small">Based on {product.reviewCount} customer reviews</span>
                        </div>
                      </div>
                      <div className="d-flex gap-3 mb-3 pb-2 border-bottom border-light-50">
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--flux-primary-glow)', color: 'var(--flux-primary)' }} className="d-flex align-items-center justify-content-center fw-bold font-monospace small">JD</div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-0 small">Jonathon D.</h6>
                          <div className="d-flex text-warning small my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} fill="var(--flux-warning)" color="var(--flux-warning)" />
                            ))}
                          </div>
                          <p className="text-muted small mb-0">Insane speed boost! The spring from the carbon plate is noticeable from the first stride. Snug lockdown fit.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'faqs' && (
                    <div className="accordion accordion-flush" id="productFaqs">
                      <div className="accordion-item bg-transparent">
                        <h2 className="accordion-header" id="faq-h1">
                          <button className="accordion-button collapsed px-0 bg-transparent fw-bold small text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faq-c1">
                            Are these true to size?
                          </button>
                        </h2>
                        <div id="faq-c1" className="accordion-collapse collapse" data-bs-parent="#productFaqs">
                          <div className="accordion-body px-0 text-muted small">
                            Yes, FluxRun sneakers are calibrated to standard US sizing. If you possess wide feet, we suggest choosing half a size larger.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item bg-transparent">
                        <h2 className="accordion-header" id="faq-h2">
                          <button className="accordion-button collapsed px-0 bg-transparent fw-bold small text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faq-c2">
                            Can I wash these in a washing machine?
                          </button>
                        </h2>
                        <div id="faq-c2" className="accordion-collapse collapse" data-bs-parent="#productFaqs">
                          <div className="accordion-body px-0 text-muted small">
                            We advise hand washing with cold water and mild detergent to avoid stretching the weave structures or shifting the composite plate shapes.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-5 bg-white border-top border-bottom border-light">
          <div className="container">
            <h2 className="fw-bold font-display h3 mb-4 text-uppercase">RELATED PEERS</h2>
            <div className="row g-4">
              {relatedProducts.map((p) => (
                <div key={p.id} className="col-lg-4 col-md-6">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RECENTLY VIEWED */}
      {recentlyViewed.length > 1 && (
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="fw-bold font-display h3 mb-4 text-uppercase">RECENTLY SCANNED</h2>
            <div className="row g-4">
              {recentlyViewed.filter(r => r.id !== product.id).slice(0, 3).map((p) => (
                <div key={p.id} className="col-lg-4 col-md-6">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STICKY BUY CARD BAR (Appears on scroll down) */}
      <div className={`sticky-buy-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '50px', height: '40px', objectFit: 'contain' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
            />
            <div className="d-none d-md-block">
              <h6 className="fw-bold mb-0 text-dark">{product.name}</h6>
              <span className="small text-muted font-monospace">{product.category} | Size {selectedSize}</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="h5 fw-bold text-primary font-monospace mb-0">${product.price}</span>
            <button 
              onClick={handleAddToCart}
              className="btn btn-flux-primary d-flex align-items-center gap-2"
              style={{ padding: '8px 20px' }}
            >
              <ShoppingBag size={16} />
              <span className="small fw-bold">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
