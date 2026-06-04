import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type CheckoutComingSoonModalProps = {
    isOpen: boolean
    onClose: () => void
    totalItems: number
    totalPrice: number
}

const formatCRC = (value: number) => `\u20a1${value.toLocaleString('es-CR').replace(/\s/g, '.')}`

const CheckoutComingSoonModal = ({
    isOpen,
    onClose,
    totalItems,
    totalPrice,
}: CheckoutComingSoonModalProps) => {
    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/75 px-4 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="checkout-coming-soon-title"
                        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-accent/35 bg-card p-6 text-text-main shadow-[0_28px_90px_rgba(0,0,0,0.55)] sm:p-7"
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Cerrar modal"
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-warm/70 bg-background/70 text-text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-accent/12 text-accent shadow-[0_12px_30px_rgba(224,197,143,0.14)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>

                        <h3
                            id="checkout-coming-soon-title"
                            className="pr-10 text-3xl font-medium tracking-wide text-accent"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Pedido casi listo
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-text-muted">
                            Estamos preparando esta función para que pronto podás completar tu compra desde la tienda.
                        </p>

                        <div className="mt-5 rounded-2xl border border-warm/70 bg-background/70 p-4">
                            <p className="text-sm text-text-muted">
                                Tu carrito tiene{' '}
                                <span className="font-semibold text-text-main">
                                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                                </span>
                            </p>
                            <p className="mt-2 text-sm text-text-muted">
                                Total estimado:{' '}
                                <span className="font-semibold text-accent">{formatCRC(totalPrice)}</span>
                            </p>
                        </div>

                        <p className="mt-4 text-xs leading-5 text-text-muted">
                            Mientras tanto, podés contactarnos por WhatsApp, Instagram o Facebook para finalizar tu pedido.
                        </p>

                        <button
                            type="button"
                            onClick={onClose}
                            className="button-accent mt-6 w-full py-3 text-sm"
                        >
                            Entendido
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default CheckoutComingSoonModal
