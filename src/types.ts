export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  artisan: string;
  description: string;
  craftingProcess: string;
  tasteNotes: string[];
  ingredients: string[];
}

export interface Review {
  id: string;
  merchantId: string;
  merchantName: string;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  rating: {
    taste: number;
    ambience: number;
    ingredients: number;
    overall: number;
  };
  content: string;
  images?: string[];
  date: string;
  likes: number;
  tags?: string[];
}

export interface Merchant {
  id: string;
  name: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  pricePerCapita: number;
  distance: string; // e.g. "500m", "1.2km"
  coordinate: { x: number; y: number }; // Percentage position on our custom map (0 - 100)
  category: "手工烘焙" | "有机素食" | "传统小吃" | "匠心私厨" | "茶事琴房" | "非遗工坊" | "街角糖铺" | "私房膳食";
  tags: string[];
  features: string[]; // e.g. ["限时优惠", "静谧小憩", "露天聚会", "宠物友好", "纯素食", "无麸质"]
  openingHours: string;
  isOpen: boolean;
  statusText: string;
  address: string;
  description: string;
  images: string[]; // 3 images: primary and 2 detail
  products: Product[];
  ratingsBreakdown: {
    taste: number;
    ambience: number;
    ingredients: number;
  };
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  tag: "匠人访谈" | "市集寻宝" | "探店心得";
  author: string;
  date: string;
  readTime: string;
}

export interface UserStats {
  footprintsCount: number;
  visitsCount: number;
  followersCount: number;
}

export interface ExplorationNote {
  id: string;
  title: string;
  content: string;
  images: string[];
  tags: {
    taste: string;
    ambience: string;
    service: string;
  };
  location: string;
  date: string;
  author: string;
  avatar: string;
  category: string; // The category of the shop, e.g. "手工烘焙", "火锅", "甜点"
  likes: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  requirement: string;
  isUnlocked: boolean;
  iconName: string;
}
