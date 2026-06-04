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
        <article className="product-card group">
            <div className="product-card-media">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="product-card-image"
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = FALLBACK_IMAGE
                    }}
                />
                <div className="product-card-image-shade" />
                {product.nuevo && (
                    <span className="product-card-badge">
                        Nuevo lanzamiento
                    </span>
                )}
            </div>

            <div className="product-card-body">
                <div className="product-card-heading">
                    <h3>{product.nombre}</h3>
                    <p>{product.descripcion}</p>
                </div>

                <div className="product-card-options" aria-label="Tallas disponibles">
                    {visibleOptions.map((size) => (
                        <span key={size} className="product-option-chip">
                            {size}
                        </span>
                    ))}
                    {hiddenOptionsCount > 0 && (
                        <span className="product-option-chip">
                            +{hiddenOptionsCount}
                        </span>
                    )}
                </div>

                <div className="product-card-colors" aria-label="Colores disponibles">
                    {product.colores.map((color) => (
                        <span key={color} className="product-color-chip">
                            {color}
                        </span>
                    ))}
                </div>

                <div className="product-card-styles">
                    {product.estilos.slice(0, 3).map((style) => (
                        <span key={style} className="product-style-chip">
                            {STYLE_LABELS[style]}
                        </span>
                    ))}
                </div>

                <div className="product-card-footer">
                    <p className="product-card-price" style={{ fontFamily: 'var(--font-display)' }}>
                        {formatCRC(product.precio)}
                    </p>
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={added}
                        className={[
                            'product-add-button',
                            added ? 'product-add-button-added' : '',
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
