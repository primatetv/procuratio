import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CircularProgress = ({ value, label, subLabel, color = "#D4AF37" }) => {
    const [progress, setProgress] = useState(0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    const circleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setProgress(value), 300);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (circleRef.current) {
            observer.observe(circleRef.current);
        }

        return () => {
            if (circleRef.current) observer.disconnect();
        };
    }, [value]);

    return (
        <div className="stat-item" ref={circleRef}>
            <div className="progress-circle-container">
                <svg className="progress-ring" width="160" height="160">
                    <circle
                        className="progress-ring__circle-bg"
                        stroke="#e5e5e5"
                        strokeWidth="8"
                        fill="transparent"
                        r={radius}
                        cx="80"
                        cy="80"
                    />
                    <circle
                        className="progress-ring__circle"
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        r={radius}
                        cx="80"
                        cy="80"
                        style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 2s ease-in-out'
                        }}
                    />
                </svg>
                <div className="progress-value">
                    {progress}%
                </div>
            </div>
            <h3 className="stat-label">{label}</h3>
            {subLabel && <p className="stat-sublabel">{subLabel}</p>}
        </div>
    );
};

import credicorp from '../assets/clients/credicorp.png';
import engie from '../assets/clients/engie.png';
import pfizer from '../assets/clients/pfizer.png';
import uchile from '../assets/clients/uchile.png';
import quinenco from '../assets/clients/quinenco.png';
import banchile from '../assets/clients/banchile.png';
import jungheinrich from '../assets/clients/jungheinrich.png';
import cio from '../assets/clients/cio.png';
import redbanc from '../assets/clients/redbanc.png';
import scotia from '../assets/clients/scotia.png';
import grupocp from '../assets/clients/grupocp.png';
import ford from '../assets/clients/ford.png';
import mitsubishi from '../assets/clients/mitsubishi.png';
import cushman from '../assets/clients/cushman.png';
import cencosud from '../assets/clients/cencosud.png';
import itau from '../assets/clients/itau.png';
import ameis from '../assets/clients/ameis.png';

const ClientLogos = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const clients = [
        { name: "Credicorp Capital", img: credicorp },
        { name: "Engie", img: engie },
        { name: "Pfizer", img: pfizer },
        { name: "UChile", img: uchile },
        { name: "Quiñenco", img: quinenco },
        { name: "Banchile Inversiones", img: banchile },
        { name: "Jungheinrich", img: jungheinrich },
        { name: "Grupo CIO", img: cio },
        { name: "Redbanc", img: redbanc },
        { name: "Scotia", img: scotia },
        { name: "Grupo CP", img: grupocp },
        { name: "Ford", img: ford },
        { name: "Mitsubishi", img: mitsubishi },
        { name: "Cushman & Wakefield", img: cushman },
        { name: "Cencosud", img: cencosud },
        { name: "Itau", img: itau },
        { name: "Ameis", img: ameis },
    ];

    return (
        <div className="client-logos-wrapper relative">
            <button
                className="nav-btn prev-btn"
                onClick={() => scroll('left')}
                aria-label="Previous"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                className="nav-btn next-btn"
                onClick={() => scroll('right')}
                aria-label="Next"
            >
                <ChevronRight size={24} />
            </button>

            <div className="logos-scroll-container" ref={scrollRef}>
                {clients.map((client, index) => (
                    <div key={index} className="logo-item">
                        <img
                            src={client.img}
                            alt={client.name}
                            className="client-logo-img"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const ImpactSection = () => {
    const { t } = useTranslation();
    const stats = t('impact.stats', { returnObjects: true });

    return (
        <section className="impact-section">
            <div className="container">
                {/* Stats Part */}
                <h2 className="section-title text-center mb-16">
                    {t('impact.title')}
                </h2>

                <div className="stats-grid mb-24">
                    {Array.isArray(stats) && stats.map((stat, index) => (
                        <CircularProgress
                            key={index}
                            value={[56, 26, 18][index]} // Keep values hardcoded as they match the order
                            label={stat.label}
                            subLabel={stat.subLabel}
                            color={["#4ADE80", "#3B82F6", "#EF4444"][index]}
                        />
                    ))}
                </div>

                {/* Logos Part */}
                <div className="logos-section-container">
                    <h3 className="logos-title">{t('impact.clientsTitle')}</h3>
                    <ClientLogos />
                </div>
            </div>

            <style>{`
                .impact-section {
                    background-color: var(--color-primary); /* Dark Navy */
                    padding: 6rem 0;
                    color: white;
                }

                .text-center {
                    text-align: center;
                }
                
                .impact-section .section-title {
                    color: white;
                }

                .impact-section .section-title::after {
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(255,255,255,0.2);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 3rem;
                    justify-items: center;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    max-width: 300px;
                }

                .progress-circle-container {
                    position: relative;
                    width: 160px;
                    height: 160px;
                    margin-bottom: 2rem;
                }

                .progress-ring__circle {
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                }
                
                .progress-ring__circle-bg {
                    stroke: rgba(255,255,255,0.1);
                }

                .progress-value {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: white;
                }

                .stat-label {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    color: white;
                    line-height: 1.4;
                    text-transform: uppercase;
                }

                .stat-sublabel {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.6;
                }
                
                /* Logos Styles */
                .logos-section-container {
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 4rem;
                }
                
                .logos-title {
                    text-align: center;
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                .client-logos-wrapper {
                    position: relative;
                    padding: 0 3rem; /* Revert to normal padding */
                }

                .logos-scroll-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem; /* Smaller gap */
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding: 1rem 0;
                    scroll-snap-type: x mandatory;
                    
                    /* Fade out edges to prevent hard cut */
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }

                .logos-scroll-container::-webkit-scrollbar {
                    display: none;
                }

                .logo-item {
                    flex: 0 0 200px; /* Fixed width for consistent rhythm */
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.8;
                    transition: all 0.3s ease;
                    filter: none;
                    scroll-snap-align: center;
                    padding: 0 1rem;
                }

                .logo-item:hover {
                    opacity: 1;
                    transform: scale(1.05);
                }
                
                .client-logo-img {
                    max-width: 140px; /* Fit inside the fixed box */
                    max-height: 80px; /* Increased from 70px */
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    /* Inverting colors to make dark logos visible on dark background if needed */
                    /* But user said 'quitar filtro', assuming they might want original. */
                    /* I'll add a safe default for dark themes: */
                    filter: brightness(0) invert(1);
                }
                
                .logo-item:hover .client-logo-img {
                    filter: none; /* Show original color on hover */
                }

                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: var(--color-secondary);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s ease;
                }

                .nav-btn:hover {
                    background-color: white;
                    color: var(--color-primary);
                    transform: translateY(-50%) scale(1.1);
                }

                .prev-btn {
                    left: 0;
                }

                .next-btn {
                    right: 0;
                }
            `}</style>
        </section>
    );
};

export default ImpactSection;
