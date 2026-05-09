import { useState } from 'react'
import useCart from '../../hooks/useCart'
import type { Product } from '../../models/Index'

interface Props {
    product: Product
}

const currencyFormatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
})

const ProductCard = ({ product }: Props) => {
    const { addItem } = useCart()
    const [added, setAdded] = useState(false)

    const handleAdd = () => {
        addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 1500)
    }

    return (
        <article className="group panel-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative overflow-hidden">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {product.nuevo && (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium tracking-wide text-primary">
                        Nuevo
                    </span>
                )}
            </div>

            <div className="space-y-3 p-4">
                <div>
                    <h3 className="text-base font-medium text-text-main">{product.nombre}</h3>
                    <p className="mt-1 text-xs leading-5 text-text-muted line-clamp-2">{product.descripcion}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {product.tallas.map((size) => (
                        <span key={size} className="rounded-md border border-warm px-2 py-0.5 text-[11px] text-text-muted">
                            {size}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {product.colores.map((color) => (
                        <span key={color} className="rounded-md bg-background px-2 py-0.5 text-[11px] text-text-muted">
                            {color}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                    <p className="text-lg font-medium text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                        {currencyFormatter.format(product.precio)}
                    </p>
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={added}
                        className={[
                            'button-accent py-2 text-xs transition-all duration-200',
                            added ? 'opacity-80 cursor-default' : '',
                        ].join(' ')}
                    >
                        {added ? '✓ Agregado' : 'Agregar'}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard