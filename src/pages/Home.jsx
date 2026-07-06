import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ArrowRight, ShieldCheck, RefreshCw, Truck, Zap, Activity, Award, Star, 
  ChevronLeft, ChevronRight, Play, Quote, X, Layers, Wind, Sparkles, ArrowUpRight
} from 'lucide-react';

export const Home = () => {
  const { products } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('new'); // new, top, limited
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Handle window width for responsive testimonial card stacks
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // --- HERO SLIDER STATE & DATA ---
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      title: "NIKE VAPORFLY RACING",
      subtitle: "THE RECORD CHASER",
      tagline: "Run Beyond Limits",
      desc: "Full-length carbon fiber launch plates trigger continuous forward torque for racing speeds. shatters personal records on asphalt.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&auto=format&fit=crop&q=80",
      stats: [{ val: "190g", label: "Elite weight" }, { val: "88%", label: "Energy Return" }],
      tagColor: "var(--flux-primary)",
      glowColor: "rgba(11, 87, 255, 0.25)"
    },
    {
      title: "NIKE AIR MAX PREMIUM",
      subtitle: "UNLIMITED IMPACT CONTROLS",
      tagline: "Air-Infused Stride Dynamics",
      desc: "Vacuum-pressured visible Air units supply localized cushioning to soften heel landings and prevent stride fatigue.",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&auto=format&fit=crop&q=80",
      stats: [{ val: "12mm", label: "Max Cushion" }, { val: "25%", label: "Impact Relief" }],
      tagColor: "var(--flux-danger)",
      glowColor: "rgba(255, 59, 48, 0.2)"
    },
    {
      title: "NIKE PEGASUS ZOOM",
      subtitle: "FLY HIGH. RUN SOFT.",
      tagline: "Responsive Flywire Lockdown",
      desc: "High-density cable grids wrap the midfoot arches for responsive security at top velocity. Crafted for daily training.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&auto=format&fit=crop&q=80",
      stats: [{ val: "215g", label: "Featherweight" }, { val: "React", label: "Midsole Tech" }],
      tagColor: "var(--flux-accent)",
      glowColor: "rgba(0, 229, 255, 0.2)"
    }
  ];

  // Auto slide hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextHero = () => {
    setHeroIndex((heroIndex + 1) % heroSlides.length);
  };
  
  const prevHero = () => {
    setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length);
  };

  // --- TESTIMONIALS SLIDER STATE & DATA ---
  const [testiIndex, setTestiIndex] = useState(0);
  const testimonials = [
    {
      quote: "The VaporFly completely changed my racing stride. The rebound from the carbon plate feels like a spring, and I shaved 45 seconds off my half-marathon PR on the first run.",
      author: "Marcus Vance",
      role: "Elite Marathoner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&auto=format&fit=crop&q=80"
    },
    {
      quote: "I use the Trail Beast for rugged mud runs. The traction on wet rocks is incredible, and the integrated rock guard protects my toes from sharp stones without sacrificing flexibility.",
      author: "Elena Rostova",
      role: "Obstacle Course Racer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop&q=80"
    },
    {
      quote: "The Urban Motion knits are my go-to travel sneakers. I walk 15,000+ steps daily in different cities and my feet feel refreshed at night. They look sharp with everything.",
      author: "David Kim",
      role: "Travel Content Creator",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80"
    },
    {
      quote: "As a running coach, foot health is my top priority. The gas-infused foam provides unparalleled impact relief. My knees feel great even after a 20-mile weekend training run.",
      author: "Sarah Jenkins",
      role: "Trail Coach & Ultrarunner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80"
    },
    {
      quote: "I love the speed transition of the sprint plates. They provide instant energy return, making my intervals feel explosive. Highly recommend them for track athletes.",
      author: "Liam O'Connor",
      role: "Competitive Sprinter",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&auto=format&fit=crop&q=80"
    },
    {
      quote: "The custom heel lockdown keeps my foot perfectly centered during high-intensity training. No slippage, no blisters, just ultimate security at peak velocities.",
      author: "Sophia Martinez",
      role: "Fitness & Strength Trainer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&auto=format&fit=crop&q=80"
    }
  ];

  const visibleCards = isMobile ? 1 : windowWidth < 992 ? 2 : 3;
  const maxIndex = testimonials.length - visibleCards;
  const gap = 24; // 1.5rem
  const cardWidth = containerWidth ? (containerWidth - (visibleCards - 1) * gap) / visibleCards : 300;
  const translateX = testiIndex * (cardWidth + gap);

  const nextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevTesti = () => {
    setTestiIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  // Auto slide testimonials
  useEffect(() => {
    if (maxIndex <= 0) return;
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [maxIndex]);


  // Filter products for tabs
  const getTabProducts = () => {
    switch (activeTab) {
      case 'top':
        return products.filter(p => p.rating >= 4.8).slice(0, 3);
      case 'limited':
        return products.filter(p => p.stock <= 10).slice(0, 3);
      case 'new':
      default:
        return products.slice(0, 3);
    }
  };

  // Benefits
  const benefits = [
    { icon: <Layers size={24} />, title: "Carbon Plate Tech", desc: "Full length snap-action carbon plate drives you forward with every stride." },
    { icon: <Wind size={24} />, title: "AirWeave Upper", desc: "Seamless breathable engineered knit fits like a sock, cooling you down." },
    { icon: <Zap size={24} />, title: "EnergyFloat Foam", desc: "Proprietary gas-infused midsole returns 85% of your landing energy." },
    { icon: <Activity size={24} />, title: "VibramGrip Lugging", desc: "Ultra traction rubber prevents sliding on mud, wet concrete, and trails." }
  ];

  // Timeline
  const timelineEvents = [
    { year: "2022", title: "The Spark", desc: "FluxRun founded with a mission to develop the world's most responsive cushioning foam." },
    { year: "2023", title: "Carbon Breakthrough", desc: "Integrated curved carbon plates into consumer road running shoes, shaving minutes off marathon times." },
    { year: "2024", title: "Zero Impact", desc: "Launched recycled AirWeave upper mesh reducing carbon emissions by 40% per shoe." },
    { year: "2026", title: "Future Vector", desc: "Introducing neural foot tracking overlays for personalized stride tuning." }
  ];

  const currentHero = heroSlides[heroIndex];

  return (
    <div style={{ backgroundColor: 'var(--flux-background)', overflowX: 'hidden' }}>
      
      {/* REDESIGNED HERO SECTION WITH SLIDER */}
      <section className="position-relative overflow-hidden py-5 d-flex align-items-center" style={{
        minHeight: '85vh',
        background: 'radial-gradient(circle at 80% 20%, rgba(17,17,17,0.03) 0%, rgba(248, 249, 252, 1) 100%)'
      }}>
        {/* Glow lights mapping active slide */}
        <div style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: currentHero.glowColor,
          filter: 'blur(60px)',
          top: '10%',
          right: '5%',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.5s ease-in-out'
        }} />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            
            {/* Hero Content Left */}
            <div className="col-lg-6 text-center text-lg-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="d-inline-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm border border-light mb-3">
                    <span className="badge rounded-pill px-2 py-1 small" style={{ backgroundColor: currentHero.tagColor }}>
                      {currentHero.tagline.toUpperCase()}
                    </span>
                    <span className="text-secondary small fw-bold d-flex align-items-center gap-1">
                      {currentHero.subtitle} <Sparkles size={12} className="text-warning" />
                    </span>
                  </div>

                  <h1 className="display-4 fw-extrabold tracking-tight mb-3 font-display text-uppercase" style={{ lineHeight: '1.1' }}>
                    {currentHero.title.split(' ')[0]} <br />
                    <span className="text-gradient">{currentHero.title.split(' ').slice(1).join(' ')}</span>
                  </h1>

                  <p className="lead text-muted mb-4 px-md-5 px-lg-0" style={{ fontSize: '1.05rem' }}>
                    {currentHero.desc}
                  </p>

                  <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 mb-5">
                    <Link to="/catalog" className="btn btn-flux-primary d-flex align-items-center justify-content-center gap-2">
                      <span>Shop Nike Collection</span>
                      <ChevronRight size={18} />
                    </Link>
                    <a href="#about" className="btn btn-flux-secondary d-flex align-items-center justify-content-center gap-2">
                      <Play size={16} fill="currentColor" />
                      <span>Deflection Specs</span>
                    </a>
                  </div>

                  {/* Active Stats */}
                  <div className="row g-4 justify-content-center justify-content-lg-start">
                    {currentHero.stats.map((s, idx) => (
                      <div key={idx} className="col-4 col-sm-3 text-center text-lg-start">
                        <h3 className="h2 fw-bold text-dark mb-0 font-display">{s.val}</h3>
                        <span className="small text-muted">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hero Image Right (Slider with overlay angle checks) */}
            <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center">
              {/* Outer Slider Navigation Arrows */}
              <button 
                onClick={prevHero}
                className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center p-2 position-absolute"
                style={{ left: '-25px', zIndex: 10, width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.85)' }}
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={nextHero}
                className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center p-2 position-absolute"
                style={{ right: '-25px', zIndex: 10, width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.85)' }}
              >
                <ChevronRight size={20} />
              </button>

              <div className="position-relative d-flex justify-content-center align-items-center" style={{ width: '100%', maxWidth: '480px', height: '360px' }}>
                {/* Rotating Outer Ring */}
                <div className="spin-slow position-absolute" style={{
                  width: '320px',
                  height: '320px',
                  border: '2px dashed rgba(11, 87, 255, 0.12)',
                  borderRadius: '50%',
                  zIndex: 0
                }} />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroIndex}
                    initial={{ opacity: 0, scale: 0.75, rotate: -25, y: 15 }}
                    animate={{ opacity: 1, scale: 1, rotate: -12, y: 0 }}
                    exit={{ opacity: 0, scale: 0.75, rotate: -5, y: -15 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                    src={currentHero.image}
                    alt={currentHero.title}
                    className="img-fluid position-relative"
                    style={{
                      zIndex: 2,
                      filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.18))',
                      maxHeight: '270px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'; }}
                  />
                </AnimatePresence>

                {/* Floating active badges */}
                <div className="glass-panel position-absolute px-3 py-2 text-dark shadow-sm d-flex align-items-center gap-2 border border-light" style={{ top: '15%', left: '0', zIndex: 3 }}>
                  <Award className="text-primary" size={14} />
                  <span className="small fw-bold">Nike ZoomX™</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Dot Indicators */}
          <div className="d-flex justify-content-center gap-2 mt-5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className="btn p-0 border-0 rounded-circle"
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: heroIndex === idx ? 'var(--flux-primary)' : 'rgba(0,0,0,0.15)',
                  transform: heroIndex === idx ? 'scale(1.25)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR (MARQUEE) */}
      <section className="py-4 border-top border-bottom border-light" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid px-0">
          <div className="marquee-container">
            <div className="marquee-content" style={{ gap: '8rem' }}>
              {/* Brand Logos with Text (Nike, Adidas, Under Armour, New Balance, Converse, Reebok) */}
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M21 6.5c-2.3 1.8-6.9 5-10.4 7.6-1.5 1.1-2.9 2-3.8 2.5-.9.4-1.4.5-1.7.5-.2 0-.3-.1-.3-.2 0-.2.2-.7.8-1.5.8-1 2.3-2.9 4.3-5.3.6-.7.5-1.2-.2-1-.7.2-2.1.8-3.9 1.8-1.8 1-3.6 2.3-4.8 3.5-1 1-.9 1.8.2 2 1.3.2 3.6-.3 6.3-1.6 4-1.9 9.9-6.4 13.7-9.6.2-.2.1-.2 0-.2z"/></svg><span>NIKE</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M1.5 20h3.5l4-7H5.5L1.5 20zm5 0h3.5l7-12.25h-3.5L6.5 20zm5 0h3.5L21.5 2.5H18L11.5 20z"/></svg><span>ADIDAS</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M12 3C9 3 6.5 5.2 6 8c2.2-.8 4-2.5 5-4.5 1 2 2.8 3.7 5 4.5-.5-2.8-3-5-6-5zm0 18c3 0 5.5-5.2 6-8-2.2.8-4 2.5-5 4.5-1-2-2.8-3.7-5-4.5.5 2.8 3 5 6 5z"/></svg><span>UNDER ARMOUR</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M4 18h2.5v-7l5.5 7h3V6h-2.5v7l-5.5-7H4v12zm11.5-12h6.5v2.5h-6.5V6zm0 4h6.5v2.5h-6.5v-2.5zm0 4h6.5v2.5h-6.5v-2.5z"/></svg><span>NEW BALANCE</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 7.5l1.4 2.8 3.1.5-2.3 2.2.5 3.1-2.7-1.4-2.7 1.4.5-3.1-2.3-2.2 3.1-.5z"/></svg><span>CONVERSE</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M1.5 6L18 1.5l1.5 1L1.5 8z M1.5 18L18 22.5l1.5-1L1.5 16z M10 5.5l11.5 4v3L10 18.5z"/></svg><span>REEBOK</span></div>
              {/* Loop Duplicate for Marquee */}
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M21 6.5c-2.3 1.8-6.9 5-10.4 7.6-1.5 1.1-2.9 2-3.8 2.5-.9.4-1.4.5-1.7.5-.2 0-.3-.1-.3-.2 0-.2.2-.7.8-1.5.8-1 2.3-2.9 4.3-5.3.6-.7.5-1.2-.2-1-.7.2-2.1.8-3.9 1.8-1.8 1-3.6 2.3-4.8 3.5-1 1-.9 1.8.2 2 1.3.2 3.6-.3 6.3-1.6 4-1.9 9.9-6.4 13.7-9.6.2-.2.1-.2 0-.2z"/></svg><span>NIKE</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M1.5 20h3.5l4-7H5.5L1.5 20zm5 0h3.5l7-12.25h-3.5L6.5 20zm5 0h3.5L21.5 2.5H18L11.5 20z"/></svg><span>ADIDAS</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M12 3C9 3 6.5 5.2 6 8c2.2-.8 4-2.5 5-4.5 1 2 2.8 3.7 5 4.5-.5-2.8-3-5-6-5zm0 18c3 0 5.5-5.2 6-8-2.2.8-4 2.5-5 4.5-1-2-2.8-3.7-5-4.5.5 2.8 3 5 6 5z"/></svg><span>UNDER ARMOUR</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M4 18h2.5v-7l5.5 7h3V6h-2.5v7l-5.5-7H4v12zm11.5-12h6.5v2.5h-6.5V6zm0 4h6.5v2.5h-6.5v-2.5zm0 4h6.5v2.5h-6.5v-2.5z"/></svg><span>NEW BALANCE</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 7.5l1.4 2.8 3.1.5-2.3 2.2.5 3.1-2.7-1.4-2.7 1.4.5-3.1-2.3-2.2 3.1-.5z"/></svg><span>CONVERSE</span></div>
              <div className="partner-brand"><svg viewBox="0 0 24 24" width="32" height="32"><path d="M1.5 6L18 1.5l1.5 1L1.5 8z M1.5 18L18 22.5l1.5-1L1.5 16z M10 5.5l11.5 4v3L10 18.5z"/></svg><span>REEBOK</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY SPORT CATEGORIES */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>CATEGORIES</span>
            <h2 className="display-5 fw-bold font-display">SHOP BY SPORT</h2>
            <p className="text-muted">Aesthetic gear calibrated specifically for your focus</p>
          </div>

          <div className="row g-4">
            {[
              { title: "Running", desc: "Energy & speed on asphalt", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80", link: "/catalog?category=Running" },
              { title: "Training", desc: "Stability & power in the gym", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&auto=format&fit=crop&q=80", link: "/catalog?category=Training" },
              { title: "Walking", desc: "All-day plush memory foam", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&auto=format&fit=crop&q=80", link: "/catalog?category=Walking" },
              { title: "Lifestyle", desc: "Street design, active soul", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80", link: "/catalog?category=Lifestyle" }
            ].map((cat, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <Link to={cat.link} className="text-decoration-none">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="flux-card p-0 overflow-hidden text-white"
                    style={{
                      height: '350px',
                      borderRadius: '24px',
                      backgroundImage: `linear-gradient(to top, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.2) 60%, rgba(17,17,17,0) 100%), url(${cat.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '24px'
                    }}
                  >
                    <div className="p-3">
                      <h4 className="fw-bold mb-1 text-white font-display">{cat.title}</h4>
                      <p className="small text-white-50 mb-0 d-flex align-items-center gap-1">
                        <span>{cat.desc}</span>
                        <ArrowUpRight size={14} className="text-primary" />
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SNEAKERS GRID */}
      <section className="py-5 bg-white border-top border-bottom border-light">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>FEATURED PRODUCTS</span>
              <h2 className="display-5 fw-bold font-display">TRENDING RELEASES</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="d-flex bg-light p-1 rounded-pill mt-3 mt-md-0" style={{ maxWidth: '360px' }}>
              {['new', 'top', 'limited'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn btn-sm px-4 rounded-pill border-0 py-2 small fw-bold font-monospace text-uppercase transition-all`}
                  style={{
                    backgroundColor: activeTab === tab ? 'var(--flux-primary)' : 'transparent',
                    color: activeTab === tab ? '#ffffff' : 'var(--flux-text-muted)'
                  }}
                >
                  {tab === 'new' ? 'New' : tab === 'top' ? 'Top Rated' : 'Limited'}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards */}
          <div className="row g-4">
            {getTabProducts().map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/catalog" className="btn btn-flux-secondary px-5">View Full Catalog</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE FLUXRUN */}
      <section className="py-5 bg-light" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Graphics */}
            <div className="col-lg-6">
              <div className="position-relative p-5 d-flex justify-content-center align-items-center" style={{
                background: 'radial-gradient(circle, rgba(11, 87, 255, 0.1) 0%, rgba(0,0,0,0) 70%)',
                minHeight: '380px'
              }}>
                <div className="spin-slow position-absolute" style={{
                  width: '280px',
                  height: '280px',
                  border: '2px dotted var(--flux-primary)',
                  borderRadius: '50%',
                  opacity: 0.15
                }} />
                
                <motion.img 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  src="/green-shoe.png" 
                  alt="Aesthetic Sole Render" 
                  className="img-fluid position-relative rounded-4"
                  style={{
                    maxHeight: '260px',
                    filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))',
                    transform: 'rotate(20deg)'
                  }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'; }}
                />

                {/* Tech Highlights */}
                <div className="glass-panel position-absolute bg-white px-3 py-2 text-dark shadow-sm d-flex align-items-center gap-2 border border-light" style={{ top: '10%', right: '10%' }}>
                  <Zap size={14} className="text-warning" />
                  <span className="small fw-semibold">Anti-Slip Lugs</span>
                </div>
                <div className="glass-panel position-absolute bg-white px-3 py-2 text-dark shadow-sm d-flex align-items-center gap-2 border border-light" style={{ bottom: '10%', left: '10%' }}>
                  <Activity size={14} className="text-primary" />
                  <span className="small fw-semibold">Plush Foam</span>
                </div>
              </div>
            </div>

            {/* Right Bullet Points */}
            <div className="col-lg-6">
              <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>BIOMECHANICS</span>
              <h2 className="display-6 fw-bold font-display mb-4">ENGINEERED FOR SUPREME PERFORMANCE</h2>
              <p className="text-muted mb-4">
                Every line, seam, and pattern on a FluxRun shoe is mathematically positioned to optimize gait dynamics, reduce joint shock, and recycle landing impacts.
              </p>

              <div className="row g-4">
                {benefits.map((b, idx) => (
                  <div key={idx} className="col-sm-6">
                    <div className="d-flex gap-3">
                      <div className="text-primary mt-1">{b.icon}</div>
                      <div>
                        <h6 className="fw-bold mb-1">{b.title}</h6>
                        <p className="small text-muted mb-0">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH TIMELINE */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'rgba(11,87,255,0.2)' }}>TIMELINE</span>
            <h2 className="display-6 fw-bold text-white font-display">MILESTONES OF INNOVATION</h2>
            <p className="text-white-50">Tracing our commitment to performance over the years</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline-container">
                {timelineEvents.map((event, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                      <h4 className="fw-bold text-white font-display mb-0">{event.title}</h4>
                      <span className="badge bg-primary font-monospace px-3 py-1 rounded-pill mt-1 mt-sm-0">{event.year}</span>
                    </div>
                    <p className="text-white-50 mb-0 small">{event.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION (3-Box Sliding Carousel) */}
      <section className="py-5 bg-white border-top border-bottom border-light position-relative" style={{ overflow: 'hidden' }}>
        {/* Floating background glow lights */}
        <div 
          className="float-glow-left position-absolute" 
          style={{
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11, 87, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(45px)',
            top: '5%',
            left: '-10%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        <div 
          className="float-glow-right position-absolute" 
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(50px)',
            bottom: '5%',
            right: '-10%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>TESTIMONIALS</span>
            <h2 className="display-5 fw-bold font-display">ATHLETE TRUST</h2>
            <p className="text-muted">Proven on tracks, trails, and urban pavements around the globe</p>
          </div>

          <div className="position-relative px-4 px-md-5">
            {/* Testimonials Left Arrow */}
            <button 
              onClick={prevTesti}
              className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center p-2 position-absolute"
              style={{ left: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.9)' }}
              disabled={maxIndex <= 0}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Testimonials Right Arrow */}
            <button 
              onClick={nextTesti}
              className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center p-2 position-absolute"
              style={{ right: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.9)' }}
              disabled={maxIndex <= 0}
            >
              <ChevronRight size={20} />
            </button>

            {/* Carousel Viewport */}
            <div ref={containerRef} style={{ overflow: 'hidden', width: '100%', padding: '15px 0' }}>
              <motion.div 
                className="d-flex"
                animate={{ x: -translateX }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
              >
                {testimonials.map((testi, idx) => {
                  const isHighlighted = (visibleCards === 3 && idx === testiIndex + 1) || (visibleCards !== 3 && idx === testiIndex);
                  
                  return (
                    <motion.div 
                      key={idx} 
                      style={{ 
                        width: `${cardWidth}px`, 
                        marginRight: `${gap}px`, 
                        flexShrink: 0,
                        padding: '12px 0'
                      }}
                      animate={{
                        scale: isHighlighted ? 1.04 : 0.96,
                        opacity: isHighlighted ? 1 : 0.82
                      }}
                      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    >
                      <div
                        className={`testimonial-card-premium p-4 p-md-5 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden ${isHighlighted ? 'card-highlighted' : ''}`}
                        style={{
                          minHeight: '270px'
                        }}
                      >
                        {/* Decorative Quote Icon */}
                        <motion.div 
                          className="position-absolute" 
                          style={{ 
                            top: '15px', 
                            left: '20px', 
                            color: isHighlighted ? 'var(--flux-primary)' : 'var(--flux-secondary)',
                            opacity: isHighlighted ? 0.08 : 0.03,
                            pointerEvents: 'none' 
                          }}
                          animate={{
                            y: isHighlighted ? [0, -5, 0] : 0
                          }}
                          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        >
                          <Quote size={80} fill="currentColor" />
                        </motion.div>
                        
                        <div>
                          {/* Star Rating */}
                          <div className="d-flex text-warning mb-3">
                            {[...Array(testi.rating)].map((_, i) => (
                              <Star key={i} size={15} fill="var(--flux-warning)" color="var(--flux-warning)" />
                            ))}
                          </div>

                          {/* Testimonial Quote */}
                          <p className="text-secondary font-display fs-6 mb-4 italic" style={{ lineHeight: '1.65', fontSize: '0.94rem' }}>
                            "{testi.quote}"
                          </p>
                        </div>

                        {/* Athlete Details */}
                        <div className="d-flex align-items-center gap-3 pt-3 border-top border-light-subtle">
                          <div className={`rounded-circle ${isHighlighted ? 'avatar-ring-pulse' : ''}`} style={{ padding: '2px' }}>
                            <img 
                              src={testi.avatar} 
                              alt={testi.author} 
                              style={{ 
                                width: '46px', 
                                height: '46px', 
                                borderRadius: '50%', 
                                objectFit: 'cover', 
                                border: '2px solid var(--flux-primary)',
                                boxShadow: '0 0 8px rgba(11, 87, 255, 0.12)'
                              }} 
                            />
                          </div>
                          <div className="text-start">
                            <h6 className="fw-bold mb-0 text-dark font-display" style={{ fontSize: '0.9rem' }}>{testi.author}</h6>
                            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{testi.role}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Testimonials Slider Dots */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              {[...Array(maxIndex + 1)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestiIndex(idx)}
                  className="btn p-0 border-0 rounded-circle"
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: testiIndex === idx ? 'var(--flux-primary)' : 'rgba(0,0,0,0.15)',
                    transform: testiIndex === idx ? 'scale(1.25)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* TECH VIDEO PREVIEW */}
      <section className="py-5 bg-dark text-white position-relative" style={{
        backgroundImage: 'linear-gradient(rgba(17,17,17,0.85), rgba(17,17,17,0.85)), url(https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&auto=format&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container text-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="btn btn-primary rounded-circle p-4 d-inline-flex align-items-center justify-content-center mb-4 shadow-lg cursor-pointer"
            style={{ width: '80px', height: '80px', backgroundColor: 'var(--flux-primary)' }}
            onClick={() => setIsVideoOpen(true)}
          >
            <Play size={32} fill="#ffffff" className="ms-1" />
          </motion.div>
          <h2 className="display-6 fw-bold font-display text-white mb-2 text-uppercase">WATCH LAB TECH TESTING</h2>
          <p className="text-white mx-auto" style={{ maxWidth: '600px', opacity: 0.85 }}>
            See how the dual-density EnergyFloat foam performs under 3D force-plate modeling, yielding 25% more rebound than standard EVA midsoles.
          </p>
        </div>
      </section>

      {/* Cinematic Video Overlay Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              zIndex: 9999,
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="btn btn-link text-white position-absolute border-0 p-3"
              style={{ top: '20px', right: '20px', zIndex: 10000 }}
            >
              <X size={36} />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-100 px-3"
              style={{ maxWidth: '960px' }}
            >
              <div className="ratio ratio-16x9 shadow-2xl border border-secondary rounded-4 overflow-hidden bg-black">
                <iframe
                  src="https://www.youtube.com/embed/M1v9iI-5Xio?autoplay=1"
                  title="Lab Tech Testing Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM GALLERY */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'var(--flux-primary-glow)' }}>SOCIAL GRID</span>
            <h2 className="display-6 fw-bold font-display">SHARED VIA #FLUXRUN</h2>
            <p className="text-muted">See how the community styles and pushes limits worldwide</p>
          </div>

          <div className="row g-3">
            {[
              "https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1486218119243-13883505764c?w=300&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=300&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&auto=format&fit=crop&q=80"
            ].map((img, idx) => (
              <div key={idx} className="col-lg-2 col-md-4 col-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-4 overflow-hidden shadow-sm"
                  style={{ height: '180px' }}
                >
                  <img src={img} alt="Instagram Showcase" className="w-100 h-100 object-fit-cover" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
