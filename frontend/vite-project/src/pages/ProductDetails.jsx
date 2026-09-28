import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosCalls/axios";

function ProductDetails() {
  const [product, setProduct] = useState(null)
  const [err, setErr] = useState(null)
  const [loader, setLoader] = useState(false)
  const params = useParams()
  const inStock = product?.stock > 0;

  useEffect(() => {
    async function getProdId() {
      try {
        setLoader(true)
        setErr(null)
        const prod = await axiosInstance.get(`/products/allproducts/${params.id}`)
        setProduct(prod.data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoader(false)
      }
    }
    getProdId()

  }, [params.id])

  if (loader) {
    return <h1>Loadingg...</h1>
  }
  if (err) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">

        <Link
          to="/products"
          className="mb-6 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
        >
          ← Back to products
        </Link>

        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="h-[450px] bg-primary-soft lg:h-[600px]">
              <img
                src={product?.image}
                alt={product?.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12">

              <span className="w-fit rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary-dark">
                {product?.category}
              </span>

              <h2 className="mt-5 font-display text-3xl font-medium text-ink sm:text-4xl">
                {product?.name}
              </h2>

              <p className="mt-6 text-3xl font-semibold text-ink">
                ₹{product?.price}
              </p>

              <p className="mt-6 text-base leading-7 text-ink-soft">
                {product?.description}
              </p>

              <div className="mt-8 rounded-xl border border-line bg-canvas p-4">
                <p className="text-sm font-semibold text-ink">Availability</p>
                <p className={`mt-1 text-sm font-semibold ${inStock ? "text-primary" : "text-danger"}`}>
                  {inStock ? `${product?.stock} units available` : "Out of stock"}
                </p>
              </div>

              <button
                type="button"
                disabled={!inStock}
                className="mt-8 w-full rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
              >
                {inStock ? "Add to cart" : "Out of stock"}
              </button>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ProductDetails;