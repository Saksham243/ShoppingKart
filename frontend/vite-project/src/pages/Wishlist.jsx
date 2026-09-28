import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosCalls/axios";

function Wishlist() {
    const [err, setErr] = useState(null)
    const [loader, setLoader] = useState(false)
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        setLoader(true)
        setErr(null)
        async function getWishlist() {
            try {
                const prods = await axiosInstance.get('/wishlist/')
                setWishlist(prods.data.wishlist)
            } catch (error) {
                setErr("Unable to get the page")
            } finally {
                setLoader(false)
            }
        }

        getWishlist()
    }, [])

    const handleRemoveFromList = (prodId) => {
        setWishlist((prev) => prev.filter((product) => product._id !== prodId))
    }

    return (
        <div className="min-h-screen bg-canvas">
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">

                {/* Page heading */}
                <div className="mb-8">
                    <h1 className="font-display text-3xl text-ink">My Wishlist</h1>
                    <p className="mt-1 text-sm text-ink-soft">{wishlist.length} products saved</p>
                </div>

                {loader && (
                    <div className="flex items-center justify-center py-24">
                        <p className="text-sm font-medium text-ink-soft">Loading your wishlist...</p>
                    </div>
                )}

                {!loader && err && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-danger/30 bg-danger-soft py-20 text-center">
                        <h2 className="font-display text-xl text-ink">Something went wrong</h2>
                        <p className="mt-2 text-sm text-ink-soft">{err}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loader && !err && wishlist.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface py-20 text-center">
                        <span className="text-4xl">❤️</span>
                        <h2 className="mt-4 font-display text-xl text-ink">Your wishlist is empty</h2>
                        <p className="mt-2 max-w-sm text-sm text-ink-soft">
                            Save products you love and find them here later.
                        </p>
                        <Link
                            to="/products"
                            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}

                {!loader && !err && wishlist.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlist.map((product) => (
                            <WishlistCard key={product._id} product={product} onRemove={handleRemoveFromList} />
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}

export default Wishlist;