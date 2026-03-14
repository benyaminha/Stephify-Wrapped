import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { Phone, PhoneOff, Mic, Video, AlarmClock, MessageCircle } from "lucide-react";

export const ArtistAudioSlide = () => {
  const [callState, setCallState] = useState<"ringing" | "connected" | "ended">("ringing");
  const ringtoneRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Drag state for "slide to answer"
  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, 100], [1, 0]);

  // Play ringtone on mount
  useEffect(() => {
    if (callState === "ringing" && ringtoneRef.current) {
      ringtoneRef.current.volume = 0.5;
      ringtoneRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
    }
  }, [callState]);

  const acceptCall = (e?: React.MouseEvent | React.TouchEvent | PointerEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
    setCallState("connected");
  };

  const declineCall = (e?: React.MouseEvent | React.TouchEvent | PointerEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
    setCallState("ended");
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 150) {
      acceptCall();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
    }
  };

  // Prevent drag events from propagating to the swiper
  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="relative h-full w-full overflow-hidden bg-black text-white"
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Ringing State */}
      <AnimatePresence mode="wait">
        {callState === "ringing" && (
          <motion.div 
            key="ringing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-0 flex flex-col items-center justify-between py-16"
          >
            {/* Background Gradient matching iOS */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5c4a3d] via-[#4a3b32] to-[#2c221a] -z-10" />

            {/* Caller ID */}
            <div className="flex flex-col items-center mt-12 z-10 w-full px-6 text-center">
              <h2 className="text-[34px] font-normal tracking-tight text-white mb-1">
                Ur Fav Couple
              </h2>
              <p className="text-[17px] text-white/70 font-normal">
                would like FaceTime...
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="z-10 flex flex-col items-center w-full px-8 pb-8" onClick={stopPropagation} onPointerDown={stopPropagation}>
              
              {/* Secondary Actions */}
              <div className="flex justify-between w-full max-w-[280px] mb-16 px-4">
                <button className="flex flex-col items-center gap-2 group">
                  <AlarmClock size={28} className="text-white opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  <span className="text-[13px] text-white/90">Remind Me</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <MessageCircle size={28} className="text-white opacity-90 group-hover:opacity-100 transition-opacity" fill="currentColor" strokeWidth={1} />
                  <span className="text-[13px] text-white/90">Message</span>
                </button>
              </div>

              {/* Slide to Answer */}
              <div className="relative w-full max-w-[320px] h-[76px] bg-black/20 rounded-full flex items-center overflow-hidden border border-white/5 backdrop-blur-md">
                <motion.div style={{ opacity: textOpacity }} className="absolute w-full text-center pointer-events-none pr-8">
                  <span className="shimmer-text text-[20px] font-medium tracking-wide">slide to answer</span>
                </motion.div>
                
                <motion.div
                  style={{ x }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 244 }} // 320 - 76
                  dragElastic={0}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  onPointerDown={stopPropagation}
                  onTouchStart={stopPropagation}
                  className="w-[68px] h-[68px] ml-1 bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_2px_10px_rgba(0,0,0,0.2)] z-10"
                >
                  <Phone fill="#34C759" color="#34C759" size={32} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Connected State */}
        {callState === "connected" && (
          <motion.div 
            key="connected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black z-20 flex flex-col"
            onClick={stopPropagation}
            onTouchStart={stopPropagation}
          >
            {/* Video Container */}
            <div className="absolute inset-0 z-0 bg-[#1c1c1e] overflow-hidden flex items-center justify-center">
              {/* Blurred background to optimize landscape videos for portrait screens */}
              <video 
                autoPlay 
                playsInline
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-50"
                src="https://files.catbox.moe/0yf9yu.mp4"
              />
              {/* Main Video */}
              <video 
                ref={videoRef}
                autoPlay 
                playsInline
                loop
                className="relative z-10 w-full h-full object-contain"
                src="https://files.catbox.moe/0yf9yu.mp4"
              />
            </div>

            {/* Top Bar - simplified iOS status area */}
            <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
               <div className="px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-sm font-medium">0:03</span>
               </div>
            </div>
            
            {/* Picture in Picture (Self) */}
            <motion.div 
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.2}
              className="absolute top-16 right-4 w-28 h-40 bg-[#1c1c1e] rounded-xl overflow-hidden z-30 shadow-xl border border-white/10 cursor-grab active:cursor-grabbing"
            >
              <div className="w-full h-full flex items-center justify-center text-white/30 text-xs font-medium">
                Camera<br/>Off
              </div>
            </motion.div>

            {/* Bottom Controls Dock */}
            <div className="absolute bottom-10 left-4 right-4 z-30">
              <div className="bg-[#2c2c2e]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex justify-between items-center px-6">
                <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mic size={24} />
                </button>
                <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Video size={24} />
                </button>
                <button 
                  onClick={declineCall}
                  className="w-16 h-16 bg-[#ff3b30] rounded-full flex items-center justify-center hover:bg-[#ff3b30]/80 transition-colors shadow-lg"
                >
                  <PhoneOff size={28} className="text-white" fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Ended State */}
        {callState === "ended" && (
          <motion.div 
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#1c1c1e] flex flex-col items-center justify-center text-center z-10"
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <PhoneOff size={40} className="text-white/50" />
            </div>
            <h2 className="text-2xl font-medium text-white mb-2">
              FaceTime Ended
            </h2>
            <p className="text-white/50 mb-12">
              0:03
            </p>
            <p className="text-sm font-medium text-white/30 uppercase tracking-widest animate-pulse">
              Swipe to continue
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={ringtoneRef} 
        src="https://www.myinstants.com/media/sounds/john-pork-is-calling-moooort.mp3" 
        loop
        className="hidden"
      />
    </div>
  );
};
