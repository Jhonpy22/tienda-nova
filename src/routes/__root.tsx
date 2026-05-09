import { Outlet, createRootRoute } from '@tanstack/react-router'
import CartDrawer from '../components/cart/CartDrawer'
import ChatbotFloat from '../components/chat/ChatbotFloat'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import CartProvider from '../provider/CartProvider'

export const RootLayout = () => (
    <CartProvider>
        <div className="min-h-screen bg-background">
            <Header />
            <main className="min-h-[calc(100vh-8rem)]">
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
            <ChatbotFloat />
        </div>
    </CartProvider>
)

export const rootRoute = createRootRoute({
    component: RootLayout,
})