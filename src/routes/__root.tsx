import { Outlet, createRootRoute } from '@tanstack/react-router'
import ChatbotFloat from '../components/chat/ChatbotFloat'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

const RootLayout = () => (
    <div className="min-h-screen bg-background">
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">
            <Outlet />
        </main>
        <Footer />
        <ChatbotFloat />
    </div>
)

export const rootRoute = createRootRoute({
    component: RootLayout,
})
