import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Bootstrap CSS & JS + Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom Style Tokens & Animations
import './styles/variables.css';
import './styles/global.css';

// Global Shopping Store Context
import { ShopProvider } from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>
);
