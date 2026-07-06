import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AnimatePresence, motion } from 'framer-motion';

// Scroll To Top component to reset window scroll on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animated Page Wrapper for smooth route transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } 
        />
        <Route 
          path="/catalog" 
          element={
            <PageWrapper>
              <Catalog />
            </PageWrapper>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <PageWrapper>
              <ProductDetails />
            </PageWrapper>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PageWrapper>
              <CartPage />
            </PageWrapper>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <PageWrapper>
              <Checkout />
            </PageWrapper>
          } 
        />
        <Route 
          path="/order-success" 
          element={
            <PageWrapper>
              <OrderSuccess />
            </PageWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--flux-background)' }}>
        <Navbar />
        <main className="flex-grow-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
