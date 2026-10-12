
"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "iPhone 15 Pro", price: 85000, category: "Electronics", condition: "Used", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500" },
  { id: 2, name: "Sneakers", price: 2500, category: "Fashion", condition: "New", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 3, name: "Headphones", price: 3500, category: "Electronics", condition: "New", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 4, name: "Study Desk", price: 4500, category: "Home", condition: "Used", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500" },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const share = async (product) => {
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Product link copied!");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-white p-4">
        <a href="/" className="text-xl font-black text-emerald-600">
          ShareSell.
        </a>
        <a href="/sell" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
          + Sell
        </a>
      </header>

      <section className="bg-emerald-950 px-5 py-12 text-white sm:py-16">
        <h1 className="text-3xl font-black sm:text-5xl">
          Upload once.<br />Share everywhere.
        </h1>
        <p className="mt-3 text-sm text-emerald-100 sm:text-base">
          Your products, your shop, your customers.
        </p>
        <a href="/sell" className="mt-6 inline-block rounded-lg bg-emerald-400 px-5 py-3 font-bold text-emerald-950">
          Start Selling →
        </a>
      </section>

      <section className="mx-auto max-w-6xl p-4 sm:p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="mb-6 w-full rounded-xl border bg-white p-3 outline-none focus:border-emerald-500"
        />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Explore Products</h2>
          <span className="text-sm text-gray-500">{filtered.length} items</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-xl border bg-white">
              <a href={`/product/${p.id}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-36 w-full object-cover sm:h-48"
                />
              </a>
              <div className="p-3">
                <h3 className="truncate font-bold">{p.name}</h3>
                <p className="mt-1 font-black text-emerald-700">
                  ৳{p.price.toLocaleString("en-US")}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {p.condition} · {p.category}
                </p>
                <button
                  onClick={() => share(p)}
                  className="mt-3 w-full rounded-lg border border-emerald-600 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50"
                >
                  ↗ Share
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-gray-500">
            No products found.
          </p>
        )}
      </section>

      <footer className="mt-8 bg-white p-6 text-center text-sm text-gray-500">
        Upload once. Share everywhere. Sell anywhere.
      </footer>
    </main>
  );
}
