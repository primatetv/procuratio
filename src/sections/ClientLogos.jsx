import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

    // Placeholder logos using text for now
    const clients = [
        { name: "QUIÑENCO", color: "#ccc" },
        { name: "Banchile Inversiones", color: "#ccc" },
        { name: "JUNGHEINRICH", color: "#ccc" },
        { name: "GRUPO CIO", color: "#ccc" },
        { name: "Cushman & Wakefield", color: "#ccc" },
        { name: "Santander", color: "#ccc" },
        { name: "Falabella", color: "#ccc" },
    ];

    return (
        <section className="client-logos-section">
            <div className="container relative">

                {/* Navigation Buttons */}
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

                {/* Carousel Container */}
                <div className="logos-scroll-container" ref={scrollRef}>
                    {clients.map((client, index) => (
                        <div key={index} className="logo-item">
                            <span className="logo-placeholder">{client.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .client-logos-section {
                    background-color: var(--color-primary); /* Dark Navy */
                    padding: 4rem 0;
                    border-top: 1px solid rgba(255,255,255,0.05); /* Subtle separator */
                }

                .relative {
                    position: relative;
                }

                .logos-scroll-container {
                    display: flex;
                    align-items: center;
                    gap: 4rem;
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE/Edge */
                    padding: 1rem 3rem; /* Space for buttons */
                }

                .logos-scroll-container::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }

                .logo-item {
                    flex: 0 0 auto;
                    min-width: 150px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.6;
                    transition: opacity 0.3s ease;
                }

                .logo-item:hover {
                    opacity: 1;
                }

                .logo-placeholder {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    /* Simulating logo fonts */
                    font-family: serif; 
                    letter-spacing: 1px;
                    white-space: nowrap;
                }

                /* Navigation Buttons */
                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #3B82F6; /* Bright Blue */
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    opacity: 0.8;
                    transition: all 0.2s ease;
                }

                .nav-btn:hover {
                    opacity: 1;
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

export default ClientLogos;
