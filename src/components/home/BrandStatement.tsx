import { useRef } from 'react'
import useSectionReveal from '../../hooks/useSectionReveal'

const BrandStatement = () => {
    const sectionRef = useRef<HTMLElement>(null)
    useSectionReveal(sectionRef)

    return (
        <section ref={sectionRef} className="container-shell home-manifesto-section">
            <div className="home-manifesto">
                <div data-reveal className="home-manifesto-title">
                    <p className="home-kicker">Manifiesto</p>
                    <h2 style={{ fontFamily: 'var(--font-display)' }}>
                        Streetwear sin ruido: silueta, textura y actitud.
                    </h2>
                </div>

                <div data-reveal className="home-manifesto-copy">
                    <p>
                        La propuesta combina una presentacion editorial oscura con navegacion clara para encontrar prendas,
                        hoodies, tenis y accesorios sin exceso visual.
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
