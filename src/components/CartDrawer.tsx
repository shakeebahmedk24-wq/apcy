import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { APCY_BUNDLES, type BundlePack } from '../data/products';

export interface CartItem {
  key: string;
  id: string;
  name: string;
  packLabel: string;
  unitPrice: number;
  quantity: number;
  image: string;
  accentHex: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onAddBundle: (bundle: BundlePack) => void;
  onClearCart: () => void;
}

const TIERS = [
  { threshold: 30, label: '5% Off', discountPct: 5, freeShip: false },
  { threshold: 45, label: 'Free Ship', discountPct: 5, freeShip: true },
  { threshold: 65, label: '10% Off', discountPct: 10, freeShip: true },
  { threshold: 90, label: '15% Off', discountPct: 15, freeShip: true },
];

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onAddBundle,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  let activeDiscountPct = 0;
  let hasFreeShipping = false;
  for (const tier of TIERS) {
    if (subtotal >= tier.threshold) {
      activeDiscountPct = tier.discountPct;
      hasFreeShipping = tier.freeShip;
    }
  }

  const nextTier = TIERS.find((t) => subtotal < t.threshold);
  const maxThreshold = TIERS[TIERS.length - 1].threshold;
  const progressPct = Math.min(100, (subtotal / maxThreshold) * 100);

  const discountAmount = subtotal * (activeDiscountPct / 100);
  const shippingCost = items.length === 0 ? 0 : hasFreeShipping ? 0 : 4.9;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !shippingAddress.trim()) return;
    const generatedId = `APCY-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedId);
    setConfirmedTotal(finalTotal);
    onClearCart();
    setStep('confirmed');
  };

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-start"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#1C1917]/55 backdrop-blur-xs"
            onClick={handleClose}
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="relative z-10 w-full max-w-md bg-[#FAF6F1] text-[#1C1917] h-full flex flex-col shadow-2xl border-r border-stone-200 sm:rounded-r-3xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#D94E28]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] tabular-nums">
                  {totalUnits} {totalUnits === 1 ? 'Item' : 'Items'} in Your Bag
                </span>
              </div>
              <motion.button
                type="button"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.15 }}
                onClick={handleClose}
                aria-label="Close bag"
                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#1C1917] hover:text-[#FAF6F1] hover:border-[#1C1917] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {step !== 'confirmed' && (
              <div className="px-6 py-4 bg-white border-b border-stone-200">
                <p className="text-xs font-semibold text-center text-stone-700 mb-3 tabular-nums">
                  {nextTier ? (
                    <>
                      You are{' '}
                      <span className="font-bold text-[#D94E28]">
                        €{(nextTier.threshold - subtotal).toFixed(2)}
                      </span>{' '}
                      away from <span className="font-bold">{nextTier.label}</span>
                    </>
                  ) : (
                    <span className="font-bold text-[#D94E28]">
                      Maximum tier unlocked: 15% Off + Free Shipping
                    </span>
                  )}
                </p>

                <div className="relative h-2.5 bg-stone-200 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    className="h-full bg-[#D94E28] rounded-full"
                  />
                </div>

                <div className="grid grid-cols-4 gap-1 text-center">
                  {TIERS.map((tier) => {
                    const unlocked = subtotal >= tier.threshold;
                    return (
                      <div key={tier.threshold} className="flex flex-col items-center">
                        <motion.span
                          animate={{ scale: unlocked ? [1, 1.15, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                          className={`text-[10px] font-bold uppercase tracking-wider tabular-nums ${
                            unlocked ? 'text-[#D94E28]' : 'text-stone-400'
                          }`}
                        >
                          {tier.label}
                        </motion.span>
                        <span className="text-[10px] text-stone-400 font-mono tabular-nums">
                          €{tier.threshold}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === 'confirmed' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-14 h-14 rounded-full bg-[#1C1917] text-[#F6C826] flex items-center justify-center mb-5">
                    <Check className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#D94E28] mb-2">
                    Order #{orderNumber} Confirmed
                  </p>
                  <h3 className="font-serif text-3xl font-semibold mb-3">
                    Drink well, {customerName.split(' ')[0]}.
                  </h3>
                  <p className="text-sm text-stone-600 max-w-xs leading-relaxed mb-6">
                    We have sent your receipt to{' '}
                    <span className="font-medium text-[#1C1917]">{customerEmail}</span>. Your
                    chilled apcy cans are being packed for dispatch to {shippingAddress}.
                  </p>
                  <div className="w-full max-w-xs border border-stone-200 bg-white rounded-2xl p-4 mb-6 text-left">
                    <div className="flex justify-between text-xs text-stone-500 mb-1">
                      <span>Order Reference</span>
                      <span className="font-mono text-[#1C1917]">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Paid</span>
                      <span className="font-mono tabular-nums">€{confirmedTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('bag');
                      onClose();
                    }}
                    className="bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <h3 className="font-serif text-3xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-stone-600 mb-6 max-w-xs">
                    Explore all 6 functional botanical blends — only 4 kcal and zero sugar added.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer mb-8"
                  >
                    Continue Shopping
                  </button>

                  <div className="w-full border-t border-stone-200 pt-6 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500 mb-3">
                      Quick Start Suggestion
                    </p>
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-serif text-base font-semibold">
                          {APCY_BUNDLES[0].name}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {APCY_BUNDLES[0].subtitle}
                        </p>
                        <p className="text-sm font-mono font-semibold mt-1.5 tabular-nums">
                          €{APCY_BUNDLES[0].price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddBundle(APCY_BUNDLES[0])}
                        className="bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Add Box
                      </button>
                    </div>
                  </div>
                </div>
              ) : step === 'checkout' ? (
                <form
                  id="apcy-checkout-form"
                  onSubmit={handleCheckoutSubmit}
                  className="space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => setStep('bag')}
                    className="text-xs font-semibold text-stone-600 hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                  >
                    ← Back to bag
                  </button>
                  <h3 className="font-serif text-2xl font-semibold">Express Checkout</h3>
                  <p className="text-xs text-stone-600">
                    Complete your delivery details below to confirm your chilled botanical order.
                  </p>

                  <div className="space-y-3 pt-2">
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Full Name
                      </span>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Clara Vermeer"
                        className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C1917]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Email Address
                      </span>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="clara@studio.nl"
                        className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C1917]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Shipping Address &amp; Postal Code
                      </span>
                      <textarea
                        required
                        rows={2}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Keizersgracht 412, 1016 GC Amsterdam"
                        className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C1917]"
                      />
                    </label>
                  </div>
                </form>
              ) : (
                <div className="space-y-3.5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.94 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white border border-stone-200 rounded-2xl p-3.5 flex items-center gap-4 shadow-xs"
                      >
                        <div
                          className="w-16 h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden p-1.5"
                          style={{ backgroundColor: `${item.accentHex}28` }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-auto object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-serif text-base font-semibold leading-snug truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-stone-500 mt-0.5">{item.packLabel}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.key)}
                              aria-label={`Remove ${item.name}`}
                              className="text-stone-400 hover:text-[#D94E28] transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center border border-stone-200 rounded-full bg-[#FAF6F1]">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.key, -1)}
                                aria-label="Decrease quantity"
                                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:text-[#1C1917] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-mono font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.key, 1)}
                                aria-label="Increase quantity"
                                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:text-[#1C1917] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-mono font-semibold tabular-nums">
                              €{(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && step !== 'confirmed' && (
              <div className="border-t border-stone-200 bg-white px-6 py-5 space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">€{subtotal.toFixed(2)}</span>
                  </div>
                  {activeDiscountPct > 0 && (
                    <div className="flex justify-between text-[#D94E28] font-medium">
                      <span>Tier Discount ({activeDiscountPct}% Off)</span>
                      <span className="font-mono tabular-nums">-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Chilled Delivery</span>
                    <span className="font-mono tabular-nums">
                      {hasFreeShipping ? 'FREE' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-stone-100">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {step === 'bag' ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('checkout')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors py-3.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    form="apcy-checkout-form"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#D94E28] text-[#FAF6F1] hover:bg-[#1C1917] transition-colors py-3.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span>Confirm Order · €{finalTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
