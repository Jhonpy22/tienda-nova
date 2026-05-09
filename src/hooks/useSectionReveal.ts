import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePrefersReducedMotion from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
    selector?: string
    start?: string
    y?: number
    stagger?: number
    duration?: number
}

export const useSectionReveal = <T extends HTMLElement>(
    ref: RefObject<T | null>,
    {
        selector = '[data-reveal]',
        start = 'top 82%',
        y = 28,
        stagger = 0.12,
        duration = 0.85,
    }: RevealOptions = {},
) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    useLayoutEffect(() => {
        const root = ref.current
        if (!root) return undefined

        const targets = gsap.utils.toArray<HTMLElement>(selector, root)
        if (!targets.length) return undefined

        if (prefersReducedMotion) {
            gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 })
            return undefined
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                targets,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: root,
                        start,
                        once: true,
                    },
                },
            )
        }, root)

        return () => {
            context.revert()
        }
    }, [duration, prefersReducedMotion, ref, selector, stagger, start, y])
}

export default useSectionReveal
