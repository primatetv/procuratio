import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Target, Heart, Users, Award } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-layout">
          <div className="about-content">
            <h4 className="section-label">{t('about.label')}</h4>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="about-lead">
              <Trans i18nKey="about.lead">
                En <strong>PROCURATIO</strong>, combinamos experiencia y profesionalismo para gestionar sus activos con la máxima eficiencia.
              </Trans>
            </p>
            <p className="about-text">
              {t('about.text')}
            </p>

            <div className="values-grid">
              <div className="value-item">
                <Target size={24} className="value-icon" />
                <div>
                  <h5>{t('about.mission.title')}</h5>
                  <p>{t('about.mission.desc')}</p>
                </div>
              </div>
              <div className="value-item">
                <Award size={24} className="value-icon" />
                <div>
                  <h5>{t('about.culture.title')}</h5>
                  <p>{t('about.culture.desc')}</p>
                </div>
              </div>
              <div className="value-item">
                <Heart size={24} className="value-icon" />
                <div>
                  <h5>{t('about.values.title')}</h5>
                  <p>{t('about.values.desc')}</p>
                </div>
              </div>
            </div>

            <a href="#contact" className="btn btn-outline about-btn">{t('about.cta')}</a>
          </div>

          <div className="about-image">
            <img src="/src/assets/service-corp.png" alt="Corporate Team" />
            <div className="image-accent-box"></div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: white;
          padding: 6rem 0;
        }

        .about-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .section-label {
            color: var(--color-primary);
            font-size: 0.85rem;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .about-lead {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            color: var(--color-primary);
            font-weight: 500;
        }

        .about-text {
            color: var(--color-text-body);
            margin-bottom: 2.5rem;
            font-size: 1rem;
        }

        .values-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-bottom: 3rem;
            border-top: 1px solid #eee;
            padding-top: 2rem;
        }

        .value-item {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }

        .value-icon {
            color: var(--color-primary);
            flex-shrink: 0;
            margin-top: 3px;
        }

        .value-item h5 {
            font-size: 1rem;
            margin-bottom: 0.2rem;
            color: var(--color-primary);
        }

        .value-item p {
            font-size: 0.9rem;
            color: var(--color-text-body);
        }

        .about-image {
            position: relative;
            height: 600px;
        }

        .about-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
            z-index: 2;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .image-accent-box {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 50%;
            height: 50%;
            background-color: var(--color-bg-light);
            z-index: 1;
        }

        @media (max-width: 900px) {
            .about-layout {
                grid-template-columns: 1fr;
            }
            .about-image {
                height: 400px;
                order: -1;
            }
        }
      `}</style>
    </section>
  );
};

export default About;
