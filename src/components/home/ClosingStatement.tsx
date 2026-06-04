import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import useSectionReveal from '../../hooks/useSectionReveal'

const ClosingStatement = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="container-shell home-closing-section">
            <div data-reveal className="home-closing">
                <p className="home-kicker">Cierre</p>
                <h2 style={{ fontFamily: 'var(--font-display)' }}>
                    Un buen fit empieza con piezas correctas y una ruta clara para comprarlas.
                </h2>
                <p>
                    Nova combina direccion visual, catalogo funcional y asesoria inmediata para elegir sin perder tiempo.
                </p>
                <div className="home-closing-actions">
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
