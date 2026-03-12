/**
 * KINYAN marketplace categories
 * Curated for the frum community
 */

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  subcategories: string[];
  color: string; // Tailwind gradient class
}

export const categories: Category[] = [
  {
    id: "seforim",
    name: "Seforim",
    icon: "BookOpen",
    description: "Torah, Gemara, Halacha, Chassidus & more",
    subcategories: ["Chumash", "Gemara", "Halacha", "Chassidus", "Mussar", "History", "Children's", "Rare & Antique"],
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "judaica",
    name: "Judaica",
    icon: "Sparkles",
    description: "Menorahs, Kiddush cups, mezuzos & gifts",
    subcategories: ["Shabbos", "Chanukah", "Purim", "Pesach", "Sukkos", "Mezuzos", "Tefillin Bags", "Sterling Silver"],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    description: "Clothing, shoes, hats & accessories",
    subcategories: ["Men's Suits", "Men's Hats", "Ties & Accessories", "Women's Fashion", "Shoes", "Children's", "Shabbos Wear", "Bekishes"],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "Smartphone",
    description: "Phones, tablets, kosher tech & gadgets",
    subcategories: ["Kosher Phones", "Tablets", "Speakers", "Smart Home", "Cameras", "Accessories", "Computers", "Audio"],
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: "Home",
    description: "Furniture, decor, kitchenware & appliances",
    subcategories: ["Furniture", "Kitchen", "Decor", "Bedding", "Storage", "Appliances", "Shabbos Essentials", "Tableware"],
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "simcha",
    name: "Simcha Supplies",
    icon: "PartyPopper",
    description: "Wedding, bar mitzvah & event essentials",
    subcategories: ["Wedding", "Bar/Bat Mitzvah", "Bris", "Upsherin", "Decorations", "Invitations", "Party Favors", "Rentals"],
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    id: "kids",
    name: "Kids & Toys",
    icon: "Baby",
    description: "Toys, games, strollers & kids' gear",
    subcategories: ["Board Games", "Educational", "Outdoor", "Strollers", "Car Seats", "Baby Gear", "Arts & Crafts", "Dress Up"],
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "food",
    name: "Kosher Food",
    icon: "UtensilsCrossed",
    description: "Specialty kosher foods, snacks & treats",
    subcategories: ["Snacks", "Baking", "Candy", "Shabbos Treats", "Israeli Products", "Healthy", "Drinks", "Gift Baskets"],
    color: "from-red-500 to-rose-600",
  },
  {
    id: "collectibles",
    name: "Collectibles",
    icon: "Crown",
    description: "Rare items, coins, art & memorabilia",
    subcategories: ["Coins", "Art", "Vintage", "Memorabilia", "Stamps", "Antiques", "Sports Cards", "Autographs"],
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "health",
    name: "Health & Beauty",
    icon: "Heart",
    description: "Skincare, vitamins, wellness & personal care",
    subcategories: ["Skincare", "Hair Care", "Vitamins", "Essential Oils", "Makeup", "Men's Grooming", "Wellness", "Fitness"],
    color: "from-teal-500 to-emerald-600",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryColor(id: string): string {
  return getCategoryById(id)?.color || "from-gray-500 to-gray-600";
}
