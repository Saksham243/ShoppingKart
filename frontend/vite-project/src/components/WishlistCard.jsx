import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";

function WishlistCard({ product, onRemove }) {
  const [removing, setRemoving] = useState(false)
  const [err, setErr] = useState(null)
  const inStock = product.stock > 0;
  const navigate = useNavigate();

  const handleRemove = async () => {
    if (removing) return

    setRemoving(true)
    setErr(null)
    try {
      await axiosInstance.delete(`/wishlist/${product._id}`)
      onRemove(product._id)
    } catch (error) {
      setErr("Could not remove, try again")
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface transition hover:border-primary/40 hover:shadow-md">
      <div className="h-56 overflow-hidden bg-primary-soft">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-dark">
            {product.category}
          </span>
          <span className={`text-xs font-semibold ${inStock ? "text-primary" : "text-danger"}`}>
            {inStock ? `${product.stock} units left` : "Out of stock"}
          </span>
        </div>

        <h2 className="font-display text-lg text-ink">{product.name}</h2>
        <p className="mt-2 text-xl font-semibold text-ink">₹{product.price.toLocaleString("en-IN")}</p>

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="block w-full rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            View Details
          </button>

          <button
            onClick={handleRemove}
            disabled={removing}
            className={`block w-full rounded-md border border-danger/30 bg-danger-soft px-4 py-2.5 text-center text-sm font-semibold text-danger transition hover:bg-danger/10 ${
              removing ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {removing ? "Removing..." : "Remove ♥"}
          </button>
        </div>

        {err && (
          <p className="mt-2 text-xs font-medium text-danger">{err}</p>
        )}
      </div>
    </div>
  );
}

export default WishlistCard;