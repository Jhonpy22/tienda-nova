interface Props {
    page: number
    pageCount: number
    onPageChange: (page: number) => void
}

const Pagination = ({ page, pageCount, onPageChange }: Props) => {
    if (pageCount <= 1) return null

    const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="rounded-full border border-warm px-4 py-2 text-sm text-text-main transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
                Anterior
            </button>

            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() => onPageChange(pageNumber)}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm transition-colors ${
                        pageNumber === page ? 'bg-primary text-card' : 'border border-warm text-text-main hover:border-primary'
                    }`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === pageCount}
                className="rounded-full border border-warm px-4 py-2 text-sm text-text-main transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
                Siguiente
            </button>
        </div>
    )
}

export default Pagination
