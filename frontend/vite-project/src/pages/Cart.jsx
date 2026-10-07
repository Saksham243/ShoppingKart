import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
import { useCartContext } from '../context/CartContext'

function Cart() {
    const { loading, cartItems, error, refreshCart } = useCartContext()

    // Derived values: calculated from cartItems, never stored
    const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const handleRetry = async () => {
        try {
            await refreshCart()
        } catch (err) {
            // error state stays set, so the error screen keeps showing
        }
    }

    return (
        <div className="min-h-screen bg-canvas">
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">

                {/* Page heading */}
                <div className="mb-8">
                    <h1 className="font-display text-3xl text-ink">My Cart</h1>
                    {!loading && !error && (
                        <p className="mt-1 text-sm text-ink-soft">{totalUnits} items in your cart</p>
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-24">
                        <p className="text-sm font-medium text-ink-soft">Loading your cart...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-danger/30 bg-danger-soft py-20 text-center">
                        <h2 className="font-display text-xl text-ink">Unable to load your cart.</h2>
                        <p className="mt-2 text-sm text-ink-soft">{error}</p>
                        <button
                            onClick={handleRetry}
                            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && cartItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface py-20 text-center">
                        <span className="text-4xl">🛒</span>
                        <h2 className="mt-4 font-display text-xl text-ink">Your cart is empty</h2>
                        <p className="mt-2 max-w-sm text-sm text-ink-soft">
                            Looks like you haven't added anything yet.
                        </p>
                        <Link
                            to="/products"
                            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}

                {/* Cart with items */}
                {!loading && !error && cartItems.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                        {/* Items */}
                        <div className="flex flex-col gap-4 lg:col-span-2">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.product._id}
                                    product={item.product}
                                    quantity={item.quantity}
                                />
                            ))}
                        </div>

                        {/* Order summary */}
                        <aside className="h-fit rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-24">
                            <h2 className="font-display text-xl text-ink">Order Summary</h2>

                            <div className="mt-5 flex items-center justify-between text-sm text-ink-soft">
                                <span>Items</span>
                                <span className="font-medium text-ink">{totalUnits}</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                                <span className="text-sm text-ink-soft">Subtotal</span>
                                <span className="font-display text-xl text-ink">
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="mt-6 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.99]"
                            >
                                Proceed to Checkout
                            </button>
                        </aside>

                    </div>
                )}

            </main>
        </div>
    )
}

export default Cart