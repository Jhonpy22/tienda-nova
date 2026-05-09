import { useRef } from 'react'
import useSectionReveal from '../../hooks/useSectionReveal'

const BrandStatement = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="container-shell py-18">
            <div className="grid gap-8 rounded-[2rem] border border-warm bg-card p-8 shadow-[var(--shadow-panel)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
                <div data-reveal className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Manifiesto</p>
                    <h2 className="text-3xl leading-tight text-text-main sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Streetwear sin ruido: silueta, textura y actitud.
                    </h2>
                </div>

                <div data-reveal className="grid gap-6 text-sm leading-7 text-text-muted sm:grid-cols-2 sm:text-base">
                    <p>
                        La propuesta combina una presentacion editorial oscura con navegacion clara para encontrar prendas,
                        tenis, relojes, lentes y accesorios sin exceso visual.
                    </p>
                    <p>
                        El resultado se siente premium desde el primer scroll: composicion cuidada, tono sobrio y una experiencia
                        util cuando el usuario decide comprar o comparar.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default BrandStatement
