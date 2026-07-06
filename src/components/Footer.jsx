import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Send, ShieldCheck, Truck, RotateCcw, HelpCircle 
} from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary-50" style={{
      background: '#111111 !important',
      borderTop: '1px solid rgba(255, 255, 255, 0.08) !important'
    }}>
      {/* Brand Trust Badges */}
      <div className="container border-bottom border-secondary pb-5 mb-5">
        <div className="row g-4 text-center text-md-start">
          <div className="col-md-3 d-flex flex-column flex-md-row align-items-center gap-3">
            <div className="bg-white-10 p-3 rounded-circle text-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
              <Truck size={24} />
            </div>
            <div>
              <h6 className="fw-bold mb-1 text-white">Free Shipping</h6>
              <p className="small text-white mb-0">On all orders above $150</p>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column flex-md-row align-items-center gap-3">
            <div className="bg-white-10 p-3 rounded-circle text-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h6 className="fw-bold mb-1 text-white">30-Day Returns</h6>
              <p className="small text-white mb-0">Hassle-free sizing exchanges</p>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column flex-md-row align-items-center gap-3">
            <div className="bg-white-10 p-3 rounded-circle text-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h6 className="fw-bold mb-1 text-white">Secure Checkout</h6>
              <p className="small text-white mb-0">Encrypted merchant payments</p>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column flex-md-row align-items-center gap-3">
            <div className="bg-white-10 p-3 rounded-circle text-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
              <HelpCircle size={24} />
            </div>
            <div>
              <h6 className="fw-bold mb-1 text-white">24/7 Support</h6>
              <p className="small text-white mb-0">Contact our athlete guides</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-5">
          {/* Brand Info Column */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <img
                src="/logo.png"
                alt="FluxRun Logo"
                style={{
                  height: '44px',
                  objectFit: 'contain',
                  filter: 'invert(1) hue-rotate(180deg)'
                }}
              />
            </div>
            <p className="text-white small mb-4 pr-lg-4">
              At FluxRun, we design high-performance footwear that pushes the boundaries of human potential. Run beyond limits, break records, and conquer your goals with technology engineered for athletes.
            </p>
            <div className="d-flex gap-3">
              <motion.a whileHover={{ y: -3 }} href="#" className="text-white hover-white"><i className="bi bi-facebook fs-5"></i></motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-white hover-white"><i className="bi bi-twitter-x fs-5"></i></motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-white hover-white"><i className="bi bi-instagram fs-5"></i></motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-white hover-white"><i className="bi bi-youtube fs-5"></i></motion.a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-uppercase tracking-wider small mb-3 text-white">Shop Catalog</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/catalog?category=Running" className="text-white text-decoration-none hover-white">Running Shoes</Link></li>
              <li><Link to="/catalog?category=Training" className="text-white text-decoration-none hover-white">Training Sneakers</Link></li>
              <li><Link to="/catalog?category=Trail Running" className="text-white text-decoration-none hover-white">Trail Runners</Link></li>
              <li><Link to="/catalog?category=Lifestyle" className="text-white text-decoration-none hover-white">Lifestyle Knit</Link></li>
              <li><Link to="/catalog" className="text-white text-decoration-none hover-white">All Collection</Link></li>
            </ul>
          </div>

          {/* Company & Guide Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-uppercase tracking-wider small mb-3 text-white">Help & Guides</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-white text-decoration-none hover-white">Track Order</a></li>
              <li><a href="#" className="text-white text-decoration-none hover-white">Shipping Policy</a></li>
              <li><a href="#" className="text-white text-decoration-none hover-white">Refunds & Returns</a></li>
              <li><a href="#" className="text-white text-decoration-none hover-white">Size Chart Guide</a></li>
              <li><a href="#" className="text-white text-decoration-none hover-white">Athlete Program</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-uppercase tracking-wider small mb-3 text-white">Join the Club</h6>
            <p className="text-white small mb-3">
              Subscribe to unlock early drops, member-only sizing, and 10% off your first purchase.
            </p>
            {subscribed ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-primary-glow text-primary rounded-4 p-3 border border-primary-50 small"
                style={{ backgroundColor: 'rgba(11, 87, 255, 0.15)', borderColor: 'rgba(11, 87, 255, 0.3)' }}
              >
                🎉 Welcome to the club! Check your inbox for your code.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="input-group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-control bg-transparent text-white border-secondary small py-2 px-3 shadow-none"
                    style={{ borderRadius: '24px 0 0 24px', fontSize: '14px' }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center justify-content-center px-3"
                    style={{ borderRadius: '0 24px 24px 0' }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <hr className="my-4 opacity-10" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <span className="small text-white">
            © {new Date().getFullYear()} FluxRun Inc. All rights reserved. Move Faster. Go Further.
          </span>
          <div className="d-flex gap-4 small">
            <a href="#" className="text-white text-decoration-none hover-white">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none hover-white">Terms of Sale</a>
            <a href="#" className="text-white text-decoration-none hover-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
