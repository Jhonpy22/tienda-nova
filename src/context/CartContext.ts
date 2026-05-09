import { createContext } from 'react'
import type { CartContextValue } from '../models/Index'

export const CartContext = createContext<CartContextValue | null>(null)