import { motion } from "motion/react";

interface VideoSlideProps {
  videoUrl?: string;
  message?: string;
}

export function VideoSlide({ 
  videoUrl = "https://files.catbox.moe/oapwhi.mp4", 
  message = "Someone has something to say about that..." 
}: VideoSlideProps) {
  return (
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
        <h2 className="text-[28px] font-black tracking-tight text-[#252424] leading-tight">
          {message}
        </h2>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="flex-1 flex flex-col justify-center items-center relative z-30 mb-12 w-full max-w-[min(90vw,400px)] mx-auto"
      >
        <div className="relative w-full border-4 border-black bg-black shadow-[12px_12px_0px_0px_#252424] overflow-hidden rounded-2xl">
          <video
            src={videoUrl}
            className="w-full h-auto block"
            controls
            playsInline
            autoPlay
            muted
            loop
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-0 right-0 text-center z-30 pointer-events-none"
      >
        
      </motion.div>
    </div>
  );
}
