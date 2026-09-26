import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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

  if(loader){
    return <h1>Loadingg...</h1>
  }
  if(err){
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Products
          </Link>

          <h1 className="text-lg font-bold text-gray-900">
            ShopKart
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image */}
            <div className="h-[450px] bg-gray-100 lg:h-[600px]">
              <img
                src={product?.image}
                alt={product?.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Information */}
            <div className="flex flex-col justify-center p-8 sm:p-12">

              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {product?.category}
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product?.name}
              </h2>

              <p className="mt-6 text-3xl font-bold text-gray-900">
                ₹{product?.price}
              </p>

              <p className="mt-6 text-base leading-7 text-gray-600">
                {product?.description}
              </p>

              {/* Stock */}
              <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-700">
                  Availability
                </p>

                <p
                  className={`mt-1 text-sm font-semibold ${inStock
                      ? "text-emerald-600"
                      : "text-red-600"
                    }`}
                >
                  {inStock
                    ? `${product?.stock} units available`
                    : "Out of stock"}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={!inStock}
                className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ProductDetails;