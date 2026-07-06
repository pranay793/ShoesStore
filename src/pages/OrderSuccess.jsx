import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { CheckCircle2, FileText, ShoppingBag, ArrowRight, Truck, MapPin, PackageCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const OrderSuccess = () => {
  const { activeOrder, products } = useContext(ShopContext);
  const navigate = useNavigate();
  const [trackerStatus, setTrackerStatus] = useState(1); // 1 = Ordered, 2 = Dispatched, 3 = Out

  // Redirect if no order is active
  useEffect(() => {
    if (!activeOrder) {
      navigate('/');
      return;
    }

    // Trigger canvas confetti!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Simulate real-time tracker updates
    const timer1 = setTimeout(() => setTrackerStatus(2), 5000);
    const timer2 = setTimeout(() => setTrackerStatus(3), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [activeOrder]);

  if (!activeOrder) return null;

  // Print invoice simulation
  const handlePrintInvoice = () => {
    window.print();
  };

  // Find recommendations based on their first ordered item category
  const recommendationCategory = activeOrder.items[0]?.product.category || 'Running';
  const recommendations = products
    .filter((p) => p.category === recommendationCategory && !activeOrder.items.some(item => item.product.id === p.id))
    .slice(0, 3);

  return (
    <div style={{ backgroundColor: 'var(--flux-background)', minHeight: '90vh' }} className="py-5">
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* SUCCESS CARD CONTAINER */}
        <div className="glass-panel p-4 p-md-5 text-center mb-4" style={{ backgroundColor: '#ffffff', borderRadius: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
          {/* Animated Green Checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="d-inline-flex align-items-center justify-content-center text-success mb-4"
          >
            <CheckCircle2 size={72} strokeWidth={1.5} />
          </motion.div>

          <h1 className="fw-bold font-display text-dark text-uppercase mb-2">ORDER CONFLICT AVOIDED!</h1>
          <p className="text-muted mb-4">
            Thank you for your purchase. Stride analytics are being calibrated. Your order is secured under code: <strong className="text-primary font-monospace">{activeOrder.orderNumber}</strong>.
          </p>

          <div className="row g-2 justify-content-center mb-5">
            <div className="col-sm-6 col-md-5">
              <button 
                onClick={handlePrintInvoice}
                className="btn btn-outline-secondary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2 border"
                style={{ fontSize: '14px' }}
              >
                <FileText size={16} />
                <span>Download Invoice</span>
              </button>
            </div>
            <div className="col-sm-6 col-md-5">
              <Link 
                to="/catalog" 
                className="btn btn-flux-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2"
                style={{ fontSize: '14px' }}
              >
                <ShoppingBag size={16} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* SIMULATED DELIVERY TRACKER BAR */}
          <div className="glass-panel p-4 text-start border-light mb-4" style={{ backgroundColor: '#f8f9fc', borderRadius: '20px' }}>
            <h6 className="fw-bold text-uppercase tracking-wider small mb-4 d-flex align-items-center gap-2 text-dark">
              <Truck size={16} className="text-primary" />
              <span>DELIVERY STATUS TRACKER</span>
            </h6>
            
            <div className="position-relative py-2 mb-3">
              {/* Tracker lines */}
              <div className="progress" style={{ height: '4px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: trackerStatus === 1 ? '10%' : trackerStatus === 2 ? '50%' : '100%' }}
                />
              </div>

              {/* Status Nodes */}
              <div className="d-flex justify-content-between position-absolute w-100" style={{ top: '-4px' }}>
                {[
                  { step: 1, label: "Ordered", icon: <Check size={10} /> },
                  { step: 2, label: "Dispatched", icon: trackerStatus >= 2 ? <Check size={10} /> : null },
                  { step: 3, label: "Out for Stride", icon: trackerStatus >= 3 ? <Check size={10} /> : null }
                ].map((s) => (
                  <div key={s.step} className="d-flex flex-column align-items-center">
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center text-white border border-2 border-white`}
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: trackerStatus >= s.step ? 'var(--flux-primary)' : 'rgba(0,0,0,0.1)',
                        boxShadow: trackerStatus >= s.step ? '0 0 10px var(--flux-primary)' : 'none',
                        fontSize: '9px'
                      }}
                    >
                      {s.icon}
                    </div>
                    <span 
                      className={`small mt-2 font-semibold ${trackerStatus >= s.step ? 'text-primary fw-bold' : 'text-muted'}`}
                      style={{ fontSize: '11px' }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between border-top border-light pt-3 mt-4 small gap-2 text-muted">
              <div className="d-flex align-items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>Ship to: <strong>{activeOrder.address.firstName} {activeOrder.address.lastName}, {activeOrder.address.city}</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <PackageCheck size={14} className="text-primary" />
                <span>Estimated Arrival: <strong className="text-primary">{activeOrder.deliveryDate}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER RECEIPT BREAKDOWN */}
        <div className="glass-panel p-4 mb-5" style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h5 className="fw-bold mb-3 font-display text-uppercase border-bottom border-light pb-2 text-dark text-start">RECEIPT SUMMARY</h5>
          <div className="d-flex flex-column gap-3 mb-4">
            {activeOrder.items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    style={{ width: '40px', height: '35px', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                  />
                  <div>
                    <h6 className="small fw-bold mb-0 text-dark">{item.product.name}</h6>
                    <span className="small text-muted font-monospace" style={{ fontSize: '11px' }}>Size {item.selectedSize} | {item.selectedColor.name}</span>
                  </div>
                </div>
                <span className="small font-monospace text-dark">{item.quantity} x ${item.product.price}</span>
              </div>
            ))}
          </div>

          <div className="d-flex flex-column gap-2 border-top border-light pt-3 small text-muted">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span className="font-monospace text-dark">${activeOrder.subtotal}</span>
            </div>
            {activeOrder.discount > 0 && (
              <div className="d-flex justify-content-between text-success">
                <span>Promo Discount</span>
                <span className="font-monospace">-${activeOrder.discount}</span>
              </div>
            )}
            <div className="d-flex justify-content-between">
              <span>Courier Delivery</span>
              <span className="font-monospace text-dark">{activeOrder.shipping === 0 ? 'FREE' : `$${activeOrder.shipping}`}</span>
            </div>
            <div className="d-flex justify-content-between border-top border-light pt-2 h6 fw-bold mb-0 text-dark">
              <span>TOTAL PAID</span>
              <span className="font-monospace text-primary">${activeOrder.total}</span>
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <div>
            <h4 className="fw-bold font-display h5 mb-3 text-uppercase text-center text-dark">PEOPLE ALSO UPGRADED TO</h4>
            <div className="row g-3">
              {recommendations.map((p) => (
                <div key={p.id} className="col-md-4">
                  <div className="flux-card p-3" style={{ borderRadius: '16px', background: '#ffffff', border: '1px solid rgba(0,0,0,0.03)' }}>
                    <Link to={`/product/${p.id}`} className="text-decoration-none">
                      <div className="bg-light p-2 rounded-3 text-center mb-2" style={{ height: '100px' }}>
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="h-100 object-fit-contain img-fluid"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                        />
                      </div>
                      <h6 className="small fw-bold text-dark text-truncate mb-1">{p.name}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted font-monospace">{p.category}</span>
                        <span className="small fw-bold text-primary font-monospace">${p.price}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
