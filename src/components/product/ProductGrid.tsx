import ProductCard from './ProductCard'
import type { Product } from '../../types/product'

interface Props {
    products: Product[]
    emptyMessage: string
}

const ProductGrid = ({ products, emptyMessage }: Props) => {
    if (!products.length) {
        return (
            <div className="panel-card p-8 text-center">
                <p className="text-base font-medium text-text-main">Sin resultados</p>
                <p className="mt-3 text-sm text-text-muted">{emptyMessage}</p>
            </div>
        )
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid
