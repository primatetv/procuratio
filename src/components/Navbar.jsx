import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Search } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.methodology'), href: '#methodology' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="Procuratio" className="logo-img" />
        </Link>

        {/* Desktop Menu */}
        <div className="nav-actions">
          <div className="desktop-menu">
            {navLinks.map((link) => (
              isHome ? (
                <a key={link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.href === '#home' ? '/' : `/${link.href}`} className="nav-link">
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="nav-utilities">
            <button className="icon-btn"><Search size={20} /></button>
            <LanguageSwitcher />
            {isHome ? (
              <a href="#contact" className="btn btn-primary contact-btn">{t('hero.cta_contact')}</a>
            ) : (
              <Link to="/#contact" className="btn btn-primary contact-btn">{t('hero.cta_contact')}</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            isHome ? (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href === '#home' ? '/' : `/${link.href}`}
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: white;
          border-bottom: 1px solid #e5e5e5;
          padding: 0;
          height: 80px;
          display: flex;
          align-items: center;
          transition: box-shadow 0.3s ease;
        }

        .navbar.scrolled {
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .logo-link {
          height: 65px; /* Increased from 45px for better visibility */
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 100%;
          width: auto;
          object-fit: contain;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .desktop-menu {
          display: flex;
          gap: 1.5rem;
          height: 100%;
          align-items: center;
        }

        .nav-link {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          position: relative;
          padding: 1.8rem 0; /* Align with navbar height for hover effects */
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 4px;
          background-color: var(--color-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-utilities {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-left: 1px solid #e5e5e5;
          padding-left: 1.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-primary);
          transition: color 0.2s;
        }

        .icon-btn:hover {
          color: #00558C;
        }

        .contact-btn {
          padding: 0.6rem 1.2rem;
          font-size: 0.8rem;
          border-radius: 0;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          top: 80px; /* Below navbar */
          right: -100%;
          width: 100%;
          height: calc(100vh - 80px);
          background: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: 0.3s ease-in-out;
          border-top: 1px solid #eee;
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-nav-link {
          color: var(--color-primary);
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 1rem;
        }

        @media (max-width: 900px) {
          .desktop-menu, .nav-utilities {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
