import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HERO_PALETTES, HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { FlavorStoryShowcase } from './components/FlavorStoryShowcase';
import { ReviewsAndBundles } from './components/ReviewsAndBundles';
import { FooterSection } from './components/FooterSection';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { ProductModal, type PackOption } from './components/ProductModal';
import { FloatingBasket } from './components/FloatingBasket';
import { SampleChatbot } from './components/SampleChatbot';
import { APCY_DRINKS, type BundlePack, type DrinkProduct } from './data/products';

interface FlyingDrop {
  dropId: string;
  image: string;
  accentHex: string;
  startX: number;
  startY: number;
  midX: number;
  peakY: number;
  endX: number;
  endY: number;
}

export default function App() {
  const [activeHeroId, setActiveHeroId] = useState<string>('matcha-lemon');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DrinkProduct | null>(null);
  const [flyingDrops, setFlyingDrops] = useState<FlyingDrop[]>([]);
  const [pendingDropCount, setPendingDropCount] = useState(0);
  const [isBasketImpact, setIsBasketImpact] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);
  const [lastAccentHex, setLastAccentHex] = useState('#F6C826');

  const basketRef = useRef<HTMLButtonElement | null>(null);
  const impactTimerRef = useRef<number | null>(null);

  const triggerDropIntoBasket = (
    itemName: string,
    image: string,
    accentHex: string,
    originRect: DOMRect | undefined,
    onLand: () => void
  ) => {
    const fallbackStartX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 400;
    const fallbackStartY = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 300;

    const startX = originRect ? originRect.left + originRect.width / 2 : fallbackStartX;
    const startY = originRect ? originRect.top + originRect.height / 2 : fallbackStartY;

    const basketRect = basketRef.current?.getBoundingClientRect();
    const endX = basketRect
      ? basketRect.left + 44
      : typeof window !== 'undefined' && window.innerWidth < 640
      ? 78
      : 100;
    const endY = basketRect
      ? basketRect.top + basketRect.height / 2
      : (typeof window !== 'undefined' ? window.innerHeight : 800) - 54;

    const midX = startX + (endX - startX) * 0.45;
    const peakY = Math.min(startY, endY) - 110;
    const dropId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    setPendingDropCount((c) => c + 1);
    setFlyingDrops((prev) => [
      ...prev,
      { dropId, image, accentHex, startX, startY, midX, peakY, endX, endY },
    ]);

    window.setTimeout(() => {
      onLand();
      setLastAddedName(itemName);
      setLastAccentHex(accentHex);
      setIsBasketImpact(true);
      setPendingDropCount((c) => Math.max(0, c - 1));
      setFlyingDrops((prev) => prev.filter((d) => d.dropId !== dropId));

      if (impactTimerRef.current) {
        window.clearTimeout(impactTimerRef.current);
      }
      impactTimerRef.current = window.setTimeout(() => {
        setIsBasketImpact(false);
      }, 1100);
    }, 560);
  };

  const handleAddDrink = (
    product: DrinkProduct,
    pack: PackOption,
    quantity = 1,
    originRect?: DOMRect
  ) => {
    const packLabel =
      pack === 'single'
        ? 'Single Can · 330 ml'
        : pack === 'six'
        ? '6-Pack · 6 × 330 ml'
        : '12-Pack · 12 × 330 ml';

    const unitPrice =
      pack === 'single'
        ? product.priceSingle
        : pack === 'six'
        ? product.priceSixPack
        : product.priceTwelvePack;

    const key = `${product.id}-${pack}`;

    triggerDropIntoBasket(product.name, product.image, product.accentHex, originRect, () => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [
          ...prev,
          {
            key,
            id: product.id,
            name: product.name,
            packLabel,
            unitPrice,
            quantity,
            image: product.image,
            accentHex: product.accentHex,
          },
        ];
      });
    });
  };

  const handleAddBundle = (bundle: BundlePack, originRect?: DOMRect) => {
    const key = bundle.id;
    const thumb = bundle.canCount === 6 ? APCY_DRINKS[0] : APCY_DRINKS[5];

    const addAction = () => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            key,
            id: bundle.id,
            name: bundle.name,
            packLabel: `${bundle.canCount} × 330 ml Variety`,
            unitPrice: bundle.price,
            quantity: 1,
            image: thumb.image,
            accentHex: '#D94E28',
          },
        ];
      });
    };

    if (isCartOpen) {
      addAction();
      return;
    }

    triggerDropIntoBasket(bundle.name, thumb.image, '#D94E28', originRect, addAction);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const activeHeroBg = (HERO_PALETTES[activeHeroId] || HERO_PALETTES['matcha-lemon']).bg;

  return (
    <div id="top" className="min-h-screen bg-[#FAF6F1] text-[#1C1917]">
      <Navbar
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
        heroBgColor={activeHeroBg}
      />

      <main>
        <HeroSection
          activeId={activeHeroId}
          onChangeActiveId={setActiveHeroId}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        <ProductShowcase
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={(product, pack, originRect) =>
            handleAddDrink(product, pack, 1, originRect)
          }
        />

        <FlavorStoryShowcase
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={(product, pack, originRect) =>
            handleAddDrink(product, pack, 1, originRect)
          }
        />

        <ReviewsAndBundles
          onAddBundle={handleAddBundle}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      </main>

      <FooterSection
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddDrink}
      />

      {/* Parabolic Flying Can Drop Layer */}
      <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {flyingDrops.map((drop) => (
            <motion.div
              key={drop.dropId}
              initial={{
                x: drop.startX - 42,
                y: drop.startY - 90,
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: [drop.startX - 42, drop.midX - 42, drop.endX - 24],
                y: [drop.startY - 90, drop.peakY - 70, drop.endY - 40],
                scale: [1, 0.82, 0.28],
                rotate: [0, -14, 22],
                opacity: [1, 1, 0.88],
              }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{
                duration: 0.58,
                times: [0, 0.42, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-0 left-0 w-20 h-44 flex items-center justify-center"
            >
              <span
                aria-hidden="true"
                className="absolute w-16 h-16 rounded-full blur-md opacity-80"
                style={{ backgroundColor: drop.accentHex }}
              />
              <img
                src={drop.image}
                alt=""
                referrerPolicy="no-referrer"
                className="relative z-10 h-full w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Active Bottom-Left Floating Basket */}
      <FloatingBasket
        ref={basketRef}
        count={totalCount}
        subtotal={subtotal}
        isVisible={totalCount > 0 || pendingDropCount > 0 || isBasketImpact}
        isImpact={isBasketImpact}
        lastAddedName={lastAddedName}
        lastAccentHex={lastAccentHex}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Sample Q&A Chatbot on Bottom-Right */}
      <SampleChatbot
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onAddBundle={(bundle) => handleAddBundle(bundle)}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
