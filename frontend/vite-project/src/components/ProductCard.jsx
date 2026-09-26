import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const inStock = product.stock > 0;
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      
      {/* Product Image */}
      <div className="h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Information */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {product.category}
          </span>

          <span
            className={`text-xs font-semibold ${
              inStock ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {inStock ? `${product.stock} units left` : "Out of stock"}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 text-xl font-bold text-gray-900">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <button
          onClick={() => {
            navigate(`/products/${product._id}`)
          }}
          className="mt-5 block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;