import { useEffect } from 'react'
import Lenis from 'lenis'
import usePrefersReducedMotion from './usePrefersReducedMotion'

const DESKTOP_QUERY = '(min-width: 1024px)'

export const useLenisScroll = () => {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (typeof window === 'undefined' || prefersReducedMotion) return undefined

        const desktopQuery = window.matchMedia(DESKTOP_QUERY)
        if (!desktopQuery.matches) return undefined

        const previousScrollBehavior = document.documentElement.style.scrollBehavior
        document.documentElement.style.scrollBehavior = 'auto'

        const lenis = new Lenis({
            autoRaf: false,
            smoothWheel: true,
            syncTouch: false,
            anchors: true,
        })

        let frameId = 0

        const raf = (time: number) => {
            lenis.raf(time)
            frameId = window.requestAnimationFrame(raf)
        }

        frameId = window.requestAnimationFrame(raf)

        return () => {
            window.cancelAnimationFrame(frameId)
            lenis.destroy()
            document.documentElement.style.scrollBehavior = previousScrollBehavior
        }
    }, [prefersReducedMotion])
}

export default useLenisScroll
