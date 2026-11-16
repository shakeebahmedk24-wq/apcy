import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import {
  APCY_BUNDLES,
  APCY_DRINKS,
  CUSTOMER_REVIEWS,
  type BundlePack,
  type DrinkProduct,
} from '../data/products';

interface ReviewsAndBundlesProps {
  onAddBundle: (bundle: BundlePack, originRect?: DOMRect) => void;
  onSelectProduct: (product: DrinkProduct) => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ReviewsAndBundles({
  onAddBundle,
  onSelectProduct,
}: ReviewsAndBundlesProps) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length);
  };

  const activeReview = CUSTOMER_REVIEWS[activeReviewIdx];
  const matchedDrink =
    APCY_DRINKS.find((d) => d.name === activeReview.flavor) || APCY_DRINKS[0];

  return (
    <>
      {/* Editorial Customer Reviews Showcase */}
      <section id="reviews" className="py-20 sm:py-28 bg-[#FAF6F1] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-300/70 mb-12"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D94E28] mb-3">
                Daily Ritualists · 4.9 / 5.0 Average
              </p>
              <h2
                className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917]"
                style={{ textWrap: 'balance' }}
              >
                Heard across kitchens &amp; studios.
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={prevReview}
                aria-label="Previous customer review"
                className="w-11 h-11 rounded-full border border-[#1C1917] bg-transparent flex items-center justify-center hover:bg-[#1C1917] hover:text-[#FAF6F1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={nextReview}
                aria-label="Next customer review"
                className="w-11 h-11 rounded-full border border-[#1C1917] bg-transparent flex items-center justify-center hover:bg-[#1C1917] hover:text-[#FAF6F1] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left: Interactive Editorial Quote Index */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="lg:col-span-5 flex flex-col justify-between divide-y divide-stone-200/90 border-y border-stone-200/90"
            >
              {CUSTOMER_REVIEWS.map((rev, idx) => {
                const isSelected = idx === activeReviewIdx;
                return (
                  <button
                    key={rev.id}
                    type="button"
                    onClick={() => setActiveReviewIdx(idx)}
                    className={`group py-4 px-2 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                      isSelected ? 'text-[#1C1917]' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span
                        className={`text-xs font-mono tabular-nums ${
                          isSelected ? 'text-[#D94E28] font-bold' : 'text-stone-400'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-serif text-lg sm:text-xl font-semibold truncate">
                          {rev.author}
                        </p>
                        <p className="text-xs truncate mt-0.5">{rev.role}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors ${
                        isSelected ? 'text-[#D94E28]' : 'text-stone-400 group-hover:text-stone-600'
                      }`}
                    >
                      {rev.flavor}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Right: Dark Architectural Pull-Quote Stage with Floating Matched Can */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-7 bg-[#141311] text-[#FAF6F1] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[340px]"
            >
              {/* Subtle Flavor Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-72 rounded-full blur-3xl opacity-25 transition-colors duration-500"
                style={{ backgroundColor: matchedDrink.accentHex }}
              />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-8">
                  <Quote className="w-7 h-7 text-[#F6C826] mb-5 opacity-85" aria-hidden="true" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeReview.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#EFEA9E] leading-snug mb-4">
                        &ldquo;{activeReview.title}&rdquo;
                      </h3>
                      <p className="text-sm sm:text-base text-[#FAF6F1]/82 leading-relaxed">
                        {activeReview.body}
                      </p>

                      <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[#FAF6F1]">
                            {activeReview.author}
                          </p>
                          <p className="text-xs text-stone-400 mt-0.5">{activeReview.role}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectProduct(matchedDrink)}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F6C826] hover:text-white transition-colors cursor-pointer"
                        >
                          <span>Inspect {matchedDrink.name}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Floating Matched Can Accent */}
                <div className="hidden sm:flex sm:col-span-4 items-center justify-center">
                  <motion.button
                    type="button"
                    onClick={() => onSelectProduct(matchedDrink)}
                    aria-label={`Inspect ${matchedDrink.name}`}
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.07, rotate: 4 }}
                    className="cursor-pointer focus:outline-none"
                  >
                    <img
                      src={matchedDrink.image}
                      alt={matchedDrink.name}
                      referrerPolicy="no-referrer"
                      className="h-56 w-auto object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Bundle & Save Section */}
      <section
        id="bundles"
        className="py-20 sm:py-28 bg-[#F4EFE7] border-t border-stone-200/80 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D94E28] mb-3">
                Curated Multi-Packs
              </p>
              <h2
                className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.02] text-[#1C1917]"
                style={{ textWrap: 'balance' }}
              >
                Stock the fridge. Save automatically.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-600 max-w-md leading-relaxed">
              Every multi-pack or custom mix in your basket unlocks progressive savings and
              complimentary chilled delivery.
            </p>
          </motion.div>

          {/* Architectural Dark Progressive Tiers Bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="bg-[#141311] text-[#FAF6F1] rounded-2xl border border-white/10 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 mb-12"
          >
            {[
              { step: '01', spend: '€30+', reward: '5% Off Order' },
              { step: '02', spend: '€45+', reward: 'Free Chilled Delivery' },
              { step: '03', spend: '€65+', reward: '10% Off + Free Delivery' },
              { step: '04', spend: '€90+', reward: '15% Off + Free Delivery' },
            ].map((tier) => (
              <div key={tier.step} className="px-6 py-5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>TIER {tier.step}</span>
                  <span className="text-[#F6C826] font-semibold tabular-nums">{tier.spend}</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#FAF6F1] mt-2">
                  {tier.reward}
                </p>
              </div>
            ))}
          </motion.div>

          {/* 2 Gallery-Grade Bundle Editions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {APCY_BUNDLES.map((bundle, bIdx) => {
              const showcaseCans =
                bIdx === 0 ? APCY_DRINKS.slice(0, 3) : APCY_DRINKS.slice(3, 6);
              return (
                <motion.article
                  key={bundle.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: bIdx * 0.1, ease: EASE }}
                  className="group bg-white border border-stone-200/90 rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 transition-shadow duration-200 hover:shadow-xl"
                >
                  {/* Clean Studio Pedestal Stage */}
                  <div className="sm:col-span-5 relative min-h-[260px] sm:min-h-full bg-[#ECE4D7] flex items-center justify-center p-6 overflow-hidden">
                    <div className="relative z-10 flex items-end justify-center gap-1.5">
                      {showcaseCans.map((can, idx) => (
                        <img
                          key={can.id}
                          src={can.image}
                          alt={can.name}
                          referrerPolicy="no-referrer"
                          className={`object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out ${
                            idx === 1
                              ? 'h-48 sm:h-52 group-hover:-translate-y-2'
                              : 'h-44 sm:h-48 group-hover:-translate-y-1'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Editorial Specs & Add CTA */}
                  <div className="sm:col-span-7 p-7 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#D94E28] mb-2">
                        <span>{bundle.savingsLabel}</span>
                        <span aria-hidden="true" className="text-stone-300">
                          ·
                        </span>
                        <span className="text-stone-500 font-mono tabular-nums">
                          {bundle.canCount} × 330 ML
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-tight">
                        {bundle.name}
                      </h3>

                      <p className="text-sm text-stone-600 leading-relaxed mt-3">
                        {bundle.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                          Inside the box
                        </p>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {bundle.includedFlavors.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-mono font-bold tabular-nums text-[#1C1917]">
                          €{bundle.price.toFixed(2)}
                        </span>
                        <span className="text-xs font-mono text-stone-400 line-through tabular-nums">
                          €{bundle.compareAtPrice.toFixed(2)}
                        </span>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) =>
                          onAddBundle(bundle, e.currentTarget.getBoundingClientRect())
                        }
                        className="inline-flex items-center gap-2 bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Add Pack</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
