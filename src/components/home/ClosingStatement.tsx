import { Link } from '@tanstack/react-router'

const ClosingStatement = () => (
    <section className="container-shell pb-20 pt-8">
        <div className="space-y-6 rounded-[2rem] border border-warm bg-card px-8 py-12 text-center shadow-[0_18px_60px_rgba(26,46,74,0.08)]">
            <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Cierre</p>
            <h2 className="mx-auto max-w-3xl text-3xl leading-tight text-text-main sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                Una portada memorable abre la puerta. Un catalogo claro sostiene la experiencia.
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
                Nova combina ambas capas: una presentacion con criterio y una navegacion util para quien ya esta listo para
                comprar o comparar.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/hombre" className="button-primary">
                    Ver catalogo hombre
                </Link>
                <Link to="/mujer" className="button-secondary">
                    Ver catalogo mujer
                </Link>
            </div>
        </div>
    </section>
)

export default ClosingStatement
