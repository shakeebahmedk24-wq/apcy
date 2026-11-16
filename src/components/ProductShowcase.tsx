import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { APCY_DRINKS, type DrinkProduct } from '../data/products';
import type { PackOption } from './ProductModal';

interface ProductShowcaseProps {
  onSelectProduct: (product: DrinkProduct) => void;
  onQuickAdd: (product: DrinkProduct, pack: PackOption, originRect?: DOMRect) => void;
}

export function ProductShowcase({ onSelectProduct, onQuickAdd }: ProductShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'collagen' | 'hyaluronic'>('all');
  const [quickPack, setQuickPack] = useState<PackOption>('six');
  const [addedId, setAddedId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canImgRefs = useRef<Record<string, HTMLImageElement | null>>({});

  const filteredDrinks = APCY_DRINKS.filter((drink) => {
    if (filter === 'all') return true;
    return drink.activesType === filter;
  });

  const scrollTrack = (dir: 'prev' | 'next') => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === 'next' ? 340 : -340,
      behavior: 'smooth',
    });
  };

  const getPriceForPack = (drink: DrinkProduct) => {
    if (quickPack === 'single') return drink.priceSingle;
    if (quickPack === 'six') return drink.priceSixPack;
    return drink.priceTwelvePack;
  };

  const getPackLabel = () => {
    if (quickPack === 'single') return 'Single Can';
    if (quickPack === 'six') return '6-Pack';
    return '12-Pack';
  };

  const handleAnimatedQuickAdd = (drink: DrinkProduct) => {
    const imgEl = canImgRefs.current[drink.id];
    const originRect = imgEl ? imgEl.getBoundingClientRect() : undefined;

    onQuickAdd(drink, quickPack, originRect);
    setAddedId(drink.id);

    window.setTimeout(() => {
      setAddedId((prev) => (prev === drink.id ? null : prev));
    }, 950);
  };

  return (
    <section id="shop" className="py-20 sm:py-28 bg-[#FAF6F1] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center text-center mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D94E28] mb-3">
            The 330 ml Functional Lineup
          </p>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.98] text-[#1C1917] max-w-3xl"
            style={{ textWrap: 'balance' }}
          >
            Drinks as clean as they are delicious
          </h2>

          <div className="flex items-center gap-3 mt-6 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => scrollTrack('prev')}
              aria-label="Scroll products left"
              className="w-11 h-11 rounded-full border border-[#1C1917] bg-white flex items-center justify-center hover:bg-[#1C1917] hover:text-[#FAF6F1] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => scrollTrack('next')}
              aria-label="Scroll products right"
              className="w-11 h-11 rounded-full border border-[#1C1917] bg-white flex items-center justify-center hover:bg-[#1C1917] hover:text-[#FAF6F1] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-stone-200 mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-stone-200/70 rounded-full w-fit overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Flavors' },
              { id: 'collagen', label: 'ACV + Collagen' },
              { id: 'hyaluronic', label: 'ACV + Hyaluronic' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as 'all' | 'collagen' | 'hyaluronic')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#1C1917] text-[#FAF6F1] shadow-xs'
                    : 'text-stone-700 hover:text-[#1C1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-stone-500 font-semibold uppercase tracking-wider">Pack Size:</span>
            <div className="inline-flex items-center gap-1 p-1 bg-white border border-stone-200 rounded-full">
              {(
                [
                  { id: 'single', label: 'Single' },
                  { id: 'six', label: '6-Pack' },
                  { id: 'twelve', label: '12-Pack' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuickPack(opt.id)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    quickPack === opt.id
                      ? 'bg-[#D94E28] text-[#FAF6F1]'
                      : 'text-stone-600 hover:text-[#1C1917]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div
          ref={trackRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-6 md:pb-0"
        >
          {filteredDrinks.map((drink, idx) => {
            const price = getPriceForPack(drink);
            const isAdded = addedId === drink.id;

            return (
              <motion.article
                key={drink.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group min-w-[260px] sm:min-w-[280px] lg:min-w-0 snap-start flex flex-col items-center text-center"
              >
                <button
                  type="button"
                  onClick={() => onSelectProduct(drink)}
                  aria-label={`View details for ${drink.name}`}
                  className="relative w-full h-80 flex items-center justify-center cursor-pointer focus:outline-none"
                >
                  <span
                    aria-hidden="true"
                    className="absolute w-52 h-52 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    style={{ backgroundColor: drink.accentHex }}
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      scale: [0.92, 1.06, 0.92],
                      opacity: [0.22, 0.12, 0.22],
                    }}
                    transition={{
                      duration: 3.8 + (idx % 3) * 0.45,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.4,
                    }}
                    className="absolute bottom-5 w-28 h-5 rounded-full bg-black/25 blur-md transition-all duration-300 group-hover:w-32"
                  />

                  <motion.div
                    animate={{
                      y: [-7, 7, -7],
                      rotate: [0, idx % 2 === 0 ? 1.2 : -1.2, 0],
                    }}
                    transition={{
                      duration: 3.8 + (idx % 3) * 0.45,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.4,
                    }}
                    className="relative z-10 will-change-transform"
                  >
                    <img
                      ref={(el) => {
                        canImgRefs.current[drink.id] = el;
                      }}
                      src={drink.image}
                      alt={`apcy ${drink.name} 330 ml sparkling can`}
                      referrerPolicy="no-referrer"
                      className="h-68 w-auto object-contain transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4 group-hover:-rotate-3 group-hover:scale-[1.06] drop-shadow-lg"
                    />
                  </motion.div>
                </button>

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(drink)}
                    className="font-serif text-2xl font-bold uppercase tracking-tight text-[#1C1917] hover:text-[#D94E28] transition-colors cursor-pointer"
                  >
                    {drink.name}
                  </button>

                  <p className="text-xs font-medium text-stone-600 mt-1">
                    {drink.tagline} · {drink.calories}
                  </p>

                  <p className="mt-1.5 text-sm font-mono font-semibold tabular-nums text-[#1C1917]">
                    €{price.toFixed(2)}{' '}
                    <span className="text-xs font-sans font-normal text-stone-500">
                      / {getPackLabel()}
                    </span>
                  </p>
                </div>

                <div className="mt-5 w-full max-w-[220px]">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleAnimatedQuickAdd(drink)}
                    className={`w-full h-12 rounded-full border border-[#1C1917] transition-all duration-200 flex items-center justify-between pl-5 pr-1.5 text-xs font-bold uppercase tracking-[0.12em] cursor-pointer overflow-hidden ${
                      isAdded
                        ? 'bg-[#1C1917] text-[#F6C826]'
                        : 'bg-white text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF6F1]'
                    }`}
                  >
                    <span>{isAdded ? 'Dropped in Bag' : 'Quick Add'}</span>

                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isAdded
                          ? 'bg-[#F6C826] text-[#1C1917]'
                          : 'bg-[#1C1917] text-[#FAF6F1] group-hover:bg-[#D94E28]'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
