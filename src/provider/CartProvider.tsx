import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from '../context/CartContext'
import type { CartItem } from '../models/Index'
import type { Product } from '../models/Index'

interface Props {
    children: ReactNode
}

const CartProvider = ({ children }: Props) => {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                )
            }
            return [...prev, { product, quantity: 1 }]
        })
        setIsOpen(true)
    }, [])

    const removeItem = useCallback((productId: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        )
    }, [])

    const clearCart = useCallback(() => setItems([]), [])

    const openCart = useCallback(() => setIsOpen(true), [])
    const closeCart = useCallback(() => setIsOpen(false), [])

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    )

    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.product.precio * item.quantity, 0),
        [items],
    )

    const value = useMemo(
        () => ({
            items,
            totalItems,
            totalPrice,
            isOpen,
            addItem,
            removeItem,
            clearCart,
            openCart,
            closeCart,
        }),
        [items, totalItems, totalPrice, isOpen, addItem, removeItem, clearCart, openCart, closeCart],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider