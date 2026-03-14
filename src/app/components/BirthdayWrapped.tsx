import { useState, useEffect, useRef } from "react";
// Forced HMR reload 2
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ArtistAudioSlide } from "./ArtistAudioSlide";
import { ArtistCameoSlide } from "./ArtistCameoSlide";
import { BoardGameSlide } from "./BoardGameSlide";
import { WingspanCardSlide } from "./WingspanCardSlide";
import { TiktokSlide } from "./TiktokSlide";
import { GlobeEmailSlide } from "./GlobeSlide";
import { Polaroid } from "./Polaroid";

interface Slide {
  id: number;
  component: React.ReactNode;
}

function GlobeComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let globe: any;

    if (!canvasRef.current) return;

    // Dynamically import cobe to avoid Vite SSR/proxy issues with WebGL components
    import("cobe").then((module) => {
      if (!canvasRef.current) return;
      const createGlobe = module.default;
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600,
        height: 600,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.9, 0.9, 0.9],
        markerColor: [1, 0.27, 0.2], // #ff4633
        glowColor: [1, 1, 1],
        markers: [
          { location: [42.3601, -71.0589], size: 0.1 }, // Boston
          { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
          { location: [1.3521, 103.8198], size: 0.1 }, // Singapore
          { location: [-6.2088, 106.8456], size: 0.1 }, // Jakarta
          { location: [37.7749, -122.4194], size: 0.1 }, // SF
          { location: [34.0522, -118.2437], size: 0.1 }, // LA
          { location: [49.2593, -123.1207], size: 0.1 }, // Vancouver
          { location: [32.8801, -117.234], size: 0.1 }, // San Diego (UCSD)
          { location: [22.3193, 114.1694], size: 0.1 }, // Hong Kong
          { location: [23.6978, 120.9605], size: 0.1 }, // Taiwan
          { location: [51.5074, -0.1278], size: 0.1 }, // London
          { location: [33.7175, -117.8311], size: 0.1 }, // Orange County
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });
    });

    return () => {
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <div className="w-[300px] h-[300px] mx-auto relative border-[6px] border-black rounded-full overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <canvas
        ref={canvasRef}
        style={{
          width: 300,
          height: 300,
          contain: "layout paint size",
          cursor: "auto",
          userSelect: "none",
        }}
      />
    </div>
  );
}

function GlobeSlide() {
  const [selectedCity, setSelectedCity] = useState<
    string | null
  >(null);

  const cityData: Record<
    string,
    { theme: string; text: string; accent: string }
  > = {
    BOSTON: {
      theme: "bg-[#092240]",
      text: "text-white",
      accent: "bg-[#cc0000]",
    },
    SYDNEY: {
      theme: "bg-[#0085cc]",
      text: "text-white",
      accent: "bg-[#ffcc00]",
    },
    SINGAPORE: {
      theme: "bg-[#ed2939]",
      text: "text-white",
      accent: "bg-white",
    },
    JAKARTA: {
      theme: "bg-[#ff9900]",
      text: "text-black",
      accent: "bg-black",
    },
    "SAN FRANCISCO": {
      theme: "bg-[#f2f0ea]",
      text: "text-[#c8102e]",
      accent: "bg-[#fbb924]",
    },
    "LOS ANGELES": {
      theme: "bg-[#ff0099]",
      text: "text-white",
      accent: "bg-[#00ffcc]",
    },
  };

  return (
    <div className="relative h-full w-full bg-[#d1ff27] flex flex-col items-center justify-center p-8 overflow-hidden font-['Archivo']">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-16 z-20 w-full px-6"
      >
        <div className="bg-black text-white border-4 border-black p-4 rotate-[-3deg] shadow-[8px_8px_0px_0px_rgba(255,70,51,1)]">
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
            The world says 
            <br />
            Happy birthday!
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          delay: 0.2,
          duration: 1,
        }}
        className="z-10 mt-8"
      >
        <GlobeComponent />
      </motion.div>

      <div className="absolute bottom-16 w-full px-8 z-20 flex flex-wrap gap-3 justify-center">
        {[
          "BOSTON",
          "SYDNEY",
          "SINGAPORE",
          "JAKARTA",
          "SAN FRANCISCO",
          "LOS ANGELES",
        ].map((city, i) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCity(city);
            }}
            className="bg-white text-black border-2 border-black px-4 py-2 font-black tracking-widest text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            style={{
              transform: `rotate(${i % 2 === 0 ? 4 : -4}deg)`,
            }}
          >
            {city}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCity(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 2 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-sm aspect-[4/3] border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] flex flex-col p-4 ${cityData[selectedCity].theme}`}
            >
              <div className="flex-1 border-4 border-black bg-white overflow-hidden relative">
                <img
                  src={`https://source.unsplash.com/random/800x600/?${selectedCity.replace(" ", "+")},city,landmark`}
                  alt={selectedCity}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCBmaWxsPSIjZWVlIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiPlBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
                <div
                  className={`absolute top-2 right-2 px-2 py-1 border-2 border-black text-xs font-black tracking-widest uppercase ${cityData[selectedCity].accent} text-black rotate-[12deg]`}
                >
                  POSTCARD
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <h3
                  className={`text-4xl font-black uppercase tracking-tighter leading-none ${cityData[selectedCity].text} drop-shadow-[2px_2px_0_#000]`}
                >
                  Greetings from
                  <br />
                  <span className="text-5xl">
                    {selectedCity}
                  </span>
                </h3>
                <div
                  className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-bold text-xs ${cityData[selectedCity].accent}`}
                >
                  STAMP
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCity(null);
                }}
                className="absolute -top-4 -right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold border-2 border-white hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StolenItemsComponent() {
  const [total, setTotal] = useState(0);

  const items = [
    {
      id: 1,
      name: "WATER BOTTLE",
      price: 40,
      icon: "💧",
      delay: 0.5,
    },
    {
      id: 2,
      name: "WATER BOTTLE",
      price: 40,
      icon: "💧",
      delay: 1.2,
    },
    {
      id: 3,
      name: "DIOR SUNNIES",
      price: 500,
      icon: "🕶️",
      delay: 1.9,
    },
    {
      id: 4,
      name: "MACBOOK",
      price: 1500,
      icon: "💻",
      delay: 2.6,
    },
    {
      id: 5,
      name: "PHONE",
      price: 1000,
      icon: "📱",
      delay: 3.3,
    },
  ];

  useEffect(() => {
    const timeouts = items.map((item) =>
      setTimeout(() => {
        setTotal((prev) => prev + item.price);
      }, item.delay * 1000),
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const dots = [
    { top: "-5%", left: "15%", size: "w-24 h-24" },
    { top: "12%", left: "55%", size: "w-20 h-20" },
    { top: "5%", right: "-5%", size: "w-28 h-28" },
    { top: "35%", right: "10%", size: "w-16 h-16" },
    { bottom: "25%", left: "-5%", size: "w-32 h-32" },
    { bottom: "10%", left: "30%", size: "w-20 h-20" },
    { bottom: "-10%", right: "15%", size: "w-28 h-28" },
  ];

  return (
    <div className="relative h-full w-full bg-[#F3F3F3] flex flex-col items-center justify-center p-8 overflow-hidden font-['Archivo'] text-black">
      {/* Background Dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          className={`absolute bg-black rounded-full ${dot.size} z-0`}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
          }}
        />
      ))}

      {/* Chaotic Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M 0 100 Q 150 50 200 300 T 400 150 T 600 500"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          d="M 500 -50 Q 300 200 450 500 T 100 700"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
          d="M -100 400 Q 200 600 500 400"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
      </svg>

      {/* Vertical Background Text */}
      <div className="absolute top-0 bottom-0 left-[-40px] flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-[#ff4633] text-[20vh] font-black leading-none -rotate-90 origin-center tracking-tighter"
          style={{
            WebkitTextStroke: "4px black",
            textShadow: "4px 4px 0px black",
          }}
        >
          Damage
        </motion.div>
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 w-full mb-6 flex justify-center"
      >
        <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_#ff4633] max-w-[85%] rotate-[-2deg]">
          <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-[1]">
            Things{" "}
            <span className="text-[#ff4633] underline decoration-black decoration-8 underline-offset-8">
              stolen
            </span>{" "}
            this year.
          </h2>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col gap-4 w-full z-10 justify-center relative">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{
              scale: 0.8,
              opacity: 0,
              x: i % 2 === 0 ? -50 : 50,
            }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{
              delay: item.delay,
              type: "spring",
              bounce: 0.4,
            }}
            className="flex items-center justify-between bg-white border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10"
            style={{
              transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl filter drop-shadow-[2px_2px_0_#000]">
                {item.icon}
              </span>
              <span className="font-bold tracking-widest text-sm uppercase">
                {item.name}
              </span>
            </div>
            <span className="font-black text-xl font-mono">
              ${item.price}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 z-10 bg-[#d1ff27] border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[2deg] w-full relative flex flex-col items-center"
      >
        <div className="text-sm font-bold uppercase tracking-widest mb-1">
          Total Damage
        </div>
        <div className="text-6xl font-black font-mono tracking-tighter">
          ${total}
        </div>

        <motion.div
          initial={{ scale: 0, rotate: 12 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{
            delay: 4.5,
            type: "spring",
            bounce: 0.6,
          }}
          className="absolute -right-4 -top-6 bg-[#ff4633] text-white border-4 border-black px-4 py-2 text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
        >
          YIKES...
        </motion.div>
      </motion.div>
    </div>
  );
}

const stats = {
  lateNights: 47,
  cafesVisited: 23,
  placesVisited: 12,
  burntToast: 5,
  spilledBoba: 2,
  laughsShared: 1453,
  memoriesMade: 365,
};

const memoryPhotos = {
  lateNights: [
    {
      url: "https://images.unsplash.com/photo-1765615202063-035f075ab79b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwbGF1Z2hpbmclMjBuaWdodCUyMHBhcnR5fGVufDF8fHx8MTc3MzE2NjM0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "2 AM PIZZA RUN",
    },
    {
      url: "https://images.unsplash.com/photo-1528394503539-7a924cf9561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGlnaHRzJTIwbmlnaHRsaWZlJTIwZnJpZW5kc3xlbnwxfHx8fDE3NzMxNjYzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "CITY LIGHTS",
    },
    {
      url: "https://ih1.redbubble.net/image.6000092791.6675/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
      caption: "wtf?",
    },
    {
      url: "https://images.unsplash.com/photo-1558008258-3256797b43f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      caption: "NIGHT CRAWLERS",
    },
  ],
  cafes: [
    {
      url: "https://images.unsplash.com/photo-1604145703889-5c58d94ee681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljJTIwbGF0dGV8ZW58MXx8fHwxNzczMTY2MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "MATCHA MADNESS",
    },
    {
      url: "https://images.unsplash.com/photo-1666455620767-63912e869a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWVuJTIwZnJpZW5kcyUyMHN1bnNldHxlbnwxfHx8fDE3NzMxNjYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "SUNSET SIPS",
    },
    {
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      caption: "MORNING FIX",
    },
    {
      url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      caption: "CAFFEINE DRIP",
    },
  ],
  places: [
    {
      url: "https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnMlMjBzY2VuaWN8ZW58MXx8fHwxNzczMTY2MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "MOUNTAIN HIGH",
    },
    {
      url: "https://images.unsplash.com/photo-1772203120950-a02082958489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHZhY2F0aW9uJTIwdHJvcGljYWwlMjBmcmllbmRzfGVufDF8fHx8MTc3MzE2NjM0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "BEACH BUMS",
    },
    {
      url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      caption: "ROADTRIPPIN",
    },
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      caption: "LOST & FOUND",
    },
  ],
  food: [
    {
      url: "https://github.com/benyaminha/Stephify-Wrapped-Photo-Links/blob/main/toast.jpg?raw=true",
      caption: "BURNT TOAST",
    },
    {
      url: "https://raw.githubusercontent.com/benyaminha/Stephify-Wrapped-Photo-Links/main/Spilled%20boba.jpg",
      caption: "SPILLED BOBA",
    },
  ],
};

export function BirthdayWrapped() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const slides: Slide[] = [
    // Intro Slide
    {
      id: 0,
      component: (
        <div className="relative h-full w-full bg-[#EBEBE6] flex flex-col items-center justify-center p-8 overflow-hidden font-['Archivo']">
          {/* Scrolling Background Lines */}
          <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className="w-[200%] h-full flex"
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-1/2 h-full stroke-black stroke-[0.1] fill-none"
              >
                <path d="M0,20 Q15,10 25,25 T50,15 T80,30 T100,10" />
                <path d="M-10,50 Q20,30 35,55 T70,40 T110,60" />
                <path d="M0,80 Q20,95 40,75 T75,90 T100,70" />
                <path d="M10,0 Q30,15 20,40 T40,60 T30,100" />
                <path d="M80,0 Q60,20 75,45 T60,80 T85,100" />
              </svg>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-1/2 h-full stroke-black stroke-[0.1] fill-none"
              >
                <path d="M0,20 Q15,10 25,25 T50,15 T80,30 T100,10" />
                <path d="M-10,50 Q20,30 35,55 T70,40 T110,60" />
                <path d="M0,80 Q20,95 40,75 T75,90 T100,70" />
                <path d="M10,0 Q30,15 20,40 T40,60 T30,100" />
                <path d="M80,0 Q60,20 75,45 T60,80 T85,100" />
              </svg>
            </motion.div>
          </div>

          {/* Scrolling Marquee Tape */}
          <div className="absolute top-24 -left-[10%] w-[120%] overflow-hidden bg-[#d1ff27] text-black py-2 border-y-4 border-black -rotate-6 z-0 shadow-[4px_4px_0px_0px_#252424]">
            <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 8,
              }}
              className="whitespace-nowrap font-black uppercase tracking-widest text-xl flex"
            >
              <div className="flex gap-6 shrink-0 px-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>Stephify WRAPPED 22 •</span>
                ))}
              </div>
              <div className="flex gap-6 shrink-0 px-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>BIRTHDAY WRAPPED 22 •</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Animated Bottom Left Concentric Arcs */}
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
            className="absolute -bottom-10 -left-10 w-64 h-64 pointer-events-none origin-bottom-left"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              {[10, 25, 40, 55, 70, 85].map((r, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="#252424"
                  strokeWidth="8"
                />
              ))}
            </svg>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 1.2 }}
            className="z-10 relative mt-24"
          >
            <motion.div
              animate={{
                rotate: [-4, -8, -2, -5, -4],
                scale: [1, 1.03, 0.97, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <h1
                className="text-[8rem] font-black tracking-tighter leading-none text-[#ff4633] italic"
                style={{
                  WebkitTextStroke: "2px #252424",
                  textShadow: "6px 6px 0px #252424",
                }}
              >
                22
              </h1>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center z-10 mt-8"
          >
            <h2 className="text-4xl font-black text-[#252424] mb-4 tracking-tight uppercase leading-none">
              Your Wrapped
              <br />
              is ready
            </h2>
            <p className="text-xs text-[#252424]/80 font-bold tracking-widest uppercase mt-6">
              And it's got some stuff from before this year
              too...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 flex flex-col items-center gap-6 w-full px-6 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="bg-[#252424] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm cursor-pointer border-2 border-[#252424] shadow-[4px_4px_0px_0px_rgba(37,36,36,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(37,36,36,0.5)] transition-all"
            >
              Dive In
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2 text-[#252424]/80 uppercase tracking-widest text-[10px] font-bold"
            >
              <ChevronLeft size={14} /> Swipe or keys to
              navigate <ChevronRight size={14} />
            </motion.div>
          </motion.div>
        </div>
      ),
    },
    // Stat 1: Late Nights (Cream, Lime Green)
    {
      id: 1,
      component: (
        <div className="relative h-full w-full bg-[#EBEBE6] flex flex-col p-8 overflow-hidden font-['Archivo'] text-black">
          {/* Abstract SVG Background Lines matching the reference */}
          <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full stroke-black stroke-[0.2] fill-none"
            >
              <path d="M0,20 Q15,10 25,25 T50,15 T80,30 T100,10" />
              <path d="M-10,50 Q20,30 35,55 T70,40 T110,60" />
              <path d="M0,80 Q20,95 40,75 T75,90 T100,70" />
              <path d="M10,0 Q30,15 20,40 T40,60 T30,100" />
              <path d="M80,0 Q60,20 75,45 T60,80 T85,100" />
            </svg>
          </div>

          {/* Bottom Left Concentric Arcs */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
            >
              {[10, 25, 40, 55, 70, 85].map((r, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="#252424"
                  strokeWidth="8"
                />
              ))}
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center z-30 pointer-events-none"
          >
            <h2 className="text-[28px] font-black tracking-tight text-[#252424]">
              This year you spent:
            </h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex-1 flex flex-col justify-center items-center relative z-30 -mt-10 pointer-events-none"
          >
            <h1
              className="text-[14rem] font-black leading-none tracking-tighter text-[#5CE000]"
              style={{
                WebkitTextStroke: "4px #252424",
                textShadow: "4px 4px 0px #252424",
              }}
            >
              {stats.lateNights}
            </h1>

            <div className="mt-12 text-center flex flex-col items-center gap-2">
              <p className="text-[15px] font-medium text-[#252424]">
                Late nights with friends!
              </p>
              <p className="text-[15px] font-medium text-[#252424]">
                Are you getting enough sleep???
              </p>
            </div>
          </motion.div>

          {/* Memory photos scattered and animated */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {memoryPhotos.lateNights.map((photo, index) => {
              const positions = [
                { top: "10%", left: "5%", rotate: -15 },
                { bottom: "15%", right: "10%", rotate: 12 },
                { top: "20%", right: "8%", rotate: 20 },
                { bottom: "25%", left: "12%", rotate: -10 },
              ];
              const pos = positions[index % positions.length];

              return (
                <Polaroid
                  key={index}
                  url={photo.url}
                  caption={photo.caption}
                  from="Layla"
                  index={index}
                  initialRotate={pos.rotate}
                  className="w-[8.05rem]"
                  style={{ top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right }}
                />
              );
            })}
          </div>

          {/* "Click me!" Pointer for the first polaroid */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, -5, 0],
              y: [0, -5, 0],
            }}
            transition={{
              opacity: { delay: 2.2 },
              scale: { delay: 2.2, type: "spring" },
              x: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 2.5,
              },
              y: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 2.5,
              },
            }}
            className="absolute top-[26%] left-[16%] z-40 pointer-events-none flex flex-col items-start"
          >
            <div className="bg-[#ff4633] text-black font-black uppercase tracking-wider text-sm px-3 py-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12">
              . you can click the picture.
            </div>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="-mt-1 ml-2 -rotate-12"
            >
              <path d="M6 6L18 18M6 6V14M6 6H14" />
            </svg>
          </motion.div>
        </div>
      ),
    },
    // Stat 2: Cafes Visited (Brutalist Style)
    {
      id: 2,
      component: (
        <div className="relative h-full w-full bg-[#f4f4f0] flex flex-col p-8 overflow-hidden font-['Archivo'] text-black">
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] stroke-black stroke-[0.2] fill-none"
            >
              <path d="M10,20 Q30,-10 50,30 T90,10" />
              <path d="M-10,50 Q30,40 50,70 T110,50" />
              <path d="M20,90 Q40,110 60,80 T100,100" />
              <path d="M10,-10 C 20,40 80,40 90,110" />
            </svg>
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 border-[8px] border-black rounded-full border-dashed opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 border-[8px] border-black rounded-full border-dashed opacity-20"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-12 z-30 pointer-events-none"
          >
            <div className="inline-block bg-[#ff4633] text-black border-4 border-black px-6 py-2 uppercase font-black tracking-widest text-sm transform -rotate-2 shadow-[8px_8px_0px_0px_#000]">
              Ultimate Cafe Crawl
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex-1 flex flex-col justify-center items-center z-30 mt-10 pointer-events-none"
          >
            <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_#ff4633] rotate-3 text-center">
              <h1
                className="text-[8rem] font-black leading-none text-black drop-shadow-[4px_4px_0_#ff4633]"
              >
                {stats.cafesVisited}
              </h1>
              <p className="text-xl font-black uppercase tracking-widest mt-2 text-black">
                Cafes Hit
              </p>
            </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none z-20">
            {memoryPhotos.cafes.map((photo, index) => {
              const positions = [
                { bottom: "15%", left: "8%", rotate: -8 },
                { bottom: "10%", right: "12%", rotate: 12 },
                { top: "15%", right: "5%", rotate: -15 },
                { top: "25%", left: "5%", rotate: 20 },
              ];
              const pos = positions[index % positions.length];

              return (
                <Polaroid
                  key={index}
                  url={photo.url}
                  caption={photo.caption}
                  from="Layla"
                  index={index}
                  initialRotate={pos.rotate}
                  className="w-[8.05rem]"
                  style={{ top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right }}
                />
              );
            })}
          </div>
        </div>
      ),
    },
    // Stat 4: Food disasters (Brutalist Style)
    {
      id: 4,
      component: (
        <div className="relative h-full w-full bg-[#f4f4f0] flex flex-col p-8 overflow-hidden font-['Archivo'] text-black">
          {/* Background scribbles/graphics */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] stroke-black stroke-[0.2] fill-none"
            >
              <path d="M10,20 Q30,-10 50,30 T90,10" />
              <path d="M-10,50 Q30,40 50,70 T110,50" />
              <path d="M20,90 Q40,110 60,80 T100,100" />
              <path d="M10,-10 C 20,40 80,40 90,110" />
            </svg>
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 border-[8px] border-black rounded-full border-dashed opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 border-[8px] border-black rounded-full border-dashed opacity-20"></div>
          </div>

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className="absolute top-24 -left-4 bg-[#d1ff27] text-black px-12 py-4 font-black text-2xl uppercase tracking-widest rotate-[-5deg] border-4 border-black z-30 pointer-events-none shadow-[8px_8px_0px_0px_#000]"
          >
            Some stats from layla!
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mt-40 flex flex-col items-center gap-12 z-30 pointer-events-none"
          >
            <div className="text-center bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#ff4633] rotate-2 w-full max-w-[280px]">
              <h1
                className="text-[6rem] font-black text-black leading-none drop-shadow-[4px_4px_0_#ff4633]"
              >
                {stats.burntToast}
              </h1>
              <p className="text-xl font-black text-black uppercase tracking-widest mt-2">
                Burnt Toasts
              </p>
            </div>

            <div className="text-center bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#8b8aff] -rotate-3 w-full max-w-[280px]">
              <h1
                className="text-[6rem] font-black text-black leading-none drop-shadow-[4px_4px_0_#8b8aff]"
              >
                {stats.spilledBoba}
              </h1>
              <p className="text-xl font-black text-black uppercase tracking-widest mt-2">
                Spilled Bobas
              </p>
            </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none z-20">
            {memoryPhotos.food.map((photo, index) => {
              const positions = [
                { top: "15%", right: "5%", rotate: 12 },
                { bottom: "15%", left: "5%", rotate: -8 },
              ];
              const pos = positions[index % positions.length];

              return (
                <Polaroid
                  key={index}
                  url={photo.url}
                  caption={photo.caption}
                  from="Layla"
                  index={index}
                  initialRotate={pos.rotate}
                  className="w-[11.5rem]"
                  style={{ top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right }}
                />
              );
            })}
          </div>
        </div>
      ),
    },

    // Tiktok FYP Highlights
    {
      id: 5,
      component: <TiktokSlide />,
    },

    // Globe Slide
    {
      id: 7,
      component: <GlobeEmailSlide />,
    },
    // Artist Cameo Slide
    {
      id: 8,
      component: <ArtistCameoSlide />,
    },
    // Board Game Slide
    {
      id: 8.5,
      component: <BoardGameSlide />,
    },
    // Wingspan Card Slide
    {
      id: 8.6,
      component: <WingspanCardSlide />,
    },
    // Stolen Items Slide
    {
      id: 9,
      component: <StolenItemsComponent />,
    },
    // Artist Audio Message
    {
      id: 10,
      component: <ArtistAudioSlide />,
    },
    // Final Screenshot Slide
    {
      id: 11,
      component: (
        <div className="relative h-full w-full bg-[#F3F3F3] flex flex-col items-center justify-center p-8 overflow-hidden font-['Archivo'] z-0">
          {/* Background Dots */}
          {[
            { top: "-5%", left: "15%", size: "w-24 h-24" },
            { top: "12%", left: "55%", size: "w-20 h-20" },
            { top: "5%", right: "-5%", size: "w-28 h-28" },
            { top: "35%", right: "10%", size: "w-16 h-16" },
            { bottom: "25%", left: "-5%", size: "w-32 h-32" },
            { bottom: "10%", left: "30%", size: "w-20 h-20" },
            { bottom: "-10%", right: "15%", size: "w-28 h-28" },
          ].map((dot, i) => (
            <motion.div
              key={`final-dot-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className={`absolute bg-black rounded-full ${dot.size} z-0`}
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                bottom: dot.bottom,
              }}
            />
          ))}

          {/* Floating Balloons */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`balloon-${i}`}
              initial={{ y: "100vh", x: `${Math.random() * 100}%` }}
              animate={{ y: "-20vh" }}
              transition={{
                duration: 4 + Math.random() * 3,
                ease: "easeOut",
                delay: Math.random() * 0.5,
              }}
              className="absolute w-12 h-16 rounded-[50%] z-10"
              style={{
                backgroundColor: ["#ff4633", "#d1ff27", "#8b8aff", "#000", "#fff"][i % 5],
                border: "4px solid #000",
                boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              }}
            >
              {/* Balloon string */}
              <div className="absolute top-full left-1/2 w-0.5 h-16 bg-black -translate-x-1/2"></div>
            </motion.div>
          ))}

          {/* Floating Polaroids Background */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center overflow-hidden w-full h-full opacity-60">
            <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex gap-16 shrink-0"
              style={{ width: "fit-content" }}
            >
              {[...Array(20)].map((_, i) => {
                const photos = [
                  "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1735845735730-88451aaea9f1?auto=format&fit=crop&q=80&w=400"
                ];
                return (
                  <div key={`float-pol-${i}`} className="shrink-0 flex items-center justify-center rotate-[15deg]">
                    <Polaroid
                      url={photos[i % photos.length]}
                      caption={`Memory ${i + 1}`}
                      from="Friends"
                      index={i}
                      className="w-[180px] pointer-events-none shadow-[8px_8px_0px_0px_#252424] filter grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1.5, delay: 0.5 }}
            className="z-20 text-center w-full relative"
          >
            <div className="bg-white border-8 border-black p-10 rotate-3 mx-auto max-w-[90%] relative shadow-[16px_16px_0px_0px_#ff4633]">
              <h1 
                className="text-5xl md:text-6xl font-black uppercase leading-[1.1] mb-2 tracking-tighter text-[#ff4633] italic"
                style={{
                  WebkitTextStroke: "2px #252424",
                  textShadow: "6px 6px 0px #252424",
                }}
              >
                Happy 22nd
                <br />
                Birthday
                <br />
                Stephie!
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-16 inline-block bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-sm rounded-full border-4 border-black shadow-[8px_8px_0px_0px_#ff4633] z-30"
            >
              Screenshot this moment 📸
            </motion.div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onClick={nextSlide}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Brutalist Progress Indicators */}
      <div className="absolute top-4 left-0 right-0 z-50 flex gap-2 px-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-2 bg-white/20 border border-white/10 rounded-sm overflow-hidden"
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{
                width:
                  index < currentSlide
                    ? "100%"
                    : index === currentSlide
                      ? "100%"
                      : "0%",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Slides */}
      <AnimatePresence
        initial={true}
        custom={direction}
        mode="wait"
      >
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          {slides[currentSlide].component}
        </motion.div>
      </AnimatePresence>

      {/* Slide Counter */}
      <div className="absolute bottom-4 right-6 z-50 text-white/50 text-xs font-bold tracking-widest font-['Archivo']">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}