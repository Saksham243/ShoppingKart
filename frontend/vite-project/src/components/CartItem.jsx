import React, { useState } from 'react'
import { useCartContext } from '../context/CartContext'

function CartItem({ product, quantity }) {
    const { removeFromCart, updateQuant } = useCartContext()
    const [updating, setUpdating] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [err, setErr] = useState(null)

    const handleRemove = async () => {
        if (removing) return

        setRemoving(true)
        setErr(null)
        const success = await removeFromCart(product._id)
        if (!success) {
            setErr("Unable to remove,try again")
        }
        setRemoving(false)
    }

    const handleIncrease = async () => {
        if (updating) return
        setUpdating(true)
        setErr(null)

        const newqu = quantity + 1
        if (newqu > product.stock) {
            setErr("Not enough quantity available")
        }
        else {
            const success = await updateQuant(product._id, newqu)
            if (!success) {
                setErr("Unable to add,try again")
            }

        }
        setUpdating(false)
    }

    const handleDecrease = async () => {
        if (updating) return
        setUpdating(true)
        setErr(null)

        const newqu = quantity - 1
        if (newqu===0) {
            setErr("Minimum quantity is 1 — use Remove instead")
        }
        else {
            const success = await updateQuant(product._id, newqu)
            if (!success) {
                setErr("Unable to decrease,try again")
            }

        }
        setUpdating(false)
    }

    const lineTotal = product.price * quantity
    const busy = updating || removing

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center">

            {/* Image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-primary-soft sm:h-28 sm:w-28">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Name + price */}
            <div className="flex-1">
                <h3 className="font-display text-lg text-ink">{product.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">₹{product.price.toLocaleString("en-IN")} each</p>
                {err && (
                    <p className="mt-2 text-xs font-medium text-danger">{err}</p>
                )}
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3 self-start sm:self-center">
                <button
                    onClick={handleDecrease}
                    disabled={busy}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-canvas text-ink-soft transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    −
                </button>
                <span className="w-6 text-center text-sm font-semibold text-ink">{quantity}</span>
                <button
                    onClick={handleIncrease}
                    disabled={busy}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-canvas text-ink-soft transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    +
                </button>
            </div>

            {/* Line total */}
            <div className="text-right sm:w-24">
                <p className="font-display text-lg text-ink">₹{lineTotal.toLocaleString("en-IN")}</p>
            </div>

            {/* Remove */}
            <button
                onClick={handleRemove}
                disabled={busy}
                className="self-start rounded-md border border-danger/30 bg-danger-soft px-3.5 py-2 text-xs font-semibold text-danger transition hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-70 sm:self-center"
            >
                {removing ? "Removing..." : "Remove"}
            </button>

        </div>
    );
}

export default CartItem