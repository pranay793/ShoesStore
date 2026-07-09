import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Zap } from 'lucide-react';

export const About = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', color: 'var(--flux-text)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container px-4 px-md-5">

        {/* Header Block */}
        <div className="text-center mb-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge rounded-pill px-3 py-1.5 small mb-3"
            style={{ backgroundColor: 'rgba(0, 162, 255, 0.15)', color: 'var(--flux-primary)', letterSpacing: '1px', textTransform: 'uppercase' }}
          >
            Our Mission
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-4 fw-extrabold font-display mb-3 text-uppercase"
            style={{ letterSpacing: '-1px' }}
          >
            We Engineer <span className="text-primary">Human Velocity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead text-secondary mx-auto"
            style={{ maxWidth: '700px', fontSize: '1.1rem' }}
          >
            FluxRun was founded in 2024 at the intersection of elite athlete feedback and precision biomechanics research. We build products for those who run beyond limits.
          </motion.p>
        </div>

        {/* Content Image Grid */}
        <div className="row g-5 align-items-center mt-4">
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="position-relative rounded-5 overflow-hidden"
              style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800&auto=format&fit=crop&q=80"
                alt="FluxRun Lab Testing"
                className="img-fluid w-100"
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className="position-absolute inset-0 bg-gradient-to-t" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)' }} />
            </motion.div>
          </div>
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="d-flex flex-column gap-4"
            >
              <h2 className="h2 fw-bold font-display text-uppercase text-dark">THE FLUXLAB DIFFERENCE</h2>
              <p className="text-muted">
                Every midsole compound, carbon-fiber plate layout, and micro-knit fiber pattern is vetted under extreme fatigue tests. We do not copy; we optimize vectors of force.
              </p>

              <div className="row g-4 mt-2">
                <div className="col-12 col-sm-6">
                  <div className="p-4 rounded-4" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)' }}>
                    <Zap className="text-primary mb-3" size={28} />
                    <h5 className="fw-bold text-dark mb-2">Energy Return</h5>
                    <p className="small text-muted mb-0">Our Nitro Elite foams return up to 88% of vertical force.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 rounded-4" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)' }}>
                    <ShieldCheck className="text-success mb-3" size={28} />
                    <h5 className="fw-bold text-dark mb-2">Durability Vetted</h5>
                    <p className="small text-muted mb-0">Engineered to retain shape and launch torque over 400+ miles.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 justify-content-center mt-5 text-center">
          <div className="col-6 col-md-3">
            <h2 className="display-4 fw-extrabold text-primary font-display mb-1">88%</h2>
            <span className="small text-muted text-uppercase tracking-wider">Avg Energy Return</span>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="display-4 fw-extrabold text-primary font-display mb-1">15+</h2>
            <span className="small text-muted text-uppercase tracking-wider">World Records Set</span>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="display-4 fw-extrabold text-primary font-display mb-1">240</h2>
            <span className="small text-muted text-uppercase tracking-wider">Lab Prototypes</span>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="display-4 fw-extrabold text-primary font-display mb-1">400k+</h2>
            <span className="small text-muted text-uppercase tracking-wider">Runners Vetted</span>
          </div>
        </div>

      </div>
    </div>
  );
};
