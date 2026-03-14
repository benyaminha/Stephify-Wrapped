import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Polaroid } from "./Polaroid";

export function BoardGameSlide() {
  const [hasRolled, setHasRolled] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRolling || hasRolled) return;
    setIsRolling(true);
    // Simulate roll duration
    setTimeout(() => {
      setIsRolling(false);
      setHasRolled(true);
    }, 1500);
  };

  return (
    <div 
      className="relative h-full w-full bg-[#f4f4f0] flex flex-col items-center justify-center p-8 overflow-hidden font-['Archivo']"
      onClick={(e) => {
        if (!hasRolled) e.stopPropagation();
      }}
    >
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

      <AnimatePresence mode="wait">
        {!hasRolled && !isRolling && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center z-20 cursor-pointer group"
            onClick={handleRoll}
          >
            <div className="bg-white border-[6px] border-black px-6 py-4 shadow-[8px_8px_0px_0px_#ff4633] mb-12 rotate-[-2deg] group-hover:rotate-[0deg] transition-transform">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black text-center leading-[1]">
                Hey! It's your turn.  <br/> Roll the dice for your stats
              </h2>
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex gap-4"
            >
              <div className="w-24 h-24 bg-white border-[6px] border-black shadow-[6px_6px_0px_0px_black] rounded-xl flex items-center justify-center rotate-[-6deg]">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="w-24 h-24 bg-[#ff4633] border-[6px] border-black shadow-[6px_6px_0px_0px_black] rounded-xl flex items-center justify-center rotate-[8deg]">
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isRolling && (
          <motion.div
            key="rolling"
            className="flex gap-4 z-20"
          >
            <motion.div
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                x: [0, -20, 0, 20, 0],
                y: [0, -40, 0, -20, 0]
              }}
              transition={{ duration: 0.5, repeat: 3, ease: "linear" }}
              className="w-24 h-24 bg-white border-[6px] border-black rounded-xl shadow-[6px_6px_0px_0px_black] flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [0, -90, -180, -270, -360],
                x: [0, 20, 0, -20, 0],
                y: [0, -30, 0, -40, 0]
              }}
              transition={{ duration: 0.5, repeat: 3, ease: "linear" }}
              className="w-24 h-24 bg-[#ff4633] border-[6px] border-black rounded-xl shadow-[6px_6px_0px_0px_black] flex items-center justify-center"
            >
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {hasRolled && (
          <motion.div
            key="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center z-20 w-full h-full justify-center relative"
          >
            {/* Background elements specific to stats phase */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="absolute top-[15%] left-[5%] w-16 h-16 border-[6px] border-black rounded-full"
            />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="absolute bottom-[20%] right-[5%] w-12 h-12 bg-[#ff4633] border-[4px] border-black rotate-45"
            />

            {/* Top Text */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-4 text-center z-30 mt-[-10vh]"
            >
              <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter">
                Board games played
              </h3>
            </motion.div>

            {/* Huge Number */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: -5 }}
              transition={{ type: "spring", bounce: 0.6, duration: 1, delay: 0.2 }}
              className="z-30 mb-8"
            >
              <span 
                className="text-[25vh] font-black text-[#ff4633] leading-none tracking-tighter drop-shadow-xl"
                style={{ 
                  WebkitTextStroke: "6px black",
                }}
              >
                16 
              </span>
            </motion.div>

            {/* Sub Stats */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.6 }}
              className="text-center z-30 max-w-[85%] bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[2deg]"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-snug">
                Your most played games were: <span className="text-black font-black">Wingspan (6 times!) </span> and <span className="text-black font-black">7 Wonders (4 times!)</span>. 
              </p>
            </motion.div>

            {/* Animated Polaroids */}
            <Polaroid
              url="https://images.unsplash.com/photo-1611891487122-2075b925d57b?auto=format&fit=crop&q=80&w=400"
              caption="GAME NIGHT"
              from="Layla"
              className="w-32"
              style={{ bottom: "5%", left: "5%" }}
              initialRotate={-10}
              index={0}
            />

            <Polaroid
              url="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=400"
              caption="HIGH ROLLER"
              from="Layla"
              className="w-36"
              style={{ top: "10%", right: "2%" }}
              initialRotate={15}
              index={1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
