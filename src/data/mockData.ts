/**
 * Mock data for KINYAN marketplace
 * This will be replaced with real Supabase data
 */

export interface LiveStream {
  id: string;
  title: string;
  seller: Seller;
  category: string;
  viewers: number;
  currentBid: number | null;
  currentItem: string;
  thumbnailUrl: string;
  isLive: boolean;
  scheduledFor?: string;
  tags: string[];
  isSponsored?: boolean;
  sponsorTier?: "basic" | "premium" | "featured";
  boostScore?: number; // AI relevance score
}

export interface Seller {
  id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  rating: number;
  totalSales: number;
  followers: number;
  verified: boolean;
  location: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  seller: Seller;
  condition: "New" | "Like New" | "Good" | "Fair";
  shipping: "Free" | number;
  likes: number;
  inStock: boolean;
  tags: string[];
}

export interface Bid {
  id: string;
  userId: string;
  username: string;
  amount: number;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

// Mock Sellers
export const mockSellers: Seller[] = [
  {
    id: "s1",
    displayName: "Seforim Central",
    username: "seforimcentral",
    avatarUrl: "",
    rating: 4.9,
    totalSales: 2847,
    followers: 12400,
    verified: true,
    location: "Brooklyn, NY",
  },
  {
    id: "s2",
    displayName: "Silver & Gold Judaica",
    username: "silvergoldjudaica",
    avatarUrl: "",
    rating: 4.8,
    totalSales: 1523,
    followers: 8900,
    verified: true,
    location: "Lakewood, NJ",
  },
  {
    id: "s3",
    displayName: "The Hat Spot",
    username: "thehatspot",
    avatarUrl: "",
    rating: 4.7,
    totalSales: 956,
    followers: 5200,
    verified: true,
    location: "Monsey, NY",
  },
  {
    id: "s4",
    displayName: "TechKosher",
    username: "techkosher",
    avatarUrl: "",
    rating: 4.9,
    totalSales: 3201,
    followers: 15600,
    verified: true,
    location: "Brooklyn, NY",
  },
  {
    id: "s5",
    displayName: "Heimish Deals",
    username: "heimishdeals",
    avatarUrl: "",
    rating: 4.6,
    totalSales: 789,
    followers: 3400,
    verified: false,
    location: "Monroe, NY",
  },
  {
    id: "s6",
    displayName: "Simcha Style",
    username: "simchastyle",
    avatarUrl: "",
    rating: 4.8,
    totalSales: 1245,
    followers: 7800,
    verified: true,
    location: "Brooklyn, NY",
  },
];

// Mock Live Streams
export const mockLiveStreams: LiveStream[] = [
  {
    id: "ls1",
    title: "Massive Seforim Sale — Everything Must Go!",
    seller: mockSellers[0],
    category: "seforim",
    viewers: 342,
    currentBid: 45,
    currentItem: "Complete Shas Vilna Edition",
    thumbnailUrl: "",
    isLive: true,
    tags: ["seforim", "sale", "gemara"],
    isSponsored: true,
    sponsorTier: "featured",
    boostScore: 95,
  },
  {
    id: "ls2",
    title: "Sterling Silver Judaica Auction",
    seller: mockSellers[1],
    category: "judaica",
    viewers: 218,
    currentBid: 120,
    currentItem: "Antique Kiddush Cup",
    thumbnailUrl: "",
    isLive: true,
    tags: ["judaica", "silver", "auction"],
  },
  {
    id: "ls3",
    title: "Hat Drop — Borsalinos & More",
    seller: mockSellers[2],
    category: "fashion",
    viewers: 156,
    currentBid: 85,
    currentItem: "Borsalino Como",
    thumbnailUrl: "",
    isLive: true,
    tags: ["hats", "fashion", "borsalino"],
  },
  {
    id: "ls4",
    title: "Kosher Phone Deals — TAG Approved",
    seller: mockSellers[3],
    category: "electronics",
    viewers: 489,
    currentBid: 199,
    currentItem: "Samsung Galaxy (Kosher)",
    thumbnailUrl: "",
    isLive: true,
    tags: ["electronics", "kosher", "phones"],
    isSponsored: true,
    sponsorTier: "premium",
    boostScore: 88,
  },
  {
    id: "ls5",
    title: "Kids Toy Blowout — Chanukah Prep",
    seller: mockSellers[4],
    category: "kids",
    viewers: 95,
    currentBid: 25,
    currentItem: "Wooden Block Set",
    thumbnailUrl: "",
    isLive: true,
    tags: ["toys", "kids", "chanukah"],
  },
  {
    id: "ls6",
    title: "Wedding Season — Simcha Essentials",
    seller: mockSellers[5],
    category: "simcha",
    viewers: 178,
    currentBid: 55,
    currentItem: "Custom Bencher Set (100pc)",
    thumbnailUrl: "",
    isLive: true,
    tags: ["wedding", "simcha", "custom"],
  },
];

// Mock upcoming streams
export const mockUpcomingStreams: LiveStream[] = [
  {
    id: "us1",
    title: "Rare Seforim Auction — Antique Collection",
    seller: mockSellers[0],
    category: "seforim",
    viewers: 0,
    currentBid: null,
    currentItem: "",
    thumbnailUrl: "",
    isLive: false,
    scheduledFor: "Tonight 9:00 PM",
    tags: ["rare", "antique", "auction"],
  },
  {
    id: "us2",
    title: "Purim Costume Extravaganza",
    seller: mockSellers[5],
    category: "kids",
    viewers: 0,
    currentBid: null,
    currentItem: "",
    thumbnailUrl: "",
    isLive: false,
    scheduledFor: "Tomorrow 8:00 PM",
    tags: ["purim", "costumes", "kids"],
  },
  {
    id: "us3",
    title: "Pesach Kitchen Essentials",
    seller: mockSellers[4],
    category: "home",
    viewers: 0,
    currentBid: null,
    currentItem: "",
    thumbnailUrl: "",
    isLive: false,
    scheduledFor: "Wed 7:30 PM",
    tags: ["pesach", "kitchen", "home"],
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Artscroll Shas — Full Set",
    description: "Complete 73-volume Artscroll Schottenstein Talmud Bavli. Brand new, never used.",
    price: 899,
    compareAtPrice: 1200,
    images: [],
    category: "seforim",
    subcategory: "Gemara",
    seller: mockSellers[0],
    condition: "New",
    shipping: "Free",
    likes: 234,
    inStock: true,
    tags: ["artscroll", "shas", "gemara"],
  },
  {
    id: "p2",
    title: "Sterling Silver Menorah — Handcrafted",
    description: "Stunning handcrafted sterling silver menorah. Perfect for Chanukah or year-round display.",
    price: 450,
    images: [],
    category: "judaica",
    subcategory: "Chanukah",
    seller: mockSellers[1],
    condition: "New",
    shipping: "Free",
    likes: 189,
    inStock: true,
    tags: ["menorah", "silver", "chanukah"],
  },
  {
    id: "p3",
    title: "Borsalino Fedora — Black",
    description: "Classic Borsalino Como fedora in black. Size 7 1/4. Excellent condition.",
    price: 175,
    compareAtPrice: 250,
    images: [],
    category: "fashion",
    subcategory: "Men's Hats",
    seller: mockSellers[2],
    condition: "Like New",
    shipping: 12,
    likes: 156,
    inStock: true,
    tags: ["borsalino", "hat", "fedora"],
  },
  {
    id: "p4",
    title: "Samsung Galaxy A15 — TAG Certified Kosher",
    description: "Brand new Samsung Galaxy A15 with TAG-approved kosher filter installed. Ready to use.",
    price: 249,
    images: [],
    category: "electronics",
    subcategory: "Kosher Phones",
    seller: mockSellers[3],
    condition: "New",
    shipping: "Free",
    likes: 412,
    inStock: true,
    tags: ["samsung", "kosher", "phone"],
  },
  {
    id: "p5",
    title: "Custom Bencher Set — 100 Pieces",
    description: "Beautiful custom benchers for your simcha. Choose your own text and design. 100 piece minimum.",
    price: 350,
    images: [],
    category: "simcha",
    subcategory: "Wedding",
    seller: mockSellers[5],
    condition: "New",
    shipping: "Free",
    likes: 78,
    inStock: true,
    tags: ["benchers", "wedding", "custom"],
  },
  {
    id: "p6",
    title: "Wooden Building Blocks — Alef Beis",
    description: "Hand-painted wooden building blocks with Hebrew letters. Educational and fun!",
    price: 35,
    images: [],
    category: "kids",
    subcategory: "Educational",
    seller: mockSellers[4],
    condition: "New",
    shipping: 5,
    likes: 67,
    inStock: true,
    tags: ["kids", "educational", "alefbeis"],
  },
  {
    id: "p7",
    title: "Shabbos Hot Plate — Extra Large",
    description: "Oversized hot plate perfect for big Shabbos meals. Keeps food warm for 24+ hours. Stainless steel surface.",
    price: 89,
    compareAtPrice: 120,
    images: [],
    category: "home",
    subcategory: "Kitchen",
    seller: mockSellers[4],
    condition: "New",
    shipping: "Free",
    likes: 145,
    inStock: true,
    tags: ["shabbos", "hotplate", "kitchen"],
  },
  {
    id: "p8",
    title: "Leather-Bound Tehillim — Pocket Size",
    description: "Beautiful genuine leather Tehillim with gold lettering. Perfect for travel or daily use.",
    price: 28,
    images: [],
    category: "seforim",
    subcategory: "Tehillim",
    seller: mockSellers[0],
    condition: "New",
    shipping: 3,
    likes: 92,
    inStock: true,
    tags: ["tehillim", "leather", "pocket"],
  },
  {
    id: "p9",
    title: "14K Gold Magen David Necklace",
    description: "Elegant 14K gold Star of David pendant on 18\" chain. Comes in gift box.",
    price: 320,
    images: [],
    category: "judaica",
    subcategory: "Jewelry",
    seller: mockSellers[1],
    condition: "New",
    shipping: "Free",
    likes: 203,
    inStock: true,
    tags: ["gold", "necklace", "magendavid"],
  },
  {
    id: "p10",
    title: "Black Velvet Kippa — Bulk 10-Pack",
    description: "Premium black velvet kippas. Great for simchos or everyday use. 10 kippas per pack.",
    price: 45,
    images: [],
    category: "fashion",
    subcategory: "Accessories",
    seller: mockSellers[5],
    condition: "New",
    shipping: "Free",
    likes: 88,
    inStock: true,
    tags: ["kippa", "velvet", "bulk"],
  },
  {
    id: "p11",
    title: "iPad 10th Gen — WiFi 64GB",
    description: "Like-new iPad, barely used. Includes case and screen protector. Great for learning or kids.",
    price: 299,
    compareAtPrice: 449,
    images: [],
    category: "electronics",
    subcategory: "Tablets",
    seller: mockSellers[3],
    condition: "Like New",
    shipping: "Free",
    likes: 267,
    inStock: true,
    tags: ["ipad", "apple", "tablet"],
  },
  {
    id: "p12",
    title: "Purim Costume — Megillas Esther Scroll",
    description: "Adorable kids costume of a giant megillah scroll. Sizes 3-8. Perfect for the Purim seudah!",
    price: 42,
    images: [],
    category: "kids",
    subcategory: "Costumes",
    seller: mockSellers[5],
    condition: "New",
    shipping: 5,
    likes: 156,
    inStock: true,
    tags: ["purim", "costume", "kids"],
  },
];

// Mock Chat Messages for live stream
export const mockChatMessages: ChatMessage[] = [
  { id: "c1", userId: "u1", username: "YossiB", message: "What's the starting bid?", timestamp: new Date() },
  { id: "c2", userId: "u2", username: "MosheDavid", message: "Beautiful piece! 🔥", timestamp: new Date() },
  { id: "c3", userId: "system", username: "KINYAN", message: "New item up for bidding!", timestamp: new Date(), isSystem: true },
  { id: "c4", userId: "u3", username: "SarahR", message: "$50!", timestamp: new Date() },
  { id: "c5", userId: "u4", username: "ChaimG", message: "$55", timestamp: new Date() },
  { id: "c6", userId: "u1", username: "YossiB", message: "$60!", timestamp: new Date() },
  { id: "c7", userId: "system", username: "KINYAN", message: "Current bid: $60 by YossiB", timestamp: new Date(), isSystem: true },
  { id: "c8", userId: "u5", username: "RivkaM", message: "Does it come with a case?", timestamp: new Date() },
];

// ==============================
// CHARITY / FUNDRAISER DATA
// ==============================

export interface Charity {
  id: string;
  name: string;
  slug: string;
  description: string;
  mission: string;
  location: string;
  verified: boolean;
  totalRaised: number;
  supporters: number;
  avatarInitials: string;
  category: CharityCategory;
}

export type CharityCategory =
  | "education"
  | "chesed"
  | "medical"
  | "community"
  | "Israel"
  | "poverty";

export interface Fundraiser {
  id: string;
  charity: Charity;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  isLive: boolean;
  scheduledFor?: string;
  viewers: number;
  endDate: string;
  tags: string[];
}

export interface AuctionGame {
  id: string;
  fundraiser: Fundraiser;
  type: "raffle" | "spin-wheel" | "mystery-box" | "chinese-auction";
  title: string;
  description: string;
  ticketPrice: number;
  totalTickets: number;
  ticketsSold: number;
  prizes: AuctionPrize[];
  endsAt: string;
  isActive: boolean;
}

export interface AuctionPrize {
  id: string;
  name: string;
  value: number;
  emoji: string;
  description: string;
}

// Mock Charities
export const mockCharities: Charity[] = [
  {
    id: "ch1",
    name: "Keren Simcha",
    slug: "keren-simcha",
    description: "Helping families in need celebrate their simchos with dignity.",
    mission: "Every family deserves to celebrate life's milestones — a wedding, a bar mitzvah, a bris — without the crushing weight of financial worry. Keren Simcha provides financial assistance, event coordination, and community support to ensure every simcha is a simcha.",
    location: "Brooklyn, NY",
    verified: true,
    totalRaised: 2450000,
    supporters: 18200,
    avatarInitials: "KS",
    category: "chesed",
  },
  {
    id: "ch2",
    name: "Torah Tech Academy",
    slug: "torah-tech-academy",
    description: "Training the next generation of frum software developers.",
    mission: "We believe in Torah and parnassa hand-in-hand. Our program combines intensive coding bootcamps with Torah learning, giving young men the skills to earn a strong parnassa while staying connected to their values.",
    location: "Lakewood, NJ",
    verified: true,
    totalRaised: 890000,
    supporters: 5400,
    avatarInitials: "TT",
    category: "education",
  },
  {
    id: "ch3",
    name: "Refuah Fund",
    slug: "refuah-fund",
    description: "Medical bill assistance for community families facing health crises.",
    mission: "When illness strikes, the last thing a family should worry about is money. Refuah Fund covers medical expenses, provides patient advocacy, and connects families with the resources they need during their most challenging times.",
    location: "Monsey, NY",
    verified: true,
    totalRaised: 5200000,
    supporters: 32100,
    avatarInitials: "RF",
    category: "medical",
  },
  {
    id: "ch4",
    name: "Eretz HaKodesh Fund",
    slug: "eretz-hakodesh",
    description: "Supporting Torah families in Eretz Yisroel.",
    mission: "Thousands of families learning Torah in Eretz Yisroel struggle with basic necessities. We provide monthly stipends, emergency grants, and holiday assistance to ensure that those dedicating their lives to Torah can live with dignity.",
    location: "Jerusalem, Israel",
    verified: true,
    totalRaised: 8900000,
    supporters: 45000,
    avatarInitials: "EH",
    category: "Israel",
  },
  {
    id: "ch5",
    name: "Tomchei Shabbos of Flatbush",
    slug: "tomchei-shabbos",
    description: "Weekly food packages for families who need them most.",
    mission: "Every Thursday night, our volunteers deliver discreet packages of food to families throughout Flatbush, ensuring that no family goes without Shabbos food. Dignity and confidentiality are our highest priorities.",
    location: "Flatbush, NY",
    verified: true,
    totalRaised: 1800000,
    supporters: 9800,
    avatarInitials: "TS",
    category: "poverty",
  },
  {
    id: "ch6",
    name: "Camp Simcha Special",
    slug: "camp-simcha-special",
    description: "Summer camp for children with serious illnesses.",
    mission: "Every child deserves to experience the magic of camp. We provide a medically supervised, fully adaptive camp experience for children with cancer, chronic illnesses, and disabilities — giving them the best summer of their lives.",
    location: "Glen Spey, NY",
    verified: true,
    totalRaised: 12000000,
    supporters: 68000,
    avatarInitials: "CS",
    category: "medical",
  },
];

// Mock Fundraisers
export const mockFundraisers: Fundraiser[] = [
  {
    id: "fr1",
    charity: mockCharities[0],
    title: "Purim Simcha Drive — Help 50 Families!",
    description: "Help us raise enough to sponsor 50 families for full Purim packages including mishloach manos, seudah, and matanos l'evyonim.",
    goalAmount: 75000,
    raisedAmount: 48200,
    donorCount: 342,
    isLive: true,
    viewers: 567,
    endDate: "2026-03-14",
    tags: ["purim", "chesed", "families"],
  },
  {
    id: "fr2",
    charity: mockCharities[2],
    title: "Refuah Fund Annual Dinner & Auction",
    description: "Our biggest fundraiser of the year! Join us live for an incredible auction with luxury prizes.",
    goalAmount: 500000,
    raisedAmount: 312000,
    donorCount: 1240,
    isLive: true,
    viewers: 1892,
    endDate: "2026-03-12",
    tags: ["medical", "auction", "annual"],
  },
  {
    id: "fr3",
    charity: mockCharities[1],
    title: "Scholarship Fund — Send a Bochur to Code",
    description: "Each scholarship covers a full bootcamp slot. Help a young man build his parnassa.",
    goalAmount: 180000,
    raisedAmount: 95000,
    donorCount: 456,
    isLive: false,
    scheduledFor: "Tonight 9:00 PM",
    viewers: 0,
    endDate: "2026-03-20",
    tags: ["education", "scholarship", "tech"],
  },
  {
    id: "fr4",
    charity: mockCharities[3],
    title: "Pesach in Eretz Yisroel — Feed 1000 Families",
    description: "Pesach is coming and hundreds of families need help making Yom Tov. Every dollar goes directly to families.",
    goalAmount: 250000,
    raisedAmount: 67500,
    donorCount: 890,
    isLive: false,
    scheduledFor: "Tomorrow 8:00 PM",
    viewers: 0,
    endDate: "2026-04-10",
    tags: ["pesach", "Israel", "food"],
  },
  {
    id: "fr5",
    charity: mockCharities[4],
    title: "Double Your Impact — Matching Campaign",
    description: "A generous donor is matching every dollar up to $100K! Double your tzedakah.",
    goalAmount: 200000,
    raisedAmount: 134000,
    donorCount: 678,
    isLive: true,
    viewers: 345,
    endDate: "2026-03-15",
    tags: ["matching", "food", "shabbos"],
  },
  {
    id: "fr6",
    charity: mockCharities[5],
    title: "Send a Kid to Camp — Summer 2026",
    description: "Every child with a serious illness deserves an amazing summer. Sponsor a camper today.",
    goalAmount: 1000000,
    raisedAmount: 420000,
    donorCount: 2100,
    isLive: false,
    scheduledFor: "Wed 7:30 PM",
    viewers: 0,
    endDate: "2026-06-01",
    tags: ["camp", "kids", "medical"],
  },
];

// Mock Auction Games
export const mockAuctionGames: AuctionGame[] = [
  {
    id: "ag1",
    fundraiser: mockFundraisers[1],
    type: "chinese-auction",
    title: "Grand Chinese Auction — 50+ Prizes!",
    description: "Place tickets in any prize basket you want! More tickets = better odds.",
    ticketPrice: 18,
    totalTickets: 10000,
    ticketsSold: 6234,
    prizes: [
      { id: "pr1", name: "Luxury Pesach Getaway", value: 15000, emoji: "✈️", description: "5-night all-inclusive Pesach program for a family of 6" },
      { id: "pr2", name: "Tesla Model Y", value: 52000, emoji: "🚗", description: "Brand new Tesla Model Y Long Range" },
      { id: "pr3", name: "Custom Sheitel", value: 5000, emoji: "💇", description: "Custom sheitel from a top sheitel macher" },
      { id: "pr4", name: "Apple MacBook Pro", value: 2500, emoji: "💻", description: "M4 MacBook Pro 14-inch" },
      { id: "pr5", name: "$10,000 Cash", value: 10000, emoji: "💵", description: "Cold hard cash — use it however you want" },
    ],
    endsAt: "2026-03-12T23:59:00",
    isActive: true,
  },
  {
    id: "ag2",
    fundraiser: mockFundraisers[0],
    type: "raffle",
    title: "Purim Mega Raffle — Win Big, Give Bigger!",
    description: "Only 500 tickets! Buy a ticket for a chance to win amazing prizes.",
    ticketPrice: 36,
    totalTickets: 500,
    ticketsSold: 312,
    prizes: [
      { id: "pr6", name: "Sterling Silver Menorah Set", value: 3500, emoji: "🕎", description: "Handcrafted sterling silver menorah with matching tray" },
      { id: "pr7", name: "Weekend Getaway", value: 2000, emoji: "🏨", description: "2-night stay at a luxury kosher hotel" },
      { id: "pr8", name: "AirPods Pro", value: 250, emoji: "🎧", description: "Apple AirPods Pro (latest generation)" },
      { id: "pr9", name: "Artscroll Shas", value: 1200, emoji: "📚", description: "Complete Artscroll Schottenstein Shas" },
    ],
    endsAt: "2026-03-14T18:00:00",
    isActive: true,
  },
  {
    id: "ag3",
    fundraiser: mockFundraisers[5],
    type: "spin-wheel",
    title: "Spin to Win — Every Spin Sends a Kid to Camp!",
    description: "Spin the wheel for instant prizes! Every spin = a donation. Guaranteed winner every time!",
    ticketPrice: 10,
    totalTickets: 5000,
    ticketsSold: 1850,
    prizes: [
      { id: "pr10", name: "Disney Vacation Package", value: 8000, emoji: "🏰", description: "5-day Disney World package for family of 5" },
      { id: "pr11", name: "iPhone 16 Pro Max", value: 1200, emoji: "📱", description: "Newest iPhone, unlocked" },
      { id: "pr12", name: "$5,000 Gift Card Bundle", value: 5000, emoji: "🎁", description: "Amazon, Target, and Costco gift cards" },
      { id: "pr13", name: "Peloton Bike+", value: 2500, emoji: "🚴", description: "Peloton Bike+ with 12-month subscription" },
    ],
    endsAt: "2026-06-01T23:59:00",
    isActive: true,
  },
  {
    id: "ag4",
    fundraiser: mockFundraisers[4],
    type: "mystery-box",
    title: "Mystery Box — What's Inside?",
    description: "Every box is a winner! Open a mystery box for a chance at incredible prizes.",
    ticketPrice: 25,
    totalTickets: 2000,
    ticketsSold: 780,
    prizes: [
      { id: "pr14", name: "Grand Prize — $2,500 Cash", value: 2500, emoji: "💰", description: "The big one!" },
      { id: "pr15", name: "Shabbos Package", value: 500, emoji: "🕯️", description: "Wine, challah board, and candle holders" },
      { id: "pr16", name: "Gift Card Bundle", value: 150, emoji: "🎁", description: "$150 in assorted gift cards" },
      { id: "pr17", name: "Surprise Prize", value: 50, emoji: "🎉", description: "A fun surprise worth at least $50" },
    ],
    endsAt: "2026-03-15T23:59:00",
    isActive: true,
  },
];
