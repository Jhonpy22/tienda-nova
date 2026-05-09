import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import type { CartContextValue } from '../models/Index'

const useCart = (): CartContextValue => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
    return ctx
}

export default useCart