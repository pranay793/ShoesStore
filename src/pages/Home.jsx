import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
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

  // Handle window width for responsive layout
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

  // --- HERO PARALLAX COORDINATE TRACKING ---
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleHeroMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2); // -1 to 1
    const y = (clientY - top - height / 2) / (height / 2); // -1 to 1
    setCoords({ x, y });
  };
  const handleHeroMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  // --- HERO SLIDER STATE & DATA ---
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeVariants, setActiveVariants] = useState({ 0: 0, 1: 0, 2: 0 });

  const heroSlides = [
    {
      brand: "NIKE",
      title: "NIKE VAPORFLY RACING",
      subtitle: "THE RECORD CHASER",
      tagline: "Run Beyond Limits",
      backdropText: "JUST DO IT",
      desc: "Full-length carbon fiber launch plates trigger continuous forward torque for racing speeds. Shatters personal records on asphalt.",
      stats: [{ val: "190g", label: "Elite weight" }, { val: "88%", label: "Energy Return" }],
      tagColor: "var(--flux-primary)",
      glowColor: "rgba(0, 162, 255, 0.22)",
      athleteImage: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&auto=format&fit=crop&q=80",
      variants: [
        { name: "Electric Neon", code: "#39FF14", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png" },
        { name: "Active Blue", code: "#006BFF", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5813.png" },
        { name: "Hyper Red", code: "#FF3B30", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5812.png" }
      ],
      ctaText: "Shop Nike Collection",
      ctaLink: "/catalog?category=Running"
    },
    {
      brand: "ADIDAS",
      title: "ADIDAS ULTRABOOST 5.0",
      subtitle: "ENERGY RETURN SYSTEMS",
      tagline: "Ultra Energy Rebounds",
      backdropText: "RUN FOR MORE",
      desc: "Revolutionary Boost capsules deliver incredible energy return and instant comfort. High-performance knit upper conforms to your foot.",
      stats: [{ val: "Boost™", label: "Midsole Tech" }, { val: "Continental™", label: "Outsole Grip" }],
      tagColor: "#111111",
      glowColor: "rgba(17, 17, 17, 0.15)",
      athleteImage: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=800&auto=format&fit=crop&q=80",
      variants: [
        { name: "Core Gray", code: "#8E8E93", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5823.png" },
        { name: "Triple Black", code: "#1C1C1E", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5827.png" }
      ],
      ctaText: "Shop Adidas Collection",
      ctaLink: "/catalog?category=Lifestyle"
    },
    {
      brand: "PUMA",
      title: "PUMA DEVIATE NITRO 2",
      subtitle: "PROPULSIVE PERFORMANCE",
      tagline: "Forever Faster Velocity",
      backdropText: "FOREVER FASTER",
      desc: "Features premium Nitro Elite foam for maximum propulsion and carbon-composite plate engineering to stabilize quick transitions.",
      stats: [{ val: "Nitro™", label: "Elite Cushion" }, { val: "PumaGrip", label: "High Traction" }],
      tagColor: "#FF5A00",
      glowColor: "rgba(255, 90, 0, 0.2)",
      athleteImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80",
      variants: [
        { name: "Nitro Lava", code: "#FF5A00", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png" },
        { name: "Stealth Amber", code: "#FFCC00", image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5786.png" }
      ],
      ctaText: "Shop Puma Collection",
      ctaLink: "/catalog?category=Training"
    }
  ];

  // Scroll-linked navigation for the Hero section
  const nextHero = () => {
    const nextIdx = (heroIndex + 1) % heroSlides.length;
    scrollToHeroSlide(nextIdx);
  };
  
  const prevHero = () => {
    const prevIdx = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    scrollToHeroSlide(prevIdx);
  };

  const scrollToHeroSlide = (sIdx) => {
    const targetScroll = sIdx * 0.33 + 0.16;
    const element = heroScrollContainerRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const globalTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const targetY = globalTop + (targetScroll * (sectionHeight - window.innerHeight));
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
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

  // --- 3D HERO BANNER SCROLL ANIMATION STATES & HOOKS ---
  const heroScrollContainerRef = useRef(null);
  const heroCanvasRef = useRef(null);
  const heroImagesRef = useRef([]);
  const [isHeroImagesLoaded, setIsHeroImagesLoaded] = useState(false);
  const [heroLoadingProgress, setHeroLoadingProgress] = useState(0);

  // Preload hero runner images
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 240;
    heroImagesRef.current = [];

    // Preload frame 1 first to display it immediately
    const firstImg = new Image();
    firstImg.src = `/Hero-Animation/ezgif-frame-001.png`;
    firstImg.onload = () => {
      heroImagesRef.current[1] = firstImg;
      drawHeroFrame(1);
      setIsHeroImagesLoaded(true); // FADE IN SITE IMMEDIATELY ON FRAME 1 LOADED!

      // Load all other frames asynchronously in the background
      for (let i = 2; i <= totalFrames; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `/Hero-Animation/ezgif-frame-${frameNum}.png`;
        img.onload = () => {
          heroImagesRef.current[i] = img;
          loadedCount++;
          setHeroLoadingProgress(Math.round((loadedCount / (totalFrames - 1)) * 100));
        };
        img.onerror = () => {
          loadedCount++;
        };
      }
    };
    firstImg.onerror = () => {
      // Fallback in case of absolute failure
      setIsHeroImagesLoaded(true);
    };
  }, []);

  const drawHeroFrame = (index) => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let img = heroImagesRef.current[index];
    if (!img) {
      for (let offset = 1; offset < 240; offset++) {
        if (index - offset >= 1 && heroImagesRef.current[index - offset]) {
          img = heroImagesRef.current[index - offset];
          break;
        }
        if (index + offset <= 240 && heroImagesRef.current[index + offset]) {
          img = heroImagesRef.current[index + offset];
          break;
        }
      }
    }
    
    if (img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroScrollContainerRef,
    offset: ["start start", "end end"]
  });

  const smoothHeroProgress = useSpring(heroScrollProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.5
  });

  useMotionValueEvent(smoothHeroProgress, "change", (latest) => {
    if (isHeroImagesLoaded) {
      const totalFrames = 240;
      const index = Math.min(
        totalFrames,
        Math.max(1, Math.floor(latest * (totalFrames - 1)) + 1)
      );
      drawHeroFrame(index);
    }

    // Map scroll progress to text slides Nike (0-33%), Adidas (33-66%), Puma (66-100%)
    let newIdx = 0;
    if (latest >= 0.66) {
      newIdx = 2;
    } else if (latest >= 0.33) {
      newIdx = 1;
    } else {
      newIdx = 0;
    }

    setHeroIndex((prev) => {
      if (prev !== newIdx) return newIdx;
      return prev;
    });
  });

  // --- 3D PRODUCT DECONSTRUCT SCROLL ANIMATION STATES & HOOKS ---
  const scrollContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollPct, setScrollPct] = useState(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 240;
    imagesRef.current = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/Animation-images/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        
        // Render first frame immediately once it is loaded
        if (i === 1) {
          drawFrame(1);
        }
        
        if (loadedCount === totalFrames) {
          setIsImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsImagesLoaded(true);
        }
      };
    }
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let img = imagesRef.current[index];
    if (!img) {
      for (let offset = 1; offset < 240; offset++) {
        if (index - offset >= 1 && imagesRef.current[index - offset]) {
          img = imagesRef.current[index - offset];
          break;
        }
        if (index + offset <= 240 && imagesRef.current[index + offset]) {
          img = imagesRef.current[index + offset];
          break;
        }
      }
    }
    
    if (img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fill canvas background to match image background color
      ctx.fillStyle = '#0a090c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw image scaled down and centered
      const scale = 1.0;
      const w = canvas.width * scale;
      const h = canvas.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    }
  };

  const scrollToLayer = (sIdx) => {
    const targetScroll = sIdx * 0.25 + 0.12;
    const element = scrollContainerRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const globalTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const targetY = globalTop + (targetScroll * (sectionHeight - window.innerHeight));
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };



  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out scroll frames with spring physics to avoid stepped scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.5
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (isImagesLoaded) {
      const totalFrames = 240;
      const index = Math.min(
        totalFrames,
        Math.max(1, Math.floor(latest * (totalFrames - 1)) + 1)
      );
      drawFrame(index);
      setCurrentFrame(index);
    }
    setScrollPct(Math.round(latest * 100));

    let newIdx = 0;
    if (latest >= 0.75) {
      newIdx = 3;
    } else if (latest >= 0.50) {
      newIdx = 2;
    } else if (latest >= 0.25) {
      newIdx = 1;
    } else {
      newIdx = 0;
    }
    
    setActiveSpecIndex((prev) => {
      if (prev !== newIdx) return newIdx;
      return prev;
    });
  });

  const specData = [
    {
      title: "Carbon Plate Tech",
      icon: <Layers size={24} />,
      desc: "Full-length curved carbon fiber launch plate stabilizes quick transitions and drives you forward with every stride.",
      highlights: ["High torsional stiffness", "Elite energy transmission", "Propulsive takeoff torque"],
      color: "var(--flux-primary)",
      glow: "rgba(0, 162, 255, 0.4)",
      marker: { top: 64, left: 45 },
      labelPos: { top: 48, left: 24 }
    },
    {
      title: "AirWeave Upper",
      icon: <Wind size={24} />,
      desc: "Engineered single-layer knit upper provides structural stretch support, multi-directional airflow, and runs like a second skin.",
      highlights: ["Micro-climate ventilation", "Zero-friction collar", "Recycled polymer weave"],
      color: "var(--flux-accent)",
      glow: "rgba(0, 229, 255, 0.4)",
      marker: { top: 34, left: 56 },
      labelPos: { top: 16, left: 74 }
    },
    {
      title: "EnergyFloat Foam",
      icon: <Zap size={24} />,
      desc: "Supercritical gas-infused nitrogen foam cushioning absorbs peak shock forces and delivers a springy rebound.",
      highlights: ["85% energy return rate", "Hyper-light density", "Impact strain reduction"],
      color: "var(--flux-success)",
      glow: "rgba(0, 200, 83, 0.4)",
      marker: { top: 54, left: 48 },
      labelPos: { top: 36, left: 78 }
    },
    {
      title: "VibramGrip Outsole",
      icon: <Activity size={24} />,
      desc: "Formulated high-friction sticky rubber compound with multi-directional lugs prevents slippage on challenging terrain.",
      highlights: ["All-weather wet traction", "Self-cleaning channels", "Extended wear durability"],
      color: "#FF5A00",
      glow: "rgba(255, 90, 0, 0.4)",
      marker: { top: 70, left: 38 },
      labelPos: { top: 48, left: 16 }
    }
  ];

  // Timeline
  const timelineEvents = [
    { year: "2022", title: "The Spark", desc: "FluxRun founded with a mission to develop the world's most responsive cushioning foam." },
    { year: "2023", title: "Carbon Breakthrough", desc: "Integrated curved carbon plates into consumer road running shoes, shaving minutes off marathon times." },
    { year: "2024", title: "Zero Impact", desc: "Launched recycled AirWeave upper mesh reducing carbon emissions by 40% per shoe." },
    { year: "2026", title: "Future Vector", desc: "Introducing neural foot tracking overlays for personalized stride tuning." }
  ];

  const getPositionClasses = (idx) => {
    if (idx === 1) {
      return {
        col: "col-12 col-md-8 col-lg-7 col-xl-6 offset-md-4 offset-lg-5 text-center text-lg-end",
        btn: "d-flex flex-column flex-sm-row justify-content-center justify-content-lg-end gap-3"
      };
    } else if (idx === 2) {
      return {
        col: "col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2 text-center text-lg-center",
        btn: "d-flex flex-column flex-sm-row justify-content-center justify-content-lg-center gap-3"
      };
    } else {
      return {
        col: "col-12 col-md-8 col-lg-7 col-xl-6 text-center text-lg-start",
        btn: "d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3"
      };
    }
  };

  const currentHero = heroSlides[heroIndex];
  const activeVariantIdx = activeVariants[heroIndex] || 0;
  const currentHeroImage = currentHero.variants[activeVariantIdx].image;

  const getScaledCoords = (coords, scale = 1.0) => {
    return {
      top: 50 + (coords.top - 50) * scale,
      left: 50 + (coords.left - 50) * scale
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const brandVariants = {
    hidden: { x: -120, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    exit: { 
      x: -80, 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const titleVariants = {
    hidden: { x: 120, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    exit: { 
      x: 80, 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const descVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      y: -30, 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.75, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 150, damping: 12 }
    },
    exit: { 
      scale: 0.85, 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--flux-background)', overflowX: 'clip' }}>
      
      {/* REDESIGNED HERO SECTION WITH SCROLL-DRIVEN RUNNER ANIMATION */}
      <section 
        ref={heroScrollContainerRef}
        className="position-relative w-100" 
        style={{
          minHeight: '320vh',
          backgroundColor: '#0a090c',
          zIndex: 10
        }}
      >
        {/* Sticky viewport content container (sticks below navbar) */}
        <div 
          style={{ 
            position: 'sticky', 
            top: '0px', 
            height: '100vh', 
            overflow: 'hidden',
            backgroundColor: '#0a090c'
          }}
          className="w-100"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* Full-width Canvas Background */}
          <motion.div 
            animate={{ 
              x: coords.x * 20, 
              y: coords.y * 20
            }}
            transition={{ type: 'spring', damping: 26, stiffness: 100 }}
            className="position-absolute"
            style={{ 
              zIndex: 1,
              top: '-30px',
              left: '-30px',
              width: 'calc(100% + 60px)',
              height: 'calc(100% + 60px)'
            }}
          >
            <canvas 
              ref={heroCanvasRef} 
              width={1920} 
              height={1080} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: windowWidth < 768 ? '65% center' : 'center 28%'
              }} 
            />
          </motion.div>


          {/* Huge Backdrop Brand Slogan */}
          <div style={{
            position: 'absolute',
            fontSize: '14vw',
            fontWeight: '900',
            color: 'rgba(255, 255, 255, 0.02)',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            letterSpacing: '-2px',
            pointerEvents: 'none'
          }}>
            {currentHero.backdropText}
          </div>

          {/* Dynamic Glow Lights mapping active slide */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: currentHero.glowColor,
            filter: 'blur(90px)',
            opacity: 0.15,
            top: '15%',
            right: '8%',
            pointerEvents: 'none',
            zIndex: 3,
            transition: 'background 0.6s ease-in-out'
          }} />

          {/* Preloader Overlay for Hero Animation */}
          {!isHeroImagesLoaded && (
            <div 
              className="position-absolute inset-0 d-flex flex-column justify-content-center align-items-center p-4 text-center"
              style={{ zIndex: 12, background: '#0a090c' }}
            >
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <h6 className="font-monospace text-uppercase text-white mb-2" style={{ letterSpacing: '1px' }}>Preloading 3D Cinematic...</h6>
              <div className="progress w-25" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: `${heroLoadingProgress}%` }} 
                />
              </div>
              <span className="small font-monospace text-white-50 mt-2" style={{ fontSize: '0.8rem' }}>{heroLoadingProgress}%</span>
            </div>
          )}

          {/* Foreground Content Container */}
          <div 
            className="container-fluid px-4 px-md-5 position-relative h-100 d-flex align-items-center" 
            style={{ 
              zIndex: 5,
              paddingTop: windowWidth < 992 ? '100px' : '130px',
              paddingBottom: '50px'
            }}
          >
            <div className="row w-100 align-items-center">
              
              {/* Hero Content dynamically positioned (Left, Right, Center) based on active slide */}
              <div className={getPositionClasses(heroIndex).col}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroIndex}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={windowWidth < 768 ? "p-0" : ""}
                    style={windowWidth < 768 ? {
                      backgroundColor: 'transparent',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none',
                      border: 'none'
                    } : {}}
                  >
                    <motion.h2 
                      variants={brandVariants}
                      className="font-display text-uppercase text-white-50 mb-0 fw-bold tracking-wider"
                      style={{ fontSize: '1.25rem', letterSpacing: '2px' }}
                    >
                      {currentHero.title.split(' ')[0]}
                    </motion.h2>

                    <motion.h1 
                      variants={titleVariants}
                      className="display-4 fw-extrabold tracking-tight mb-3 font-display text-uppercase text-white" 
                      style={{ lineHeight: '1.05', letterSpacing: '-1.5px', fontSize: 'calc(1.8rem + 2.5vw)' }}
                    >
                      <span style={{ 
                        background: `linear-gradient(135deg, #ffffff 0%, var(--flux-primary) 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800,
                        display: 'inline-block'
                      }}>
                        {currentHero.title.split(' ').slice(1).join(' ')}
                      </span>
                    </motion.h1>

                    <motion.p 
                      variants={descVariants}
                      className="lead text-white-50 mb-4 px-md-5 px-lg-0" 
                      style={{ fontSize: '1.05rem', lineHeight: '1.5' }}
                    >
                      {currentHero.desc}
                    </motion.p>

                    <motion.div 
                      variants={buttonVariants}
                      className={getPositionClasses(heroIndex).btn}
                    >
                      <Link to={currentHero.ctaLink} className="btn btn-flux-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2.5" style={{ fontSize: '0.95rem' }}>
                        <span>{currentHero.ctaText}</span>
                        <ChevronRight size={18} />
                      </Link>
                      <a href="#about" className="btn btn-flux-secondary d-flex align-items-center justify-content-center gap-2 px-4 py-2.5 text-white border-white-30" style={{ fontSize: '0.95rem' }}>
                        <Play size={16} fill="currentColor" />
                        <span>Biomechanics Tech</span>
                      </a>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Slider Navigation & Dot Indicators (Bottom center overlay) */}
          <div className="d-flex align-items-center justify-content-center gap-3 position-absolute start-50 translate-middle-x pb-4" style={{ bottom: '24px', zIndex: 10 }}>
            <button 
              onClick={prevHero} 
              className="btn btn-link text-white-50 p-0 hover-white transition-all border-0 d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', color: '#ffffff' }}
              title="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="d-flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToHeroSlide(idx)}
                  className="btn p-0 border-0 rounded-circle"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: heroIndex === idx ? 'var(--flux-primary)' : 'rgba(255,255,255,0.3)',
                    transform: heroIndex === idx ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                  }}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextHero} 
              className="btn btn-link text-white-50 p-0 hover-white transition-all border-0 d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', color: '#ffffff' }}
              title="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* TRUST BAR (MARQUEE WITH BRAND INTERACTIVITY) */}
      <section className="py-4 border-top border-bottom border-light" style={{ backgroundColor: '#ffffff', zIndex: 5, position: 'relative' }}>
        <div className="container-fluid px-0">
          <div className="marquee-container">
            <div className="marquee-content" style={{ gap: '8rem' }}>
              {[
                { name: "NIKE", color: "#FF5A00", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M21 6.5c-2.3 1.8-6.9 5-10.4 7.6-1.5 1.1-2.9 2-3.8 2.5-.9.4-1.4.5-1.7.5-.2 0-.3-.1-.3-.2 0-.2.2-.7.8-1.5.8-1 2.3-2.9 4.3-5.3.6-.7.5-1.2-.2-1-.7.2-2.1.8-3.9 1.8-1.8 1-3.6 2.3-4.8 3.5-1 1-.9 1.8.2 2 1.3.2 3.6-.3 6.3-1.6 4-1.9 9.9-6.4 13.7-9.6.2-.2.1-.2 0-.2z"/></svg> },
                { name: "ADIDAS", color: "#006BFF", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M1.5 20h3.5l4-7H5.5L1.5 20zm5 0h3.5l7-12.25h-3.5L6.5 20zm5 0h3.5L21.5 2.5H18L11.5 20z"/></svg> },
                { name: "UNDER ARMOUR", color: "#FF0000", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 3C9 3 6.5 5.2 6 8c2.2-.8 4-2.5 5-4.5 1 2 2.8 3.7 5 4.5-.5-2.8-3-5-6-5zm0 18c3 0 5.5-5.2 6-8-2.2.8-4 2.5-5 4.5-1-2-2.8-3.7-5-4.5.5 2.8 3 5 6 5z"/></svg> },
                { name: "NEW BALANCE", color: "#CC0000", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M4 18h2.5v-7l5.5 7h3V6h-2.5v7l-5.5-7H4v12zm11.5-12h6.5v2.5h-6.5V6zm0 4h6.5v2.5h-6.5v-2.5zm0 4h6.5v2.5h-6.5v-2.5z"/></svg> },
                { name: "CONVERSE", color: "#111111", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M12 7.5l1.4 2.8 3.1.5-2.3 2.2.5 3.1-2.7-1.4-2.7 1.4.5-3.1-2.3-2.2 3.1-.5z" fill="currentColor"/></svg> },
                { name: "PUMA", color: "#FF5A00", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M1.5 6L18 1.5l1.5 1L1.5 8z M1.5 18L18 22.5l1.5-1L1.5 16z M10 5.5l11.5 4v3L10 18.5z"/></svg> }
              ].map((b, idx) => (
                <div 
                  key={idx} 
                  className="partner-brand d-flex align-items-center gap-2 cursor-pointer transition-all"
                  style={{
                    color: '#6c757d',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = b.color;
                    e.currentTarget.style.filter = `drop-shadow(0 0 10px ${b.color}40)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6c757d';
                    e.currentTarget.style.filter = 'none';
                  }}
                >
                  {b.svg}
                  <span className="fw-bold tracking-wider">{b.name}</span>
                </div>
              ))}
              {/* Loop Duplicate for Seamless Infinite Scrolling */}
              {[
                { name: "NIKE", color: "#FF5A00", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M21 6.5c-2.3 1.8-6.9 5-10.4 7.6-1.5 1.1-2.9 2-3.8 2.5-.9.4-1.4.5-1.7.5-.2 0-.3-.1-.3-.2 0-.2.2-.7.8-1.5.8-1 2.3-2.9 4.3-5.3.6-.7.5-1.2-.2-1-.7.2-2.1.8-3.9 1.8-1.8 1-3.6 2.3-4.8 3.5-1 1-.9 1.8.2 2 1.3.2 3.6-.3 6.3-1.6 4-1.9 9.9-6.4 13.7-9.6.2-.2.1-.2 0-.2z"/></svg> },
                { name: "ADIDAS", color: "#006BFF", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M1.5 20h3.5l4-7H5.5L1.5 20zm5 0h3.5l7-12.25h-3.5L6.5 20zm5 0h3.5L21.5 2.5H18L11.5 20z"/></svg> },
                { name: "UNDER ARMOUR", color: "#FF0000", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 3C9 3 6.5 5.2 6 8c2.2-.8 4-2.5 5-4.5 1 2 2.8 3.7 5 4.5-.5-2.8-3-5-6-5zm0 18c3 0 5.5-5.2 6-8-2.2.8-4 2.5-5 4.5-1-2-2.8-3.7-5-4.5.5 2.8 3 5 6 5z"/></svg> },
                { name: "NEW BALANCE", color: "#CC0000", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M4 18h2.5v-7l5.5 7h3V6h-2.5v7l-5.5-7H4v12zm11.5-12h6.5v2.5h-6.5V6zm0 4h6.5v2.5h-6.5v-2.5zm0 4h6.5v2.5h-6.5v-2.5z"/></svg> },
                { name: "CONVERSE", color: "#111111", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M12 7.5l1.4 2.8 3.1.5-2.3 2.2.5 3.1-2.7-1.4-2.7 1.4.5-3.1-2.3-2.2 3.1-.5z" fill="currentColor"/></svg> },
                { name: "PUMA", color: "#FF5A00", svg: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M1.5 6L18 1.5l1.5 1L1.5 8z M1.5 18L18 22.5l1.5-1L1.5 16z M10 5.5l11.5 4v3L10 18.5z"/></svg> }
              ].map((b, idx) => (
                <div 
                  key={`dup-${idx}`} 
                  className="partner-brand d-flex align-items-center gap-2 cursor-pointer transition-all"
                  style={{
                    color: '#6c757d',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = b.color;
                    e.currentTarget.style.filter = `drop-shadow(0 0 10px ${b.color}40)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6c757d';
                    e.currentTarget.style.filter = 'none';
                  }}
                >
                  {b.svg}
                  <span className="fw-bold tracking-wider">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY SPORT CATEGORIES WITH TILT EFFECTS & DETAILS OVERLAYS */}
      <section className="py-5 bg-white border-bottom border-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2">COLLECTIONS</span>
            <h2 className="display-5 fw-bold font-display">SHOP BY SPORT</h2>
            <p className="text-muted">Aesthetic gear calibrated specifically for your focus</p>
          </div>

          <div className="row g-4">
            {[
              { title: "Running", desc: "Energy & speed on asphalt", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", link: "/catalog?category=Running" },
              { title: "Training", desc: "Stability & power in the gym", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80", link: "/catalog?category=Training" },
              { title: "Walking", desc: "All-day plush memory foam", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop&q=80", link: "/catalog?category=Walking" },
              { title: "Lifestyle", desc: "Street design, active soul", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80", link: "/catalog?category=Lifestyle" }
            ].map((cat, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <Link to={cat.link} className="text-decoration-none">
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(0, 162, 255, 0.15)'
                    }}
                    className="flux-card p-0 overflow-hidden text-white position-relative"
                    style={{
                      height: '380px',
                      borderRadius: '24px',
                      backgroundImage: `linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.3) 50%, rgba(17,17,17,0) 100%), url(${cat.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {/* Hover Glow Accent */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'var(--flux-primary)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s'
                    }} className="glow-bar" />

                    <div className="p-4" style={{ zIndex: 2 }}>
                      <h4 className="fw-bold mb-1 text-white font-display">{cat.title}</h4>
                      <p className="small text-white-50 mb-0 d-flex align-items-center gap-1">
                        <span>{cat.desc}</span>
                        <ArrowUpRight size={15} className="text-primary" />
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
      <section className="py-5 bg-white border-bottom border-light">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2">FEATURED PRODUCTS</span>
              <h2 className="display-5 fw-bold font-display">TRENDING RELEASES</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="d-flex bg-light p-1 rounded-pill mt-3 mt-md-0" style={{ maxWidth: '360px' }}>
              {['new', 'top', 'limited'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="btn btn-sm px-4 rounded-pill border-0 py-2 small fw-bold font-monospace text-uppercase transition-all position-relative"
                  style={{
                    backgroundColor: activeTab === tab ? 'var(--flux-primary)' : 'transparent',
                    color: activeTab === tab ? '#ffffff' : 'var(--flux-text-muted)',
                    boxShadow: activeTab === tab ? 'var(--shadow-glow)' : 'none',
                    zIndex: 2
                  }}
                >
                  {tab === 'new' ? 'New' : tab === 'top' ? 'Top Rated' : 'Limited'}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards */}
          <div className="row g-4">
            <AnimatePresence mode="wait">
              {getTabProducts().map((product) => (
                <motion.div 
                  key={product.id} 
                  className="col-lg-4 col-md-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-5">
            <Link to="/catalog" className="btn btn-flux-secondary px-5 py-3 rounded-pill fw-bold">View Full Catalog</Link>
          </div>
        </div>
      </section>

      <section 
        ref={scrollContainerRef} 
        className="position-relative w-100" 
        style={{ 
          minHeight: '380vh',
          backgroundColor: '#08080a',
          zIndex: 10
        }}
        id="about"
      >
        {/* Sticky viewport content container (sticks below fixed navbar) */}
        <div 
          style={{ 
            position: 'sticky', 
            top: windowWidth < 992 ? '70px' : '96px', 
            height: windowWidth < 992 ? 'calc(100vh - 70px)' : 'calc(100vh - 96px)', 
            overflow: 'hidden',
            backgroundColor: '#0a090c'
          }}
          className="d-flex align-items-center justify-content-center w-100"
        >
          <div className="w-100 h-100 position-relative">
            
            {/* Header Row */}
            {windowWidth < 992 ? (
              <div className="position-absolute start-50 translate-middle-x w-100 text-center pt-3 px-3" style={{ zIndex: 10, top: '10px', pointerEvents: 'none' }}>
                <span className="badge bg-primary-glow text-primary px-3 py-1 rounded-pill font-monospace mb-1.5" style={{ backgroundColor: 'rgba(0, 162, 255, 0.12)', fontSize: '0.65rem' }}>
                  FLUXRUN LABS
                </span>
                <h2 className="text-white fw-bold font-display mb-0 tracking-tight" style={{ fontSize: '1.4rem' }}>
                  ENGINEERED PERFORMANCE
                </h2>
              </div>
            ) : (
              <div 
                className="position-absolute start-50 translate-middle-x text-center pt-4" 
                style={{ 
                  zIndex: 10, 
                  top: '20px', 
                  width: '90%', 
                  maxWidth: '800px',
                  pointerEvents: 'none'
                }}
              >
                <span className="badge bg-primary-glow text-primary px-3 py-1.5 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'rgba(0, 162, 255, 0.12)', fontSize: '0.75rem' }}>
                  FLUXRUN LABS
                </span>
                <h2 className="text-white fw-extrabold font-display mb-1 tracking-tight" style={{ fontSize: '2.5rem', letterSpacing: '-0.5px' }}>
                  ENGINEERED PERFORMANCE
                </h2>
                <p className="text-white-50 small mb-0" style={{ fontSize: '0.85rem' }}>
                  Scroll to deconstruct the biomechanics of the ultimate sprint vector.
                </p>
              </div>
            )}

            {/* Main Interactive Canvas Wrapper (Full Width 16:9 box) */}
            <div 
              className="w-100 h-100 d-flex justify-content-center align-items-center position-relative" 
              style={{ backgroundColor: '#0a090c' }}
            >
              {/* Perfect 16:9 Container that scales to fit without cropping */}
              <div 
                className="position-relative d-flex justify-content-center align-items-center overflow-hidden" 
                style={windowWidth < 992 ? {
                  height: '100%',
                  width: 'calc((100vh - 70px) * 16 / 9)',
                  background: 'transparent',
                  border: 'none',
                  zIndex: 2
                } : {
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  zIndex: 2
                }}
              >
                {/* The actual Canvas */}
                <canvas 
                  ref={canvasRef} 
                  width={1280} 
                  height={720} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />

                {/* Preloader Overlay */}
                {!isImagesLoaded && (
                  <div 
                    className="position-absolute inset-0 d-flex flex-column justify-content-center align-items-center p-4 text-center"
                    style={{ zIndex: 12, background: '#0a090c' }}
                  >
                    <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h6 className="font-monospace text-uppercase text-white mb-2" style={{ letterSpacing: '1px' }}>Decoding 3D Model...</h6>
                    <div className="progress w-50" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <div 
                        className="progress-bar bg-primary" 
                        role="progressbar" 
                        style={{ width: `${loadingProgress}%` }} 
                      />
                    </div>
                    <span className="small font-monospace text-white-50 mt-2" style={{ fontSize: '0.8rem' }}>{loadingProgress}%</span>
                  </div>
                )}

                {/* SVG Pointer Lines Overlay */}
                {isImagesLoaded && (
                  <svg 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ pointerEvents: 'none', zIndex: 3 }}
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <AnimatePresence>
                      {specData.map((spec, sIdx) => {
                        const isActive = sIdx === activeSpecIndex;
                        if (!isActive) return null;
                        const marker = getScaledCoords(spec.marker);
                        const labelPos = windowWidth < 992 
                          ? { top: 82, left: 50 } 
                          : getScaledCoords(spec.labelPos);
                        return (
                          <g key={sIdx}>
                            {/* Line connecting marker to label */}
                            <motion.line 
                              x1={`${marker.left}`} 
                              y1={`${marker.top}`} 
                              x2={`${labelPos.left}`} 
                              y2={`${labelPos.top}`} 
                              stroke={spec.color} 
                              strokeWidth="0.3" 
                              strokeDasharray="1.5 1.5"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            />
                            {/* Inner connector points */}
                            <circle 
                              cx={`${marker.left}`} 
                              cy={`${marker.top}`} 
                              r="0.8" 
                              fill={spec.color} 
                            />
                            <circle 
                              cx={`${labelPos.left}`} 
                              cy={`${labelPos.top}`} 
                              r="0.6" 
                              fill={spec.color} 
                            />
                          </g>
                        );
                      })}
                    </AnimatePresence>
                  </svg>
                )}

                {/* HTML Labels Positioning Overlay */}
                {isImagesLoaded && specData.map((spec, sIdx) => {
                  const isActive = sIdx === activeSpecIndex;
                  const labelPos = windowWidth < 992 
                    ? { top: 82, left: 50 } 
                    : getScaledCoords(spec.labelPos);
                  return (
                    <div
                      key={`label-${sIdx}`}
                      className="position-absolute"
                      style={{
                        top: `${labelPos.top}%`,
                        left: `${labelPos.left}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 4,
                        opacity: isActive ? 1 : 0,
                        visibility: isActive ? 'visible' : 'hidden',
                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                        pointerEvents: 'none'
                      }}
                    >
                      <div 
                        className="px-3 py-1.5 rounded font-monospace fw-bold text-uppercase border"
                        style={{
                          fontSize: windowWidth < 768 ? '12px' : 'min(11px, 2.2vw)',
                          backgroundColor: 'rgba(10, 10, 12, 0.85)',
                          color: '#ffffff',
                          borderColor: `${spec.color}aa`,
                          boxShadow: `0 0 15px ${spec.color}44`,
                          letterSpacing: '0.5px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        [ {spec.title} ]
                      </div>
                    </div>
                  );
                })}

                {/* Hotspot buttons on the shoe */}
                {isImagesLoaded && specData.map((spec, sIdx) => {
                  const isActive = sIdx === activeSpecIndex;
                  const marker = getScaledCoords(spec.marker);
                  return (
                    <button
                      key={`dot-${sIdx}`}
                      onClick={() => scrollToLayer(sIdx)}
                      className="position-absolute btn p-0 border-0 rounded-circle transition-all d-flex align-items-center justify-content-center"
                      style={{
                        top: `${marker.top}%`,
                        left: `${marker.left}%`,
                        transform: `translate(-50%, -50%) scale(${isActive ? 1.25 : 0.85})`,
                        zIndex: 10,
                        width: '32px',
                        height: '32px',
                        background: 'transparent',
                        pointerEvents: 'auto',
                        cursor: 'pointer'
                      }}
                      title={`Explore ${spec.title}`}
                    >
                      <span 
                        className={`position-absolute rounded-circle ${isActive ? 'animate-ping' : ''}`} 
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: spec.color,
                          opacity: isActive ? 0.65 : 0,
                          transition: 'all 0.3s'
                        }} 
                      />
                      <span 
                        className="rounded-circle" 
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: spec.color,
                          boxShadow: isActive ? `0 0 16px ${spec.color}, 0 0 6px ${spec.color}` : 'none',
                          opacity: isActive ? 1 : 0.4,
                          transition: 'all 0.3s'
                        }} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REDESIGNED TIMELINE WITH SCROLL ANIMATIONS & ALTERNATING LAYOUT */}
      <section className="py-5 text-white position-relative" style={{ backgroundColor: '#08080a' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2" style={{ backgroundColor: 'rgba(0,107,255,0.2)' }}>TIMELINE</span>
            <h2 className="display-6 fw-bold text-white font-display">MILESTONES OF INNOVATION</h2>
            <p className="text-white-50">Tracing our commitment to performance over the years with alternating timeline breakthrough nodes</p>
          </div>

          {/* Desktop Alternating Timeline */}
          <div className="d-none d-md-block position-relative py-5">
            {/* Center Glowing Progress Track */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, var(--flux-primary) 0%, var(--flux-accent) 100%)',
              boxShadow: '0 0 15px rgba(0, 162, 255, 0.3)',
              zIndex: 0
            }} />

            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="row g-0 align-items-center mb-5 position-relative" style={{ zIndex: 1 }}>
                  {/* Left Column (shows even events) */}
                  <div className={`col-md-5 ${isEven ? 'text-end order-1' : 'order-3 order-md-1 d-none d-md-block'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="glass-panel p-4 text-start d-inline-block shadow-sm"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '24px',
                          maxWidth: '450px'
                        }}
                        whileHover={{ scale: 1.03, borderColor: 'var(--flux-accent)', boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)' }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="badge bg-primary px-3 py-1.5 font-monospace rounded-pill">{event.year}</span>
                          <h4 className="fw-bold text-white font-display mb-0 small text-uppercase tracking-wider ms-3">{event.title}</h4>
                        </div>
                        <p className="text-white-50 mb-0 small" style={{ lineHeight: '1.6' }}>{event.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Badge Dot Column */}
                  <div className="col-md-2 d-flex justify-content-center order-2 position-relative" style={{ minHeight: '60px' }}>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', damping: 15, stiffness: 150, delay: 0.1 }}
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#111111',
                        border: '4px solid var(--flux-primary)',
                        boxShadow: '0 0 15px var(--flux-primary)',
                        zIndex: 2,
                        cursor: 'pointer'
                      }}
                      whileHover={{ scale: 1.3, borderColor: 'var(--flux-accent)', boxShadow: '0 0 20px var(--flux-accent)' }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--flux-accent)' }} />
                    </motion.div>
                  </div>

                  {/* Right Column (shows odd events) */}
                  <div className={`col-md-5 ${!isEven ? 'text-start order-3' : 'order-1 order-md-3 d-none d-md-block'}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="glass-panel p-4 text-start d-inline-block shadow-sm"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '24px',
                          maxWidth: '450px'
                        }}
                        whileHover={{ scale: 1.03, borderColor: 'var(--flux-accent)', boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)' }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="fw-bold text-white font-display mb-0 small text-uppercase tracking-wider me-3">{event.title}</h4>
                          <span className="badge bg-primary px-3 py-1.5 font-monospace rounded-pill">{event.year}</span>
                        </div>
                        <p className="text-white-50 mb-0 small" style={{ lineHeight: '1.6' }}>{event.desc}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Stacked Timeline */}
          <div className="d-block d-md-none position-relative py-4 ps-4 ms-2">
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(to bottom, var(--flux-primary) 0%, var(--flux-accent) 100%)',
              boxShadow: '0 0 10px rgba(0, 162, 255, 0.3)'
            }} />
            
            {timelineEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                className="position-relative mb-4 pb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {/* Node */}
                <div style={{
                  position: 'absolute',
                  left: '-26px',
                  top: '6px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#111111',
                  border: '3px solid var(--flux-primary)',
                  boxShadow: '0 0 8px var(--flux-primary)',
                  zIndex: 2
                }} />
                
                <div className="glass-panel p-4 text-start shadow-sm" style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px'
                }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-white font-display mb-0 small text-uppercase">{event.title}</h5>
                    <span className="badge bg-primary px-2.5 py-1 font-monospace rounded-pill" style={{ fontSize: '11px' }}>{event.year}</span>
                  </div>
                  <p className="text-white-50 mb-0 small" style={{ fontSize: '12px' }}>{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION (3-Box Sliding Carousel) */}
      <section className="py-5 bg-white border-bottom border-light position-relative" style={{ overflow: 'hidden' }}>
        {/* Floating background glow lights */}
        <div 
          className="float-glow-left position-absolute" 
          style={{
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 162, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
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
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2">TESTIMONIALS</span>
            <h2 className="display-5 fw-bold font-display">ATHLETE TRUST</h2>
            <p className="text-muted">Proven on tracks, trails, and urban pavements around the globe</p>
          </div>

          <div className="position-relative px-4 px-md-5">
            {/* Testimonials Left Arrow */}
            <button 
              onClick={prevTesti}
              className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center p-2 position-absolute"
              style={{ left: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '46px', height: '46px', backgroundColor: 'rgba(255,255,255,0.9)' }}
              disabled={maxIndex <= 0}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Testimonials Right Arrow */}
            <button 
              onClick={nextTesti}
              className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center p-2 position-absolute"
              style={{ right: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '46px', height: '46px', backgroundColor: 'rgba(255,255,255,0.9)' }}
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
                                boxShadow: '0 0 8px rgba(0, 162, 255, 0.12)'
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
                    transform: testiIndex === idx ? 'scale(1.3)' : 'scale(1)',
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
            style={{ width: '80px', height: '80px', backgroundColor: 'var(--flux-primary)', boxShadow: '0 0 25px rgba(0, 162, 255, 0.4)' }}
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

      {/* INSTAGRAM GALLERY WITH HOVER OVERLAYS */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary-glow text-primary px-3 py-2 rounded-pill font-monospace mb-2">SOCIAL GRID</span>
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
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(0, 162, 255, 0.1)'
                  }}
                  className="rounded-4 overflow-hidden shadow-sm position-relative cursor-pointer"
                  style={{ height: '180px', border: '1px solid rgba(0, 0, 0, 0.05)' }}
                >
                  <img src={img} alt="Instagram Showcase" className="w-100 h-100 object-fit-cover" />
                  
                  {/* Subtle hover blur gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 162, 255, 0.15)',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }} className="insta-hover-overlay" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
