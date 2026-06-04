interface Props {
    page: number
    pageCount: number
    onPageChange: (page: number) => void
}

const Pagination = ({ page, pageCount, onPageChange }: Props) => {
    if (pageCount <= 1) return null

    const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

    return (
        <div className="catalog-pagination">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="catalog-page-button catalog-page-button-wide"
            >
                Anterior
            </button>

            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() => onPageChange(pageNumber)}
                    className={`catalog-page-button ${pageNumber === page ? 'catalog-page-button-active' : ''}`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === pageCount}
                className="catalog-page-button catalog-page-button-wide"
            >
                Siguiente
            </button>
        </div>
    )
}

export default Pagination
