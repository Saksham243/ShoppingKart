import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-display text-2xl text-ink">ShopKart</span>
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-ink">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Create account
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
              A market built for finding, not just buying
            </span>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-ink sm:text-6xl">
              Everything you're looking for, in one stall.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Browse a curated catalog, compare prices, and check out in seconds. No clutter, no noise — just the things you came for.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link
                to="/signup"
                className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-dark hover:text-white"
              >
                Start shopping
              </Link>
              <Link to="/login" className="text-sm font-semibold text-primary hover:text-primary-dark">
                I already have an account
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary-soft"></div>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-display text-lg text-ink">Today's picks</span>
                <span className="text-xs text-ink-soft">Updated hourly</span>
              </div>
              <ul className="mt-4 divide-y divide-line">
                {[
                  ["Ceramic pour-over set", "₹1,299"],
                  ["Recycled wool throw", "₹2,450"],
                  ["Brass desk lamp", "₹3,100"],
                ].map(([name, price]) => (
                  <li key={name} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-ink">{name}</span>
                    <span className="font-semibold text-ink">{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landing