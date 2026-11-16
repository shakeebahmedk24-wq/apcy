import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { APCY_DRINKS, type DrinkProduct } from '../data/products';
import { HeroBotanicalBackdrop } from './HeroBotanicalBackdrop';

interface HeroSectionProps {
  activeId: string;
  onChangeActiveId: (id: string) => void;
  onSelectProduct: (product: DrinkProduct) => void;
}

export const HERO_SLIDES = [
  'matcha-lemon',
  'cucumber-basil',
  'strawberry-mint',
  'turmeric-pepper',
  'ginger-lime',
  'blackberry-lavender',
];

export const HERO_PALETTES: Record<
  string,
  {
    bg: string;
    facet: string;
    claimBar: string;
    ringColor: string;
    headline: string;
  }
> = {
  'matcha-lemon': {
    bg: '#0B6866',
    facet: '#085957',
    claimBar: '#074D4B',
    ringColor: '#EFEA9E',
    headline: 'Sparkling botanical focus & glow',
  },
  'cucumber-basil': {
    bg: '#0E5D40',
    facet: '#0A4D34',
    claimBar: '#07402B',
    ringColor: '#D6F0A3',
    headline: 'Spa calm botanical refreshment',
  },
  'strawberry-mint': {
    bg: '#9F1932',
    facet: '#871328',
    claimBar: '#750F22',
    ringColor: '#FAD1DA',
    headline: 'Fresh hydration & crisp clarity',
  },
  'turmeric-pepper': {
    bg: '#9D580B',
    facet: '#844907',
    claimBar: '#6F3C05',
    ringColor: '#FCE39D',
    headline: 'Golden radiance & daily balance',
  },
  'ginger-lime': {
    bg: '#B44711',
    facet: '#983A0B',
    claimBar: '#802F08',
    ringColor: '#FCE29C',
    headline: 'Zesty botanical digest & energy',
  },
  'blackberry-lavender': {
    bg: '#4E285E',
    facet: '#3E1E4C',
    claimBar: '#32173E',
    ringColor: '#F3C6E2',
    headline: 'Evening relax & botanical reset',
  },
};

const SILKY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection({
  activeId,
  onChangeActiveId,
  onSelectProduct,
}: HeroSectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  const findDrink = (id: string) => APCY_DRINKS.find((d) => d.id === id) || APCY_DRINKS[5];
  const activeDrink = findDrink(activeId);
  const palette = HERO_PALETTES[activeId] || HERO_PALETTES['matcha-lemon'];
  const marqueeDrinks = [...HERO_SLIDES, ...HERO_SLIDES, ...HERO_SLIDES];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      const currentIdx = HERO_SLIDES.indexOf(activeId);
      const nextIdx = (currentIdx + 1) % HERO_SLIDES.length;
      onChangeActiveId(HERO_SLIDES[nextIdx]);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [activeId, isPaused, onChangeActiveId]);

  const handleStep = (dir: -1 | 1) => {
    const currentIdx = HERO_SLIDES.indexOf(activeId);
    const nextIdx = (currentIdx + dir + HERO_SLIDES.length) % HERO_SLIDES.length;
    onChangeActiveId(HERO_SLIDES[nextIdx]);
  };

  return (
    <section
      style={{ backgroundColor: palette.bg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative text-[#FAF6F1] overflow-hidden transition-colors duration-700 ease-out"
    >
      {/* Subtle Tonal Geometric Facet Backdrop */}
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-90"
      >
        <polygon points="0,0 560,0 240,560 0,340" fill={palette.facet} opacity="0.45" />
        <polygon points="940,0 1440,0 1440,680 760,420" fill={palette.facet} opacity="0.55" />
        <circle cx="760" cy="210" r="190" fill={palette.facet} opacity="0.5" />
        <polygon points="1080,140 1440,480 920,760 720,480" fill={palette.facet} opacity="0.38" />
        <polygon points="180,520 520,760 0,760" fill={palette.facet} opacity="0.35" />
      </svg>

      {/* Main Hero Grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8 min-h-[540px] lg:min-h-[600px]">
        {/* Left Editorial Column (Smooth crossfade on slide change) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: SILKY_EASE }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#EFEA9E]/90">
            {activeDrink.name} · {activeDrink.activesLabel}
          </p>

          <motion.h1
            key={`h1-${activeDrink.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SILKY_EASE }}
            className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold tracking-tight leading-[0.98] text-[#EFEA9E]"
            style={{ textWrap: 'balance' }}
          >
            {palette.headline}
          </motion.h1>

          <motion.p
            key={`p-${activeDrink.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: SILKY_EASE }}
            className="text-base sm:text-lg text-[#FAF6F1]/92 max-w-lg leading-relaxed"
          >
            {activeDrink.description} Only 4 kcal, zero sugar added.
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: SILKY_EASE }}
              className="inline-flex items-center justify-center bg-[#FF1F8F] hover:bg-[#EFEA9E] text-[#FAF6F1] hover:text-[#1C1917] transition-colors duration-200 px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-black/20 cursor-pointer"
            >
              Find out more
            </motion.a>

            <button
              type="button"
              onClick={() => onSelectProduct(activeDrink)}
              className="text-sm font-semibold text-[#FAF6F1]/90 hover:text-[#EFEA9E] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Inspect {activeDrink.name}
            </button>
          </div>
        </motion.div>

        {/* Right Tilted Hero Can + Botanical Display Graphics (All 6 Cans Preloaded) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[440px] h-[340px] sm:h-[420px] lg:h-[460px] flex items-center justify-center">
            {/* Botanical Fruit & Aura Display Art Behind the Can */}
            <HeroBotanicalBackdrop
              flavorId={activeDrink.id}
              accentHex={activeDrink.accentHex}
              ringColor={palette.ringColor}
            />

            {/* Preloaded 6-Can Stack — Every Slide Always Renders Reliably */}
            {HERO_SLIDES.map((id) => {
              const drink = findDrink(id);
              const isActive = id === activeId;

              return (
                <motion.button
                  key={drink.id}
                  type="button"
                  onClick={() => onSelectProduct(drink)}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                  aria-label={`Inspect apcy ${drink.name}`}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.84,
                    rotate: isActive ? 13 : 24,
                    y: isActive ? 0 : 28,
                  }}
                  whileHover={isActive ? { scale: 1.05, rotate: 9, y: -8 } : undefined}
                  transition={{ duration: 0.55, ease: SILKY_EASE }}
                  style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex: isActive ? 20 : 10,
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none will-change-transform"
                >
                  <motion.div
                    animate={
                      isActive
                        ? { y: [-9, 9, -9], rotate: [0, -1.2, 0] }
                        : { y: 0, rotate: 0 }
                    }
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative flex flex-col items-center justify-center will-change-transform"
                  >
                    <img
                      src={drink.image}
                      alt={`apcy ${drink.name} 330 ml sparkling can`}
                      referrerPolicy="no-referrer"
                      className="h-[295px] sm:h-[375px] lg:h-[430px] w-auto object-contain drop-shadow-[0_32px_44px_rgba(0,0,0,0.45)] select-none"
                    />
                    <motion.span
                      aria-hidden="true"
                      animate={
                        isActive
                          ? { scale: [0.92, 1.08, 0.92], opacity: [0.35, 0.2, 0.35] }
                          : { scale: 0.8, opacity: 0 }
                      }
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="mt-2 w-36 h-4 rounded-full bg-black/50 blur-md"
                    />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Slider Controls: Prev + Flavor Dots + Next */}
          <div className="relative z-30 flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Previous featured flavor"
              className="w-8 h-8 rounded-full border border-white/25 bg-black/15 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Featured hero flavor"
            >
              {HERO_SLIDES.map((id) => {
                const drink = findDrink(id);
                const isSelected = activeId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`Preview ${drink.name} in hero`}
                    onClick={() => onChangeActiveId(id)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isSelected ? 'w-7 bg-[#EFEA9E]' : 'w-2.5 bg-white/35 hover:bg-white/75'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Next featured flavor"
              className="w-8 h-8 rounded-full border border-white/25 bg-black/15 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dark Claims Strip */}
      <div
        style={{ backgroundColor: palette.claimBar }}
        className="relative z-10 py-3.5 px-4 text-center border-t border-white/10 transition-colors duration-700 ease-out"
      >
        <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-[#FAF6F1]">
          NO ADDED SUGAR · ORGANIC APPLE CIDER VINEGAR
        </p>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#EFEA9E] mt-0.5">
          ONLY 4 KCAL · BIOACTIVE COLLAGEN · HYALURONIC ACID · REAL BOTANICALS · 330 ML
        </p>
      </div>

      {/* Rounded Warm Cream Botanical Fruits Marquee Strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease: SILKY_EASE }}
        className="relative z-20 bg-[#FBF4E4] text-[#1C1917] border-b border-[#E6DAC0] overflow-hidden"
      >
        <div className="animate-marquee py-4 items-center">
          {marqueeDrinks.map((id, idx) => {
            const drink = findDrink(id);
            const isActive = activeId === id;
            return (
              <button
                key={`${id}-${idx}`}
                type="button"
                onMouseEnter={() => onChangeActiveId(id)}
                onClick={() => onSelectProduct(drink)}
                className={`group inline-flex items-center gap-3.5 text-left px-4 py-1.5 mx-2 rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive ? 'bg-white shadow-sm' : 'hover:bg-white/80'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full shrink-0 overflow-hidden flex items-center justify-center border border-black/10 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: drink.surfaceTint }}
                >
                  <img
                    src={drink.botanicalIcon}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="whitespace-nowrap pr-2">
                  <p className="text-xs sm:text-sm font-bold text-[#1C1917] group-hover:text-[#D94E28] transition-colors">
                    {drink.name}
                  </p>
                  <p className="text-[11px] text-stone-500">{drink.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
