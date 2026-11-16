import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { APCY_DRINKS, type DrinkProduct } from '../data/products';
import type { PackOption } from './ProductModal';

interface FlavorStoryShowcaseProps {
  onSelectProduct: (product: DrinkProduct) => void;
  onQuickAdd: (product: DrinkProduct, pack: PackOption, originRect?: DOMRect) => void;
}

interface FlavorTheme {
  bg: string;
  splashPrimary: string;
  splashSecondary: string;
  orbTone: string;
  highlightStroke: string;
  ctaBg: string;
  ctaText: string;
  ingredientLine: string;
  bullets: string[];
  accentDetail: 'citrus' | 'berry' | 'floral' | 'spice' | 'slices' | 'tea';
}

const FLAVOR_THEMES: Record<string, FlavorTheme> = {
  'ginger-lime': {
    bg: '#C24D12',
    splashPrimary: '#DF651F',
    splashSecondary: '#9E3808',
    orbTone: '#E87B32',
    highlightStroke: '#F8A96B',
    ctaBg: '#F6C826',
    ctaText: '#1C1917',
    ingredientLine: 'Ginger Root, Key Lime, Organic ACV, Collagen',
    bullets: [
      'Zesty digest & crisp morning lift',
      'Bright key lime & fiery ginger warmth',
      '2,500 mg bioactive collagen + ACV',
    ],
    accentDetail: 'citrus',
  },
  'blackberry-lavender': {
    bg: '#522A63',
    splashPrimary: '#713A88',
    splashSecondary: '#3C1B4A',
    orbTone: '#884DA0',
    highlightStroke: '#C695DB',
    ctaBg: '#F49AC1',
    ctaText: '#1C1917',
    ingredientLine: 'Wild Blackberry, Lavender Blossom, ACV, Collagen',
    bullets: [
      'Smooth evening relax & reset ritual',
      'Velvety dark berry & aromatic lavender',
      'Zero-proof sparkling aperitif alternative',
    ],
    accentDetail: 'floral',
  },
  'strawberry-mint': {
    bg: '#BF1935',
    splashPrimary: '#EA2B4B',
    splashSecondary: '#940F26',
    orbTone: '#F4415F',
    highlightStroke: '#FF98A9',
    ctaBg: '#FBD0D8',
    ctaText: '#1C1917',
    ingredientLine: 'Garden Strawberry, Spearmint Leaf, ACV, Collagen',
    bullets: [
      'Fresh hydration & crisp clarity',
      'Sun-ripened berry meets cool spearmint',
      'Lightly sparkling, zero sugar added',
    ],
    accentDetail: 'berry',
  },
  'turmeric-pepper': {
    bg: '#A6620C',
    splashPrimary: '#CE7F17',
    splashSecondary: '#814905',
    orbTone: '#E09224',
    highlightStroke: '#F6C46D',
    ctaBg: '#F6C826',
    ctaText: '#1C1917',
    ingredientLine: 'Golden Turmeric, Black Pepper, ACV, Collagen',
    bullets: [
      'Daily radiance & warm balance',
      'Earthy turmeric paired with piperine kick',
      'Clean botanical energy at just 4 kcal',
    ],
    accentDetail: 'spice',
  },
  'cucumber-basil': {
    bg: '#0E5D40',
    splashPrimary: '#197D58',
    splashSecondary: '#09422D',
    orbTone: '#259168',
    highlightStroke: '#7AD3AF',
    ctaBg: '#B8E074',
    ctaText: '#1C1917',
    ingredientLine: 'Crisp Cucumber, Genovese Basil, ACV, Collagen',
    bullets: [
      'Spa calm in a chilled 330 ml can',
      'Cooling garden cucumber & sweet basil',
      'Post-movement mineral refreshment',
    ],
    accentDetail: 'slices',
  },
  'matcha-lemon': {
    bg: '#1A4E48',
    splashPrimary: '#266E65',
    splashSecondary: '#113732',
    orbTone: '#328278',
    highlightStroke: '#89D0C6',
    ctaBg: '#F6C826',
    ctaText: '#1C1917',
    ingredientLine: 'Ceremonial Matcha, Meyer Lemon, ACV, Hyaluronic Acid',
    bullets: [
      'Sustained focus & hydration glow boost',
      'First-harvest matcha & Amalfi lemon zest',
      '120 mg plant-fermented hyaluronic acid',
    ],
    accentDetail: 'tea',
  },
};

const FIZZ_FLECKS = [
  { cx: 95, cy: 140, r: 4, rot: 12 },
  { cx: 210, cy: 260, r: 6, rot: 45 },
  { cx: 340, cy: 95, r: 3.5, rot: 20 },
  { cx: 480, cy: 210, r: 5, rot: 70 },
  { cx: 615, cy: 350, r: 4.5, rot: 15 },
  { cx: 740, cy: 120, r: 6, rot: 35 },
  { cx: 880, cy: 480, r: 4, rot: 60 },
  { cx: 1030, cy: 170, r: 5.5, rot: 25 },
  { cx: 1180, cy: 310, r: 4, rot: 80 },
  { cx: 1320, cy: 130, r: 6.5, rot: 10 },
  { cx: 150, cy: 580, r: 5, rot: 50 },
  { cx: 290, cy: 710, r: 4, rot: 30 },
  { cx: 440, cy: 510, r: 6, rot: 65 },
  { cx: 590, cy: 670, r: 4.5, rot: 18 },
  { cx: 790, cy: 610, r: 5.5, rot: 40 },
  { cx: 960, cy: 740, r: 4, rot: 55 },
  { cx: 1140, cy: 660, r: 6, rot: 22 },
  { cx: 1340, cy: 590, r: 4.5, rot: 75 },
  { cx: 520, cy: 820, r: 5, rot: 14 },
  { cx: 1240, cy: 810, r: 5, rot: 42 },
];

function FullBleedFlavorGraphics({
  theme,
  index,
}: {
  theme: FlavorTheme;
  index: number;
}) {
  // Alternate slight focal offsets per flavor index so every full-screen slide feels fresh
  const flip = index % 2 === 1;

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full select-none"
      aria-hidden="true"
    >
      {/* Large Ambient Layered Translucent Orbs across Left, Center & Right */}
      <g opacity="0.48">
        <circle cx={flip ? 1280 : 140} cy="150" r="175" fill={theme.orbTone} />
        <circle cx={flip ? 1120 : 280} cy="95" r="78" fill={theme.splashSecondary} />
        <circle cx={flip ? 150 : 1220} cy="165" r="195" fill={theme.splashSecondary} />
        <circle cx={flip ? 1310 : 130} cy="830" r="210" fill={theme.splashSecondary} />
        <circle cx="715" cy="680" r="105" fill={theme.orbTone} />
        <circle cx="1095" cy="765" r="145" fill={theme.splashSecondary} />
        <circle cx="430" cy="110" r="125" fill={theme.orbTone} opacity="0.7" />
        <circle cx="1385" cy="490" r="130" fill={theme.orbTone} opacity="0.65" />
      </g>

      {/* Top-Center Glossy Teardrop Splash */}
      <g transform={`translate(${flip ? 770 : 690}, -15) rotate(${flip ? -8 : 6})`}>
        <path
          d="M0 0 C58 110, 128 215, 118 308 C110 385, 58 432, 0 432 C-58 432, -110 385, -118 308 C-128 215, -58 110, 0 0 Z"
          fill={theme.splashPrimary}
          opacity="0.78"
        />
        <path
          d="M-56 260 C-58 320, -28 368, 4 380"
          fill="none"
          stroke={theme.highlightStroke}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.72"
        />
      </g>

      {/* Bottom-Center-Left Hero Splash & Droplet (spans behind & beside headline area) */}
      <g transform={`translate(${flip ? 540 : 415}, 915) rotate(${flip ? 10 : -12})`}>
        <path
          d="M0 0 C74 -130, 138 -255, 124 -360 C114 -442, 58 -495, 0 -495 C-58 -495, -114 -442, -124 -360 C-138 -255, -74 -130, 0 0 Z"
          fill={theme.splashPrimary}
          opacity="0.86"
        />
        <path
          d="M55 -285 C58 -355, 28 -415, -8 -432"
          fill="none"
          stroke={theme.highlightStroke}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.82"
        />
        <circle cx="128" cy="-420" r="56" fill={theme.orbTone} opacity="0.82" />
      </g>

      {/* Right-Side Layered Liquid Splash Behind Twin Cans */}
      <g transform={`translate(${flip ? 1030 : 1070}, 490) rotate(${flip ? -14 : 14})`}>
        <circle cx="0" cy="0" r="245" fill={theme.splashSecondary} opacity="0.45" />
        <path
          d="M0 -310 C84 -190, 165 -65, 152 65 C140 165, 76 225, 0 225 C-76 225, -140 165, -152 65 C-165 -65, -84 -190, 0 -310 Z"
          fill={theme.splashPrimary}
          opacity="0.6"
        />
        <path
          d="M-68 -20 C-72 60, -38 125, 12 145"
          fill="none"
          stroke={theme.highlightStroke}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.65"
        />
      </g>

      {/* Flavor-Specific Subtle Botanical Accent Lines Integrated Across Left & Right */}
      {theme.accentDetail === 'citrus' && (
        <g opacity="0.22" stroke={theme.highlightStroke} fill="none" strokeWidth="5">
          <circle cx="1065" cy="465" r="285" strokeDasharray="18 22" />
          <circle cx="195" cy="690" r="92" />
          <line x1="195" y1="598" x2="195" y2="782" />
          <line x1="103" y1="690" x2="287" y2="690" />
        </g>
      )}
      {theme.accentDetail === 'floral' && (
        <g opacity="0.22" stroke={theme.highlightStroke} fill="none" strokeWidth="4">
          <ellipse cx="1070" cy="460" rx="290" ry="190" transform="rotate(-18 1070 460)" />
          <ellipse cx="1070" cy="460" rx="290" ry="190" transform="rotate(42 1070 460)" />
          <circle cx="240" cy="215" r="68" />
        </g>
      )}
      {theme.accentDetail === 'berry' && (
        <g opacity="0.26" fill={theme.highlightStroke}>
          <circle cx="220" cy="205" r="14" />
          <circle cx="810" cy="390" r="22" />
          <circle cx="1310" cy="285" r="18" />
          <circle cx="1275" cy="720" r="24" />
          <circle cx="1060" cy="465" r="275" fill="none" stroke={theme.highlightStroke} strokeWidth="4" strokeDasharray="10 26" />
        </g>
      )}
      {theme.accentDetail === 'spice' && (
        <g opacity="0.22" stroke={theme.highlightStroke} fill="none" strokeWidth="4.5">
          <polygon points="1070,175 1320,610 820,610" />
          <circle cx="225" cy="705" r="85" strokeDasharray="12 18" />
        </g>
      )}
      {theme.accentDetail === 'slices' && (
        <g opacity="0.24" stroke={theme.highlightStroke} fill="none" strokeWidth="5">
          <circle cx="1065" cy="465" r="265" />
          <circle cx="1065" cy="465" r="205" strokeDasharray="16 20" />
          <circle cx="170" cy="195" r="84" />
        </g>
      )}
      {theme.accentDetail === 'tea' && (
        <g opacity="0.24" stroke={theme.highlightStroke} fill="none" strokeWidth="4.5">
          <path d="M110 730 Q 250 610 385 730 T 660 730" />
          <circle cx="1065" cy="465" r="275" strokeDasharray="24 18" />
        </g>
      )}

      {/* Full-Canvas Fine Effervescent Botanical Flecks & Sparkles */}
      <g opacity="0.34">
        {FIZZ_FLECKS.map((fleck, idx) => (
          <ellipse
            key={idx}
            cx={fleck.cx}
            cy={fleck.cy}
            rx={fleck.r}
            ry={fleck.r * 1.45}
            fill={idx % 2 === 0 ? theme.highlightStroke : theme.splashSecondary}
            transform={`rotate(${fleck.rot} ${fleck.cx} ${fleck.cy})`}
          />
        ))}
      </g>
    </svg>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FlavorFullScreenPanelProps {
  drink: DrinkProduct;
  index: number;
  theme: FlavorTheme;
  onSelectProduct: (product: DrinkProduct) => void;
  onQuickAdd: (product: DrinkProduct, pack: PackOption, originRect?: DOMRect) => void;
  onScrollToFlavor: (id: string) => void;
}

function FlavorFullScreenPanel({
  drink,
  index,
  theme,
  onSelectProduct,
  onQuickAdd,
  onScrollToFlavor,
}: FlavorFullScreenPanelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canImgRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Twin V-formation cans enter tilted wider, glide cleanly into a poised symmetrical V
  const canLeftRotate = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [-28, -11, -11, -15]);
  const canLeftY = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [120, 10, 10, -48]);
  const canLeftX = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [-68, -42, -42, -52]);

  const canRightRotate = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [28, 11, 11, 15]);
  const canRightY = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [96, -8, -8, -62]);
  const canRightX = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [68, 42, 42, 52]);

  const canScale = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [0.84, 1, 1, 0.94]);
  const backdropY = useTransform(scrollYProgress, [0, 1], [-26, 26]);

  return (
    <section
      ref={sectionRef}
      id={`story-${drink.id}`}
      style={{ backgroundColor: theme.bg }}
      className="relative min-h-[100svh] w-full text-[#FAF6F1] overflow-hidden flex items-center py-20 sm:py-24"
    >
      {/* Full-Screen Organic Liquid Splash, Orbs & Fizz Backdrop Spanning Entire Canvas */}
      <motion.div
        style={{ y: backdropY }}
        className="pointer-events-none absolute -inset-y-10 inset-x-0 will-change-transform"
      >
        <FullBleedFlavorGraphics theme={theme} index={index} />
      </motion.div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
        {/* Left Editorial Column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="lg:col-span-6 space-y-5 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FAF6F1]/80">
            0{index + 1} · {drink.activesLabel}
          </p>

          <h2
            className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[0.96] drop-shadow-[0_2px_12px_rgba(0,0,0,0.14)]"
            style={{ textWrap: 'balance' }}
          >
            {drink.name}
          </h2>

          <p className="text-base sm:text-lg font-medium text-[#FAF6F1]/95">
            {theme.ingredientLine}
          </p>

          <div className="pt-1">
            <span className="inline-block border-2 border-[#FAF6F1]/85 rounded-lg px-4 py-1.5 font-mono text-base sm:text-xl font-bold tracking-tight tabular-nums bg-black/10 backdrop-blur-[2px]">
              {drink.calories} · 0g sugar
            </span>
          </div>

          <ul className="space-y-1.5 text-sm sm:text-base text-[#FAF6F1]/95 pt-1">
            {theme.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                onQuickAdd(
                  drink,
                  'six',
                  canImgRef.current ? canImgRef.current.getBoundingClientRect() : undefined
                )
              }
              style={{ backgroundColor: theme.ctaBg, color: theme.ctaText }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg cursor-pointer"
            >
              <span>Shop Now · €{drink.priceSixPack.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button
              type="button"
              onClick={() => onSelectProduct(drink)}
              className="text-xs sm:text-sm font-semibold underline underline-offset-4 text-[#FAF6F1]/90 hover:text-white cursor-pointer"
            >
              Nutrition &amp; Pack Sizes
            </button>
          </div>
        </motion.div>

        {/* Right Scroll-Driven Twin Cans in Balanced V-Formation */}
        <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2">
          <div
            onClick={() => onSelectProduct(drink)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProduct(drink);
              }
            }}
            aria-label={`Inspect ${drink.name}`}
            className="group relative w-[290px] sm:w-[390px] lg:w-[440px] h-[330px] sm:h-[430px] lg:h-[510px] flex items-center justify-center cursor-pointer focus:outline-none"
          >
            {/* Left Can of the V */}
            <motion.div
              style={{
                rotate: canLeftRotate,
                y: canLeftY,
                x: canLeftX,
                scale: canScale,
              }}
              className="absolute inset-0 flex items-center justify-center origin-bottom will-change-transform z-10 transition-transform duration-300 group-hover:-translate-x-2"
            >
              <img
                src={drink.image}
                alt={`apcy ${drink.name} 330 ml sparkling can`}
                referrerPolicy="no-referrer"
                className="h-[255px] sm:h-[345px] lg:h-[420px] w-auto object-contain drop-shadow-[0_28px_36px_rgba(0,0,0,0.42)] select-none opacity-95"
              />
            </motion.div>

            {/* Right Can of the V */}
            <motion.div
              style={{
                rotate: canRightRotate,
                y: canRightY,
                x: canRightX,
                scale: canScale,
              }}
              className="absolute inset-0 flex items-center justify-center origin-bottom will-change-transform z-20 transition-transform duration-300 group-hover:translate-x-2"
            >
              <img
                ref={canImgRef}
                src={drink.image}
                alt={`apcy ${drink.name} 330 ml sparkling can`}
                referrerPolicy="no-referrer"
                className="h-[275px] sm:h-[375px] lg:h-[455px] w-auto object-contain drop-shadow-[0_34px_44px_rgba(0,0,0,0.5)] select-none"
              />
            </motion.div>
          </div>

          {/* Side Dot Navigator */}
          <nav
            aria-label="Flavor story sections"
            className="hidden sm:flex flex-col gap-2.5 absolute right-0 top-1/2 -translate-y-1/2"
          >
            {APCY_DRINKS.map((dotDrink) => {
              const active = dotDrink.id === drink.id;
              return (
                <button
                  key={dotDrink.id}
                  type="button"
                  onClick={() => onScrollToFlavor(dotDrink.id)}
                  aria-label={`Jump to ${dotDrink.name}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    active ? 'bg-white scale-125' : 'bg-white/35 hover:bg-white/75'
                  }`}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function FlavorStoryShowcase({
  onSelectProduct,
  onQuickAdd,
}: FlavorStoryShowcaseProps) {
  const scrollToFlavor = (id: string) => {
    const el = document.getElementById(`story-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div id="rituals">
      {APCY_DRINKS.map((drink, index) => {
        const theme = FLAVOR_THEMES[drink.id] || FLAVOR_THEMES['ginger-lime'];
        return (
          <FlavorFullScreenPanel
            key={drink.id}
            drink={drink}
            index={index}
            theme={theme}
            onSelectProduct={onSelectProduct}
            onQuickAdd={onQuickAdd}
            onScrollToFlavor={scrollToFlavor}
          />
        );
      })}
    </div>
  );
}
