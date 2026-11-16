import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Sparkles, RotateCcw, X, ArrowUpRight } from 'lucide-react';
import { APCY_DRINKS, APCY_BUNDLES, type DrinkProduct } from '../data/products';

interface SampleChatbotProps {
  onSelectProduct: (product: DrinkProduct) => void;
  onOpenCart: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  suggestedProduct?: DrinkProduct;
  showCartLink?: boolean;
}

const QUICK_TOPICS = [
  'Which flavor is best for focus?',
  'Calories & sugar per can?',
  'Collagen vs Hyaluronic Acid?',
  'Bundles & free shipping?',
  'Show all 6 flavors',
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: 'Hi there! I am the apcy Taste Guide. Ask me anything about our 6 botanical sparkling drinks, active ingredients, bundles, or delivery.',
  },
];

function generateSampleReply(input: string): Omit<ChatMessage, 'id' | 'sender'> {
  const q = input.toLowerCase();

  // Check for specific flavor matches first
  for (const drink of APCY_DRINKS) {
    const terms = drink.name.toLowerCase().split(/[\s+]+/).filter((w) => w.length > 2);
    if (terms.some((term) => q.includes(term))) {
      return {
        text: `${drink.name} (${drink.tagline}) blends ${drink.description} Each ${drink.volume} can has ${drink.calories}, ${drink.sugar}, ${drink.nutrition.acvDose}, and ${drink.nutrition.activeDose}. Single cans are €${drink.priceSingle.toFixed(2)} and a 6-Pack is €${drink.priceSixPack.toFixed(2)}.`,
        suggestedProduct: drink,
      };
    }
  }

  if (q.includes('focus') || q.includes('work') || q.includes('caffeine') || q.includes('tea')) {
    const matcha = APCY_DRINKS.find((d) => d.id === 'matcha-lemon')!;
    return {
      text: `For clean focus without coffee jitters, try Matcha + Lemon. It pairs ceremonial shade-grown matcha and Amalfi lemon peel with 500 mg organic ACV and 120 mg hyaluronic acid (€${matcha.priceSixPack.toFixed(2)} per 6-pack).`,
      suggestedProduct: matcha,
    };
  }

  if (q.includes('relax') || q.includes('evening') || q.includes('sleep') || q.includes('unwind') || q.includes('calm')) {
    const blackberry = APCY_DRINKS.find((d) => d.id === 'blackberry-lavender')!;
    return {
      text: `For an alcohol-free evening pour or afternoon calm, Blackberry + Lavender and Cucumber + Basil are our favorites. Both deliver 2,500 mg collagen + organic ACV at just 4 kcal.`,
      suggestedProduct: blackberry,
    };
  }

  if (q.includes('digest') || q.includes('morning') || q.includes('energy') || q.includes('workout')) {
    const ginger = APCY_DRINKS.find((d) => d.id === 'ginger-lime')!;
    return {
      text: `Ginger + Lime is our zesty morning & post-meal pick. Pressed ginger root, key lime, and 500 mg raw organic ACV with the Mother give crisp digestive support at 4 kcal.`,
      suggestedProduct: ginger,
    };
  }

  if (q.includes('calorie') || q.includes('kcal') || q.includes('sugar') || q.includes('sweet') || q.includes('diet') || q.includes('keto')) {
    return {
      text: 'Every 330 ml apcy can contains just 4 kcal and 0 g added sugar—with zero artificial sweeteners, stevia aftertaste, or synthetic dyes.',
    };
  }

  if (q.includes('collagen') || q.includes('hyaluronic') || q.includes('acv') || q.includes('vinegar') || q.includes('ingredient')) {
    return {
      text: 'All 6 blends contain 500 mg raw organic apple cider vinegar with the Mother. Five blends add 2,500 mg bioactive collagen peptides for skin & recovery, while Matcha + Lemon features 120 mg plant-fermented hyaluronic acid for cellular hydration.',
    };
  }

  if (q.includes('bundle') || q.includes('ship') || q.includes('delivery') || q.includes('discount') || q.includes('price') || q.includes('cost') || q.includes('save')) {
    const box6 = APCY_BUNDLES[0];
    const box12 = APCY_BUNDLES[1];
    return {
      text: `Single cans start at €3.50 and 6-packs at €19.00. Or try our ${box6.name} (€${box6.price.toFixed(2)}, ${box6.savingsLabel}) or ${box12.name} (€${box12.price.toFixed(2)}, ${box12.savingsLabel}). Cart tiers unlock 5% off at €30, FREE chilled shipping at €45, 10% off at €65, and 15% off at €90!`,
      showCartLink: true,
    };
  }

  if (q.includes('all') || q.includes('flavor') || q.includes('flavour') || q.includes('list') || q.includes('menu')) {
    return {
      text: 'We craft 6 botanical sparkling blends: Ginger + Lime, Blackberry + Lavender, Strawberry + Mint, Turmeric + Black Pepper, Cucumber + Basil (all ACV + Collagen), plus Matcha + Lemon (ACV + Hyaluronic Acid). Pick any topic below or name a flavor!',
    };
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
    return {
      text: 'Hello! Happy to help you pick a flavor or check nutrition, bundles, and chilled delivery tiers. What are you in the mood for today?',
    };
  }

  return {
    text: 'Great question! I can help with our 6 botanical flavors (Ginger + Lime, Blackberry + Lavender, Strawberry + Mint, Turmeric + Black Pepper, Cucumber + Basil, Matcha + Lemon), 4 kcal / 0 g sugar nutrition, collagen vs. hyaluronic acid, or bundle discounts & free shipping over €45.',
  };
}

export function SampleChatbot({ onSelectProduct, onOpenCart }: SampleChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const sendQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = generateSampleReply(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          ...reply,
        },
      ]);
      setIsTyping(false);
    }, 320);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            aria-label="apcy sample Q&A chatbot"
            className="mb-3 w-[min(calc(100vw-2rem),375px)] max-h-[min(76vh,520px)] bg-[#FAF6F1] text-[#1C1917] border border-stone-300 rounded-3xl shadow-[0_22px_54px_rgba(28,25,23,0.28)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1C1917] text-[#FAF6F1] px-4 py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-full bg-[#F6C826] text-[#1C1917] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-sm font-bold leading-tight truncate">
                    apcy Taste Guide
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#FAF6F1]/65">
                    Quick Q&amp;A Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D94E28] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3 bg-[#FAF6F1]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1C1917] text-[#FAF6F1] rounded-br-sm'
                        : 'bg-white text-[#1C1917] border border-stone-200 rounded-bl-sm shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.suggestedProduct && (
                    <button
                      type="button"
                      onClick={() => onSelectProduct(msg.suggestedProduct!)}
                      className="mt-1.5 inline-flex items-center gap-2 bg-white hover:bg-[#F4EFE7] border border-stone-300 rounded-full pl-2 pr-3 py-1 text-[11px] font-semibold text-[#1C1917] transition-colors cursor-pointer shadow-xs"
                    >
                      <img
                        src={msg.suggestedProduct.botanicalIcon}
                        alt=""
                        className="w-4 h-4 object-contain"
                      />
                      <span>Inspect {msg.suggestedProduct.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#D94E28]" />
                    </button>
                  )}

                  {msg.showCartLink && (
                    <button
                      type="button"
                      onClick={onOpenCart}
                      className="mt-1.5 inline-flex items-center gap-1.5 bg-[#F6C826] hover:bg-[#1C1917] hover:text-[#FAF6F1] text-[#1C1917] rounded-full px-3 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      <span>Open Cart Tiers</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Quick Prompts */}
            <div className="px-3.5 py-2 border-t border-stone-200/80 bg-[#F4EFE7] flex gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => sendQuestion(topic)}
                  className="shrink-0 text-[11px] font-medium bg-white hover:bg-[#1C1917] hover:text-[#FAF6F1] text-[#1C1917] border border-stone-300 rounded-full px-2.5 py-1 transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about flavors, nutrition, shipping..."
                className="flex-1 bg-[#FAF6F1] border border-stone-200 rounded-full px-3.5 py-2 text-xs text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:border-[#1C1917]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] disabled:opacity-40 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Bottom-Right Chatbot Launcher Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close apcy Taste Guide chat' : 'Open apcy Taste Guide chat'}
        className="flex items-center gap-2.5 bg-[#1C1917] text-[#FAF6F1] hover:bg-[#D94E28] transition-colors px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_14px_34px_rgba(28,25,23,0.34)] border border-white/15 cursor-pointer"
      >
        <span className="w-8 h-8 rounded-full bg-[#F6C826] text-[#1C1917] flex items-center justify-center shrink-0">
          {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
        </span>
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.12em] pr-1">
          {isOpen ? 'Close Chat' : 'Ask apcy'}
        </span>
      </motion.button>
    </div>
  );
}
