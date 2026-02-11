import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true });

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2 className="section-title">{t('testimonials.title')}</h2>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div className="quote-marker">
                <Quote size={40} strokeWidth={0} fill="currentColor" />
              </div>

              <p className="testimonial-text">
                "{item.text}"
              </p>

              <div className="testimonial-footer">
                <strong className="author-name">{item.author}</strong>
                <span className="author-role">{item.role}, {item.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--color-primary); /* Dark Navy Background */
          padding: 6rem 0;
        }

        .testimonials-section .section-title {
            color: white; /* White title for dark bg */
            border-bottom-color: rgba(255,255,255,0.2);
        }
        
        .testimonials-section .section-title::after {
            background-color: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 2.5rem 2rem;
          border-top: 5px solid #E5C365; /* Top border accent */
          border-left: none; /* Removed left border */
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%;
          transition: transform 0.3s ease;
          border-radius: 4px;
        }

        .testimonial-card:hover {
            transform: translateY(-5px);
        }

        .quote-marker {
            color: var(--color-primary); /* Navy quote icon */
            opacity: 0.1;
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
        }

        .testimonial-text {
          font-style: italic;
          color: #333;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
          font-weight: 500;
          text-align: center;
        }

        .testimonial-footer {
          display: flex;
          flex-direction: column;
          font-size: 0.85rem;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }

        .author-name {
          color: var(--color-primary);
          font-weight: 800;
          margin-bottom: 0.2rem;
          font-size: 0.95rem;
        }

        .author-role {
          color: #666;
          font-size: 0.8rem;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
            .testimonial-card {
                padding: 2rem;
            }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
