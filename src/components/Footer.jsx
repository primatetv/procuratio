import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Linkedin, Building2 } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const footerLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img src="/src/assets/logo_blanco.png" alt="Procuratio" className="footer-logo" />
            </Link>
            <p className="footer-desc">
              {t('footer.desc')}
            </p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.name}>
                  {isHome ? (
                    <a href={link.href}>{link.name}</a>
                  ) : (
                    <Link to={link.href === '#home' ? '/' : `/${link.href}`}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{t('footer.contact')}</h4>
            <div className="contact-item">
              <Mail size={18} />
              <a href="mailto:info@procuratio.cl">info@procuratio.cl</a>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+56 9 1234 5678</span>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <span>Santiago, Chile</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--color-primary);
          color: var(--color-text-dim);
          padding-top: 5rem;
          padding-bottom: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-logo-link {
          display: inline-block;
          margin-bottom: 0.5rem; /* Reduced margin */
        }

        .footer-logo {
          height: 70px; /* Increased height */
          width: auto;
          object-fit: contain;
        }

        .footer-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 350px;
        }

        .footer h4 {
          color: var(--color-white);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .footer-links ul {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-links a:hover, .footer-contact a:hover {
          color: var(--color-gold);
          text-decoration: none;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }
        
        .contact-item svg {
          color: var(--color-gold);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
