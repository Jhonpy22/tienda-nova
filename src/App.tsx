import { RouterProvider, createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { homeRoute } from './routes/index'
import { hombreRoute } from './routes/hombre/index'
import { hombreCategoriaRoute } from './routes/hombre/$categoria'

const routeTree = rootRoute.addChildren([
    homeRoute,
    hombreRoute,
    hombreCategoriaRoute,
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
