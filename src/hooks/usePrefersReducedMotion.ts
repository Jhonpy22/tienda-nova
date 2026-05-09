import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export const usePrefersReducedMotion = () => {
    const getInitialValue = () => {
        if (typeof window === 'undefined') return false

        return window.matchMedia(QUERY).matches
    }

    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialValue)

    useEffect(() => {
        if (typeof window === 'undefined') return undefined

        const mediaQuery = window.matchMedia(QUERY)
        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches)
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    return prefersReducedMotion
}

export default usePrefersReducedMotion
