import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ShieldCheck, ArrowLeft, CreditCard, Landmark, Check, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export const Checkout = () => {
  const { cart, getSubtotal, getDiscount, getShipping, getTotal, promoApplied, clearCart, setActiveOrder, activeOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  // Address State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    billingSame: true,
    deliveryMethod: 'standard', // standard, express
    paymentMethod: 'card', // card, upi, paypal
    // Card inputs
    cardNum: '',
    cardExpiry: '',
    cardCvv: '',
    // UPI ID
    upiId: ''
  });

  const [errors, setErrors] = useState({});

  // If cart is empty and no order has been checked out, show early return
  if (cart.length === 0 && !activeOrder) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Bag is Empty</h2>
        <Link to="/catalog" className="btn btn-primary mt-3">Go Shopping</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      tempErrors.email = "Please input a valid email address.";
    }
    if (!formData.phone.match(/^\+?[0-9]{7,15}$/)) {
      tempErrors.phone = "Provide a valid phone contact (7-15 digits).";
    }
    if (!formData.firstName) tempErrors.firstName = "First name is required.";
    if (!formData.lastName) tempErrors.lastName = "Last name is required.";
    if (!formData.address) tempErrors.address = "Address is required.";
    if (!formData.city) tempErrors.city = "City is required.";
    if (!formData.state) tempErrors.state = "State is required.";
    if (!formData.zip) tempErrors.zip = "ZIP code is required.";

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNum.replace(/\s/g, '').match(/^[0-9]{16}$/)) {
        tempErrors.cardNum = "Provide a 16-digit credit card number.";
      }
      if (!formData.cardExpiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
        tempErrors.cardExpiry = "Expiry format must be MM/YY.";
      }
      if (!formData.cardCvv.match(/^[0-9]{3,4}$/)) {
        tempErrors.cardCvv = "CVV must be 3 or 4 digits.";
      }
    }

    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.includes('@')) {
        tempErrors.upiId = "Enter a valid UPI address (e.g. user@bank).";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Create an order confirmation object
    const finalTotal = getTotal() + (formData.deliveryMethod === 'express' ? 15 : 0);
    const orderNum = `FLUX-${Math.floor(100000 + Math.random() * 900000)}`;
    const estDeliveryDate = new Date();
    estDeliveryDate.setDate(estDeliveryDate.getDate() + (formData.deliveryMethod === 'express' ? 1 : 3));

    const orderData = {
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deliveryDate: estDeliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      items: [...cart],
      address: formData,
      subtotal: getSubtotal(),
      discount: getDiscount(),
      shipping: getShipping() + (formData.deliveryMethod === 'express' ? 15 : 0),
      total: finalTotal
    };

    // Store in global state
    setActiveOrder(orderData);
    
    // Clear items in bag
    clearCart();

    // Route to success screen
    navigate('/order-success');
  };

  return (
    <div style={{ backgroundColor: 'var(--flux-background)', minHeight: '85vh' }} className="py-5">
      <div className="container">
        
        {/* Back Link */}
        <div className="mb-4">
          <Link to="/cart" className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 small">
            <ArrowLeft size={14} /> Back to Bag
          </Link>
          <h1 className="fw-bold font-display text-uppercase h2 mt-2">SECURE CHECKOUT</h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="row g-4">
            
            {/* INPUT DETAILS PANEL */}
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-4">
                
                {/* 1. Contact Info */}
                <div className="glass-panel p-4" style={{ backgroundColor: '#ffffff', borderRadius: '20px' }}>
                  <h5 className="fw-bold mb-3 font-display text-uppercase border-bottom border-light pb-2">1. CONTACT INFORMATION</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="small fw-semibold text-muted mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-semibold text-muted mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="eg. 1234567890"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Details */}
                <div className="glass-panel p-4" style={{ backgroundColor: '#ffffff', borderRadius: '20px' }}>
                  <h5 className="fw-bold mb-3 font-display text-uppercase border-bottom border-light pb-2">2. SHIPPING ADDRESS</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="small fw-semibold text-muted mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.firstName ? 'is-invalid' : ''}`}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-semibold text-muted mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.lastName ? 'is-invalid' : ''}`}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                    <div className="col-12">
                      <label className="small fw-semibold text-muted mb-1">Delivery Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Street Address, Suite, Apartment"
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-semibold text-muted mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.city ? 'is-invalid' : ''}`}
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-semibold text-muted mb-1">State / Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.state ? 'is-invalid' : ''}`}
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-semibold text-muted mb-1">ZIP / Postal Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`form-control form-control-flux ${errors.zip ? 'is-invalid' : ''}`}
                      />
                      {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-semibold text-muted mb-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="form-select bg-white border border-light py-2"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="col-12 mt-3">
                      <label className="d-flex align-items-center cursor-pointer small">
                        <input
                          type="checkbox"
                          name="billingSame"
                          checked={formData.billingSame}
                          onChange={handleInputChange}
                          className="flux-check-input me-2"
                        />
                        <span className="text-secondary fw-semibold">Billing address is same as shipping</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3. Delivery Method */}
                <div className="glass-panel p-4" style={{ backgroundColor: '#ffffff', borderRadius: '20px' }}>
                  <h5 className="fw-bold mb-3 font-display text-uppercase border-bottom border-light pb-2">3. SHIPPING METHOD</h5>
                  <div className="d-flex flex-column gap-3">
                    <label className={`d-flex justify-content-between align-items-center p-3 border rounded-3 cursor-pointer transition ${formData.deliveryMethod === 'standard' ? 'border-primary bg-primary-glow' : 'border-light'}`} style={{ backgroundColor: formData.deliveryMethod === 'standard' ? 'rgba(11,87,255,0.04)' : 'transparent' }}>
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="standard"
                          checked={formData.deliveryMethod === 'standard'}
                          onChange={handleInputChange}
                          className="flux-check-input"
                        />
                        <div>
                          <span className="fw-bold d-block text-dark">Standard Ground Shipping</span>
                          <span className="small text-muted">Arrives in 3 to 5 business days</span>
                        </div>
                      </div>
                      <span className="fw-bold font-monospace text-primary">{getSubtotal() > 150 ? 'FREE' : '$15'}</span>
                    </label>

                    <label className={`d-flex justify-content-between align-items-center p-3 border rounded-3 cursor-pointer transition ${formData.deliveryMethod === 'express' ? 'border-primary bg-primary-glow' : 'border-light'}`} style={{ backgroundColor: formData.deliveryMethod === 'express' ? 'rgba(11,87,255,0.04)' : 'transparent' }}>
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="express"
                          checked={formData.deliveryMethod === 'express'}
                          onChange={handleInputChange}
                          className="flux-check-input"
                        />
                        <div>
                          <span className="fw-bold d-block text-dark">Next-Day Air Express courier</span>
                          <span className="small text-muted">Shipped within 24 hours</span>
                        </div>
                      </div>
                      <span className="fw-bold font-monospace text-primary">{getSubtotal() > 150 ? '$15' : '$30'}</span>
                    </label>
                  </div>
                </div>

                {/* 4. Payment Gateway */}
                <div className="glass-panel p-4" style={{ backgroundColor: '#ffffff', borderRadius: '20px' }}>
                  <h5 className="fw-bold mb-3 font-display text-uppercase border-bottom border-light pb-2">4. SECURE PAYMENT CHANNEL</h5>
                  <div className="row g-3 mb-4">
                    {[
                      { val: "card", label: "Credit Card", icon: <CreditCard size={18} /> },
                      { val: "upi", label: "UPI Address", icon: <Landmark size={18} /> },
                      { val: "paypal", label: "PayPal", icon: <span className="small fw-bold">PP</span> }
                    ].map((p) => (
                      <div key={p.val} className="col-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: p.val }))}
                          className={`btn border w-100 py-3 d-flex flex-column align-items-center gap-2 rounded-3 text-secondary transition ${formData.paymentMethod === p.val ? 'border-primary text-primary fw-bold bg-primary-glow' : 'border-light'}`}
                          style={{
                            backgroundColor: formData.paymentMethod === p.val ? 'rgba(11, 87, 255, 0.04)' : 'transparent',
                            fontSize: '13px'
                          }}
                        >
                          {p.icon}
                          <span>{p.label}</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="row g-3"
                    >
                      <div className="col-12">
                        <label className="small fw-semibold text-muted mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNum"
                          value={formData.cardNum}
                          onChange={handleInputChange}
                          maxLength="16"
                          placeholder="4111 2222 3333 4444"
                          className={`form-control form-control-flux ${errors.cardNum ? 'is-invalid' : ''}`}
                        />
                        {errors.cardNum && <div className="invalid-feedback">{errors.cardNum}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-semibold text-muted mb-1">Expiration Date (MM/YY)</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          maxLength="5"
                          placeholder="12/28"
                          className={`form-control form-control-flux ${errors.cardExpiry ? 'is-invalid' : ''}`}
                        />
                        {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="small fw-semibold text-muted mb-1">CVV Code</label>
                        <input
                          type="password"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          maxLength="4"
                          placeholder="***"
                          className={`form-control form-control-flux ${errors.cardCvv ? 'is-invalid' : ''}`}
                        />
                        {errors.cardCvv && <div className="invalid-feedback">{errors.cardCvv}</div>}
                      </div>
                    </motion.div>
                  )}

                  {formData.paymentMethod === 'upi' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="col-12"
                    >
                      <label className="small fw-semibold text-muted mb-1">UPI Address (VPA)</label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="athlete@ybl"
                        className={`form-control form-control-flux ${errors.upiId ? 'is-invalid' : ''}`}
                      />
                      {errors.upiId && <div className="invalid-feedback">{errors.upiId}</div>}
                    </motion.div>
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 bg-light rounded-3 text-center"
                    >
                      <p className="small text-muted mb-0">PayPal checkout redirect will launch upon placing the order.</p>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>

            {/* ORDER SUMMARY COLLAPSIBLE CARD (Right) */}
            <div className="col-lg-4">
              <div className="glass-panel p-4 sticky-lg-top" style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', top: '100px' }}>
                <h4 className="fw-bold mb-4 font-display">ORDER SUMMARY</h4>
                
                {/* Product Summary Row */}
                <div style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }} className="mb-4 d-flex flex-column gap-3">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="d-flex align-items-center gap-2">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        style={{ width: '45px', height: '40px', objectFit: 'contain', backgroundColor: '#f8f9fc', borderRadius: '8px', padding: '2px' }} 
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'; }}
                      />
                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="small fw-bold mb-0 text-truncate text-dark">{item.product.name}</h6>
                        <span className="text-muted small font-monospace d-block" style={{ fontSize: '11px' }}>Size {item.selectedSize} | {item.selectedColor.name}</span>
                      </div>
                      <span className="small fw-bold font-monospace text-dark">{item.quantity}x ${item.product.price}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-3 opacity-10" />

                {/* Subtotals List */}
                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="d-flex justify-content-between align-items-center small">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-semibold font-monospace">${getSubtotal()}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="d-flex justify-content-between align-items-center small text-success">
                      <span>Promo Discount</span>
                      <span className="fw-semibold font-monospace">-${getDiscount()}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center small">
                    <span className="text-muted">Courier Shipping</span>
                    <span className="fw-semibold font-monospace">
                      {formData.deliveryMethod === 'express' 
                        ? `$${getShipping() + 15}` 
                        : getShipping() === 0 ? 'FREE' : `$${getShipping()}`}
                    </span>
                  </div>
                </div>

                <hr className="my-3 opacity-10" />

                {/* Total */}
                <div className="d-flex justify-content-between align-items-baseline mb-4">
                  <span className="h5 fw-bold text-dark font-display">TOTAL</span>
                  <span className="h4 fw-bold text-primary font-monospace">
                    ${getTotal() + (formData.deliveryMethod === 'express' ? 15 : 0)}
                  </span>
                </div>

                <button 
                  type="submit"
                  className="btn btn-flux-primary w-100 d-flex align-items-center justify-content-center gap-2 mb-3" 
                  style={{ height: '50px' }}
                >
                  <span>Authorize Order Payment</span>
                </button>

                <div className="d-flex align-items-center justify-content-center gap-2 text-muted small pt-2 border-top border-light">
                  <ShieldCheck size={16} className="text-success" />
                  <span>Secure checkout encrypted TLS 256-bit</span>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
