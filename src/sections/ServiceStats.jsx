import React, { useEffect, useState, useRef } from 'react';

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
                        stroke="rgba(255,255,255,0.1)"
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

const ServiceStats = () => {
    return (
        <section className="service-stats-section">
            <div className="container">
                <h2 className="section-title text-center text-white mb-12">
                    LO QUE NUESTROS CLIENTES NOS ESTÁN CONTRATANDO:
                </h2>

                <div className="stats-grid">
                    <CircularProgress
                        value={56}
                        label="Gestión de Proyectos y Obras"
                        subLabel="Administración de proyectos de construcción y habilitación."
                        color="#4ADE80" // Greenish like the image
                    />
                    <CircularProgress
                        value={26}
                        label="Administración y Operación de Inmuebles Comerciales"
                        subLabel="Gestión integral de activos y servicios."
                        color="#3B82F6" // Blueish like the image
                    />
                    <CircularProgress
                        value={18}
                        label="Consultoría Inmobiliaria, Corretaje, Tasaciones"
                        subLabel="Asesoría experta en valoración y transacciones."
                        color="#EF4444" // Reddish like the image
                    />
                </div>
            </div>

            <style>{`
                .service-stats-section {
                    background-color: var(--color-primary); /* Dark Navy */
                    padding: 6rem 0;
                    color: white;
                }

                .text-center {
                    text-align: center;
                }
                
                .text-white {
                    color: white !important;
                }
                
                .service-stats-section .section-title::after {
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
                }

                .stat-sublabel {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.6;
                }
            `}</style>
        </section>
    );
};

export default ServiceStats;
