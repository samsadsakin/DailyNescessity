
"use client";

import { useMemo, useState } from "react";

const categories = [
  { name: "All Products", icon: "✦" },
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Home & Living", icon: "🛋️" },
  { name: "Vehicles", icon: "🚲" },
  { name: "Sports", icon: "⚽" },
  { name: "Books", icon: "📚" },
];

const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    category: "Electronics",
    price: 85000,
    oldPrice: 95000,
    condition: "Used",
    location: "Dhanmondi, Dhaka",
    seller: "Tech House",
    rating: "4.9",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    title: "Premium Sneakers",
    category: "Fashion",
    price: 3200,
    oldPrice: 4200,
    condition: "New",
    location: "Mirpur, Dhaka",
    seller: "Style Corner",
    rating: "4.8",
    badge: "Deal",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    title: "Modern Lounge Chair",
    category: "Home & Living",
    price: 7800,
    oldPrice: null,
    condition: "New",
    location: "Uttara, Dhaka",
    seller: "Urban Living",
    rating: "4.7",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    title: "Wireless Headphones",
    category: "Electronics",
    price: 4500,
    oldPrice: 5500,
    condition: "New",
    location: "Bashundhara, Dhaka",
    seller: "Gadget Point",
    rating: "4.9",
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    title: "Classic Wristwatch",
    category: "Fashion",
    price: 2600,
    oldPrice: null,
    condition: "New",
    location: "Banani, Dhaka",
    seller: "Time Gallery",
    rating: "4.6",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    title: "Minimal Study Desk",
    category: "Home & Living",
    price: 6500,
    oldPrice: 7500,
    condition: "Used",
    location: "Mohammadpur, Dhaka",
    seller: "Home Finds",
    rating: "4.8",
    badge: "Value pick",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    title: "Everyday Backpack",
    category: "Fashion",
    price: 1850,
    oldPrice: null,
    condition: "New",
    location: "Farmgate, Dhaka",
    seller: "Daily Goods",
    rating: "4.7",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 8,
    title: "Road Bicycle",
    category: "Vehicles",
    price: 12500,
    oldPrice: 15000,
    condition: "Used",
    location: "Mirpur, Dhaka",
    seller: "Cycle Hub",
    rating: "4.8",
    badge: "Great deal",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=700&q=85",
  },
];

const money = (value) =>
  "৳" + value.toLocaleString("en-US");

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All Products");
  const [condition, setCondition] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        `${product.title} ${product.category} ${product.seller} ${product.location}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesCondition =
        condition === "All" || product.condition === condition;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition
      );
    });
  }, [search, activeCategory, condition]);

  async function shareProduct(product) {
    const url =
      `${window.location.origin}/product/${product.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `${product.title} — ${money(product.price)}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setNotice("Product link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setNotice("Could not share. Please try again.");
      }
    }
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] text-slate-900">
      {/* Announcement */}
      <div className="bg-emerald-950 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Sell smarter, share faster.{" "}
        <span className="text-emerald-300">
          Your marketplace, everywhere.
        </span>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white">
              s
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              share<span className="text-emerald-600">sell</span>
              <span className="text-emerald-600">.</span>
            </span>
          </a>

          <div className="relative hidden flex-1 md:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
              ⌕
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands and shops..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
            />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
            <button
              onClick={() =>
                setNotice(
                  `You have ${wishlist.length} saved products.`
                )
              }
              className="relative hidden text-sm font-semibold text-slate-600 hover:text-emerald-700 sm:block"
            >
              ♡ Wishlist
              {wishlist.length > 0 && (
                <span className="ml-1 rounded-full bg-emerald-100 px-1.5 text-xs text-emerald-700">
                  {wishlist.length}
                </span>
              )}
            </button>
            <a
              href="/login"
              className="hidden rounded-xl px-3 py-2 text-sm font-bold hover:bg-slate-100 sm:block"
            >
              Log in
            </a>
            <a
              href="/sell"
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700"
            >
              + Sell
            </a>
          </div>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#073f32]">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-100 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              A smarter way to buy & sell
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Upload once.
              <br />
              <span className="text-emerald-300">
                Share everywhere.
              </span>
              <br />
              Sell anywhere.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-emerald-50/75 sm:text-lg">
              Your products deserve more visibility. Create
              your free shop, share a single link and connect
              directly with buyers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/sell"
                className="rounded-2xl bg-emerald-400 px-6 py-4 font-extrabold text-emerald-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Start Selling <span className="ml-2">↗</span>
              </a>
              <a
                href="#products"
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/15"
              >
                Explore Products →
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-emerald-50/80">
              <span>✓ Free to get started</span>
              <span>✓ Direct buyer contact</span>
              <span>✓ Easy product sharing</span>
            </div>
          </div>

          {/* Hero showcase */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-2 top-6 z-10 rounded-2xl bg-white px-4 py-3 shadow-2xl sm:-right-5">
              <p className="text-xs text-slate-500">
                Your product link
              </p>
              <p className="mt-1 text-sm font-bold text-emerald-700">
                ↗ Ready to share
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white p-3 shadow-2xl shadow-black/20">
              <img
                src={products[0].image}
                alt="Featured smartphone"
                className="h-64 w-full rounded-[1.5rem] object-cover sm:h-80"
              />
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-extrabold text-slate-900">
                    {products[0].title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    📍 {products[0].location}
                  </p>
                  <p className="mt-3 text-2xl font-black text-emerald-700">
                    {money(products[0].price)}
                  </p>
                </div>
                <button
                  onClick={() => shareProduct(products[0])}
                  className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  ↗ Share
                </button>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-2 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-5">
              <p className="text-xs text-slate-500">
                One listing
              </p>
              <p className="font-extrabold text-slate-900">
                Multiple possibilities ✨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Explore
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Shop by category
            </h2>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">
            Find something you love
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => {
            const active = activeCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/15"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product listings */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              The marketplace
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Discover great finds
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Unique products from sellers around you.
            </p>
          </div>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-500 sm:w-44"
          >
            <option value="All">All conditions</option>
            <option value="New">Brand new</option>
            <option value="Used">Pre-owned</option>
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between text-sm">
          <p className="text-slate-500">
            <span className="font-bold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products found
          </p>
          <span className="font-semibold text-emerald-700">
            Explore & share ↗
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-slate-200/60 sm:rounded-3xl"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <a href={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
                  />
                </a>

                {product.badge && (
                  <span className="absolute left-2 top-2 rounded-lg bg-white/95 px-2 py-1 text-[10px] font-extrabold text-emerald-800 shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-lg shadow-sm transition hover:scale-110 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
                >
                  <span
                    className={
                      wishlist.includes(product.id)
                        ? "text-rose-500"
                        : "text-slate-500"
                    }
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </span>
                </button>

                <span className="absolute bottom-2 left-2 rounded-md bg-slate-950/75 px-2 py-1 text-[10px] font-semibold text-white sm:bottom-3 sm:left-3 sm:text-xs">
                  {product.condition}
                </span>
              </div>

              <div className="p-3 sm:p-4">
                <a
                  href={`/product/${product.id}`}
                  className="block truncate text-sm font-extrabold transition hover:text-emerald-700 sm:text-base"
                >
                  {product.title}
                </a>

                <p className="mt-2 text-lg font-black text-emerald-700 sm:text-xl">
                  {money(product.price)}
                </p>

                {product.oldPrice && (
                  <p className="mt-0.5 text-xs text-slate-400">
                    <span className="line-through">
                      {money(product.oldPrice)}
                    </span>
                    <span className="ml-2 font-bold text-rose-500">
                      {Math.round(
                        (1 - product.price / product.oldPrice) * 100
                      )}% off
                    </span>
                  </p>
                )}

                <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                  <p className="truncate text-xs text-slate-500">
                    📍 {product.location}
                  </p>
                  <p className="truncate text-xs font-semibold text-slate-700">
                    🏪 {product.seller}
                    <span className="ml-1 text-amber-500">
                      ★ {product.rating}
                    </span>
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                  <a
                    href={`/product/${product.id}`}
                    className="flex items-center justify-center rounded-xl bg-emerald-50 px-2 py-2.5 text-xs font-extrabold text-emerald-800 transition hover:bg-emerald-100 sm:text-sm"
                  >
                    View Product
                  </a>
                  <button
                    onClick={() => shareProduct(product)}
                    aria-label={`Share ${product.title}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-4xl">🔎</p>
            <h3 className="mt-4 text-lg font-extrabold">
              No products found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search or choose a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Products");
                setCondition("All");
              }}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Seller CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#e2f4e9] px-6 py-10 sm:px-12 sm:py-14">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-2xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-800">
                FOR SELLERS & SMALL BUSINESSES
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Your own shop.
                <br />
                <span className="text-emerald-700">
                  Your rules. Your reach.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Create your mini store, showcase your products
                and let customers find you wherever you share
                your link.
              </p>
            </div>

            <a
              href="/sell"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-7 py-4 font-extrabold text-white shadow-xl transition hover:-translate-y-1 hover:bg-emerald-800"
            >
              Create Your Store <span>↗</span>
            </a>
          </div>

          <div className="relative mt-10 grid grid-cols-1 gap-3 border-t border-emerald-900/10 pt-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-2xl">🔗</p>
              <p className="mt-2 font-extrabold">One product link</p>
              <p className="mt-1 text-sm text-slate-500">
                Share it across your social platforms.
              </p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-2xl">🏪</p>
              <p className="mt-2 font-extrabold">Your mini store</p>
              <p className="mt-1 text-sm text-slate-500">
                Give your products a home online.
              </p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-2xl">🤝</p>
              <p className="mt-2 font-extrabold">Direct connection</p>
              <p className="mt-1 text-sm text-slate-500">
                Connect with buyers on your terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <a href="/" className="text-xl font-black">
              share<span className="text-emerald-600">sell.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
              Discover products, connect with sellers and
              share great finds with everyone.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold">Marketplace</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <a className="block hover:text-emerald-700" href="#products">
                Browse products
              </a>
              <a className="block hover:text-emerald-700" href="/sell">
                Start selling
              </a>
              <a className="block hover:text-emerald-700" href="/shops">
                Explore shops
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold">Help & Support</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <a className="block hover:text-emerald-700" href="/help">
                Help center
              </a>
              <a className="block hover:text-emerald-700" href="/safety">
                Safety tips
              </a>
              <a className="block hover:text-emerald-700" href="/contact">
                Contact us
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold">Our promise</h3>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Upload once. Share everywhere. Sell anywhere.
            </p>
            <p className="mt-3 text-sm font-bold text-emerald-700">
              Made for a connected marketplace ↗
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 px-5 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} sharesell. All rights reserved.
        </div>
      </footer>

      {/* Toast notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-4 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-2xl"
        >
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            className="text-lg text-slate-300 hover:text-white"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
