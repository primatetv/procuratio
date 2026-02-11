import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      alert(t('contact.form.success'));
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const faqs = t('contact.faq.items', { returnObjects: true });

  return (
    <section id="contact" className="contact-and-faq">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>

        <div className="contact-layout">
          {/* Contact Form */}
          <div className="contact-form-wrapper animate-fade-up">
            <h3>{t('contact.form.title')}</h3>
            <p>{t('contact.form.subtitle')}</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? t('contact.form.submitting') : (
                  <>
                    {t('contact.form.submit')} <Send size={18} style={{ marginLeft: '8px' }} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="faq-container animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3>{t('contact.faq.title')}</h3>
            <div className="accordion">
              {Array.isArray(faqs) && faqs.map((faq, index) => (
                <div key={index} className={`accordion-item ${openFaq === index ? 'active' : ''}`}>
                  <button
                    className="accordion-header"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    {faq.question}
                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className="accordion-content">
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-and-faq {
          background-color: var(--color-white);
          padding-bottom: 6rem;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 3rem;
        }

        .contact-form-wrapper {
          background: var(--color-bg-light);
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .contact-form-wrapper h3 {
          margin-bottom: 0.5rem;
          color: var(--color-primary);
        }

        .contact-form-wrapper p {
          margin-bottom: 2rem;
          color: #666;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--color-secondary);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
        }

        .btn-block {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .faq-container h3 {
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }

        .accordion-item {
          border-bottom: 1px solid #eee;
        }

        .accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 0;
          background: none;
          border: none;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-primary);
          cursor: pointer;
          text-align: left;
          transition: color 0.3s;
        }

        .accordion-header:hover {
          color: var(--color-gold);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0; /* Add opacity transition for extra softness */
        }

        .accordion-item.active .accordion-content {
          max-height: 500px; /* Increased to ensure all content fits */
          opacity: 1;
          transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-in-out;
        }

        .accordion-body {
          padding-bottom: 1.5rem;
          color: #666;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;
