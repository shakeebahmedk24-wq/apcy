import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { APCY_DRINKS, type DrinkProduct } from '../data/products';

interface FooterSectionProps {
  onSelectProduct: (product: DrinkProduct) => void;
  onOpenCart: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FooterSection({ onSelectProduct, onOpenCart }: FooterSectionProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#F5A3B2] text-[#7D180E] overflow-hidden pt-20 pb-12">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-12 bg-[#F4EFE7]"
        style={{
          borderBottomLeftRadius: '50% 100%',
          borderBottomRightRadius: '50% 100%',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative text-center py-10 sm:py-14"
        >
          <p className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight mb-2">
            apcy
          </p>
          <h2
            className="font-serif text-5xl sm:text-7xl lg:text-[6.25rem] font-bold tracking-tight leading-[0.94] uppercase text-[#9E2114] select-none"
            style={{ textWrap: 'balance' }}
          >
            DRINK WELL.
            <br />
            FEEL BETTER.
          </h2>

          <div className="mt-8 sm:-mt-8 relative z-10 max-w-md mx-auto">
            {subscribed ? (
              <div className="bg-white text-[#1C1917] rounded-full px-6 py-3.5 shadow-lg inline-flex items-center gap-2.5 text-sm font-semibold">
                <span className="w-6 h-6 rounded-full bg-[#9E2114] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>You are on the list for limited seasonal drops.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="bg-white rounded-full p-1.5 shadow-xl flex items-center gap-2 border border-[#9E2114]/15"
              >
                <label htmlFor="apcy-newsletter" className="sr-only">
                  Email address
                </label>
                <input
                  id="apcy-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="bg-[#9E2114] hover:bg-[#1C1917] text-[#FAF6F1] transition-colors px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 pb-12 border-t border-[#9E2114]/20 text-xs"
        >
          <div>
            <p className="font-bold uppercase tracking-[0.14em] mb-4 text-[#7D180E]">Drinks</p>
            <ul className="space-y-2.5 font-medium">
              {APCY_DRINKS.map((drink) => (
                <li key={drink.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(drink)}
                    className="hover:underline underline-offset-4 text-left cursor-pointer"
                  >
                    {drink.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] mb-4 text-[#7D180E]">Flavors</p>
            <ul className="space-y-2.5 font-medium">
              <li>
                <a href="#story-ginger-lime" className="hover:underline underline-offset-4">
                  Zesty Digest &amp; Energy
                </a>
              </li>
              <li>
                <a href="#story-matcha-lemon" className="hover:underline underline-offset-4">
                  Focus &amp; Glow Boost
                </a>
              </li>
              <li>
                <a href="#story-cucumber-basil" className="hover:underline underline-offset-4">
                  Spa Calm in a Bottle
                </a>
              </li>
              <li>
                <a href="#story-blackberry-lavender" className="hover:underline underline-offset-4">
                  Relax &amp; Reset
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] mb-4 text-[#7D180E]">Explore</p>
            <ul className="space-y-2.5 font-medium">
              <li>
                <a href="#shop" className="hover:underline underline-offset-4">
                  Shop All Flavors
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:underline underline-offset-4">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:underline underline-offset-4">
                  Bundle &amp; Save
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="hover:underline underline-offset-4 cursor-pointer"
                >
                  Open Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] mb-4 text-[#7D180E]">Specs</p>
            <ul className="space-y-2.5 font-medium">
              <li>Only 4 kcal per 330 ml</li>
              <li>Zero Added Sugar</li>
              <li>Organic Apple Cider Vinegar</li>
              <li>Bioactive Collagen &amp; HA</li>
            </ul>
          </div>
        </motion.div>

        <div className="pt-8 border-t border-[#9E2114]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium">
          <p>© {new Date().getFullYear()} apcy Botanicals. All rights reserved.</p>
          <p className="text-center sm:text-right opacity-85">
            330 ml sparkling functional beverages · Crafted with real botanicals, organic ACV,
            collagen &amp; hyaluronic acid.
          </p>
        </div>
      </div>
    </footer>
  );
}
