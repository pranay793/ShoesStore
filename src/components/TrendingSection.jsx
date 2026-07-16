import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { PremiumProductCard } from './PremiumProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Autoplay, Keyboard, A11y, EffectCoverflow } from 'swiper/modules';

// Import CSS and Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../styles/TrendingSection.css';

export const TrendingSection = () => {
  const { products } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('new'); // new, top, limited

  // Generate lightweight floating background particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const list = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${10 + Math.random() * 12}s`,
      scale: 0.3 + Math.random() * 0.7
    }));
    setParticles(list);
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="trending-section text-center text-white py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Products...</span>
        </div>
      </div>
    );
  }

  // Filter products for the premium tabs
  const getTabProducts = () => {
    switch (activeTab) {
      case 'top':
        return products.filter(p => p.rating >= 4.7).slice(0, 8);
      case 'limited':
        return products.filter(p => p.stock <= 15).slice(0, 8);
      case 'new':
      default:
        return products.slice(0, 8);
    }
  };

  const filteredProducts = getTabProducts();

  return (
    <section className="trending-section" id="trending-releases">
      {/* Dynamic Background Overlays */}
      <div className="noise-overlay" />
      <div className="light-ray-spotlight" />

      {/* Floating Animated Blobs */}
      <div className="luxury-blob blob-1" />
      <div className="luxury-blob blob-2" />
      <div className="luxury-blob blob-3" />

      {/* Floating Light Particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="luxury-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              transform: `scale(${p.scale})`
            }}
          />
        ))}
      </div>

      <div className="container position-relative" style={{ zIndex: 5 }}>
        {/* Header Title Grid */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
          <div className="text-start">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2 d-inline-flex align-items-center gap-1.5" style={{ backgroundColor: 'rgba(0, 162, 255, 0.12)', fontSize: '0.75rem', letterSpacing: '1px' }}>
              <Sparkles size={12} className="text-primary animate-pulse" />
              FEATURED COLLECTIONS
            </span>
            <h2 className="display-5 fw-extrabold font-display text-white tracking-tight mb-0">
              TRENDING RELEASES
            </h2>
          </div>
          
          {/* Futuristic Filter Tabs */}
          <div 
            className="d-flex p-1 rounded-pill mt-4 mt-md-0 border" 
            style={{ 
              maxWidth: '380px', 
              background: 'rgba(255, 255, 255, 0.03)', 
              borderColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {['new', 'top', 'limited'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="btn btn-sm px-4 rounded-pill border-0 py-2 small fw-bold font-monospace text-uppercase transition-all position-relative"
                style={{
                  backgroundColor: activeTab === tab ? 'var(--flux-primary)' : 'transparent',
                  color: activeTab === tab ? '#050508' : 'rgba(255, 255, 255, 0.6)',
                  boxShadow: activeTab === tab ? '0 4px 15px rgba(0, 162, 255, 0.4)' : 'none',
                  zIndex: 2,
                  fontSize: '0.75rem',
                  letterSpacing: '1px'
                }}
              >
                {tab === 'new' ? 'New' : tab === 'top' ? 'Top Rated' : 'Limited'}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Slider with Floating Arrow controls */}
        <div className="trending-carousel-container position-relative">
          <Swiper
            key={activeTab} // Force Swiper reinitialization on tab switch
            modules={[Navigation, Mousewheel, Autoplay, Keyboard, A11y, EffectCoverflow]}
            className="trending-carousel"
            loop={filteredProducts.length >= 3} // Loop works with 3+ slides when slidesPerView is 3
            centeredSlides={true}
            effect={'coverflow'}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            mousewheel={{
              forceToAxis: true
            }}
            keyboard={{
              enabled: true
            }}
            a11y={{
              prevSlideMessage: 'Previous release',
              nextSlideMessage: 'Next release'
            }}
            navigation={{
              prevEl: '.nav-arrow-left',
              nextEl: '.nav-arrow-right'
            }}
            preventClicks={false} // Disable Swiper click prevention to allow custom card clicks
            preventClicksPropagation={false} // Ensure clicks are not intercepted by Swiper handlers
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
                centeredSlides: false
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 40,
                centeredSlides: true
              }
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <PremiumProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left and Right Floating Navigation Arrows centered vertically */}
          <button 
            className="nav-arrow-btn nav-arrow-left" 
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="nav-arrow-btn nav-arrow-right" 
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
