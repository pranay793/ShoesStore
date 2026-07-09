import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

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
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-4 fw-extrabold font-display mb-3 text-uppercase"
            style={{ letterSpacing: '-1px' }}
          >
            Contact <span className="text-primary">Fluxlab Support</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead text-muted mx-auto" 
            style={{ maxWidth: '600px', fontSize: '1.05rem' }}
          >
            Have questions about sizing, tech specifications, or shipping routes? Send us a message and our support team will reply within 24 hours.
          </motion.p>
        </div>

        <div className="row g-5 mt-2 justify-content-center">

          {/* Info Column */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="d-flex flex-column gap-4 h-100 justify-content-between p-5 rounded-5"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
            >
              <div>
                <h3 className="h3 fw-bold font-display text-dark mb-4 text-uppercase">Direct Channels</h3>
                <div className="d-flex flex-column gap-3.5">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(0,107,255,0.08)' }}>
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <span className="small text-muted d-block">Email Support</span>
                      <a href="mailto:support@fluxrun.com" className="text-dark text-decoration-none fw-bold">support@fluxrun.com</a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-2">
                    <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(0,107,255,0.08)' }}>
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <span className="small text-muted d-block">Phone Support</span>
                      <a href="tel:+18005550199" className="text-dark text-decoration-none fw-bold">+1 (800) 555-0199</a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-2">
                    <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(0,107,255,0.08)' }}>
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <span className="small text-muted d-block">Laboratory HQ</span>
                      <span className="text-dark fw-bold">1420 Innovation Dr, Portland, OR</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-top border-light text-muted small">
                Looking for elite sponsorships? Contact our athletic coordination desk at <span className="text-dark fw-bold">athletes@fluxrun.com</span>.
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-5"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
            >
              {submitted ? (
                <div className="text-center py-5">
                  <div className="d-inline-flex p-4 bg-success-glow rounded-circle mb-4" style={{ backgroundColor: 'rgba(40,167,69,0.1)' }}>
                    <MessageSquare size={48} className="text-success" />
                  </div>
                  <h3 className="h3 fw-bold text-dark mb-2">MESSAGE SENT</h3>
                  <p className="text-muted">Thank you for reaching out. We will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="small text-muted text-uppercase tracking-wider fw-bold mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        className="form-control bg-light border-0 text-dark py-3 px-4 rounded-4" 
                        style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="small text-muted text-uppercase tracking-wider fw-bold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        className="form-control bg-light border-0 text-dark py-3 px-4 rounded-4" 
                        style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="small text-muted text-uppercase tracking-wider fw-bold mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className="form-control bg-light border-0 text-dark py-3 px-4 rounded-4" 
                      style={{ border: '1px solid rgba(0,0,0,0.08)', resize: 'none' }}
                      placeholder="Tell us about your questions or requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-flux-primary py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 mt-2"
                  >
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
};
