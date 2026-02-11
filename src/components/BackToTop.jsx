import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            <button
                className={`back-to-top ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label={t('common.backToTop')}
            >
                <ArrowUp size={24} />
            </button>

            <style>{`
                .back-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 2rem;
                    background-color: var(--color-primary);
                    color: white;
                    border: none;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 999;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    border-radius: 50%; /* Make circular */
                }

                .back-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                }

                .back-to-top:hover {
                    background-color: var(--color-gold); /* Gold accent on hover */
                    transform: translateY(-3px);
                    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                }

                @media (max-width: 768px) {
                    .back-to-top {
                        bottom: 25px;
                        right: 1.5rem;
                        width: 50px;
                        height: 50px;
                    }
                }
            `}</style>
        </>
    );
};

export default BackToTop;
