import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";

function ProductCard({ product }) {
  const [err, setErr] = useState(null)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const inStock = product.stock > 0;
  const navigate = useNavigate();

  const handleWishlist = async () => {
    if (saving) return

    setSaving(true)

    try {
      const resp = await axiosInstance.post(`/wishlist/${product._id}`)
      setSaved(true)
    } catch (error) {
      setErr("Unable to save product, Please try again")
    } finally {
      setSaving(false)
    }
  }

  let wishlistLabel = "♡ Add to Wishlist"
  if (saving) {
    wishlistLabel = "⏳ Saving..."
  } else if (saved) {
    wishlistLabel = "♥ Added to Wishlist"
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">

      {/* Product Image */}
      <div className="h-56 overflow-hidden bg-primary-soft">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Product Information */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-dark">
            {product.category}
          </span>

          <span
            className={`text-xs font-semibold ${
              inStock ? "text-primary" : "text-danger"
            }`}
          >
            {inStock ? `${product.stock} units left` : "Out of stock"}
          </span>
        </div>

        <h2 className="font-display text-lg text-ink">
          {product.name}
        </h2>

        <p className="mt-2 text-xl font-semibold text-ink">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => {
              navigate(`/products/${product._id}`)
            }}
            className="block w-full rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.99]"
          >
            View Details
          </button>

          <button
            onClick={handleWishlist}
            disabled={saving}
            className={`block w-full rounded-md border px-4 py-2.5 text-center text-sm font-semibold transition ${
              saved
                ? "border-accent/40 bg-accent/10 text-accent-dark"
                : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:text-primary"
            } ${saving ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {wishlistLabel}
          </button>
        </div>

        {err && (
          <p className="mt-2 text-xs font-medium text-danger">
            {err}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;