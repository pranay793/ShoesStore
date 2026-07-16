import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Heart, Star, ShoppingCart, Eye, Check, Loader2 } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

export const PremiumProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useContext(ShopContext);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const cardRef = useRef(null);

  // Selected Product Attributes
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', code: '#00A2FF' });

  // Quick Add Button state
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Spotlight coordinate calculation (Writes directly to style ref for 60fps performance without React re-renders)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  // Action Click Handlers
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleQuickAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding || isSuccess) return;

    setIsAdding(true);

    // Add default size (first index) and chosen color
    const defaultSize = product.sizes[0] || 9;
    addToCart(product, selectedColor, defaultSize, 1);

    // Simulate luxury loader sequence
    setTimeout(() => {
      setIsAdding(false);
      setIsSuccess(true);

      // Revert after 1.5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    }, 900);
  };

  // Helper to draw rating stars
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<Star key={i} size={13} fill="#FFC107" color="#FFC107" />);
      } else {
        stars.push(<Star key={i} size={13} fill="none" color="rgba(255, 255, 255, 0.2)" />);
      }
    }
    return stars;
  };

  // Select dynamic badges
  const isElite = product.rating >= 4.9;
  const isTrending = product.rating >= 4.7 && !isElite;
  const isNew = product.id % 2 === 0;

  return (
    <>
      <div 
        className="premium-card-wrapper"
        onMouseMove={handleMouseMove}
      >
        <div 
          ref={cardRef}
          className="premium-card"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%'
          }}
        >
          {/* Card Cursor Spotlight Glow */}
          <div className="card-spotlight" />

          {/* Top Badges & Actions Overlay */}
          <div className="card-header-overlay">
            <div className="d-flex gap-2">
              {isNew && (
                <span className="badge-lux badge-new">New</span>
              )}
              {isTrending && (
                <span className="badge-lux badge-trending">Trending</span>
              )}
              {isElite && (
                <span className="badge-lux badge-trending" style={{ background: 'linear-gradient(135deg, #aa3bff 0%, #00E5FF 100%)' }}>Elite</span>
              )}
            </div>

            <div className="d-flex gap-2">
              {/* Quick View Icon */}
              <button
                onClick={handleQuickViewClick}
                className="wishlist-btn-lux"
                title="Quick View"
              >
                <Eye size={16} />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={handleWishlistClick}
                className={`wishlist-btn-lux ${isWishlisted ? 'is-active' : ''}`}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Middle: Floating Shoe Image Showcase */}
          <Link to={`/product/${product.id}`} className="text-decoration-none card-showcase-area">
            {/* Dynamic radial glow behind product */}
            <div 
              className="card-image-glow" 
              style={{ 
                '--glow-color': selectedColor ? `${selectedColor.code}33` : 'rgba(0, 162, 255, 0.25)' 
              }}
            />

            {/* Shoebox Image */}
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid shoe-img-lux"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60';
              }}
            />

            {/* Independent Floating Shadow */}
            <div className="shoe-shadow" />
          </Link>

          {/* Bottom Content Area */}
          <div className="card-details-area">
            <span className="card-category-lux">{product.category}</span>
            
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              <h4 className="card-title-lux" title={product.name}>
                {product.name}
              </h4>
            </Link>

            <p className="card-description-lux">
              {product.description}
            </p>

            {/* Rating Stars & Score */}
            <div className="card-rating-row">
              <div className="stars-lux">
                {renderStars(product.rating)}
              </div>
              <span className="rating-value-lux">{product.rating}</span>
            </div>

            {/* Interactive Color Selection */}
            <div className="color-selector-row">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  className={`color-dot-lux ${selectedColor.name === c.name ? 'is-active' : ''}`}
                  style={{ backgroundColor: c.code }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Footer Row: Pricing & Quick Add Button */}
            <div className="card-footer-row">
              <div className="price-container-lux">
                {product.discount > 0 ? (
                  <>
                    <span className="price-old-lux">${product.originalPrice}</span>
                    <span className="price-current-lux">${product.price}</span>
                  </>
                ) : (
                  <span className="price-current-lux">${product.price}</span>
                )}
              </div>

              {/* Stateful Quick Add Button */}
              <button
                onClick={handleQuickAddClick}
                className={`quick-add-btn-lux ${isAdding ? 'is-adding' : ''} ${isSuccess ? 'is-success' : ''}`}
                style={{
                  pointerEvents: isAdding || isSuccess ? 'none' : 'auto'
                }}
              >
                {isAdding ? (
                  <>
                    <span className="btn-spinner-icon animate-spin">
                      <Loader2 size={14} className="animate-spin" />
                    </span>
                    <span>Adding</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span className="btn-success-icon animate-bounce">
                      <Check size={14} />
                    </span>
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <span>Add</span>
                    <div className="btn-icon-wrapper-lux">
                      <ShoppingCart size={14} />
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
