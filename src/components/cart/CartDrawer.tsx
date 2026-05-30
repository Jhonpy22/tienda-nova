import { useState } from 'react'
import useCart from '../../hooks/useCart'
import type { CartItem } from '../../models/Index'
import CheckoutComingSoonModal from './CheckoutComingSoonModal'

const formatCRC = (value: number) => `₡${value.toLocaleString('es-CR').replace(/\s/g, '.')}`

const CartDrawer = () => {
    const { items, totalItems, totalPrice, isOpen, removeItem, clearCart, closeCart } = useCart()
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-primary/60 backdrop-blur-sm"
                    onClick={closeCart}
                    aria-hidden="true"
                />
            )}

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Carrito de compras"
                className={[
                    'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-warm/50 bg-card shadow-2xl',
                    'transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : 'translate-x-full',
                ].join(' ')}
            >
                <div className="flex items-center justify-between border-b border-warm/55 px-5 py-4">
                    <div>
                        <h2 className="text-2xl font-medium tracking-wide text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                            Carrito
                        </h2>
                        <p className="text-xs text-text-muted">
                            {totalItems === 0
                                ? 'Sin productos'
                                : `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeCart}
                        aria-label="Cerrar carrito"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-background hover:text-accent"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted" aria-hidden="true">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <p className="text-sm text-text-muted">Tu carrito esta vacio</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map(({ product, quantity }: CartItem) => (
                                <li
                                    key={product.id}
                                    className="flex gap-3 rounded-xl border border-warm/55 bg-background p-3"
                                >
                                    <img
                                        src={product.imagen}
                                        alt={product.nombre}
                                        className="h-20 w-16 rounded-lg object-cover"
                                    />

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <p className="text-sm font-medium leading-snug text-text-main">
                                                {product.nombre}
                                            </p>
                                            <p className="mt-0.5 text-xs text-text-muted">
                                                {product.colores[0]} - {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-accent">
                                                {formatCRC(product.precio * quantity)}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(product.id)}
                                                aria-label={`Quitar ${product.nombre}`}
                                                className="text-xs text-text-muted underline-offset-2 transition-colors hover:text-accent hover:underline"
                                            >
                                                {quantity > 1 ? 'Quitar 1' : 'Quitar'}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="space-y-3 border-t border-warm/55 px-5 py-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-text-muted">Total estimado</span>
                            <span className="text-2xl font-medium tracking-wide text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                                {formatCRC(totalPrice)}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="button-accent w-full py-3 text-sm"
                            onClick={() => setIsCheckoutModalOpen(true)}
                        >
                            Continuar pedido
                        </button>

                        <button
                            type="button"
                            onClick={clearCart}
                            className="w-full text-center text-xs text-text-muted underline-offset-2 transition-colors hover:text-accent hover:underline"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                )}
            </aside>

            <CheckoutComingSoonModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                totalItems={totalItems}
                totalPrice={totalPrice}
            />
        </>
    )
}

export default CartDrawer
