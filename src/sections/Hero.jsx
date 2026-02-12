import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import heroBgVideo from '../assets/hero-bg.mp4';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay-dark"></div>
      </div>

      <div className="container hero-container">
        {/* Changed class from animate-fade-in to animate-slide-right */}
        <div className="hero-content-box animate-slide-right">
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
          <div className="hero-divider"></div>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions">
            <a href="#services" className="btn btn-primary hero-btn">
              {t('hero.cta_services')}
            </a>
            <a href="#contact" className="btn btn-outline hero-btn">
              {t('hero.cta_contact')}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 90vh; /* Tall hero */
          min-height: 600px;
          display: flex;
          align-items: center;
          padding: 0;
          margin-top: 80px; /* Navbar offset */
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* Subtle overlay to ensure text readability if needed, though we use a box */
        .hero-overlay-dark {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.1);
            z-index: 2; /* Ensure overlay is above video */
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          pointer-events: none; /* Let clicks pass through to background if needed, but box needs pointer-events auto */
        }

        .hero-content-box {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 4rem;
          max-width: 650px;
          pointer-events: auto;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-left: 10px solid var(--color-primary);
        }

        /* Animation: Slide from Left */
        .animate-slide-right {
            animation: slideRight 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes slideRight {
            from {
                opacity: 0;
                transform: translateX(-100px); /* Start 100px to the left */
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .hero-title {
          font-size: 3rem;
          color: var(--color-primary);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.5px;
        }

        .hero-divider {
          width: 80px;
          height: 4px;
          background-color: var(--color-primary); /* Navy accent */
          margin-bottom: 2rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--color-text-body);
          margin-bottom: 3rem;
          line-height: 1.8;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .hero-btn {
          min-width: 180px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero-section {
            height: auto;
            min-height: auto;
            display: block;
          }
          
          .hero-bg {
            position: relative;
            height: 300px;
          }

          .hero-content-box {
            position: relative;
            margin-top: -50px; /* Overlap */
            margin-left: 1rem;
            margin-right: 1rem;
            max-width: none;
            padding: 1.5rem; /* Reduced padding */
            margin-bottom: 3rem;
            background: white;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          }

          .hero-title {
            font-size: 1.25rem; /* Drastically reduced font size */
            overflow-wrap: break-word; /* Ensure long words break */
            word-wrap: break-word;
            hyphens: auto; /* Allow hyphenation */
          }

          .hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
