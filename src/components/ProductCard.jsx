import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import { Heart, Eye, ShoppingCart, BarChart3, Star } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

export const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, compareList, toggleCompare, addToCart } = useContext(ShopContext);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const isCompared = compareList.some((item) => item.id === product.id);

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add default color & size
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="h-100"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flux-card h-100 d-flex flex-column justify-content-between p-3 position-relative" style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: hovered ? 'var(--shadow-premium)' : 'var(--shadow-sm)'
        }}>
          {/* Badges Overlay */}
          <div className="position-absolute d-flex flex-column gap-2" style={{ top: '15px', left: '15px', zIndex: 3 }}>
            {product.discount > 0 && (
              <span className="badge bg-danger rounded-pill px-3 py-2 small fw-bold">
                -{product.discount}%
              </span>
            )}
            {product.rating >= 4.9 && (
              <span className="badge bg-dark rounded-pill px-3 py-2 small fw-bold d-flex align-items-center gap-1">
                <Star size={12} fill="#FFC107" color="#FFC107" />
                Elite
              </span>
            )}
          </div>

          {/* Action Buttons Overlay */}
          <div className="position-absolute d-flex flex-column gap-2" style={{
            top: '15px',
            right: '15px',
            zIndex: 3,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(10px)',
            transition: 'opacity 0.3s var(--transition-normal), transform 0.3s var(--transition-normal)'
          }}>
            <button
              onClick={handleWishlistClick}
              className="btn btn-light rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center p-2"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: isWishlisted ? 'var(--flux-danger)' : '#ffffff',
                color: isWishlisted ? '#ffffff' : 'var(--flux-secondary)',
                transition: 'background-color 0.2s'
              }}
              title="Add to Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? '#ffffff' : 'none'} />
            </button>

            <button
              onClick={handleCompareClick}
              className="btn btn-light rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center p-2"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: isCompared ? 'var(--flux-primary)' : '#ffffff',
                color: isCompared ? '#ffffff' : 'var(--flux-secondary)',
                transition: 'background-color 0.2s'
              }}
              title="Compare Shoe"
            >
              <BarChart3 size={18} />
            </button>

            <button
              onClick={handleQuickViewClick}
              className="btn btn-light rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center p-2"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#ffffff',
                color: 'var(--flux-secondary)'
              }}
              title="Quick View"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Image & Showcase Area */}
          <Link to={`/product/${product.id}`} className="text-decoration-none">
            <div className="bg-light p-4 rounded-4 d-flex align-items-center justify-content-center position-relative mb-3" style={{
              height: '220px',
              overflow: 'hidden',
              background: 'radial-gradient(circle, rgba(0, 162, 255, 0.05) 0%, rgba(248, 249, 252, 1) 100%)'
            }}>
              {/* Radial Blur Backdrop behind shoe */}
              <div style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: hovered ? 'rgba(0, 229, 255, 0.25)' : 'rgba(0, 162, 255, 0.12)',
                filter: 'blur(20px)',
                borderRadius: '50%',
                zIndex: 0,
                transition: 'background 0.3s'
              }} />

              {/* Shoebox Image */}
              <motion.img
                animate={hovered ? { rotate: -12, scale: 1.1, y: -8 } : { rotate: -5, scale: 1, y: 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
                src={product.image}
                alt={product.name}
                className="img-fluid position-relative"
                style={{
                  zIndex: 1,
                  filter: 'drop-shadow(0 15px 20px rgba(0, 0, 0, 0.1))',
                  maxHeight: '160px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                }}
              />
            </div>
          </Link>

          {/* Info Area */}
          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="small text-uppercase fw-semibold tracking-wider text-muted font-monospace">{product.category}</span>
              <div className="d-flex align-items-center gap-1">
                <Star size={14} fill="var(--flux-warning)" color="var(--flux-warning)" />
                <span className="small fw-semibold text-dark">{product.rating}</span>
              </div>
            </div>

            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
              <h4 className="h6 fw-bold mb-2 text-truncate-2" style={{
                height: '38px',
                lineHeight: '1.2',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--flux-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--flux-secondary)'}
              >
                {product.name}
              </h4>
            </Link>

            {/* Colors circle display */}
            <div className="d-flex gap-1 mb-3">
              {product.colors.map((c) => (
                <span key={c.name} style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: c.code,
                  border: '1px solid rgba(0,0,0,0.1)'
                }} title={c.name} />
              ))}
            </div>

            {/* Price & Action Row */}
            <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-light">
              <div className="d-flex flex-column">
                {product.discount > 0 ? (
                  <>
                    <span className="h6 fw-bold text-primary mb-0">${product.price}</span>
                    <span className="small text-muted text-decoration-line-through">${product.originalPrice}</span>
                  </>
                ) : (
                  <span className="h6 fw-bold text-dark mb-0">${product.price}</span>
                )}
              </div>

              <button
                onClick={handleAddToCartClick}
                className="btn btn-primary-glow border-0 rounded-pill p-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: 'var(--flux-primary-glow)',
                  color: 'var(--flux-primary)',
                  width: '36px',
                  height: '36px',
                  transition: 'background-color 0.2s, color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--flux-primary)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--flux-primary-glow)';
                  e.currentTarget.style.color = 'var(--flux-primary)';
                }}
                title="Add to Cart"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
