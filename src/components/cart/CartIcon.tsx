import useCart from '../../hooks/useCart'

const CartIcon = () => {
    const { totalItems, openCart } = useCart()

    return (
        <button
            type="button"
            onClick={openCart}
            aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} productos` : ''}`}
            className="cart-icon-button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {totalItems > 0 && (
                <span className="cart-icon-badge">
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </button>
    )
}

export default CartIcon
