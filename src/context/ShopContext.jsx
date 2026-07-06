import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data/products';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  // Load initial cart and wishlist from localStorage if available
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('fluxrun_cart');
    return localCart ? JSON.parse(localCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const localWishlist = localStorage.getItem('fluxrun_wishlist');
    return localWishlist ? JSON.parse(localWishlist) : [];
  });

  const [compareList, setCompareList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [activeOrder, setActiveOrder] = useState(() => {
    const localOrder = localStorage.getItem('fluxrun_active_order');
    return localOrder ? JSON.parse(localOrder) : null;
  });
  
  // Track recently viewed products
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const localRecent = localStorage.getItem('fluxrun_recent');
    return localRecent ? JSON.parse(localRecent) : [];
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('fluxrun_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fluxrun_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fluxrun_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('fluxrun_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('fluxrun_active_order');
    }
  }, [activeOrder]);

  // Cart operations
  const addToCart = (product, color, size, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, selectedColor: color, selectedSize: size, quantity }];
      }
    });
  };

  const removeFromCart = (productId, colorName, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateCartQuantity = (productId, colorName, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, colorName, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedColor.name === colorName &&
        item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoApplied(null);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Product Comparison (max 3 products)
  const toggleCompare = (product) => {
    setCompareList((prevList) => {
      const exists = prevList.some((item) => item.id === product.id);
      if (exists) {
        return prevList.filter((item) => item.id !== product.id);
      } else {
        if (prevList.length >= 3) {
          alert('You can compare a maximum of 3 shoes at a time.');
          return prevList;
        }
        return [...prevList, product];
      }
    });
  };

  // Coupon promo code
  const applyPromoCode = (code) => {
    const promo = code.toUpperCase();
    if (promo === 'FLUX20') {
      setPromoApplied({ code: 'FLUX20', discountPercent: 20 });
      return { success: true, message: 'Promo code applied! 20% discount added.' };
    } else if (promo === 'RUNFREE') {
      setPromoApplied({ code: 'RUNFREE', discountPercent: 10 });
      return { success: true, message: 'Promo code applied! 10% discount added.' };
    }
    return { success: false, message: 'Invalid promo code. Try FLUX20 or RUNFREE.' };
  };

  const removePromoCode = () => {
    setPromoApplied(null);
  };

  // Recently viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prevRecent) => {
      // Remove product if it already exists to move it to the front
      const filtered = prevRecent.filter((item) => item.id !== product.id);
      // Keep only last 4 items
      return [product, ...filtered].slice(0, 4);
    });
  };

  // Calculations
  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const finalPrice = item.product.price;
      return total + finalPrice * item.quantity;
    }, 0);
  };

  const getDiscount = () => {
    const subtotal = getSubtotal();
    if (!promoApplied) return 0;
    return (subtotal * promoApplied.discountPercent) / 100;
  };

  const getShipping = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal > 150 ? 0 : 15; // Free shipping above $150
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShipping();
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        compareList,
        recentlyViewed,
        searchQuery,
        promoApplied,
        activeOrder,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        toggleCompare,
        applyPromoCode,
        removePromoCode,
        addToRecentlyViewed,
        setActiveOrder,
        getSubtotal,
        getDiscount,
        getShipping,
        getTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
