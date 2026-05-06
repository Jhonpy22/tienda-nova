const BrandStatement = () => (
    <section className="container-shell py-18">
        <div className="grid gap-8 rounded-[2rem] border border-warm bg-card p-8 shadow-[0_20px_70px_rgba(26,46,74,0.08)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.32em] text-text-muted">Manifiesto</p>
                <h2 className="text-3xl leading-tight text-text-main sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                    Nova no compite por exceso, compite por seleccion.
                </h2>
            </div>

            <div className="grid gap-6 text-sm leading-7 text-text-muted sm:grid-cols-2 sm:text-base">
                <p>
                    La propuesta combina una presentacion editorial con una navegacion clara para encontrar prendas,
                    accesorios y sastreria sin ruido visual innecesario.
                </p>
                <p>
                    El resultado busca sentirse premium desde el primer scroll: composicion cuidada, tono sobrio y una
                    experiencia util cuando el usuario decide explorar el catalogo.
                </p>
            </div>
        </div>
    </section>
)

export default BrandStatement
