/* eslint-disable react-refresh/only-export-components */
import { createRoute } from '@tanstack/react-router'
import AssistantHighlight from '../components/home/AssistantHighlight'
import BrandStatement from '../components/home/BrandStatement'
import ClosingStatement from '../components/home/ClosingStatement'
import CuratedSelection from '../components/home/CuratedSelection'
import FeaturedCollections from '../components/home/FeaturedCollections'
import HeroSection from '../components/home/HeroSection'
import { rootRoute } from './__root'

const HomePage = () => (
    <div className="pb-4">
        <HeroSection />
        <BrandStatement />
        <FeaturedCollections />
        <CuratedSelection />
        <AssistantHighlight />
        <ClosingStatement />
    </div>
)

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})
