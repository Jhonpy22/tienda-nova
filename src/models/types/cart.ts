import type { Product } from './product'

export interface CartItem {
    product: Product
    quantity: number
}

export interface CartContextValue {
    items: CartItem[]
    totalItems: number
    totalPrice: number
    isOpen: boolean
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    clearCart: () => void
    openCart: () => void
    closeCart: () => void
}