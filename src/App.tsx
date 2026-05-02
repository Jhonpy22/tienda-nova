import { RouterProvider, createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { homeRoute } from './routes/index'
import { hombreRoute } from './routes/hombre/index'
import { hombreCategoriaRoute } from './routes/hombre/$categoria'
import { mujerRoute } from './routes/mujer/index'
import { mujerCategoriaRoute } from './routes/mujer/$categoria'

const routeTree = rootRoute.addChildren([
    homeRoute,
    hombreRoute,
    hombreCategoriaRoute,
    mujerRoute,
    mujerCategoriaRoute,
])

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () => <RouterProvider router={router} />

export default App
