export interface Product {
  id: string;
  name: string;
  category: 'tailleurs' | 'streetwear' | 'accessoires' | 'haute-couture';
  tag?: string; // e.g. 'NOUVEAU', 'BEST-SELLER'
  tagColor?: string;
  subtitle: string;
  price: number;
  image: string;
  description: string;
  atelier: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
}

export interface EventTicket {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  venue: string;
  price: number;
  vipPrice: number;
  image: string;
  category: 'fashion-week' | 'gala' | 'masterclass' | 'defile';
  availableSeats: number;
  description: string;
}

export interface ClassifiedAd {
  id: string;
  title: string;
  category: 'tissus' | 'materiel' | 'casting' | 'ateliers';
  price: number | 'Sur devis';
  city: string;
  image: string;
  date: string;
  author: string;
  phone: string;
  description: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  city: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  featuredWork: string[];
  bio: string;
  verified: boolean;
  phone: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSeconds: number;
  cover: string;
  mood: string;
  bpm: number;
}

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDEzGIDeXKnLEYLt3cIjfWrcPyZ5NObhQZUkibe-Su8tL01IqrzzRVQxlPmirYpu2W_6At00q7d5Luf7y0aBUE73A7mGTCZ8eddxmZHAr99L7od3-KCXfRWc98xXXQ_571gSK-z8iWvb_onOUgoZUjDbtzrkVZuXlQlqKM8I5CqRL1l-92i1-bejIV3_Kd-ykpBjKB2yOKjOewoQB4IJ4KGSN1veHOkUWfWdPAOeAjyTGKE928Mk5E";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Ensemble Tailleur Cobalt',
    category: 'tailleurs',
    tag: 'NOUVEAU',
    tagColor: 'bg-[#0D5BE1]',
    subtitle: 'Édition Limitée',
    price: 240.0,
    image: HERO_IMAGE,
    description: 'Veste structurée à double boutonnage nacré et pantalon palazzo taillé dans un sergé de coton peigné bleu cobalt royal. Inspiré par les lignes architecturales des collines de Bukavu.',
    atelier: 'Atelier Kivu Haute Couture',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bleu Cobalt Kivu', hex: '#0D5BE1' },
      { name: 'Noir Onyx', hex: '#111827' },
      { name: 'Craie Pure', hex: '#F8FAFC' }
    ],
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Pantalon Architecture 2026',
    category: 'tailleurs',
    tag: 'BEST-SELLER',
    tagColor: 'bg-slate-900',
    subtitle: 'Bukavu Workshop',
    price: 120.0,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    description: 'Coupe droite à plis marqués et taille haute sculpturale. Conçu pour une aisance totale avec un drapé fluide parfait pour les climats tropicaux et soirées d’affaires.',
    atelier: 'Bukavu Workshop Co.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bleu Kivu', hex: '#0D5BE1' },
      { name: 'Anthracite', hex: '#334155' }
    ],
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Blazer Épaules Pointues',
    category: 'tailleurs',
    subtitle: 'Haute Couture',
    price: 185.0,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    description: 'Veste d’apparat aux épaules affûtées inspirée des tenues traditionnelles revisitées avec un modernisme tranchant. Doublure en jacquard texturé.',
    atelier: 'Maison Kivu Prestige',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Bleu Impérial', hex: '#0D5BE1' },
      { name: 'Terracotta Virunga', hex: '#C2410C' }
    ],
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Bottines Cuir Onyx Kivu',
    category: 'accessoires',
    subtitle: 'Street Minimal',
    price: 160.0,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
    description: 'Bottines en cuir pleine fleur tanné naturellement dans l’Est congolais. Talons biseautés contemporains et semelle ultra-légère renforcée.',
    atelier: 'Maroquinerie du Lac',
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [
      { name: 'Noir Onyx', hex: '#0F172A' },
      { name: 'Cuir Brun Kivu', hex: '#78350F' }
    ],
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Robe Sculpturale Bazin 2026',
    category: 'haute-couture',
    tag: 'NOUVEAU',
    tagColor: 'bg-[#0D5BE1]',
    subtitle: 'Capsule Étoilée',
    price: 310.0,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'Création signature en Bazin damassé teinté artisanalement avec des motifs géométriques cubistes inspirés de l’art Kuba du Sud-Kivu.',
    atelier: 'Atelier Kivu Haute Couture',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Bleu Nuit & Or', hex: '#1E3A8A' },
      { name: 'Indigo Profond', hex: '#1E1B4B' }
    ],
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Kimono Streetwear Virunga',
    category: 'streetwear',
    subtitle: 'Collection Urbaine',
    price: 145.0,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80',
    description: 'Veste oversize d’inspiration kimono urbain en denim brut et empiècements de coton teinté à la main. Pratique, résistant et hautement stylisé.',
    atelier: 'Virunga Street Lab',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Cobalt Brut', hex: '#0D5BE1' },
      { name: 'Gris Cendre Volcanique', hex: '#475569' }
    ],
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Sac Banane Cuir Sculpté',
    category: 'accessoires',
    tag: 'BEST-SELLER',
    tagColor: 'bg-slate-900',
    subtitle: 'Accessoires Studio',
    price: 95.0,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    description: 'Maroquinerie fine avec boucle en laiton massif forgée par les artisans métalliers de Kadutu. Porté épaule ou ceinture.',
    atelier: 'Maroquinerie du Lac',
    sizes: ['Unique'],
    colors: [
      { name: 'Noir Onyx', hex: '#0F172A' },
      { name: 'Bleu Électrique', hex: '#0D5BE1' }
    ],
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Surchemise Oversize Goma 26',
    category: 'streetwear',
    subtitle: 'Street Minimal',
    price: 110.0,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    description: 'Toile de coton peigné épaisse avec poches plaquées tactiques et broderie ton-sur-ton GOOD_STORE sur la poitrine.',
    atelier: 'Virunga Street Lab',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Bleu Cobalt', hex: '#0D5BE1' },
      { name: 'Sable du Lac', hex: '#D97706' }
    ],
    inStock: true
  }
];

export const INITIAL_EVENTS: EventTicket[] = [
  {
    id: 'evt-1',
    title: 'Kivu Fashion Week 2026',
    subtitle: 'Grand Défilé Annuel & Célébration du Textile',
    date: '14 - 16 Novembre 2026',
    location: 'Bukavu, Sud-Kivu',
    venue: 'Hôtel Serena Bukavu — Scène Flottante Lac Kivu',
    price: 45.0,
    vipPrice: 120.0,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    category: 'fashion-week',
    availableSeats: 350,
    description: 'Le rendez-vous incontournable de la haute couture d’Afrique centrale. Plus de 25 créateurs congolais et internationaux dévoilent leurs capsules 2026 face au coucher de soleil sur le lac Kivu.'
  },
  {
    id: 'evt-2',
    title: 'Gala Prestige Modern Africa',
    subtitle: 'Dîner de Gala & Vente aux Enchères Caritative',
    date: '28 Novembre 2026',
    location: 'Bukavu, Sud-Kivu',
    venue: 'Résidence Panzi Gardens Ballroom',
    price: 80.0,
    vipPrice: 200.0,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    category: 'gala',
    availableSeats: 120,
    description: 'Une soirée d’exception au profit du fonds de formation des jeunes couturières et modélistes du Sud-Kivu. Tapis bleu royal et banquet gastronomique.'
  },
  {
    id: 'evt-3',
    title: 'Masterclass Teinture Indigo & Wax de Luxe',
    subtitle: 'Techniques Ancestrales & Modernisme Textilier',
    date: '05 Décembre 2026',
    location: 'Bukavu, Sud-Kivu',
    venue: 'Campus Textile Ibanda Lab',
    price: 35.0,
    vipPrice: 70.0,
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    category: 'masterclass',
    availableSeats: 45,
    description: 'Apprenez les secrets du drapé architectural, de la pigmentation végétale naturelle et de la découpe haute précision auprès des maîtres tailleurs de Bukavu.'
  },
  {
    id: 'evt-4',
    title: 'Runway Show Nuit Étoilée Goma',
    subtitle: 'Streetwear & Futurisme Sahélien',
    date: '19 Décembre 2026',
    location: 'Goma, Nord-Kivu',
    venue: 'Parc des Arts & Hangar Contemporain',
    price: 30.0,
    vipPrice: 90.0,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    category: 'defile',
    availableSeats: 280,
    description: 'Confrontation visuelle entre streetwear urbain et textures volcaniques. Performance musicale live et scénographie lumineuse immersive.'
  }
];

export const INITIAL_CLASSIFIEDS: ClassifiedAd[] = [
  {
    id: 'ad-1',
    title: 'Lot de 50 rouleaux de Bazin Riche Getzner teinté main',
    category: 'tissus',
    price: 850.0,
    city: 'Bukavu (Ibanda)',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    date: 'Il y a 2 heures',
    author: 'Coopérative Textile Kivu',
    phone: '+243 971 234 567',
    description: 'Tissus de premier choix aux éclats nacrés bleus et dorés. Idéal pour collections de mariage et défilés haute couture.'
  },
  {
    id: 'ad-2',
    title: 'Machine à coudre industrielle Juki DDL-8700 quasi neuve',
    category: 'materiel',
    price: 480.0,
    city: 'Bukavu (Kadutu)',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    date: 'Hier',
    author: 'Atelier Mbuyi & Frères',
    phone: '+243 852 345 678',
    description: 'Servomoteur silencieux, coupe-fil automatique, vendue avec table et porte-bobines d’origine. Révision complète effectuée.'
  },
  {
    id: 'ad-3',
    title: 'Casting Mannequins H/F pour Lookbook Kivu 2026',
    category: 'casting',
    price: 'Sur devis',
    city: 'Bukavu & Goma',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date: 'Il y a 3 jours',
    author: 'Agence Horizon Casting Kivu',
    phone: '+243 810 987 654',
    description: 'Recherche 12 mannequins pour shooting éditorial nouvelle capsule cobalt et défilé officiel en novembre. Rémunération assurée.'
  },
  {
    id: 'ad-4',
    title: 'Espace partagé pour stylistes avec tables de coupe professionnelles',
    category: 'ateliers',
    price: 150.0,
    city: 'Bukavu (Muhumba)',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    date: 'Cette semaine',
    author: 'Creative Hub Kivu',
    phone: '+243 998 112 233',
    description: 'Postes de travail disponibles dans loft lumineux avec électricité solaire permanente, fibre internet, mannequins d’atelier et fers vapeur professionnels.'
  }
];

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'pro-1',
    name: 'Amani Bishweka',
    role: 'Maître Tailleur & Styliste Haute Couture',
    city: 'Bukavu (Ibanda)',
    specialty: 'Tailleurs structurés & Costumes sur-mesure',
    rating: 4.9,
    reviewsCount: 48,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    featuredWork: [
      HERO_IMAGE,
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
    ],
    bio: 'Formé aux techniques européennes et nourri par l’esthétique royale du Kivu, Amani crée des pièces à la coupe chirurgicale portées par les leaders et artistes du continent.',
    verified: true,
    phone: '+243 970 445 566'
  },
  {
    id: 'pro-2',
    name: 'Sifa Nabintu',
    role: 'Créatrice & Coloriste Textile',
    city: 'Bukavu (Muhumba)',
    specialty: 'Bazin damassé, Teintures végétales & Robes d’apparat',
    rating: 5.0,
    reviewsCount: 62,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    featuredWork: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80'
    ],
    bio: 'Pionnière de l’indigo congolais, Sifa allie pigments minéraux du lac Kivu et techniques ancestrales pour des tissus au toucher de soie incomparable.',
    verified: true,
    phone: '+243 851 889 900'
  },
  {
    id: 'pro-3',
    name: 'Kasereka Mwamba',
    role: 'Designer Streetwear & Upcycling',
    city: 'Goma & Bukavu',
    specialty: 'Denim architectural, Kimonos urbains & Vestes utilitaires',
    rating: 4.8,
    reviewsCount: 37,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    featuredWork: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    ],
    bio: 'Inspiré par le bouillonnement culturel de Goma, Kasereka recycle toiles brutes et matières techniques pour habiller la nouvelle vague africaine.',
    verified: true,
    phone: '+243 812 776 655'
  }
];

export const INITIAL_TRACKS: MusicTrack[] = [
  {
    id: 'tr-1',
    title: 'Cobalt Runway (Kivu 2026 Official Theme)',
    artist: 'DJ Mapendo ft. Bukavu Strings',
    duration: '03:42',
    durationSeconds: 222,
    cover: HERO_IMAGE,
    mood: 'Afro-Électro Chic & Défilé',
    bpm: 122
  },
  {
    id: 'tr-2',
    title: 'Rumba Architecturale',
    artist: 'Orchestre Symphonique du Kivu',
    duration: '04:15',
    durationSeconds: 255,
    cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    mood: 'Élégance & Rythmes Chaloupés',
    bpm: 108
  },
  {
    id: 'tr-3',
    title: 'Nuit sur le Lac (Vibration Deep House)',
    artist: 'Amani Afro-Soul',
    duration: '03:58',
    durationSeconds: 238,
    cover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    mood: 'Ambiance Soirée de Gala',
    bpm: 124
  },
  {
    id: 'tr-4',
    title: 'Virunga Basslines',
    artist: 'Kivu Sound Collective',
    duration: '03:20',
    durationSeconds: 200,
    cover: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
    mood: 'Énergie Défilé Streetwear',
    bpm: 128
  }
];
