import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
function ProductCard({ product, initialSaved }) {
  const [err, setErr] = useState(null)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const inStock = product.stock > 0;
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false)
  const [cartErr, setCartErr] = useState(null)
  const { addToCart, cartItems } = useCartContext()

  const cartRow = cartItems.find((item) => item.product?._id === product._id)
  const inCartQty = cartRow ? cartRow.quantity : 0
  const atLimit = inCartQty >= product.stock

  useEffect(() => {
    setSaved(initialSaved)
  }, [initialSaved])


  const handleAddToCart = async () => {
    if (adding) return
    setAdding(true)
    setCartErr(null)
    const success = await addToCart(product._id)
    if (!success) {
      setCartErr("Unable to add to cart, try again")
    }
    setAdding(false)

  }

  const handleWishlist = async () => {
    if (saving) return

    setSaving(true)
    setErr(null)

    try {
      const resp = await axiosInstance.patch(`/wishlist/${product._id}/toggle`)

      setSaved(resp.data.saved)
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
    wishlistLabel = "♥ Remove from Wishlist"
  }

  let cartLabel = "Add to Cart"
  if (adding) {
    cartLabel = "Adding..."
  } else if (atLimit) {
    cartLabel = `Max in cart (${inCartQty})`
  } else if (inCartQty > 0) {
    cartLabel = `Add Another (${inCartQty} in cart)`
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
            className={`text-xs font-semibold ${inStock ? "text-primary" : "text-danger"
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
            onClick={handleAddToCart}
            disabled={adding || !inStock || atLimit}
            className={`block w-full rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white transition active:scale-[0.99] ${!inStock || atLimit
              ? "cursor-not-allowed bg-line text-ink-soft"
              : adding
                ? "cursor-not-allowed bg-primary-dark opacity-80"
                : "bg-primary hover:bg-primary-dark"
              }`}
          >
            {inStock ? cartLabel : "Out of Stock"}
          </button>

          <button
            onClick={() => {
              navigate(`/products/${product._id}`)
            }}
            className="block w-full rounded-md border border-line bg-surface px-4 py-2.5 text-center text-sm font-semibold text-ink-soft transition hover:border-primary/40 hover:text-primary active:scale-[0.99]"
          >
            View Details
          </button>

          <button
            onClick={handleWishlist}
            disabled={saving}
            className={`block w-full rounded-md border px-4 py-2.5 text-center text-sm font-semibold transition ${saved
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

        {cartErr && (
          <p className="mt-2 text-xs font-medium text-danger">
            {cartErr}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;