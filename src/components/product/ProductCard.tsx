import { useState } from 'react'
import useCart from '../../hooks/useCart'
import type { Estilo, Product } from '../../models/Index'

interface Props {
    product: Product
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&h=900&q=80'

const formatCRC = (value: number) => `\u20A1${value.toLocaleString('es-CR').replace(/\s/g, '.')}`

const STYLE_LABELS: Record<Estilo, string> = {
    Oversized: 'Oversized',
    Baggy: 'Baggy',
    Skate: 'Skate',
    Surf: 'Surf',
    Y2K: 'Y2K',
    'New Drop': 'Nueva coleccion',
    Trending: 'En tendencia',
    'Urban Essentials': 'Basicos urbanos',
}

const ProductCard = ({ product }: Props) => {
    const { addItem } = useCart()
    const [added, setAdded] = useState(false)
    const visibleOptions = product.tallas.slice(0, 5)
    const hiddenOptionsCount = product.tallas.length - visibleOptions.length

    const handleAdd = () => {
        addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 1500)
    }

    return (
        <article className="group panel-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/75 hover:shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
            <div className="relative overflow-hidden bg-primary/10">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="aspect-[4/5] w-full object-cover grayscale-[8%] transition-transform duration-700 group-hover:scale-[1.045]"
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = FALLBACK_IMAGE
                    }}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/72 to-transparent" />
                {product.nuevo && (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                        Nuevo lanzamiento
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col space-y-3 p-4">
                <div>
                    <h3 className="text-base font-medium text-text-main">{product.nombre}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted">{product.descripcion}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {visibleOptions.map((size) => (
                        <span key={size} className="rounded-md border border-warm/60 px-2 py-0.5 text-[11px] text-text-muted">
                            {size}
                        </span>
                    ))}
                    {hiddenOptionsCount > 0 && (
                        <span className="rounded-md border border-warm/60 px-2 py-0.5 text-[11px] text-text-muted">
                            +{hiddenOptionsCount}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {product.colores.map((color) => (
                        <span key={color} className="rounded-md bg-background px-2 py-0.5 text-[11px] text-text-muted">
                            {color}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {product.estilos.slice(0, 3).map((style) => (
                        <span key={style} className="rounded-full bg-accent/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                            {STYLE_LABELS[style]}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                    <p className="text-2xl font-medium tracking-wide text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                        {formatCRC(product.precio)}
                    </p>
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={added}
                        className={[
                            'button-accent py-2 text-xs transition-all duration-200 hover:shadow-[0_18px_40px_rgba(224,197,143,0.26)] focus-visible:ring-offset-card',
                            added ? 'cursor-default opacity-80' : '',
                        ].join(' ')}
                    >
                        {added ? 'Agregado' : 'Agregar'}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard
