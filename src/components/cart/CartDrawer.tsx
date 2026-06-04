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
                    className="cart-overlay"
                    onClick={closeCart}
                    aria-hidden="true"
                />
            )}

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Carrito de compras"
                className={[
                    'cart-drawer',
                    'transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : 'translate-x-full',
                ].join(' ')}
            >
                <div className="cart-drawer-header">
                    <div>
                        <h2 className="cart-drawer-title" style={{ fontFamily: 'var(--font-display)' }}>
                            Carrito
                        </h2>
                        <p className="cart-drawer-meta">
                            {totalItems === 0
                                ? 'Sin productos'
                                : `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeCart}
                        aria-label="Cerrar carrito"
                        className="cart-close-button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="cart-drawer-body">
                    {items.length === 0 ? (
                        <div className="cart-empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="cart-empty-icon" aria-hidden="true">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <p>Tu carrito esta vacio</p>
                        </div>
                    ) : (
                        <ul className="cart-item-list">
                            {items.map(({ product, quantity }: CartItem) => (
                                <li
                                    key={product.id}
                                    className="cart-item"
                                >
                                    <img
                                        src={product.imagen}
                                        alt={product.nombre}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-content">
                                        <div className="cart-item-info">
                                            <p className="cart-item-name">
                                                {product.nombre}
                                            </p>
                                            <p className="cart-item-meta">
                                                {product.colores[0]} - {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
                                            </p>
                                        </div>
                                        <div className="cart-item-footer">
                                            <p className="cart-item-price">
                                                {formatCRC(product.precio * quantity)}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(product.id)}
                                                aria-label={`Quitar ${product.nombre}`}
                                                className="cart-remove-button"
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
                    <div className="cart-summary">
                        <div className="cart-summary-row">
                            <span className="cart-summary-label">Total estimado</span>
                            <span className="cart-summary-value" style={{ fontFamily: 'var(--font-display)' }}>
                                {formatCRC(totalPrice)}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="button-accent cart-checkout-button"
                            onClick={() => setIsCheckoutModalOpen(true)}
                        >
                            Continuar pedido
                        </button>

                        <button
                            type="button"
                            onClick={clearCart}
                            className="cart-clear-button"
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
