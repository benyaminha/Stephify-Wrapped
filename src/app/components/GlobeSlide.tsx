import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, X } from "lucide-react";

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

const EMAILS_DATA = [
  {
    id: 1,
    sender: "Nadine!",
    title: "Happy Birthday from the East Coast! ",
    videoUrl:
      "https://files.catbox.moe/xm5njl.mp4",
  },
  {
    id: 2,
    sender: "Elaine!",
    title: "We need to catch up!",
    videoUrl:
      "https://files.catbox.moe/v9fmaa.mp4",
  },
  {
    id: 3,
    sender: "Jeremy and Fiona",
    title: "Birthdayvid.mp4",
    videoUrl:
      "https://files.catbox.moe/4hvv67.mp4",
  },
  {
    id: 4,
    sender: "Nadya",
    title: "Miss you so much! ❤️",
    videoUrl:
      "https://files.catbox.moe/jf9rv0.mp4",
  },
  {
    id: 5,
    sender: "Isabelle",
    title: "From LA!",
    videoUrl:
      "https://files.catbox.moe/ow6l6c.mp4",
  },
  {
    id: 6,
    sender: "Veronica",
    title: "Happy Birthday Steph!",
    videoUrl:
      "https://files.catbox.moe/2pnvbh.mp4",
  },
  
  
];

export function GlobeEmailSlide() {
  const [openedEmails, setOpenedEmails] = useState<number[]>(
    [],
  );
  const [activeEmail, setActiveEmail] = useState<
    (typeof EMAILS_DATA)[0] | null
  >(null);

  return (
    <div className="relative h-full w-full bg-[#f4f4f0] flex flex-col items-center justify-center p-8 overflow-hidden font-['Archivo']">
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-16 z-20 w-full px-6 flex justify-center"
      >
        <div className="bg-white text-black border-[6px] border-black p-4 rotate-[-3deg] shadow-[8px_8px_0px_0px_#ff4633]">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center leading-[1]">
            You've got mail from your
            <br />
            friends everywhere!
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

      <div className="absolute bottom-12 w-full px-8 z-20 flex flex-wrap gap-4 justify-center items-center">
        {EMAILS_DATA.map((email, i) => {
          const isOpened = openedEmails.includes(email.id);
          return (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{
                scale: 1.1,
                rotate: i % 2 === 0 ? 5 : -5,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveEmail(email);
                if (!isOpened) {
                  setOpenedEmails((prev) => [
                    ...prev,
                    email.id,
                  ]);
                }
              }}
              className={`relative bg-white border-[4px] border-black p-3 md:p-4 cursor-pointer flex items-center justify-center ${
                isOpened
                  ? "shadow-[4px_4px_0px_0px_gray]"
                  : "shadow-[6px_6px_0px_0px_#ff4633]"
              }`}
              style={{
                transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
              }}
            >
              {!isOpened && (
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#ff4633] border-[3px] border-black rounded-full animate-pulse z-10" />
              )}
              {isOpened ? (
                <MailOpen
                  size={36}
                  className="text-gray-400"
                  strokeWidth={2.5}
                />
              ) : (
                <Mail
                  size={36}
                  className="text-black"
                  strokeWidth={2.5}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setActiveEmail(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 2 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_#ff4633] flex flex-col font-['Archivo'] overflow-hidden"
            >
              <div className="border-b-[4px] border-black bg-[#f4f4f0] p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      Sender
                    </p>
                    <h3 className="font-black text-2xl text-black uppercase leading-none mt-1">
                      {activeEmail.sender}
                    </h3>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Subject
                  </p>
                  <p className="font-bold text-black text-sm leading-snug mt-0.5">
                    {activeEmail.title}
                  </p>
                </div>
              </div>

              {/* Video Container - Optimized for Performance */}
              <div className="bg-black relative aspect-[4/3] w-full border-b-[4px] border-black overflow-hidden flex items-center justify-center">
                {/* Removed the background blur video to prevent RAM crashes.
                  Now we just rely on a clean black background to make the video pop! 
                */}

                <video
                  autoPlay
                  controls
                  playsInline
                  preload="metadata" // Tells the browser not to download the whole thing at once
                  className="relative z-10 w-full h-full object-contain"
                  src={activeEmail.videoUrl}
                />
              </div>

              <div className="p-3 bg-[#f4f4f0] flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEmail(null);
                  }}
                  className="bg-black text-white px-4 py-2 font-black uppercase text-sm tracking-wider border-[3px] border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
                >
                  Close
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveEmail(null);
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold border-2 border-white hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_#ff4633] z-10"
              >
                <X size={16} strokeWidth={3} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
