import ProductCard from './ProductCard'
import type { Product } from '../../models/Index'

interface Props {
    products: Product[]
    emptyMessage: string
}

const ProductGrid = ({ products, emptyMessage }: Props) => {
    if (!products.length) {
        return (
            <div className="catalog-empty-state">
                <p>Sin resultados</p>
                <span>{emptyMessage}</span>
            </div>
        )
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid
