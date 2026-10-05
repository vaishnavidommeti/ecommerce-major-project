import { useEffect, useState } from "react";
import { useNavigate , useLocation}
from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";
import "./App.css";
import Checkout from "./checkout";

const products = [
  { id: 1, name: "Floral Summer Dress", price: 1299, category: "Women", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Classic White Top", price: 799, category: "Women", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Blue Denim Jeans", price: 1499, category: "Women", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Elegant Handbag", price: 999, category: "Women", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Satin Party Dress", price: 1799, category: "Women", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Oversized Graphic T-Shirt", price: 699, category: "Men",image: "https://images.unsplash.com/photo-1775817104298-522393e1d72b?auto=format&fit=crop&fm=jpg&q=80&w=1000" },
  { id: 7, name: "Beige Casual Shirt", price: 999, category: "Men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Black Long Sleeve Top", price: 599, category: "Women", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80" },
  { id: 9, name: "Wide Leg Trousers", price: 1299, category: "Women", image: "https://levi.in/cdn/shop/files/005KD0000_01_Styleshot.jpg?v=1758606534" },
  { id: 10, name: "Denim Jacket", price: 1899, category: "Men",image: "https://www.jcrew.com/s7-img-facade/AW273_DM5974?crop=0%2C0%2C128%2C0&hei=160" },
  { id: 11, name: "brown thick sweater", price: 1099, category: "Women", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" },
  { id: 12, name: "Ribbed Knit Sweater", price: 1399, category: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" },
  { id: 13, name: "Classic Black Blazer", price: 2199, category: "Men", image: "https://image.hm.com/assets/hm/d0/65/d065f4ef3e19da128b3b22d798785a3a1e1c036a.jpg"},
  { id: 14, name: "Pleated Mini Skirt", price: 899, category: "Women", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/448740/item/goods_00_448740_3x4.jpg" },
  { id: 15, name: "Casual Hoodie", price: 1199, category: "Men", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80" },
  { id: 16, name: "Leather Crossbody Bag", price: 1499, category: "Home",image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80" },
  { id: 17, name: "Mini Shoulder Bag", price: 899, category: "Women", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80" },
  { id: 18, name: "White Sneakers", price: 1999, category: "Men", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"},
  { id: 19, name: "Classic Sunglasses", price: 799, category: "Men", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80" },
  { id: 20, name: "Minimal Watch", price: 1299, category: "Men", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80" },
  { id: 21, name: "white and blue stone earrnings", price: 499, category: "Women", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80" },
  { id: 22, name: "golden hoops", price: 699, category: "Women", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80" },
  { id: 23, name: "unique design pointed heels ", price: 899, category: "Women", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80" },
  { id: 24, name: "Casual Backpack", price: 1199, category: "Home", image: "https://hygge.com.ar/cdn/shop/files/H2250Vm1200_2.jpg?v=1740491643&width=1200" }
];

const categories = [
  "All",
  "Women",
  "Men",
  "Home",
  "Dresses",
  "Tops",
  "Shirts",
  "Jeans",
  "Footwear",
  "Bags",
  "Jewellery",
  "Accessories",
  "Home Decor",
];

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("slavieWishlist") || "[]");
    } catch {
      return [];
    }
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("slavieWishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCategoryPage, setSelectedCategoryPage] = useState(null);
  const catalogProducts = selectedCategoryPage
    ? products.filter((product) => product.category === selectedCategoryPage)
    : activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const filteredProducts = catalogProducts.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      product.name.toLowerCase().includes(query) ||
      (product.category || "").toLowerCase().includes(query)
    );
  });

  const popularSearches = ["Women", "Men", "Dresses", "Bags", "Shoes", "Home"];

  const handleSearchSelect = (product) => {
    setSelectedProduct(product);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const toggleWishlist = (product) => {
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((current) => current.filter((item) => item.id !== productId));
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((current) => current.filter((_, i) => i !== index));
  };

  if (selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onCartOpen={() => { setSelectedProduct(null); setCartOpen(true); }}
      />
    );
  }

  if (selectedCategoryPage) {
    return (
      <div className="slavie">
        <div className="announcement">FREE SHIPPING ON ORDERS ABOVE ₹999</div>

        <header className="header">
          <div className="header-inner">
            <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>

            <div className="logo">SLAVIE</div>

            <nav className={`navigation ${menuOpen ? "open" : ""}`}>
              <a href="#women" onClick={() => { setMenuOpen(false); setSelectedCategoryPage("Women"); }}>WOMEN</a>
              <a href="#men" onClick={() => { setMenuOpen(false); setSelectedCategoryPage("Men"); }}>MEN</a>
              <a href="#home" onClick={() => { setMenuOpen(false); setSelectedCategoryPage("Home"); }}>HOME</a>
              <a href="#new" onClick={() => { setMenuOpen(false); setSelectedCategoryPage(null); setActiveCategory("All"); }}>NEW IN</a>
            </nav>

            <div className="header-actions">
              <button onClick={() => setSearchOpen(!searchOpen)}><Search size={21} /></button>
              <button onClick={() => navigate("/account")}><User size={21} /></button>
              <button onClick={() => setWishlistOpen(true)}><Heart size={21} />{wishlist.length > 0 && <span className="cart-count">{wishlist.length}</span>}</button>
              <button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={21} />{cart.length > 0 && <span className="cart-count">{cart.length}</span>}</button>
            </div>
          </div>
        </header>

        <section className="category-page-hero">
          <div className="category-page-copy">
            <p>CURATED COLLECTION</p>
            <h1>{selectedCategoryPage}</h1>
            <span>{selectedCategoryPage === "Women" ? "Soft tailoring, elevated basics, and statement pieces for everyday rituals." : selectedCategoryPage === "Men" ? "Clean silhouettes and modern essentials made to move with you." : "Thoughtful pieces that bring warmth, texture, and lived-in ease home."}</span>
            <div className="hero-buttons">
              <button onClick={() => setSelectedCategoryPage(null)}>
                BACK TO ALL <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <section className="products-section" id={selectedCategoryPage.toLowerCase()}>
          <div className="section-heading row-heading">
            <div>
              <p>{selectedCategoryPage.toUpperCase()}</p>
              <h2>{selectedCategoryPage} EDIT</h2>
            </div>
            <button className="view-all" onClick={() => { setSelectedCategoryPage(null); setActiveCategory("All"); }}>
              VIEW ALL <ChevronRight size={17} />
            </button>
          </div>

          <div className="product-grid">
            {catalogProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
                onAdd={() => addToCart(product)}
                onToggleWishlist={() => toggleWishlist(product)}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
    <div className="slavie">
      {cartOpen && (
  <div className="cart-panel">
    <button onClick={() => setCartOpen(false)}>✕</button>

    <h2>Your Bag</h2>

    {cart.length === 0 ? (
      <p>Your bag is empty.</p>
    ) : (
      <>
        {cart.map((item, index) => (
          <div className="cart-item" key={`${item.id}-${index}`}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <strong>{item.name}</strong>
              <p>{formatPrice(item.price)}</p>
              <button onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <h3>
          Total:{" "}
          {formatPrice(
            cart.reduce((sum, item) => sum + item.price, 0)
          )}
        </h3>
        <button
  className="checkout-btn"
  onClick={() => {
    setCartOpen(false);
    navigate("/checkout", {state: {cart}});   
  }}
>
  CHECKOUT
</button>
      </>
    )}
  </div>
)}
 
  

 
    </div>

      {wishlistOpen && (
        <div className="cart-panel wishlist-panel">
          <button onClick={() => setWishlistOpen(false)}>✕</button>

          <h2>Your Wishlist</h2>

          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <>
              {wishlist.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <p>{formatPrice(item.price)}</p>
                    <div className="wishlist-actions">
                      <button onClick={() => { addToCart(item); setWishlistOpen(false); }}>
                        Add to bag
                      </button>
                      <button onClick={() => removeFromWishlist(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

  {/* Announcement */}
  <div className="announcement">
      {/* Announcement */}
      <div className="announcement">
        FREE SHIPPING ON ORDERS ABOVE ₹999
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <div className="logo">SLAVIE</div>

          <nav className={`navigation ${menuOpen ? "open" : ""}`}>
            <a href="#women" onClick={() => setMenuOpen(false)}>
              WOMEN
            </a>
            <a href="#men" onClick={() => setMenuOpen(false)}>
              MEN
            </a>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              HOME
            </a>
            <a href="#new" onClick={() => setMenuOpen(false)}>
              NEW IN
            </a>
            <a href="#sale" onClick={() => setMenuOpen(false)}>
              SALE
            </a>
          </nav>

          <div className="header-actions">
           

  <button onClick={() => setSearchOpen(!searchOpen)}>
    <Search size={21} />
  </button>

  <button onClick={() => navigate("/account")}>
    <User size={21} />
  </button>

  <button onClick={() => setWishlistOpen(true)}>
    <Heart size={21} />

    {wishlist.length > 0 && (
      <span className="cart-count">
        {wishlist.length}
      </span>
    )}
  </button>

  <button 
    className="cart-button"
    onClick={() => setCartOpen(true)}
  >
    <ShoppingBag size={21} />

    {cart.length > 0 && (
      <span className="cart-count">
        {cart.length}
      </span>
    )}
    </button>

    </div>
    </div>
      </header>
      {searchOpen && (
  <div className="search-panel">
    <div className="search-box">
      <Search size={20} />

      <input
        autoFocus
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search dresses, shirts, bags, home..."
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setSearchOpen(false);
            setSearchQuery("");
          }
        }}
      />

      <button onClick={() => {
        setSearchOpen(false);
        setSearchQuery("");
      }}>
        <X size={20} />
      </button>
    </div>

    <div className="search-results">
      {!searchQuery.trim() ? (
        <>
          <div className="search-suggestions-header">
            <span>Popular searches</span>
          </div>
          <div className="search-suggestions">
            {popularSearches.map((term) => (
              <button
                key={term}
                className="suggestion-chip"
                onClick={() => {
                  setSearchQuery(term);
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </>
      ) : filteredProducts.length === 0 ? (
        <p>No products found for “{searchQuery}”.</p>
      ) : (
        filteredProducts.slice(0, 6).map((product) => (
          <div
            className="search-result"
            key={product.id}
            onClick={() => handleSearchSelect(product)}
          >
            <img src={product.image} alt={product.name} />

            <div>
              <strong>{product.name}</strong>
              <span>{formatPrice(product.price)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}
      {/* Hero */}
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85"
          alt="SLAVIE fashion"
        />

        <div className="hero-overlay">
          <p>THE NEW COLLECTION</p>
          <h1>EVERYDAY,<br />ELEVATED.</h1>
          <span>Modern essentials for every part of your life.</span>

          <div className="hero-buttons">
            <button onClick={() => setSelectedCategoryPage("Women")}>
              SHOP WOMEN
              <ArrowRight size={17} />
            </button>

            <button onClick={() => setSelectedCategoryPage("Men")}>
              SHOP MEN
              <ArrowRight size={17} />
            </button>

            <button onClick={() => setSelectedCategoryPage("Home")}>
              SHOP HOME
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="category-strip">
        <div className="section-heading">
          <p>EXPLORE SLAVIE</p>
          <h2>SHOP BY CATEGORY</h2>
        </div>

        <div className="category-scroll">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                if (category === "All") {
                  setSelectedCategoryPage(null);
                  setActiveCategory("All");
                  return;
                }

                setActiveCategory(category);
                setSelectedCategoryPage(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="products-section" id="new">
        <div className="section-heading row-heading">
          <div>
            <p>CURATED FOR YOU</p>
            <h2>NEW ARRIVALS</h2>
          </div>

          <button className="view-all">
            VIEW ALL <ChevronRight size={17} />
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
              onAdd={() => addToCart(product)}
              onToggleWishlist={() => toggleWishlist(product)}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* Women */}
      <section className="editorial" id="women">
        <div className="editorial-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
            alt="Women's collection"
          />
        </div>

        <div className="editorial-content">
          <p>SLAVIE WOMEN</p>
          <h2>STYLE THAT<br />FEELS LIKE YOU.</h2>
          <span>
            From everyday essentials to statement pieces,
            discover a collection designed for modern women.
          </span>
          <button onClick={() => setSelectedCategoryPage("Women")}>EXPLORE WOMEN <ArrowRight size={17} /></button>
        </div>
      </section>

      {/* Men */}
      <section className="editorial reverse" id="men">
        <div className="editorial-image">
          <img
            src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85"
            alt="Men's collection"
          />
        </div>

        <div className="editorial-content">
          <p>SLAVIE MEN</p>
          <h2>BUILT FOR<br />EVERYDAY.</h2>
          <span>
            Clean silhouettes, timeless colours and everyday
            essentials for the modern man.
          </span>
          <button onClick={() => setSelectedCategoryPage("Men")}>EXPLORE MEN <ArrowRight size={17} /></button>
        </div>
      </section>

      {/* Home */}
      <section className="home-banner" id="home">
        <div>
          <p>SLAVIE HOME</p>
          <h2>MAKE SPACE<br />FEEL LIKE HOME.</h2>
          <button onClick={() => setSelectedCategoryPage("Home")}>SHOP HOME <ArrowRight size={17} /></button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <p>STAY IN THE LOOP</p>
        <h2>Be the first to know.</h2>
        <span>New drops, exclusive offers and more.</span>

        <div className="newsletter-form">
          <input placeholder="Enter your email address" />
          <button>SUBSCRIBE</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <div className="logo">SLAVIE</div>
          <p>
            Modern fashion and home essentials,
            thoughtfully curated for everyday living.
          </p>
        </div>

        <div className="footer-column">
          <h4>SHOP</h4>
          <a>Women</a>
          <a>Men</a>
          <a>Home</a>
          <a>New Arrivals</a>
          <a>Sale</a>
        </div>

        <div className="footer-column">
          <h4>HELP</h4>
          <a>Contact Us</a>
          <a>Shipping</a>
          <a>Returns</a>
          <a>Track Order</a>
          <a>FAQs</a>
        </div>

        <div className="footer-column">
          <h4>SLAVIE</h4>
          <a>About Us</a>
          <a>Privacy Policy</a>
          <a>Terms</a>
          <a>Careers</a>
        </div>
      </footer>

      {/* Cart Preview */}
      {cart.length > 0 && (
        <div className="cart-preview">
          <div>
            <strong>{cart.length} item(s)</strong>
            <span>
              Total:{" "}
              {formatPrice(cart.reduce((sum, item) => sum + item.price, 0))}
            </span>
          </div>

          <button
            onClick={() => setCartOpen(true)}
              
          >
            VIEW CART
          </button>
        </div>
      )}
    </div>
    </>
  );
}

function ProductCard({ product, onClick, onAdd, onToggleWishlist, isWishlisted }) {
  return (
    <div
      className="product-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />

        <button
          type="button"
          className={`overlay-heart ${isWishlisted ? "wishlisted" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleWishlist?.();
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.8} />
        </button>

        <div className="product-overlay">
          <div className="overlay-info">
            <h3>{product.name}</h3>
            <p>{formatPrice(product.price)}</p>

            <button
              type="button"
              className="overlay-cart"
              onClick={(event) => {
                event.stopPropagation();
                onAdd?.();
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


  

  

function ProductPage({ product, onBack, onAddToCart, onCartOpen }) {
  const [pincode, setPincode] = useState('');
  const [deliveryMessage,setDeliveryMessage] = useState("");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  

  return (
    <div className="product-page">
      <header className="header">
        <div className="header-inner">
          <button onClick={onBack} className="back-button">
            ← BACK
          </button>

          <div className="logo">SLAVIE</div>

          <div className="header-actions">
            <button>
              <Search size={21} />
            </button>
            <button>
              <Heart size={21} />
            </button>
            <button onClick={onCartOpen}>
              <ShoppingBag size={21} />
            </button>
          </div>
        </div>
      </header>

      <main className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-content">
          <p className="detail-category">
            {product.category} / {product.subcategory}
          </p>

          <h1>{product.name}</h1>

          <div className="detail-rating">
            <Star size={17} fill="currentColor" />
            {product.rating} · 128 Reviews
          </div>

          <div className="detail-price">
            <strong>{formatPrice(product.price)}</strong>
            <del>{formatPrice(product.oldPrice)}</del>
            <span>
              {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
            </span>
          </div>

          <p className="tax">MRP incl. all taxes</p>

          <div className="detail-divider" />

          <div className="size-heading">
            <strong>Select Size</strong>
            <span>Size Guide</span>
          </div>

          <div className="sizes">
            {["XS", "S", "M", "L", "XL", "XXL"].map((item) => (
              <button
                key={item}
                className={size === item ? "selected" : ""}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="quantity">
            <strong>Quantity</strong>

            <div>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button
            className="add-main"
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                onAddToCart(product);
              }
            }}
          >
            ADD TO BAG — {formatPrice(product.price * quantity)}
          </button>

          <button className="buy-main">BUY IT NOW</button>

          <div className="delivery-box">
            <strong>🚚 Check delivery</strong>
            <div>
             <input
              placeholder="Enter pincode"
              maxLength="6"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
/>

<button
  onClick={() => {
    if (/^\d{6}$/.test(pincode)) {
      setDeliveryMessage("Delivery available to this pincode");
    } else {
      setDeliveryMessage("Please enter a valid 6-digit pincode");
    }
  }}
>
  CHECK
</button>

{deliveryMessage && <small>{deliveryMessage}</small>}
            </div>
            <small>Free delivery above ₹999</small>
          </div>

          <div className="details-list">
            <details open>
              <summary>Product Details</summary>
              <p>{product.description}</p>
            </details>

            <details>
              <summary>Material & Care</summary>
              <p>Premium material. Machine wash according to care label.</p>
            </details>

            <details>
              <summary>Shipping & Returns</summary>
              <p>
                Estimated delivery in 3–7 business days. Easy returns
                subject to our return policy.
              </p>
            </details>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;