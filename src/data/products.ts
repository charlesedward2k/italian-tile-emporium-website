
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Carrara Hexagon Mosaic",
    slug: "carrara-hexagon-mosaic",
    description: "The Carrara Hexagon Mosaic brings timeless Italian elegance to any space. Featuring authentic Carrara marble from the renowned quarries of Tuscany, each hexagon tile is carefully cut and polished to showcase the distinctive gray veining against the luminous white background. This classic mosaic pattern creates a sophisticated statement in bathrooms, kitchens, and feature walls while maintaining the natural variation and beauty that has made Carrara marble a symbol of luxury for centuries. The hexagon shape adds a contemporary geometric interest to this traditional material, making it a versatile choice for both modern and classic interiors.",
    shortDescription: "Authentic Carrara marble hexagon mosaic tiles from Italy's finest quarries.",
    price: 24.99,
    compareAtPrice: 29.99,
    category: "Mosaic",
    tags: ["marble", "hexagon", "bathroom", "kitchen", "wall"],
    colors: ["white", "gray"],
    style: "Classic",
    material: "Marble",
    dimensions: "2\" hexagon",
    coverage: "1 sq ft per sheet",
    images: [
      {
        id: "carrara-hex-1",
        url: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0",
        alt: "Carrara hexagon mosaic tile",
        main: true
      },
      {
        id: "carrara-hex-2",
        url: "https://images.unsplash.com/photo-1576997066539-5e9ca79773c2",
        alt: "Carrara hexagon mosaic tile installed in bathroom",
        main: false
      },
      {
        id: "carrara-hex-3",
        url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        alt: "Close up of Carrara hexagon mosaic",
        main: false
      }
    ],
    variants: [
      {
        id: "ch-1",
        name: "Standard",
        price: 24.99,
        size: "12\" × 12\" Sheet",
        inStock: true,
        sku: "CRHEX-STD"
      },
      {
        id: "ch-2",
        name: "Large",
        price: 29.99,
        size: "3\" hexagon, 12\" × 12\" Sheet",
        inStock: true,
        sku: "CRHEX-LRG"
      }
    ],
    featured: true,
    bestseller: true,
    ratings: 4.8,
    reviews: [
      {
        id: "rev-ch-1",
        userName: "Marco B.",
        rating: 5,
        comment: "Absolutely beautiful tiles! They look even better installed than in the photos.",
        date: "2023-11-15"
      },
      {
        id: "rev-ch-2",
        userName: "Sophia L.",
        rating: 4,
        comment: "Great quality marble. The veining is subtle and elegant.",
        date: "2023-10-22"
      }
    ],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-12-01T14:30:00Z"
  },
  {
    id: "2",
    name: "Tuscan Terracotta Floor Tile",
    slug: "tuscan-terracotta-floor-tile",
    description: "These authentic Tuscan Terracotta floor tiles are handcrafted by artisans in the hills outside Florence using traditional methods passed down through generations. Each tile exhibits the warm, earthy tones and subtle variations that only genuine Italian terracotta can provide. The natural clay is carefully selected, formed, and kiln-fired to create durable tiles with outstanding thermal properties—keeping spaces cool in summer and warm in winter. These rustic yet elegant tiles bring the authentic character and timeless appeal of Italian countryside homes to any space, developing a beautiful patina over time that enhances their natural charm and storytelling quality.",
    shortDescription: "Hand-crafted authentic terracotta tiles from Tuscany with natural variation.",
    price: 18.50,
    category: "Floor Tile",
    tags: ["terracotta", "floor", "rustic", "kitchen", "outdoor"],
    colors: ["terracotta", "orange", "brown"],
    style: "Rustic",
    material: "Terracotta",
    dimensions: "12\" × 12\" square",
    coverage: "1 sq ft per tile",
    images: [
      {
        id: "terracotta-1",
        url: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
        alt: "Tuscan terracotta floor tiles",
        main: true
      },
      {
        id: "terracotta-2",
        url: "https://images.unsplash.com/photo-1581430872221-d1cfed785922",
        alt: "Terracotta floor in rustic kitchen",
        main: false
      },
      {
        id: "terracotta-3",
        url: "https://images.unsplash.com/photo-1558861823-9f7d52ed8ecc",
        alt: "Close up of terracotta tile texture",
        main: false
      }
    ],
    variants: [
      {
        id: "tt-1",
        name: "Standard Square",
        price: 18.50,
        size: "12\" × 12\"",
        inStock: true,
        sku: "TTER-12"
      },
      {
        id: "tt-2",
        name: "Rectangle",
        price: 22.50,
        size: "12\" × 24\"",
        inStock: true,
        sku: "TTER-1224"
      },
      {
        id: "tt-3",
        name: "Hexagon",
        price: 24.99,
        size: "8\" hexagon",
        inStock: false,
        sku: "TTER-HEX"
      }
    ],
    featured: true,
    bestseller: false,
    ratings: 4.9,
    reviews: [
      {
        id: "rev-tt-1",
        userName: "Giovanni T.",
        rating: 5,
        comment: "These tiles transformed my home. Authentic Italian feeling underfoot!",
        date: "2023-08-10"
      },
      {
        id: "rev-tt-2",
        userName: "Emma R.",
        rating: 5,
        comment: "Beautiful natural color variation. Exactly what I wanted for my Tuscan-style kitchen.",
        date: "2023-07-15"
      },
      {
        id: "rev-tt-3",
        userName: "Robert M.",
        rating: 4,
        comment: "Excellent quality, but do remember these need sealing before use.",
        date: "2023-05-22"
      }
    ],
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-11-20T11:45:00Z"
  },
  {
    id: "3",
    name: "Azzurro Glass Subway Tile",
    slug: "azzurro-glass-subway-tile",
    description: "Our Azzurro Glass Subway Tiles capture the mesmerizing blue hues of the Mediterranean Sea, bringing a vibrant yet elegant splash of color to any space. Crafted in Venice, where glass artistry has been perfected over centuries, these tiles feature a subtle rippled surface that catches and reflects light beautifully. The translucent quality creates depth and dimension, with the color appearing to shift slightly depending on lighting conditions and viewing angle. Perfect for creating statement backsplashes, shower walls, or feature areas, these easy-to-clean tiles add a refreshing touch of Italian coastal inspiration to contemporary interiors.",
    shortDescription: "Vibrant blue glass subway tiles handcrafted by Venetian artisans.",
    price: 32.99,
    category: "Wall Tile",
    tags: ["glass", "subway", "backsplash", "bathroom", "kitchen", "blue"],
    colors: ["blue"],
    style: "Contemporary",
    material: "Glass",
    dimensions: "3\" × 6\" rectangle",
    coverage: "8 tiles per sq ft",
    images: [
      {
        id: "azzurro-1",
        url: "https://images.unsplash.com/photo-1551516594-56cb78394645",
        alt: "Azzurro blue glass subway tiles",
        main: true
      },
      {
        id: "azzurro-2",
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        alt: "Kitchen backsplash with blue glass tiles",
        main: false
      },
      {
        id: "azzurro-3",
        url: "https://images.unsplash.com/photo-1620626011409-49599f1ecb24",
        alt: "Detail of Azzurro glass tile surface",
        main: false
      }
    ],
    variants: [
      {
        id: "az-1",
        name: "Glossy",
        price: 32.99,
        size: "3\" × 6\"",
        inStock: true,
        sku: "AZZ-GLOS"
      },
      {
        id: "az-2",
        name: "Matte",
        price: 34.99,
        size: "3\" × 6\"",
        inStock: true,
        sku: "AZZ-MATT"
      }
    ],
    featured: false,
    bestseller: true,
    ratings: 4.7,
    reviews: [
      {
        id: "rev-az-1",
        userName: "Lucia C.",
        rating: 5,
        comment: "The color is absolutely stunning! Perfect for my coastal-themed bathroom.",
        date: "2023-09-05"
      },
      {
        id: "rev-az-2",
        userName: "David W.",
        rating: 4,
        comment: "Beautiful tiles, though a bit challenging to cut. Hire a professional installer.",
        date: "2023-07-28"
      }
    ],
    createdAt: "2023-03-20T14:25:00Z",
    updatedAt: "2023-10-15T09:10:00Z"
  },
  {
    id: "4",
    name: "Nero Marquina Marble Tile",
    slug: "nero-marquina-marble-tile",
    description: "The Nero Marquina Marble Tile exemplifies sophisticated luxury with its striking black background and distinctive white veining. Sourced from select quarries in northern Italy, each tile displays unique characteristics that showcase nature's artistry. The high-contrast elegance of these polished marble tiles creates a dramatic statement in any setting—from upscale bathroom floors and walls to kitchen countertops and accent features. The dense, premium-grade marble has been carefully selected for consistency of color and pattern, then precision-cut and polished to a luminous finish that highlights the stone's natural beauty and depth.",
    shortDescription: "Luxurious black marble tiles with striking white veining from northern Italy.",
    price: 45.99,
    compareAtPrice: 52.99,
    category: "Marble Tile",
    tags: ["marble", "black", "luxury", "bathroom", "kitchen", "floor", "wall"],
    colors: ["black", "white"],
    style: "Luxury",
    material: "Marble",
    dimensions: "12\" × 24\" rectangle",
    coverage: "2 sq ft per tile",
    images: [
      {
        id: "nero-1",
        url: "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9",
        alt: "Nero Marquina marble tile",
        main: true
      },
      {
        id: "nero-2",
        url: "https://images.unsplash.com/photo-1631727232198-132710b2bdc7",
        alt: "Black marble bathroom with Nero Marquina tiles",
        main: false
      },
      {
        id: "nero-3",
        url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2",
        alt: "Close up of Nero Marquina marble veining",
        main: false
      }
    ],
    variants: [
      {
        id: "nm-1",
        name: "Polished",
        price: 45.99,
        size: "12\" × 24\"",
        inStock: true,
        sku: "NM-POL-1224"
      },
      {
        id: "nm-2",
        name: "Honed",
        price: 45.99,
        size: "12\" × 24\"",
        inStock: true,
        sku: "NM-HON-1224"
      },
      {
        id: "nm-3",
        name: "Polished Square",
        price: 32.99,
        size: "12\" × 12\"",
        inStock: true,
        sku: "NM-POL-1212"
      }
    ],
    featured: true,
    bestseller: false,
    ratings: 4.9,
    reviews: [
      {
        id: "rev-nm-1",
        userName: "Alessandro B.",
        rating: 5,
        comment: "Absolutely spectacular tiles. The veining pattern is dramatic and beautiful.",
        date: "2023-10-15"
      },
      {
        id: "rev-nm-2",
        userName: "Victoria S.",
        rating: 5,
        comment: "Worth every penny. These tiles transformed my bathroom into a luxury spa.",
        date: "2023-09-28"
      },
      {
        id: "rev-nm-3",
        userName: "James L.",
        rating: 4,
        comment: "Beautiful quality but be prepared for some variation between tiles.",
        date: "2023-08-12"
      }
    ],
    createdAt: "2023-02-05T16:30:00Z",
    updatedAt: "2023-12-05T10:20:00Z"
  },
  {
    id: "5",
    name: "Sicilian Pattern Ceramic Tile",
    slug: "sicilian-pattern-ceramic-tile",
    description: "Our Sicilian Pattern Ceramic Tiles bring the vibrant artistry and rich cultural heritage of Southern Italy to your home. Each hand-painted tile features intricate geometric and floral designs in a bold, Mediterranean-inspired color palette. Crafted by skilled artisans using traditional techniques passed down through generations, these decorative tiles are perfect for creating statement walls, kitchen backsplashes, stair risers, or feature areas that become the focal point of any room. The durable ceramic base ensures these tiles are practical as well as beautiful, suitable for both indoor and select outdoor applications where you want to add a touch of Italian exuberance.",
    shortDescription: "Hand-painted ceramic tiles with traditional Sicilian patterns and colors.",
    price: 28.50,
    category: "Decorative Tile",
    tags: ["ceramic", "patterned", "colorful", "decorative", "kitchen", "accent"],
    colors: ["blue", "yellow", "green", "orange"],
    style: "Traditional",
    material: "Ceramic",
    dimensions: "8\" × 8\" square",
    coverage: "0.44 sq ft per tile",
    images: [
      {
        id: "sicilian-1",
        url: "https://images.unsplash.com/photo-1620641622252-68be046b9c71",
        alt: "Hand-painted Sicilian pattern tiles",
        main: true
      },
      {
        id: "sicilian-2",
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f36",
        alt: "Sicilian tiles installed as kitchen backsplash",
        main: false
      },
      {
        id: "sicilian-3",
        url: "https://images.unsplash.com/photo-1580493113011-ad79848bd49a",
        alt: "Close up of Sicilian tile pattern detail",
        main: false
      }
    ],
    variants: [
      {
        id: "sic-1",
        name: "Palermo Blue",
        price: 28.50,
        size: "8\" × 8\"",
        inStock: true,
        sku: "SIC-BLUE-8"
      },
      {
        id: "sic-2",
        name: "Catania Gold",
        price: 28.50,
        size: "8\" × 8\"",
        inStock: true,
        sku: "SIC-GOLD-8"
      },
      {
        id: "sic-3",
        name: "Taormina Green",
        price: 28.50,
        size: "8\" × 8\"",
        inStock: true,
        sku: "SIC-GREEN-8"
      }
    ],
    featured: false,
    bestseller: true,
    ratings: 4.8,
    reviews: [
      {
        id: "rev-sic-1",
        userName: "Isabella F.",
        rating: 5,
        comment: "These tiles are even more beautiful in person! Each one is truly a work of art.",
        date: "2023-11-02"
      },
      {
        id: "rev-sic-2",
        userName: "Michael P.",
        rating: 5,
        comment: "Used these for my kitchen backsplash and constantly receive compliments.",
        date: "2023-09-18"
      },
      {
        id: "rev-sic-3",
        userName: "Olivia T.",
        rating: 4,
        comment: "Gorgeous tiles, though there is slight variation in the hand-painted patterns.",
        date: "2023-08-05"
      }
    ],
    createdAt: "2023-04-12T11:40:00Z",
    updatedAt: "2023-11-28T15:15:00Z"
  },
  {
    id: "6",
    name: "Travertine Herringbone Mosaic",
    slug: "travertine-herringbone-mosaic",
    description: "The Travertine Herringbone Mosaic combines the timeless natural beauty of Italian travertine with the sophisticated herringbone pattern that has graced fine European homes for centuries. Sourced from historic quarries near Rome, this premium stone features the characteristic tiny cavities and gentle color variations that make travertine so distinctive and sought-after. Each piece is carefully cut and arranged into pre-mounted sheets for easier installation while maintaining the classic interlocking herringbone pattern. The warm beige and cream tones create a neutral yet rich foundation that complements both traditional and contemporary interior styles, making these tiles perfect for bathroom floors, kitchen backsplashes, or feature walls.",
    shortDescription: "Natural travertine stone arranged in elegant herringbone pattern mosaic sheets.",
    price: 22.99,
    category: "Mosaic",
    tags: ["travertine", "herringbone", "natural stone", "bathroom", "kitchen", "wall", "floor"],
    colors: ["beige", "cream"],
    style: "Classic",
    material: "Travertine",
    dimensions: "1\" × 3\" pieces on 12\" × 12\" sheet",
    coverage: "1 sq ft per sheet",
    images: [
      {
        id: "trav-1",
        url: "https://images.unsplash.com/photo-1586765677955-795e3f873029",
        alt: "Travertine herringbone mosaic tile",
        main: true
      },
      {
        id: "trav-2",
        url: "https://images.unsplash.com/photo-1665094542023-6d579f199a4c",
        alt: "Travertine herringbone bathroom floor",
        main: false
      },
      {
        id: "trav-3",
        url: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1",
        alt: "Close up of travertine herringbone pattern",
        main: false
      }
    ],
    variants: [
      {
        id: "trav-1",
        name: "Filled & Honed",
        price: 22.99,
        size: "12\" × 12\" Sheet",
        inStock: true,
        sku: "TRAV-HB-FH"
      },
      {
        id: "trav-2",
        name: "Unfilled & Tumbled",
        price: 24.99,
        size: "12\" × 12\" Sheet",
        inStock: true,
        sku: "TRAV-HB-UT"
      }
    ],
    featured: false,
    bestseller: false,
    ratings: 4.6,
    reviews: [
      {
        id: "rev-trav-1",
        userName: "Antonio C.",
        rating: 5,
        comment: "Beautiful natural stone. The herringbone pattern adds such elegance to my bathroom.",
        date: "2023-10-08"
      },
      {
        id: "rev-trav-2",
        userName: "Laura B.",
        rating: 4,
        comment: "Lovely tiles, though you'll need to seal them well before and after installation.",
        date: "2023-07-30"
      }
    ],
    createdAt: "2023-03-25T09:50:00Z",
    updatedAt: "2023-11-15T13:40:00Z"
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller);
};

export const getRelatedProducts = (currentProduct: Product, limit: number = 3): Product[] => {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || 
       product.tags.some(tag => currentProduct.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  products.forEach(product => {
    categories.add(product.category);
  });
  return Array.from(categories);
};

export const getAllMaterials = (): string[] => {
  const materials = new Set<string>();
  products.forEach(product => {
    materials.add(product.material);
  });
  return Array.from(materials);
};

export const getAllStyles = (): string[] => {
  const styles = new Set<string>();
  products.forEach(product => {
    styles.add(product.style);
  });
  return Array.from(styles);
};

export const getAllColors = (): string[] => {
  const colors = new Set<string>();
  products.forEach(product => {
    product.colors.forEach(color => {
      colors.add(color);
    });
  });
  return Array.from(colors);
};

export const filterProducts = (filters: any): Product[] => {
  return products.filter(product => {
    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    // Filter by colors
    if (filters.colors && filters.colors.length > 0) {
      if (!product.colors.some(color => filters.colors.includes(color))) {
        return false;
      }
    }
    
    // Filter by style
    if (filters.styles && filters.styles.length > 0) {
      if (!filters.styles.includes(product.style)) {
        return false;
      }
    }
    
    // Filter by material
    if (filters.materials && filters.materials.length > 0) {
      if (!filters.materials.includes(product.material)) {
        return false;
      }
    }
    
    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descMatch = product.description.toLowerCase().includes(searchLower);
      const shortDescMatch = product.shortDescription.toLowerCase().includes(searchLower);
      const categoryMatch = product.category.toLowerCase().includes(searchLower);
      const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!(nameMatch || descMatch || shortDescMatch || categoryMatch || tagsMatch)) {
        return false;
      }
    }
    
    return true;
  });
};

export const sortProducts = (products: Product[], sortBy?: string): Product[] => {
  const sortedProducts = [...products];
  
  switch(sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'featured':
      return sortedProducts.sort((a, b) => Number(b.featured) - Number(a.featured));
    case 'bestselling':
      return sortedProducts.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    default:
      return sortedProducts;
  }
};
