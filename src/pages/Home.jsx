import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import ImpactSection from '../sections/ImpactSection';
import Methodology from '../sections/Methodology';
import FeaturedInsights from '../sections/FeaturedInsights';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <main>
            <Hero />
            <About />
            <Services />
            <ImpactSection />
            <Methodology />
            <FeaturedInsights />
            <Testimonials />
            <Contact />
        </main>
    );
};

export default Home;
