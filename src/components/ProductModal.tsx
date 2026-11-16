import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Minus, Plus, X } from 'lucide-react';
import type { DrinkProduct } from '../data/products';

export type PackOption = 'single' | 'six' | 'twelve';

interface ProductModalProps {
  product: DrinkProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: DrinkProduct,
    pack: PackOption,
    quantity: number,
    originRect?: DOMRect
  ) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedPack, setSelectedPack] = useState<PackOption>('six');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const canImgRef = useRef<HTMLImageElement>(null);

  const packOptions: { id: PackOption; label: string; sublabel: string; price: number }[] = product
    ? [
        { id: 'single', label: 'Single Can', sublabel: '1 × 330 ml', price: product.priceSingle },
        { id: 'six', label: '6-Pack', sublabel: 'Save 10%', price: product.priceSixPack },
        { id: 'twelve', label: '12-Pack', sublabel: 'Save 17%', price: product.priceTwelvePack },
      ]
    : [];

  const activePack = packOptions.find((p) => p.id === selectedPack);
  const lineTotal = activePack ? activePack.price * quantity : 0;

  const handleAdd = () => {
    if (!product || added) return;
    const originRect = canImgRef.current ? canImgRef.current.getBoundingClientRect() : undefined;
    setAdded(true);
    onAddToCart(product, selectedPack, quantity, originRect);
    window.setTimeout(() => {
      setAdded(false);
      setQuantity(1);
      onClose();
    }, 220);
  };

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-4xl bg-[#FAF6F1] text-[#1C1917] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-stone-300 flex items-center justify-center hover:bg-[#1C1917] hover:text-[#FAF6F1] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Animated Product Studio Framing */}
            <div
              className="relative flex flex-col items-center justify-center p-10 min-h-[340px]"
              style={{ backgroundColor: product.surfaceTint }}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute w-64 h-64 rounded-full"
                style={{ backgroundColor: product.accentHex }}
              />
              <motion.img
                ref={canImgRef}
                initial={{ y: 20, rotate: -6, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.08, type: 'spring', stiffness: 240, damping: 20 }}
                src={product.image}
                alt={`apcy ${product.name} 330 ml can`}
                referrerPolicy="no-referrer"
                className="relative z-10 h-72 sm:h-80 w-auto object-contain drop-shadow-2xl"
              />
              <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-stone-700">
                {product.tastingNotes.map((note, idx) => (
                  <span key={note} className="inline-flex items-center gap-2">
                    <span>{note}</span>
                    {idx < product.tastingNotes.length - 1 && (
                      <span aria-hidden="true" className="text-stone-400">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-[0.14em] mb-2">
                  <span>{product.activesLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.volume}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-semibold text-[#D94E28] mt-1">{product.tagline}</p>

                <p className="text-sm text-stone-600 leading-relaxed mt-4">{product.description}</p>

                <div className="grid grid-cols-3 gap-3 mt-5 py-3.5 border-y border-stone-200">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500">Energy</p>
                    <p className="text-sm font-mono font-semibold tabular-nums mt-0.5">
                      {product.calories}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500">
                      Added Sugar
                    </p>
                    <p className="text-sm font-mono font-semibold tabular-nums mt-0.5">0.0 g</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500">
                      Functional
                    </p>
                    <p className="text-xs font-mono font-semibold tabular-nums mt-1">
                      {product.nutrition.activeDose}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2.5">
                    Select Pack Size
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {packOptions.map((opt) => {
                      const active = selectedPack === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedPack(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                            active
                              ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF6F1]'
                              : 'border-stone-300 bg-white text-[#1C1917] hover:border-stone-500'
                          }`}
                        >
                          <p className="text-xs font-semibold whitespace-nowrap">{opt.label}</p>
                          <p
                            className={`text-[11px] mt-0.5 ${
                              active ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {opt.sublabel}
                          </p>
                          <p className="text-sm font-mono font-semibold tabular-nums mt-1.5">
                            €{opt.price.toFixed(2)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="inline-flex items-center border border-stone-300 rounded-full bg-white h-12 px-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 flex items-center justify-center hover:text-[#D94E28] cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-mono font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center hover:text-[#D94E28] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  disabled={added}
                  className={`flex-1 h-12 inline-flex items-center justify-center gap-2.5 rounded-full px-6 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    added
                      ? 'bg-[#F6C826] text-[#1C1917]'
                      : 'bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Dropped in Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">€{lineTotal.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
