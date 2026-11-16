import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  heroBgColor?: string;
}

export function Navbar({ cartCount, onOpenCart, heroBgColor = '#0B6866' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: isScrolled ? 'rgba(244, 239, 231, 0.96)' : heroBgColor,
      }}
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-700 ease-out ${
        isScrolled
          ? 'text-[#1C1917] border-b border-stone-300/75 shadow-xs'
          : 'text-[#FAF6F1] border-b border-white/10'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className={`font-serif text-3xl font-semibold tracking-tight whitespace-nowrap shrink-0 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${
            isScrolled
              ? 'text-[#1C1917] focus-visible:outline-[#D94E28]'
              : 'text-[#FAF6F1] focus-visible:outline-[#EFEA9E]'
          }`}
        >
          apcy
        </a>

        <nav
          aria-label="Primary navigation"
          className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
            isScrolled ? 'text-stone-700' : 'text-[#FAF6F1]/90'
          }`}
        >
          <a
            href="#shop"
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline ${
              isScrolled ? 'hover:text-[#D94E28]' : 'hover:text-[#EFEA9E]'
            }`}
          >
            Shop
          </a>
          <a
            href="#rituals"
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline ${
              isScrolled ? 'hover:text-[#D94E28]' : 'hover:text-[#EFEA9E]'
            }`}
          >
            Flavors
          </a>
          <a
            href="#reviews"
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline ${
              isScrolled ? 'hover:text-[#D94E28]' : 'hover:text-[#EFEA9E]'
            }`}
          >
            Reviews
          </a>
          <a
            href="#bundles"
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline ${
              isScrolled ? 'hover:text-[#D94E28]' : 'hover:text-[#EFEA9E]'
            }`}
          >
            Bundles
          </a>
        </nav>

        <motion.button
          type="button"
          onClick={onOpenCart}
          key={cartCount}
          initial={{ scale: cartCount > 0 ? 1.12 : 1 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          aria-label={`Open shopping bag with ${cartCount} items`}
          className={`inline-flex items-center gap-2.5 transition-colors duration-200 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isScrolled
              ? 'bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] focus-visible:outline-[#D94E28]'
              : 'bg-[#FAF6F1] text-[#1C1917] hover:bg-[#EFEA9E] focus-visible:outline-[#EFEA9E]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={cartCount}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="tabular-nums inline-block"
            >
              Bag ({cartCount})
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}
