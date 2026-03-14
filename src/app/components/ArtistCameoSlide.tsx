import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export const ArtistCameoSlide = () => {
  const [phase, setPhase] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play audio on mount
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed", e));
    }

    const timer1 = setTimeout(() => {
      setPhase(1);
    }, 4500);

    const timer2 = setTimeout(() => {
      setPhase(2);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (phase === 2 && videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Video play failed", e));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase < 2 && (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === " ")) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [phase]);

  const stopPropagation = (
    e: React.MouseEvent | React.TouchEvent | React.PointerEvent,
  ) => {
    e.stopPropagation();
  };

  const handleInteraction = (
    e: React.MouseEvent | React.TouchEvent | React.PointerEvent,
  ) => {
    if (phase < 2) {
      e.stopPropagation();
    }
  };

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
    <div 
      className="relative w-full h-full bg-[#F3F3F3] overflow-hidden flex flex-col items-center justify-center font-['Archivo']"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
      onTouchEnd={handleInteraction}
    >
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
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 0.5,
          }}
          d="M 500 -50 Q 300 200 450 500 T 100 700"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
          d="M -100 400 Q 200 600 500 400"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
      </svg>

      {/* Vertical 2026 */}
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
          Year 22
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="text1"
            initial={{ y: 50, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -50, opacity: 0, rotate: 5, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center p-8 z-20"
          >
            <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_#ff4633] max-w-[85%] rotate-[-2deg]">
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-[1]">
                Of all the music you listened to this year,{" "}
                <br />
                <span className="text-[#ff4633] underline decoration-black decoration-8 underline-offset-8">
                  one artist
                </span>{" "}
                stands out.
              </h2>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="text2"
            initial={{ x: 100, opacity: 0, skewX: 10 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            exit={{
              scale: 1.5,
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{ type: "spring", duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center p-8 z-20"
          >
            <div className="bg-black border-8 border-[#ff4633] p-8 shadow-[-12px_12px_0px_0px_white] max-w-[85%] rotate-[2deg]">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1]">
                There's someone very special here to wish you a
                happy birthday...
              </h2>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="video"
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              bounce: 0.5,
              duration: 1,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20"
          >
            {/* Cameo Video Wrapper */}
            <div
              className="relative w-full max-w-sm aspect-[4/5] bg-black border-[6px] border-black shadow-[16px_16px_0px_0px_#ff4633] overflow-hidden mb-8 z-20"
              onClick={stopPropagation}
              onPointerDown={stopPropagation}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-50"
                src="https://files.catbox.moe/2ubbjs.mp4"
                poster="https://images.unsplash.com/photo-1516280440503-6614749326f6?auto=format&fit=crop&q=80&w=800"
              />
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="relative z-10 w-full h-full object-contain"
                src="https://files.catbox.moe/2ubbjs.mp4"
                poster="https://images.unsplash.com/photo-1516280440503-6614749326f6?auto=format&fit=crop&q=80&w=800"
              />
              {/* Optional UI overlay if wanted, but native controls handle it */}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-black text-white px-8 py-2 mb-8"
            >
              <h3
                className="text-3xl font-black tracking-widest text-center"
                style={{ WebkitTextStroke: "1px white" }}
              >
                Reiner!
              </h3>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 gap-x-16 gap-y-8 text-center max-w-sm w-full bg-white/80 backdrop-blur-sm p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div>
                <p className="text-xs font-bold text-gray-800 capitalize mb-1">
                  Listens
                </p>
                <p className="text-3xl font-black tracking-tighter text-black">
                  233K
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 capitalize mb-1">
                  Hours
                </p>
                <p className="text-3xl font-black tracking-tighter text-black">
                  723
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 capitalize mb-1">
                  Years Known
                </p>
                <p className="text-3xl font-black tracking-tighter text-black">
                  20
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 capitalize mb-1">
                  Purchases with your Credit Card
                </p>
                <p className="text-3xl font-black tracking-tighter text-black">
                  78
                </p>
              </div>
            </motion.div>

            {/* Bottom mock logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs font-bold tracking-widest"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-0.5 bg-black" />
                </div>
                <span></span>
              </div>
              <span>WRAPPED</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://files.catbox.moe/92zgp9.mp3"
        loop
        className="hidden"
      />
    </div>
  );
};