import React from 'react';
import { lazy, Suspense } from 'react';

// Sections
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import NewsletterSignup from './sections/NewsletterSignup';
import FAQ from './sections/FAQ';
import SecuritySection from './sections/SecuritySection';
import StatsSection from './sections/StatsSection';
import ArtistsShowcaseSection from './sections/ArtistsShowcaseSection';
import CallToActionSection from './sections/CallToActionSection';
import FooterSection from './sections/FooterSection';

// Lazy load less critical sections for better performance
// const LazyStatsSection = lazy(() => import('./sections/StatsSection'));
// const LazyFAQ = lazy(() => import('./sections/FAQ'));

const Landing = () => {
    return (
        <div className="font-sans text-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Key Features */}
            <FeaturesSection />

            {/* Featured Showcase */}
            <ArtistsShowcaseSection />

            {/* Security Section */}
            <SecuritySection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Statistics Section */}
            <StatsSection />

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* FAQ Section */}
            <FAQ />

            {/* Call To Action */}
            <CallToActionSection />

            {/* Footer */}
            <FooterSection />
        </div>
    );
};

export default Landing;