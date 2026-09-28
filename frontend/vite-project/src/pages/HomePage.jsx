import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-medium text-ink">Welcome back</h1>
            <p className="mt-2 text-sm text-ink-soft">Here's what's happening with your account.</p>
          </div>
          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-dark hover:text-white"
          >
            Browse products
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Link to="/products" className="rounded-xl border border-line bg-surface p-6 transition hover:border-primary/40">
            <h3 className="font-display text-lg text-ink">Shop products</h3>
            <p className="mt-2 text-sm text-ink-soft">Browse the full catalog and find something new.</p>
          </Link>
          <Link to="/wishlist" className="rounded-xl border border-line bg-surface p-6 transition hover:border-primary/40">
            <h3 className="font-display text-lg text-ink">My wishlist</h3>
            <p className="mt-2 text-sm text-ink-soft">Revisit the products you've saved for later.</p>
          </Link>
          <div className="rounded-xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg text-ink">Account verified</h3>
            <p className="mt-2 text-sm text-ink-soft">Your session is authenticated and active.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;