import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

export const CartPage = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    getSubtotal, 
    getDiscount, 
    getShipping, 
    getTotal, 
    promoApplied, 
    applyPromoCode, 
    removePromoCode 
  } = useContext(ShopContext);

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();

  // Free shipping threshold calculations ($150)
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div style={{ backgroundColor: 'var(--flux-background)', minHeight: '80vh' }} className="py-5">
      <div className="container">
        
        <div className="mb-4">
          <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>Flux Checkout</span>
          <h1 className="fw-bold font-display text-uppercase">YOUR SHOPPING BAG</h1>
        </div>

        {cart.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="glass-panel text-center py-5 px-4" style={{ backgroundColor: '#ffffff', borderRadius: '24px' }}>
            <div className="bg-primary-glow rounded-circle p-4 d-inline-flex justify-content-center align-items-center mb-4" style={{ backgroundColor: 'var(--flux-primary-glow)', color: 'var(--flux-primary)', width: '90px', height: '90px' }}>
              <ShoppingBag size={42} />
            </div>
            <h3 className="fw-bold text-dark font-display mb-2">Your Bag is Empty</h3>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
              Explore our performance running, training, and lifestyle sneakers to unlock your stride.
            </p>
            <Link to="/catalog" className="btn btn-flux-primary rounded-pill px-5">
              Explore Collection
            </Link>
          </div>
        ) : (
          /* ACTIVE CART VIEW */
          <div className="row g-4">
            {/* Cart Items List */}
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {cart.map((item, idx) => {
                  const key = `${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`;
                  return (
                    <motion.div
                      layout
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-panel p-3 d-flex flex-column flex-sm-row align-items-center gap-3"
                      style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.03)' }}
                    >
                      {/* Product Thumbnail */}
                      <Link to={`/product/${item.product.id}`} className="bg-light rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '90px', minWidth: '100px' }}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="img-fluid"
                          style={{ maxHeight: '70px', objectFit: 'contain', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.08))' }}
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                        />
                      </Link>

                      {/* Product Metadata */}
                      <div className="flex-grow-1 text-center text-sm-start overflow-hidden">
                        <Link to={`/product/${item.product.id}`} className="text-decoration-none text-dark">
                          <h6 className="fw-bold mb-1 text-truncate hover-primary" style={{ transition: 'color 0.2s' }}>{item.product.name}</h6>
                        </Link>
                        <span className="small text-muted font-monospace d-block mb-1">
                          Category: {item.product.category}
                        </span>
                        <div className="d-flex gap-2 justify-content-center justify-content-sm-start align-items-center">
                          <span className="small text-muted font-monospace">Color:</span>
                          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.selectedColor.code, border: '1px solid rgba(0,0,0,0.1)' }} />
                          <span className="small text-dark fw-bold me-2">{item.selectedColor.name}</span>
                          <span className="small text-muted font-monospace">Size:</span>
                          <span className="small text-dark fw-bold">{item.selectedSize}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center border rounded-pill bg-light" style={{ height: '36px' }}>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity - 1)}
                          className="btn px-2 py-0 border-0 bg-transparent text-secondary"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 fw-bold font-monospace small" style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, item.selectedSize, item.quantity + 1)}
                          className="btn px-2 py-0 border-0 bg-transparent text-secondary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price Details */}
                      <div className="text-center text-sm-end" style={{ minWidth: '90px' }}>
                        <span className="h6 fw-bold text-dark font-monospace">${item.product.price * item.quantity}</span>
                        {item.quantity > 1 && (
                          <span className="small text-muted d-block font-monospace">${item.product.price} each</span>
                        )}
                      </div>

                      {/* Trash action */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                        className="btn btn-link text-muted hover-danger p-2 border-0 bg-transparent"
                        title="Remove shoe"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Free Shipping Progress Indicator */}
              {remainingForFreeShipping > 0 ? (
                <div className="glass-panel p-3 border-light mt-4" style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}>
                  <p className="small text-secondary mb-2">
                    Spend another <strong className="text-primary font-monospace">${remainingForFreeShipping}</strong> to unlock <strong className="text-primary">FREE SHIPPING</strong>.
                  </p>
                  <div className="progress" style={{ height: '6px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                      aria-valuenow={subtotal} 
                      aria-valuemin="0" 
                      aria-valuemax={freeShippingThreshold}
                    />
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-3 border-light mt-4 d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(0, 200, 83, 0.05)', borderColor: 'rgba(0,200,83,0.15)', borderRadius: '16px' }}>
                  <span className="badge bg-success rounded-pill px-2 py-1 small">✓ APPROVED</span>
                  <span className="small text-success fw-bold">Congratulations! You have unlocked Free Courier Delivery.</span>
                </div>
              )}

              {/* Keep Shopping Link */}
              <div className="mt-4">
                <Link to="/catalog" className="text-decoration-none text-primary d-inline-flex align-items-center gap-2 fw-semibold">
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Pricing Summary Sidepanel */}
            <div className="col-lg-4">
              <div className="glass-panel p-4" style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h4 className="fw-bold mb-4 font-display">SUMMARY</h4>
                
                {/* Promo Code Fields */}
                <div className="mb-4">
                  {promoApplied ? (
                    <div className="d-flex justify-content-between align-items-center bg-primary-glow border border-primary-50 rounded-4 p-3 mb-2" style={{ backgroundColor: 'rgba(11, 87, 255, 0.1)' }}>
                      <div className="d-flex align-items-center gap-2">
                        <Ticket size={18} className="text-primary" />
                        <div>
                          <span className="small fw-bold text-dark block">{promoApplied.code}</span>
                          <span className="small text-primary d-block font-monospace">-{promoApplied.discountPercent}% Discount</span>
                        </div>
                      </div>
                      <button onClick={removePromoCode} className="btn btn-sm btn-link text-danger p-0 small text-decoration-none fw-bold">Cancel</button>
                    </div>
                  ) : (
                    <form onSubmit={handlePromoSubmit} className="input-group">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo Code (e.g. FLUX20)"
                        className="form-control form-control-flux py-2 border-end-0"
                        style={{ fontSize: '13px', borderRadius: '12px 0 0 12px' }}
                      />
                      <button 
                        type="submit" 
                        className="btn btn-dark px-3 fw-bold"
                        style={{ borderRadius: '0 12px 12px 0', fontSize: '13px' }}
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoMessage && (
                    <div className={`small mt-1 px-1 fw-semibold ${promoMessage.success ? 'text-success' : 'text-danger'}`}>
                      {promoMessage.message}
                    </div>
                  )}
                  <span className="text-muted d-block small mt-2" style={{ fontSize: '11px' }}>
                    Tip: Try <strong>FLUX20</strong> for 20% off or <strong>RUNFREE</strong> for 10% off.
                  </span>
                </div>

                <hr className="my-3 opacity-10" />

                {/* Subtotals List */}
                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="d-flex justify-content-between align-items-center small">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-semibold font-monospace">${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="d-flex justify-content-between align-items-center small text-success">
                      <span>Promo Discount</span>
                      <span className="fw-semibold font-monospace">-${discount}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center small">
                    <span className="text-muted">Estimated Shipping</span>
                    <span className="fw-semibold font-monospace">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                  </div>
                </div>

                <hr className="my-3 opacity-10" />

                {/* Total */}
                <div className="d-flex justify-content-between align-items-baseline mb-4">
                  <span className="h5 fw-bold text-dark font-display">TOTAL</span>
                  <span className="h4 fw-bold text-primary font-monospace">${total}</span>
                </div>

                <Link to="/checkout" className="btn btn-flux-primary w-100 d-flex align-items-center justify-content-center gap-2 mb-3" style={{ height: '50px' }}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </Link>

                <div className="d-flex align-items-center justify-content-center gap-2 text-muted small pt-2 border-top border-light">
                  <ShieldCheck size={16} className="text-success" />
                  <span>Secure checkout encrypted TLS 256-bit</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
