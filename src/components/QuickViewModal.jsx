import React, { useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import { X, Star, ShoppingBag, Eye } from 'lucide-react';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useContext(ShopContext);
  
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop-custom" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1050
        }}>
          {/* Backdrop Click */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-panel text-dark"
            style={{
              width: '90%',
              maxWidth: '800px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-premium)',
              zIndex: 1060,
              border: '1px solid rgba(255, 255, 255, 0.6)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="btn btn-link text-dark p-2 border-0"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
            >
              <X size={20} />
            </button>

            <div className="row g-0">
              {/* Product Visual */}
              <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-5 position-relative" style={{ minHeight: '350px', background: 'radial-gradient(circle, rgba(11, 87, 255, 0.08) 0%, rgba(248, 249, 252, 1) 100%)' }}>
                {/* Glowing radial background */}
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(11, 87, 255, 0.15)',
                  filter: 'blur(30px)',
                  zIndex: 0
                }} />
                
                <motion.img 
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: -5, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  src={product.image} 
                  alt={product.name}
                  className="img-fluid position-relative"
                  style={{
                    zIndex: 1,
                    filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))',
                    maxHeight: '260px',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    // Fallback to placeholder if not loaded yet
                    e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="col-md-6 p-4 p-md-5 d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>
                    {product.category.toUpperCase()}
                  </span>
                  <h3 className="h4 fw-bold mb-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-flex text-warning me-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < Math.floor(product.rating) ? "var(--flux-warning)" : "none"} 
                          color="var(--flux-warning)" 
                        />
                      ))}
                    </div>
                    <span className="text-muted small">({product.reviewCount} reviews)</span>
                  </div>

                  {/* Pricing */}
                  <div className="d-flex align-items-baseline mb-4">
                    <span className="h3 fw-bold text-primary mb-0">${product.price}</span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-muted text-decoration-line-through ms-2">${product.originalPrice}</span>
                        <span className="badge bg-danger ms-2 rounded-pill">-{product.discount}% OFF</span>
                      </>
                    )}
                  </div>

                  <p className="text-muted small mb-4">{product.description}</p>

                  {/* Color Selector */}
                  <div className="mb-3">
                    <h5 className="small fw-bold text-uppercase mb-2">Color: {selectedColor.name}</h5>
                    <div className="d-flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '26px',
                            height: '26px',
                            backgroundColor: color.code,
                            border: selectedColor.name === color.name ? '2px solid var(--flux-primary)' : '1px solid rgba(0, 0, 0, 0.1)',
                            outline: selectedColor.name === color.name ? '2px solid #fff' : 'none',
                            outlineOffset: '-4px',
                            boxShadow: selectedColor.name === color.name ? '0 0 8px var(--flux-primary)' : 'none'
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-4">
                    <h5 className="small fw-bold text-uppercase mb-2">Size (US): {selectedSize}</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className="btn btn-sm d-flex align-items-center justify-content-center fw-semibold transition"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            border: selectedSize === size ? '2px solid var(--flux-primary)' : '1px solid rgba(0, 0, 0, 0.1)',
                            backgroundColor: selectedSize === size ? 'var(--flux-primary)' : 'transparent',
                            color: selectedSize === size ? '#ffffff' : 'var(--flux-secondary)'
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Buy Section */}
                <div className="d-flex gap-3">
                  <div className="d-flex align-items-center border rounded-pill" style={{ height: '48px', overflow: 'hidden' }}>
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
                    style={{ height: '48px' }}
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
