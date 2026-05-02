import type { Product } from '../../types/product'

interface Props {
    product: Product
}

const currencyFormatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
})

const ProductCard = ({ product }: Props) => (
    <article className="panel-card overflow-hidden">
        <img src={product.imagen} alt={product.nombre} className="aspect-[4/5] w-full object-cover" loading="lazy" />

        <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-medium text-text-main">{product.nombre}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{product.descripcion}</p>
                </div>
                {product.nuevo && (
                    <span className="rounded-full border border-accent px-3 py-1 text-xs font-medium text-accent">Nuevo</span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                {product.tallas.map((size) => (
                    <span key={size} className="rounded-full border border-warm px-3 py-1">
                        {size}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                {product.colores.map((color) => (
                    <span key={color} className="rounded-full bg-background px-3 py-1">
                        {color}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-primary">{currencyFormatter.format(product.precio)}</p>
                <button type="button" className="button-accent">
                    Agregar
                </button>
            </div>
        </div>
    </article>
)

export default ProductCard
