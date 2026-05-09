import { Link } from '@tanstack/react-router'

const AssistantHighlight = () => (
    <section id="novabot" className="container-shell py-18">
        <div className="grid gap-8 rounded-[2rem] border border-warm bg-primary p-8 text-white shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.32em] text-accent">Experiencia asistida</p>
                <h2 className="text-3xl leading-tight sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                    NovaBot funciona como asesor de outfits urbanos.
                </h2>
                <p className="max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                    Recomienda combinaciones con productos del catálogo sin afectar la integración con Gemini.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-accent">Capacidades</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
                        <li>Arma outfits oversized, baggy, skate, surf y Y2K.</li>
                        <li>Guía sobre envíos, pagos, devoluciones y horarios.</li>
                        <li>Acceso directo a categorías concretas con un solo clic.</li>
                    </ul>
                </div>

                <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-accent">Recorrido sugerido</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-white/80">
                        <p>Empieza por un fit base, valida silueta y usa NovaBot para llegar a la categoría adecuada.</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link to="/hombre" className="button-accent mt-2 flex-1 justify-center">
                                Ver catálogo
                            </Link>
                            <Link to="/hombre/$categoria" params={{ categoria: 'lentes-sol' }} search={{ page: 1, sort: 'newest' }} className="button-ghost-light mt-2 flex-1 justify-center">
                                Ver lentes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export default AssistantHighlight
