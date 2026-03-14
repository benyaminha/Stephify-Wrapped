import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Share2,
  Disc,
  Home,
  Search,
  PlusSquare,
  Inbox,
  User,
  Music,
  Plus,
} from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    user: "@ladygagaofficial",
    caption: "For a special someone",
    videoUrl:
      "https://files.catbox.moe/f1j6nx.mp4",
    likes: 9834,
    comments: 243,
    shares: 2309,
    song: "Bad Romance - Lady Gaga",
  },
  {
    id: 2,
    user: "@aisah",
    caption: "#bftest",
    videoUrl:
      "https://github.com/benyaminha/Stephify-Wrapped-Photo-Links/raw/refs/heads/main/6f565fd98beb49d38fca9497a718cd4b(1).mp4",
    likes: 1042,
    comments: 4,
    shares: 1,
    song: "Nocturne in E Flat Minor (Op. 9 No. 2)  - Fredrick Chopin",
  },
  {
    id: 3,
    user: "@kristle",
    caption: "live streaming right now!!",
    videoUrl: "https://files.catbox.moe/3fnoy3.mp4",
    likes: 1,
    comments: 2,
    shares: 0,
    song: "Original Sound - Kristle",
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num;
};

function TiktokVideoItem({
  video,
  isLast,
  onNext,
  onVisible,
}: {
  video: (typeof VIDEOS)[0];
  isLast: boolean;
  onNext: () => void;
  onVisible?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [isMuted, setIsMuted] = useState(true); // Added mute state!

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current
              ?.play()
              .catch((e) =>
                console.log("Auto-play prevented:", e),
              );
            if (onVisible) onVisible();
          } else {
            videoRef.current?.pause();
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          }
        });
      },
      { threshold: 0.6 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  return (
    <div className="h-full w-full snap-start relative bg-[#1c1c1e] flex-shrink-0 overflow-hidden">
      {/* Background Video - STRICTLY MUTED */}
      <video
        src={video.videoUrl}
        className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-50 pointer-events-none"
        loop
        playsInline
        muted
        autoPlay
      />

      {/* Foreground Video - CONTROLLED MUTE */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="relative z-10 w-full h-full object-contain cursor-pointer"
        loop
        playsInline
        muted={isMuted}
        onClick={(e) => {
          e.stopPropagation();
          if (isMuted) {
            setIsMuted(false); // Unmute on first tap
          } else if (!isLast) {
            onNext(); // Skip to next video on second tap
          }
        }}
      />

      {/* Unmute Hint Overlay (Disappears once unmuted) */}
      {isMuted && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm font-bold animate-pulse">
            Tap to unmute
          </div>
        </div>
      )}

      {/* Overlay Header */}
      <div className="absolute top-0 w-full pt-12 flex justify-center space-x-6 text-white/70 font-bold text-lg pointer-events-none">
        <span className="cursor-pointer">Following</span>
        <span className="text-white cursor-pointer relative">
          For You
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full"></div>
        </span>
      </div>

      {/* Right Sidebar */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 z-10">
        <div className="relative w-12 h-12 rounded-full border-2 border-white bg-gray-500 mb-2 overflow-hidden flex items-center justify-center">
          <User className="text-white w-6 h-6" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#ff4633] rounded-full flex items-center justify-center">
            <Plus className="text-white w-3 h-3" />
          </div>
        </div>

        <button
          className="flex flex-col items-center focus:outline-none group"
          onClick={handleLike}
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            animate={liked ? { scale: [1, 1.2, 1] } : {}}
          >
            <Heart
              className={`w-9 h-9 transition-colors ${liked ? "fill-[#ff4633] text-[#ff4633]" : "text-white"}`}
              strokeWidth={2}
            />
          </motion.div>
          <span className="text-white text-xs font-semibold mt-1">
            {formatNumber(likesCount)}
          </span>
        </button>

        <button
          className="flex flex-col items-center focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle
            className="w-9 h-9 text-white fill-white/20"
            strokeWidth={2}
          />
          <span className="text-white text-xs font-semibold mt-1">
            {formatNumber(video.comments)}
          </span>
        </button>

        <button
          className="flex flex-col items-center focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          <Share2
            className="w-9 h-9 text-white fill-white/20"
            strokeWidth={2}
          />
          <span className="text-white text-xs font-semibold mt-1">
            {formatNumber(video.shares)}
          </span>
        </button>

        <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center animate-[spin_4s_linear_infinite] mt-2">
          <Disc className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-4 right-20 z-10 pointer-events-none text-white">
        <h3 className="font-bold text-lg mb-1">{video.user}</h3>
        <p className="text-sm mb-3 text-white/90 leading-snug">
          {video.caption}
        </p>
        <div className="flex items-center space-x-2 w-full overflow-hidden">
          <Music className="w-4 h-4 flex-shrink-0" />
          <div className="whitespace-nowrap overflow-hidden">
            <motion.div
              className="inline-block"
              animate={{ x: [0, -200] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "linear",
              }}
            >
              <span className="text-sm">
                {video.song} 🎵 {video.song} 🎵
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* When feed is done, show text overlay if it's the last video */}
      {isLast && (
        <div className="absolute inset-x-0 bottom-44 flex justify-center z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg"
          >
            <p className="text-white font-bold tracking-widest text-sm uppercase">
              Swipe to proceed →
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export function TiktokSlide() {
  const [phase, setPhase] = useState<
    "stats" | "intro" | "feed"
  >("stats");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "stats") {
      const timer = setTimeout(() => setPhase("intro"), 4000);
      return () => clearTimeout(timer);
    } else if (phase === "intro") {
      const timer = setTimeout(() => setPhase("feed"), 3500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        phase !== "feed" ||
        currentVideoIndex < VIDEOS.length - 1
      ) {
        if (
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === " "
        ) {
          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, {
      capture: true,
    });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
  }, [phase, currentVideoIndex]);

  const scrollToNextVideo = () => {
    if (feedRef.current) {
      feedRef.current.scrollBy({
        top: feedRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  };

  const handleInteraction = (
    e: React.MouseEvent | React.TouchEvent | React.PointerEvent,
  ) => {
    // If not in feed phase, or hasn't reached the last video yet, block swiping out
    if (
      phase !== "feed" ||
      currentVideoIndex < VIDEOS.length - 1
    ) {
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
      className="h-full w-full bg-black relative overflow-hidden font-['Archivo']"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
      onTouchEnd={handleInteraction}
    >
      <AnimatePresence mode="wait">
        {phase === "stats" && (
          <motion.div
            key="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -50, opacity: 0, rotate: 5, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#F3F3F3] overflow-hidden z-20"
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

            {/* Vertical Year text */}
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
                Screen Time
              </motion.div>
            </div>

            <div className="z-10 flex flex-col items-center">
              <motion.div
                initial={{ y: 50, opacity: 0, rotate: -3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_#ff4633] max-w-[95%] rotate-[-2deg]"
              >
                <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-[1] text-center">
                  You spent <br />
                  <span
                    className="text-[6rem] text-[#ff4633] block mt-2"
                    style={{ WebkitTextStroke: "2px black" }}
                  >
                    183
                  </span>
                  <span className="text-3xl mt-2 block">
                    Hours Scrolling...
                  </span>
                </h2>
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ y: 50, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -50, opacity: 0, rotate: 5, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#F3F3F3] overflow-hidden z-20"
          >
            {/* Background Dots */}
            {dots.map((dot, i) => (
              <motion.div
                key={`dot-intro-${i}`}
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
              <path
                d="M 0 100 Q 150 50 200 300 T 400 150 T 600 500"
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
              <path
                d="M 500 -50 Q 300 200 450 500 T 100 700"
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
              <path
                d="M -100 400 Q 200 600 500 400"
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
            </svg>

            {/* Vertical FYP text */}
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
                Screen Time
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 2 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                type: "spring",
              }}
              className="z-20 relative bg-black border-8 border-[#ff4633] p-8 shadow-[-12px_12px_0px_0px_white] max-w-[85%] rotate-[2deg]"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1]">
                Let's take a look at{" "}
                <span className="text-[#ff4633] ">
                  who's been on your FYP
                </span>{" "}
                this year
              </h2>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-10 -right-4 bg-white border-4 border-black p-4 rounded-full shadow-[8px_8px_0px_0px_#252424]"
              >
                <span className="text-4xl">📱</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {phase === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col bg-black"
          >
            {/* The TikTok Feed Container */}
            <div
              ref={feedRef}
              className="flex-1 overflow-y-scroll snap-y snap-mandatory h-full w-full no-scrollbar relative z-0"
            >
              {VIDEOS.map((video, index) => (
                <TiktokVideoItem
                  key={video.id}
                  video={video}
                  isLast={index === VIDEOS.length - 1}
                  onNext={scrollToNextVideo}
                  onVisible={() => setCurrentVideoIndex(index)}
                />
              ))}
            </div>

            {/* Bottom Nav Bar */}
            <div
              className="h-16 bg-black text-white/60 flex items-center justify-around px-4 pb-2 border-t border-white/10 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="flex flex-col items-center text-white">
                <Home
                  className="w-6 h-6 mb-1"
                  strokeWidth={2.5}
                />
                <span className="text-[10px] font-bold">
                  Home
                </span>
              </button>
              <button className="flex flex-col items-center hover:text-white transition-colors">
                <Search
                  className="w-6 h-6 mb-1"
                  strokeWidth={2.5}
                />
                <span className="text-[10px] font-bold">
                  Discover
                </span>
              </button>
              <button className="flex items-center justify-center px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 via-white to-pink-500 relative group">
                <div className="absolute inset-[1.5px] bg-white rounded-md flex items-center justify-center">
                  <Plus
                    className="w-5 h-5 text-black"
                    strokeWidth={3}
                  />
                </div>
                <div className="w-7 h-5 opacity-0"></div>{" "}
                {/* Spacer to maintain button shape */}
              </button>
              <button className="flex flex-col items-center hover:text-white transition-colors">
                <Inbox
                  className="w-6 h-6 mb-1"
                  strokeWidth={2.5}
                />
                <span className="text-[10px] font-bold">
                  Inbox
                </span>
              </button>
              <button className="flex flex-col items-center hover:text-white transition-colors">
                <User
                  className="w-6 h-6 mb-1"
                  strokeWidth={2.5}
                />
                <span className="text-[10px] font-bold">
                  Me
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Style to hide scrollbars for cleaner UI */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
