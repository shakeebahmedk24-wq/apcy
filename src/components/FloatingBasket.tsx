import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBasket, ArrowUpRight } from 'lucide-react';

interface FloatingBasketProps {
  count: number;
  subtotal: number;
  isVisible: boolean;
  isImpact: boolean;
  lastAddedName: string | null;
  lastAccentHex: string;
  onClick: () => void;
}

export const FloatingBasket = forwardRef<HTMLButtonElement, FloatingBasketProps>(
  function FloatingBasket(
    { count, subtotal, isVisible, isImpact, lastAddedName, lastAccentHex, onClick },
    ref
  ) {

    return (
      <div className="fixed bottom-5 left-4 sm:bottom-7 sm:left-7 z-40 pointer-events-none">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.75 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="relative pointer-events-auto flex flex-col items-start gap-2"
            >
              {/* Brief Drop Toast Above Basket */}
              <AnimatePresence>
                {isImpact && lastAddedName && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.92 }}
                    transition={{ duration: 0.22 }}
                    className="bg-[#1C1917] text-[#FAF6F1] text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-xl border border-white/10 whitespace-nowrap"
                  >
                    + Added <span className="text-[#F6C826]">{lastAddedName}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Active Bottom-Left Basket Button */}
              <div className="relative">
                {/* Expanding Shockwave Impact Ring when Can Drops In */}
                <AnimatePresence>
                  {isImpact && (
                    <motion.span
                      key={`ring-${count}`}
                      initial={{ scale: 0.9, opacity: 0.85 }}
                      animate={{ scale: 1.75, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        border: `3px solid ${lastAccentHex || '#F6C826'}`,
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.button
                  ref={ref}
                  type="button"
                  onClick={onClick}
                  aria-label={`Open active basket with ${count} items totaling €${subtotal.toFixed(2)}`}
                  animate={
                    isImpact
                      ? {
                          scale: [1, 1.2, 0.92, 1.07, 1],
                          rotate: [0, -7, 5, -2, 0],
                        }
                      : { scale: 1, rotate: 0 }
                  }
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-center gap-3.5 bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors duration-200 pl-3.5 pr-4 py-2.5 rounded-full shadow-[0_14px_34px_rgba(28,25,23,0.38)] border border-white/15 cursor-pointer group"
                >
                  {/* Basket Icon with Live Count Badge */}
                  <div className="relative w-10 h-10 rounded-full bg-[#F6C826] text-[#1C1917] flex items-center justify-center shrink-0">
                    <ShoppingBasket className="w-5 h-5" aria-hidden="true" />
                    <motion.span
                      key={count}
                      initial={{ scale: 1.45 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                      className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#D94E28] text-[#FAF6F1] text-[10px] font-bold font-mono tabular-nums flex items-center justify-center border-2 border-[#1C1917]"
                    >
                      {count}
                    </motion.span>
                  </div>

                  {/* Subtotal + Active Label */}
                  <div className="text-left pr-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F6C826] group-hover:text-[#FAF6F1] transition-colors">
                      Your Basket
                    </p>
                    <p className="text-sm font-mono font-bold tabular-nums leading-tight">
                      €{subtotal.toFixed(2)}
                    </p>
                  </div>

                  <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#1C1917] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
