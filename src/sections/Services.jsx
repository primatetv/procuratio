import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="services-section">
      <div className="container">
        <h4 className="section-label">{t('services.label')}</h4>
        <h2 className="section-title">{t('services.title')}</h2>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card group">
              <Link to={`/service/${service.id}`} className="block h-full">
                <div className="card-image">
                  <img src={service.image} alt={t(`services.items.${service.id}.title`)} />
                  <div className="image-overlay"></div>

                </div>
                <div className="card-content">
                  <span className="card-category">{t(`services.items.${service.id}.category`)}</span>
                  <h3 className="card-title">{t(`services.items.${service.id}.title`)}</h3>
                  <p className="card-desc">{t(`services.items.${service.id}.shortDesc`)}</p>
                  <div className="card-link">
                    {t('services.readMore')} <ArrowRight size={16} className="arrow-icon" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>


      <style>{`
        .services-section {
          background-color: var(--color-bg-light);
          padding: 6rem 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .section-label {
            color: var(--color-primary);
            font-size: 0.85rem;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            display: block;
        }

        .service-card {
            background: white;
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .service-card:hover {
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            transform: translateY(-5px);
        }

        .card-image {
            height: 200px;
            position: relative;
            overflow: hidden;
        }

        .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .service-card:hover .card-image img {
            transform: scale(1.05);
        }

        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(29, 23, 64, 0.4); /* Navy overlay */
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .service-card:hover .image-overlay {
            opacity: 1;
        }



        .card-content {
            padding: 2.5rem 1.5rem 1.5rem 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .card-category {
            font-size: 0.75rem;
            font-weight: 700;
            color: #999;
            letter-spacing: 1px;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .card-title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: var(--color-primary);
            line-height: 1.3;
            font-weight: 700;
        }

        .card-desc {
            font-size: 0.95rem;
            color: var(--color-text-body);
            margin-bottom: 1.5rem;
            line-height: 1.6;
            flex-grow: 1;
        }

        .card-link {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--color-primary);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: auto;
        }

        .arrow-icon {
            transition: transform 0.3s ease;
        }

        .service-card:hover .arrow-icon {
            transform: translateX(5px);
        }

        @media (max-width: 768px) {
            .services-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </section>
  );
};

export default Services;
