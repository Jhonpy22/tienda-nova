import { Link } from '@tanstack/react-router'

const AssistantHighlight = () => (
    <section id="novabot" className="container-shell py-18">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-primary p-8 text-card shadow-[0_28px_90px_rgba(7,13,24,0.35)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.32em] text-warm/70">Experiencia asistida</p>
                <h2 className="text-3xl leading-tight sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                    NovaBot actua como un asesor de compra, no como un chat decorativo.
                </h2>
                <p className="max-w-xl text-sm leading-7 text-warm/78 sm:text-base">
                    Responde dudas de productos, metodos de pago, envios, devoluciones y ademas conduce directo a las
                    categorias clave del catalogo sin romper la experiencia.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-warm/62">Capacidades</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-warm/82">
                        <li>Consulta productos por tipo de prenda o coleccion.</li>
                        <li>Guia sobre envios, pagos, devoluciones y horarios.</li>
                        <li>Acceso directo a categorias concretas con un solo clic.</li>
                    </ul>
                </div>

                <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-warm/62">Recorrido sugerido</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-warm/82">
                        <p>Empieza por la linea que te interese, valida estilo y luego usa NovaBot para entrar a la categoria adecuada.</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link to="/hombre" className="button-accent mt-2 flex-1 justify-center">
                                Recorrido hombre
                            </Link>
                            <Link to="/mujer" className="button-ghost-light mt-2 flex-1 justify-center">
                                Recorrido mujer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export default AssistantHighlight
