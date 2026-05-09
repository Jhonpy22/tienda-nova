import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import useSectionReveal from '../../hooks/useSectionReveal'

const ClosingStatement = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="container-shell pb-20 pt-8">
            <div data-reveal className="space-y-6 rounded-[2rem] border border-warm bg-card px-8 py-12 text-center shadow-[var(--shadow-panel)]">
                <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Cierre</p>
                <h2 className="mx-auto max-w-3xl text-3xl leading-tight text-text-main sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                    Un buen fit empieza con piezas correctas y una ruta clara para comprarlas.
                </h2>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
                    Nova combina direccion visual, catalogo funcional y asesoria inmediata para elegir sin perder tiempo.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link to="/hombre" className="button-primary">
                        Ver catalogo masculino
                    </Link>
                    <Link to="/hombre/$categoria" params={{ categoria: 'accesorios' }} search={{ page: 1, sort: 'newest' }} className="button-secondary">
                        Ver accesorios
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ClosingStatement
