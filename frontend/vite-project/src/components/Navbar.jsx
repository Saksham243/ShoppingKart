import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `rounded-md px-3.5 py-2 text-sm transition ${
    isActive
      ? "bg-primary-soft font-semibold text-primary"
      : "font-medium text-ink-soft hover:text-ink"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm ${
    isActive
      ? "bg-primary-soft font-semibold text-primary"
      : "font-medium text-ink-soft"
  }`;

function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <span className="font-display text-xl text-ink">ShopKart</span>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/home" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/wishlist" className={linkClass}>Wishlist</NavLink>
        </nav>

        <button
          type="button"
          onClick={logout}
          className="rounded-md border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-danger/40 hover:bg-danger-soft hover:text-danger"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center gap-1 border-t border-line px-6 py-2 md:hidden">
        <NavLink to="/home" className={mobileLinkClass}>Home</NavLink>
        <NavLink to="/products" className={mobileLinkClass}>Products</NavLink>
        <NavLink to="/wishlist" className={mobileLinkClass}>Wishlist</NavLink>
      </div>
    </header>
  );
}

export default Navbar;