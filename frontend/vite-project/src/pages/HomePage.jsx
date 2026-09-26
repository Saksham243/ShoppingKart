import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <span className="font-display text-xl text-ink">ShopKart</span>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/home" className="rounded-md px-3.5 py-2 text-sm font-semibold text-primary bg-primary-soft">
              Home
            </Link>
            <Link to="/products" className="rounded-md px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:text-ink">
              Products
            </Link>
          </nav>

          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-danger/40 hover:bg-danger-soft hover:text-danger"
          >
            Logout
          </button>
        </div>
        <div className="flex md:hidden items-center gap-1 border-t border-line px-6 py-2">
          <Link to="/home" className="rounded-md px-3 py-1.5 text-sm font-semibold text-primary bg-primary-soft">Home</Link>
          <Link to="/products" className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-soft">Products</Link>
        </div>
      </header>

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
          <div className="rounded-xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg text-ink">Account verified</h3>
            <p className="mt-2 text-sm text-ink-soft">Your session is authenticated and active.</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg text-ink">Recent activity</h3>
            <p className="mt-2 text-sm text-ink-soft">No recent orders yet — start shopping.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;