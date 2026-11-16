export interface DrinkProduct {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  activesLabel: string;
  activesType: 'collagen' | 'hyaluronic';
  volume: string;
  calories: string;
  sugar: string;
  priceSingle: number;
  priceSixPack: number;
  priceTwelvePack: number;
  image: string;
  botanicalIcon: string;
  accentHex: string;
  surfaceTint: string;
  moodCategory: string;
  description: string;
  tastingNotes: string[];
  nutrition: {
    energy: string;
    carbs: string;
    sugar: string;
    activeDose: string;
    acvDose: string;
  };
}

export interface BundlePack {
  id: string;
  name: string;
  subtitle: string;
  canCount: number;
  price: number;
  compareAtPrice: number;
  savingsLabel: string;
  description: string;
  includedFlavors: string[];
}

export interface FunctionalCard {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  bgHex: string;
  textHex: string;
  rotation: number;
  foundIn: string;
}

export interface MoodRitual {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  productId: string;
  accentHex: string;
  timeOfDay: string;
}

export interface ReviewItem {
  id: string;
  title: string;
  body: string;
  author: string;
  role: string;
  flavor: string;
  rating: number;
}

export const APCY_DRINKS: DrinkProduct[] = [
  {
    id: 'ginger-lime',
    name: 'Ginger + Lime',
    shortName: 'Ginger + Lime',
    tagline: 'Zesty Digest & Energy',
    activesLabel: 'With ACV + Collagen',
    activesType: 'collagen',
    volume: '330 ml',
    calories: '4 kcal',
    sugar: '0g added sugar',
    priceSingle: 3.5,
    priceSixPack: 19.0,
    priceTwelvePack: 35.0,
    image: '/assets/cans/ginger-lime.png',
    botanicalIcon: '/assets/botanicals/ginger-lime.png',
    accentHex: '#F2C12E',
    surfaceTint: '#F6E8C6',
    moodCategory: 'Morning Kick & Digest',
    description:
      'Pressed fiery ginger root balanced by bright key lime zest, raw organic apple cider vinegar, and bioactive collagen peptides.',
    tastingNotes: ['Crisp Ginger Heat', 'Key Lime Peel', 'Clean Sparkling Finish'],
    nutrition: {
      energy: '4 kcal / 17 kJ',
      carbs: '0.6 g',
      sugar: '0.0 g added',
      activeDose: '2,500 mg Collagen',
      acvDose: '500 mg Organic ACV',
    },
  },
  {
    id: 'blackberry-lavender',
    name: 'Blackberry + Lavender',
    shortName: 'Blackberry + Lavender',
    tagline: 'Relax & Reset',
    activesLabel: 'With ACV + Collagen',
    activesType: 'collagen',
    volume: '330 ml',
    calories: '4 kcal',
    sugar: '0g added sugar',
    priceSingle: 3.5,
    priceSixPack: 19.0,
    priceTwelvePack: 35.0,
    image: '/assets/cans/blackberry-lavender.png',
    botanicalIcon: '/assets/botanicals/blackberry-lavender.png',
    accentHex: '#9E6BB8',
    surfaceTint: '#EDE1F0',
    moodCategory: 'Evening Unwind',
    description:
      'Velvety dark blackberry layered over aromatic French lavender blossoms, organic ACV, and daily collagen support for effortless evening calm.',
    tastingNotes: ['Wild Blackberry', 'Aromatic Lavender', 'Soft Mineral Fizz'],
    nutrition: {
      energy: '4 kcal / 17 kJ',
      carbs: '0.7 g',
      sugar: '0.0 g added',
      activeDose: '2,500 mg Collagen',
      acvDose: '500 mg Organic ACV',
    },
  },
  {
    id: 'strawberry-mint',
    name: 'Strawberry + Mint',
    shortName: 'Strawberry + Mint',
    tagline: 'Fresh Hydration & Clarity',
    activesLabel: 'With ACV + Collagen',
    activesType: 'collagen',
    volume: '330 ml',
    calories: '4 kcal',
    sugar: '0g added sugar',
    priceSingle: 3.5,
    priceSixPack: 19.0,
    priceTwelvePack: 35.0,
    image: '/assets/cans/strawberry-mint.png',
    botanicalIcon: '/assets/botanicals/strawberry-mint.png',
    accentHex: '#E86C58',
    surfaceTint: '#F6DDD7',
    moodCategory: 'Afternoon Refresh',
    description:
      'Sun-ripened garden strawberry muddled with cool spearmint leaf, raw apple cider vinegar, and pure collagen for crisp hydration.',
    tastingNotes: ['Garden Strawberry', 'Cool Spearmint', 'Bright Crisp Bubbles'],
    nutrition: {
      energy: '4 kcal / 17 kJ',
      carbs: '0.6 g',
      sugar: '0.0 g added',
      activeDose: '2,500 mg Collagen',
      acvDose: '500 mg Organic ACV',
    },
  },
  {
    id: 'turmeric-pepper',
    name: 'Turmeric + Black Pepper',
    shortName: 'Turmeric + Black Pepper',
    tagline: 'Radiance & Balance',
    activesLabel: 'With ACV + Collagen',
    activesType: 'collagen',
    volume: '330 ml',
    calories: '4 kcal',
    sugar: '0g added sugar',
    priceSingle: 3.5,
    priceSixPack: 19.0,
    priceTwelvePack: 35.0,
    image: '/assets/cans/turmeric-pepper.png',
    botanicalIcon: '/assets/botanicals/turmeric-pepper.png',
    accentHex: '#EC972A',
    surfaceTint: '#F7E5C8',
    moodCategory: 'Daily Glow & Balance',
    description:
      'Earthy golden turmeric root paired with cracked black pepper piperine for optimal absorption, blended with ACV and collagen.',
    tastingNotes: ['Golden Turmeric', 'Warm Black Pepper', 'Silky Citrus Lift'],
    nutrition: {
      energy: '4 kcal / 17 kJ',
      carbs: '0.5 g',
      sugar: '0.0 g added',
      activeDose: '2,500 mg Collagen',
      acvDose: '500 mg Organic ACV',
    },
  },
  {
    id: 'cucumber-basil',
    name: 'Cucumber + Basil',
    shortName: 'Cucumber + Basil',
    tagline: 'Spa Calm in a Bottle',
    activesLabel: 'With ACV + Collagen',
    activesType: 'collagen',
    volume: '330 ml',
    calories: '4 kcal',
    sugar: '0g added sugar',
    priceSingle: 3.5,
    priceSixPack: 19.0,
    priceTwelvePack: 35.0,
    image: '/assets/cans/cucumber-basil.png',
    botanicalIcon: '/assets/botanicals/cucumber-basil.png',
    accentHex: '#6EA363',
    surfaceTint: '#E6ECE0',
    moodCategory: 'Midday Reset',
    description:
      'Ultra-crisp garden cucumber infused with sweet Genovese basil, organic apple cider vinegar, and skin-loving collagen.',
    tastingNotes: ['Chilled Cucumber', 'Sweet Genovese Basil', 'Botanical Dew'],
    nutrition: {
      energy: '4 kcal / 17 kJ',
      carbs: '0.4 g',
      sugar: '0.0 g added',
      activeDose: '2,500 mg Collagen',
      acvDose: '500 mg Organic ACV',
    },
  },
  {
    id: 'matcha-lemon',
    name: 'Matcha + Lemon',
    shortName: 'Matcha + Lemon',
    tagline: 'Focus & Glow Boost',
    activesLabel: 'With ACV + Hyaluronic Acid',
    activesType: 'hyaluronic',
    volume: '330 ml',
    calories: '4 kcal',
    sugar: '0g added sugar',
    priceSingle: 3.8,
    priceSixPack: 20.5,
    priceTwelvePack: 38.0,
    image: '/assets/cans/matcha-lemon.png',
    botanicalIcon: '/assets/botanicals/matcha-lemon.png',
    accentHex: '#9EB347',
    surfaceTint: '#EAEBD8',
    moodCategory: 'Deep Focus & Glow',
    description:
      'First-harvest shade-grown matcha green tea brightened by Amalfi lemon peel, organic ACV, and hydrating hyaluronic acid.',
    tastingNotes: ['Ceremonial Matcha', 'Zesty Meyer Lemon', 'Smooth Focused Lift'],
    nutrition: {
      energy: '4 kcal / 17 kJ',
      carbs: '0.6 g',
      sugar: '0.0 g added',
      activeDose: '120 mg Hyaluronic Acid',
      acvDose: '500 mg Organic ACV',
    },
  },
];

export const APCY_BUNDLES: BundlePack[] = [
  {
    id: 'bundle-discovery-6',
    name: 'The 6-Flavor Discovery Box',
    subtitle: '1 can of every botanical blend · 6 × 330 ml',
    canCount: 6,
    price: 19.0,
    compareAtPrice: 21.3,
    savingsLabel: 'Save 11%',
    description:
      'Experience the complete apcy collection from zesty morning Ginger + Lime to calming evening Blackberry + Lavender.',
    includedFlavors: [
      'Ginger + Lime',
      'Blackberry + Lavender',
      'Strawberry + Mint',
      'Turmeric + Black Pepper',
      'Cucumber + Basil',
      'Matcha + Lemon',
    ],
  },
  {
    id: 'bundle-ritual-12',
    name: 'The Full Ritual Case',
    subtitle: '2 cans of every botanical blend · 12 × 330 ml',
    canCount: 12,
    price: 35.0,
    compareAtPrice: 42.6,
    savingsLabel: 'Save 18%',
    description:
      'Keep your fridge stocked for two full weeks of clean 4 kcal sparkling botanicals with zero added sugar.',
    includedFlavors: [
      '2× Ginger + Lime',
      '2× Blackberry + Lavender',
      '2× Strawberry + Mint',
      '2× Turmeric + Black Pepper',
      '2× Cucumber + Basil',
      '2× Matcha + Lemon',
    ],
  },
];

export const FUNCTIONAL_CARDS: FunctionalCard[] = [
  {
    id: 'acv',
    eyebrow: 'RAW & UNFILTERED',
    title: 'Organic Apple Cider Vinegar',
    subtitle: '500 mg active ACV with the Mother',
    description:
      'Supports gentle gut balance and steady post-meal energy while giving every apcy can its bright, clean, champagne-dry bite without vinegar harshness.',
    bgHex: '#D94E28',
    textHex: '#FAF6F1',
    rotation: -2.5,
    foundIn: 'All 6 Blends',
  },
  {
    id: 'collagen',
    eyebrow: 'SKIN & RECOVERY',
    title: 'Bioactive Collagen Peptides',
    subtitle: '2,500 mg clean hydrolyzed peptides',
    description:
      'Tasteless, ultra-soluble collagen woven seamlessly into sparkling spring water to support skin elasticity, nails, and daily tissue recovery.',
    bgHex: '#E5B95C',
    textHex: '#1C1917',
    rotation: 2.2,
    foundIn: '5 Botanical Collagen Blends',
  },
  {
    id: 'hyaluronic',
    eyebrow: 'CELLULAR HYDRATION',
    title: 'Plant-Fermented Hyaluronic Acid',
    subtitle: '120 mg high-purity HA',
    description:
      'Paired exclusively with ceremonial matcha and lemon peel to retain moisture from within while delivering calm, jitter-free focus.',
    bgHex: '#B8C496',
    textHex: '#1C1917',
    rotation: -1.6,
    foundIn: 'Matcha + Lemon',
  },
  {
    id: 'zero-sugar',
    eyebrow: 'ONLY 4 KCAL PER CAN',
    title: 'Zero Sugar Added. Pure Botanicals.',
    subtitle: 'Real pressed roots, herbs & fruit essences',
    description:
      'No cane sugar, no erythritol aftertaste, no artificial dyes. Just cold-pressed botanicals, sparkling water, and crisp 4 kcal refreshment.',
    bgHex: '#D8BFE0',
    textHex: '#1C1917',
    rotation: 2.8,
    foundIn: 'Every 330 ml Can',
  },
];

export const MOOD_RITUALS: MoodRitual[] = [
  {
    id: 'digest-energy',
    title: 'Zesty Digest & Energy',
    subtitle: 'Morning & Midday Kick',
    description:
      'Start sharp or shake off a heavy lunch with fiery ginger, bright lime, and raw organic apple cider vinegar.',
    productId: 'ginger-lime',
    accentHex: '#E5B95C',
    timeOfDay: '08:00 – 13:00',
  },
  {
    id: 'focus-glow',
    title: 'Focus & Glow Boost',
    subtitle: 'Deep Work Ritual',
    description:
      'First-harvest matcha paired with Meyer lemon and hyaluronic acid for calm clarity without coffee crash.',
    productId: 'matcha-lemon',
    accentHex: '#9BA45D',
    timeOfDay: '10:00 – 16:00',
  },
  {
    id: 'spa-calm',
    title: 'Spa Calm & Clarity',
    subtitle: 'Afternoon Refresh',
    description:
      'Garden cucumber, sweet basil, and strawberry-mint botanicals deliver crisp 4 kcal hydration after movement.',
    productId: 'cucumber-basil',
    accentHex: '#8AA37B',
    timeOfDay: '14:00 – 18:00',
  },
  {
    id: 'relax-reset',
    title: 'Relax & Reset',
    subtitle: 'Zero-Proof Evening Pour',
    description:
      'Pour Blackberry + Lavender over ice at golden hour for a refined, alcohol-free social ritual with collagen.',
    productId: 'blackberry-lavender',
    accentHex: '#A882B5',
    timeOfDay: '18:00 – 22:00',
  },
];

export const CUSTOMER_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    title: 'Replaced my afternoon soda completely',
    body: 'I wanted something crisp with zero added sugar that did not taste like artificial stevia. Ginger + Lime has real ginger bite and settles my stomach right after lunch.',
    author: 'Clara V.',
    role: 'Architect · Amsterdam',
    flavor: 'Ginger + Lime',
    rating: 5,
  },
  {
    id: 'rev-2',
    title: 'My 6pm wine alternative',
    body: 'Blackberry + Lavender over a big cube of ice feels like an aperitif at a boutique hotel. Only 4 kcal, subtle floral aroma, and I wake up feeling genuinely rested.',
    author: 'Nadia K.',
    role: 'Creative Director · Berlin',
    flavor: 'Blackberry + Lavender',
    rating: 5,
  },
  {
    id: 'rev-3',
    title: 'Matcha + Lemon is magic for deep work',
    body: 'Having hyaluronic acid and ACV in a sparkling matcha drink sounds unusual, yet it is impossibly refreshing. Smooth lift with zero jitters or crash.',
    author: 'Marcus T.',
    role: 'Product Designer · London',
    flavor: 'Matcha + Lemon',
    rating: 5,
  },
  {
    id: 'rev-4',
    title: 'Cucumber + Basil tastes like a spa day',
    body: 'After Pilates I reach straight for the chilled Cucumber + Basil can. Clean, botanical, never overly sweet, and the minimalist cans look gorgeous on our table.',
    author: 'Elena R.',
    role: 'Pilates Instructor · Milan',
    flavor: 'Cucumber + Basil',
    rating: 5,
  },
  {
    id: 'rev-5',
    title: 'Turmeric without the chalkiness',
    body: 'Most turmeric shots are hard to drink. apcy made Turmeric + Black Pepper sparkling, delicate, and golden—my morning routine feels upgraded.',
    author: 'Soren H.',
    role: 'Founder · Copenhagen',
    flavor: 'Turmeric + Black Pepper',
    rating: 5,
  },
];
