import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import useSectionReveal from '../../hooks/useSectionReveal'

const AssistantHighlight = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} id="novabot" className="container-shell home-assistant-section">
            <div className="home-assistant-shell">
                <div data-reveal className="home-assistant-copy">
                    <p className="home-kicker home-kicker-strong">Experiencia asistida</p>
                    <h2 style={{ fontFamily: 'var(--font-display)' }}>
                        NovaBot funciona como asesor de outfits urbanos.
                    </h2>
                    <p>
                        Recomienda combinaciones con productos del catalogo sin afectar la integracion con Gemini.
                    </p>
                </div>

                <div className="home-assistant-panels">
                    <div data-reveal className="home-assistant-panel">
                        <p>Capacidades</p>
                        <ul>
                            <li>Arma outfits skate, baggy, surf, cargo y banadores para Guanacaste.</li>
                            <li>Guia sobre horario, contacto, envios dentro de Guanacaste y garantias generales.</li>
                            <li>Acceso directo a categorias concretas con un solo clic.</li>
                        </ul>
                    </div>

                    <div data-reveal className="home-assistant-panel">
                        <p>Recorrido sugerido</p>
                        <div className="home-assistant-flow">
                            <p>Empieza por un fit base, valida silueta y usa NovaBot para llegar a la categoria adecuada.</p>
                            <div className="home-assistant-actions">
                                <Link to="/hombre" className="button-accent mt-2 flex-1 justify-center">
                                    Ver catalogo
                                </Link>
                                <Link to="/hombre/$categoria" params={{ categoria: 'accesorios' }} search={{ page: 1, sort: 'newest' }} className="button-ghost-light mt-2 flex-1 justify-center">
                                    Ver accesorios
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AssistantHighlight
