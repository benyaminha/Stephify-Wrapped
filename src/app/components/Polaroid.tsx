import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface PolaroidProps {
  url: string;
  caption: string;
  from?: string;
  className?: string; // Standard Tailwind classes for w/h/absolute positioning
  style?: React.CSSProperties; // For precise top/left positioning
  index?: number;
  initialRotate?: number;
}

export function Polaroid({
  url,
  caption,
  from = "Layla",
  className = "",
  style = {},
  index = 0,
  initialRotate = 0,
}: PolaroidProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate some pseudo-random but consistent animation values based on index
  const floatDuration = 4 + (index % 3);
  const floatY = index % 2 === 0 ? -10 : 10;
  const rotationOffset = index % 2 === 0 ? 4 : -4;

  const layoutId = `polaroid-${url}-${index}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: initialRotate }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, floatY, 0],
          rotate: [initialRotate, initialRotate + rotationOffset, initialRotate],
        }}
        transition={{
          opacity: { delay: 0.5 + index * 0.2, duration: 0.5 },
          scale: { delay: 0.5 + index * 0.2, type: "spring" },
          y: { repeat: Infinity, duration: floatDuration, ease: "easeInOut" },
          rotate: {
            repeat: Infinity,
            duration: floatDuration + 1,
            ease: "easeInOut",
          },
        }}
        className={`absolute z-20 hover:z-40 pointer-events-auto ${className}`}
        style={style}
      >
        <motion.div
          layoutId={layoutId}
          className="w-full h-full bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] cursor-pointer flex flex-col"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(true);
          }}
        >
          <div className="w-full aspect-square bg-black border border-black overflow-hidden relative mb-2">
            <motion.img
              layoutId={`img-${layoutId}`}
              src={url}
              alt={caption}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between items-center px-1">
            <motion.p
              layoutId={`caption-${layoutId}`}
              className="font-['Caveat'] text-xl font-bold text-black text-center leading-none mt-1"
            >
              {caption}
            </motion.p>
            {from && (
              <motion.p
                layoutId={`from-${layoutId}`}
                className="font-['Caveat'] text-[10px] font-bold text-black/60 self-end mt-1"
              >
                - {from}
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Expanded View */}
      {mounted && createPortal(
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <motion.div
              layoutId={layoutId}
              className="bg-white p-4 border-4 border-black shadow-[12px_12px_0px_0px_rgba(209,255,39,1)] w-full max-w-sm rotate-2 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-square bg-black border-2 border-black relative overflow-hidden">
                <motion.img
                  layoutId={`img-${layoutId}`}
                  src={url}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 pb-2 px-2 flex flex-col">
                <motion.p
                  layoutId={`caption-${layoutId}`}
                  className="font-['Caveat'] text-4xl font-bold text-black leading-none text-center"
                >
                  {caption}
                </motion.p>
                {from && (
                  <motion.p
                    layoutId={`from-${layoutId}`}
                    className="font-['Caveat'] text-xl font-bold text-black/60 self-end mt-2"
                  >
                    - {from}
                  </motion.p>
                )}
              </div>

              <button
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#ff4633] text-black border-4 border-black rounded-full font-black text-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#000] hover:scale-110 active:scale-95 transition-transform"
                onClick={() => setIsZoomed(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
