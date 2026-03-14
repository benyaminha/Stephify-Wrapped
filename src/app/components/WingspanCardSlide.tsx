import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe2 } from "lucide-react";

const CARDS_DATA = [
  {
    id: 1,
    name: "Jeff!",
    subtitle: "",
    videoUrl:
      "https://files.catbox.moe/o8zi9g.mp4",
    action: "All players must show up to the next gamenight",
    flavorText:
      "Fun fact: You've played 32 game nights with Jeff!",
    color: "#d08a44", // Brownish/Orange
  },
  {
    id: 2,
    name: "Kaks",
    subtitle: "",
    videoUrl:
      "https://files.catbox.moe/eet4le.mp4",
    action:
      "Draw a card. If you've tried Kaitlyn's mom's bread, draw 2.",
    flavorText: "Fun Fact: Her brother is a DJ",
    color: "#8ca88c", // Greenish
  },
  {
    id: 3,
    name: "Ivan Bird",
    subtitle: "",
    videoUrl:
      "https://files.catbox.moe/poy84o.mp4",
    action:
      "Round End: Get a free ride home",
    flavorText: "Fun Fact: 19 BBQ nights!",
    color: "#8ca88c", // Greenish
  },
];

export function WingspanCardSlide() {
  const [deck, setDeck] = useState(CARDS_DATA);
  const [activeCard, setActiveCard] = useState<
    (typeof CARDS_DATA)[0] | null
  >(null);

  const isComplete = deck.length === 0 && !activeCard;

  const drawCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deck.length === 0) return;
    const nextCard = deck[0];
    setDeck(deck.slice(1));
    setActiveCard(nextCard);
  };

  const dismissCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCard(null);
  };

  const preventSwipe = (
    e: React.TouchEvent | React.MouseEvent,
  ) => {
    if (!isComplete) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className="relative h-full w-full bg-[#f4f4f0] flex flex-col items-center justify-center p-4 overflow-hidden font-['Archivo']"
      onClick={preventSwipe}
      onTouchStart={preventSwipe}
      onTouchMove={preventSwipe}
      onTouchEnd={preventSwipe}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      />

      <AnimatePresence mode="wait">
        {!isComplete && !activeCard && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[15%] text-center z-10 w-full px-6"
          >
            <div className="bg-white border-[4px] border-black p-4 shadow-[6px_6px_0px_0px_#000] rotate-[-2deg] inline-block">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black leading-[1]">
                Nice roll! <br /> Draw end your turn
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deck.length > 0 && !activeCard && (
          <motion.div
            key="deck"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-56 h-80 cursor-pointer group mt-16"
            onClick={drawCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {[...Array(Math.min(deck.length, 3))].map(
              (_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-[#f4f4f0] border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_#000]"
                  style={{
                    transform: `translate(${i * -6}px, ${i * -6}px) rotate(${i * 2 - 2}deg)`,
                    zIndex: -i,
                  }}
                >
                  <div className="w-full h-full border-[6px] border-[#f4f4f0] bg-[#8ca88c] rounded flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 12px)",
                      }}
                    ></div>
                    <div className="w-24 h-24 bg-[#f4f4f0] rounded-full flex items-center justify-center rotate-45 border-4 border-black z-10 shadow-[4px_4px_0px_0px_#000]">
                      <span className="text-5xl font-black text-black -rotate-45">
                        W
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCard && (
          <motion.div
            key="active-card"
            initial={{
              y: "100%",
              opacity: 0,
              rotate: -10,
              scale: 0.5,
            }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ x: "-100%", opacity: 0, rotate: -20 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
            className="absolute inset-0 flex items-center justify-center z-30 p-6"
            onClick={dismissCard}
          >
            <div
              className="bg-[#fcfbf9] w-full max-w-[360px] rounded-xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col relative max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex bg-white border-b-2 border-gray-300 px-4 py-3 min-h-[70px]">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-black text-xl text-black uppercase tracking-tighter leading-none">
                    {activeCard.name}
                  </h3>
                  <p className="italic text-gray-500 text-sm font-serif leading-none mt-1">
                    {activeCard.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex w-full aspect-[4/3] bg-[#fcfbf9] border-b-2 border-gray-300 relative flex-shrink-0">
                <div className="w-12 h-full bg-[#f0ece1]/90 border-r-2 border-gray-300 flex flex-col items-center py-3 gap-3 z-10 flex-shrink-0">
                  <div className="w-6 h-6 bg-[#4a90e2] rotate-45 shadow-sm border-2 border-white flex items-center justify-center"></div>
                  <div className="text-2xl font-serif font-black text-gray-800 mt-1">
                    5
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white shadow-sm flex items-center justify-center"></div>
                </div>
                <div className="flex-1 bg-[#1c1c1e] relative overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-50"
                    src={activeCard.videoUrl}
                  />
                  <video
                    autoPlay
                    controls
                    playsInline
                    className="relative z-10 w-full h-full object-contain"
                    src={activeCard.videoUrl}
                  />
                </div>
              </div>

              <div
                className="w-full px-5 py-6 flex flex-col justify-center border-b-2 border-gray-300 flex-1 min-h-[100px] overflow-y-auto"
                style={{ backgroundColor: activeCard.color }}
              >
                <p className="font-bold text-black/90 text-sm md:text-base leading-snug drop-shadow-sm">
                  <span className="uppercase text-black mr-2 font-black tracking-wider">
                    When Activated:
                  </span>
                  {activeCard.action}
                </p>
              </div>

              <div className="bg-[#fcfbf9] p-4 flex gap-3 items-start flex-shrink-0">
                <Globe2
                  className="text-gray-400 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <p className="text-xs italic text-gray-600 font-serif leading-snug">
                  {activeCard.flavorText}
                </p>
              </div>

              <button
                className="absolute top-3 right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_#fff] hover:scale-110 transition-transform"
                onClick={dismissCard}
              >
                <X size={16} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center z-10 mt-20"
          >
            <div className="bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_0px_#000] rotate-[2deg] inline-block">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black mb-2">
                All cards drawn!
              </h2>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-600">
                Swipe to continue
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
