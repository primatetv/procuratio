import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const FeaturedInsights = () => {
    const { t } = useTranslation();
    const insights = t('insights.items', { returnObjects: true });

    return (
        <section className="insights-section">
            <div className="container">
                <div className="section-header-flex">
                    <h2 className="section-title" style={{ marginBottom: 0 }}>{t('insights.title')}</h2>
                    <a href="#" className="view-all-link">{t('insights.viewAll')} <ArrowRight size={16} /></a>
                </div>

                <div className="insights-grid">
                    {Array.isArray(insights) && insights.map((item, index) => (
                        <div key={index} className="insight-card">
                            <div className="insight-image">
                                <img src={[
                                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
                                    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
                                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
                                ][index]} alt={item.title} />
                            </div>
                            <div className="insight-content">
                                <div className="insight-meta">
                                    <span className="insight-cat">{item.category}</span>
                                    <span className="insight-date">{item.date}</span>
                                </div>
                                <h3 className="insight-title">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .insights-section {
          background-color: #F4F4F4;
          padding: 6rem 0;
        }

        .section-header-flex {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 3rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #ddd;
        }

        .view-all-link {
            color: var(--color-primary);
            font-weight: 700;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
        }

        .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .insight-card {
            background: transparent;
            cursor: pointer;
            group: ;
        }

        .insight-image {
            height: 250px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }

        .insight-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .insight-card:hover .insight-image img {
            transform: scale(1.05);
        }

        .insight-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.8rem;
            font-size: 0.75rem;
            font-weight: 700;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .insight-cat {
            color: var(--color-primary);
        }

        .insight-title {
            font-size: 1.4rem;
            color: var(--color-text-dark);
            line-height: 1.3;
            transition: color 0.2s;
        }

        .insight-card:hover .insight-title {
            color: var(--color-primary);
        }
      `}</style>
        </section>
    );
};

export default FeaturedInsights;
