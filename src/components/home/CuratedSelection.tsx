import { Link } from '@tanstack/react-router'
import { curatedGroups } from '../../data/homeContent'

const CuratedSelection = () => (
    <section className="bg-sand">
        <div className="container-shell space-y-8 py-18">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Selecciones por linea</p>
                    <h2 className="section-title max-w-3xl">Entradas separadas para hombre y mujer, con mejor criterio visual y sin mezclar recorrido.</h2>
                </div>
                <a href="#novabot" className="text-sm font-medium text-primary transition-colors hover:text-secondary">
                    Ver experiencia asistida
                </a>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
                {curatedGroups.map((group) => (
                    <article key={group.genero} className="space-y-6 rounded-[2rem] border border-warm/80 bg-card p-6 shadow-[0_18px_50px_rgba(26,46,74,0.08)] sm:p-7">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{group.eyebrow}</p>
                                <h3 className="text-3xl leading-tight text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
                                    {group.title}
                                </h3>
                                <p className="max-w-2xl text-sm leading-7 text-text-muted sm:text-base">{group.description}</p>
                            </div>
                            <Link to={group.ctaTo} className="button-secondary shrink-0">
                                {group.ctaLabel}
                            </Link>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {group.items.map((item) => (
                                <article key={item.name} className="overflow-hidden rounded-[1.5rem] border border-warm/80 bg-card shadow-[0_12px_35px_rgba(26,46,74,0.07)]">
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                                    </div>
                                    <div className="space-y-3 p-5">
                                        <div>
                                            <h4 className="text-lg text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
                                                {item.name}
                                            </h4>
                                            <p className="mt-1 text-sm text-text-muted">{item.note}</p>
                                        </div>
                                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">{item.price}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
)

export default CuratedSelection
