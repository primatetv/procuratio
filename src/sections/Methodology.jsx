import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Methodology = () => {
  const { t } = useTranslation();
  // State to control each element individually for guaranteed sequencing
  const [titleVisible, setTitleVisible] = useState(false);
  const [step1Visible, setStep1Visible] = useState(false);
  const [div1Visible, setDiv1Visible] = useState(false);
  const [step2Visible, setStep2Visible] = useState(false);
  const [div2Visible, setDiv2Visible] = useState(false);
  const [step3Visible, setStep3Visible] = useState(false);

  const steps = t('methodology.steps', { returnObjects: true });

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Overlapping Sequence
          // Gaps of 300ms create a nice cascade effect

          // 0ms: Title
          setTitleVisible(true);

          // 300ms: Step 1 (Starts while title is animating)
          setTimeout(() => setStep1Visible(true), 300);

          // 600ms: Divider 1
          setTimeout(() => setDiv1Visible(true), 600);

          // 900ms: Step 2
          setTimeout(() => setStep2Visible(true), 900);

          // 1200ms: Divider 2
          setTimeout(() => setDiv2Visible(true), 1200);

          // 1500ms: Step 3
          setTimeout(() => setStep3Visible(true), 1500);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="methodology" className="methodology-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${titleVisible ? 'animate-active' : ''}`}>
          {t('methodology.title')}
        </h2>

        <div className="steps-wrapper">
          <div className={`step-card ${step1Visible ? 'animate-active' : ''}`}>
            <div className="step-number">01</div>
            <h3>{steps[0]?.title}</h3>
            <p>{steps[0]?.desc}</p>
          </div>

          <div className={`step-divider ${div1Visible ? 'animate-active' : ''}`}></div>

          <div className={`step-card ${step2Visible ? 'animate-active' : ''}`}>
            <div className="step-number">02</div>
            <h3>{steps[1]?.title}</h3>
            <p>{steps[1]?.desc}</p>
          </div>

          <div className={`step-divider ${div2Visible ? 'animate-active' : ''}`}></div>

          <div className={`step-card ${step3Visible ? 'animate-active' : ''}`}>
            <div className="step-number">03</div>
            <h3>{steps[2]?.title}</h3>
            <p>{steps[2]?.desc}</p>
          </div>
        </div>
      </div>

      <style>{`
        .methodology-section {
          background-color: white; /* Changed from variable to white */
          color: var(--color-text-body); /* Changed from white to body text */
          padding: 5rem 0;
          min-height: auto;
        }

        .methodology-section .section-title {
            color: var(--color-primary); /* Dark Navy */
            border-bottom-color: rgba(29, 23, 64, 0.1); /* Faint Navy */
            text-align: center;
            opacity: 0;
            margin-bottom: 3rem;
        }
        
        .methodology-section .section-title.animate-active {
            animation: fadeInUp 1.2s ease forwards;
        }
        
        .methodology-section .section-title::after {
            background-color: var(--color-primary); /* Dark Navy */
            left: 50%;
            transform: translateX(-50%);
        }

        .steps-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 2rem;
            max-width: 1000px;
            margin-left: auto;
            margin-right: auto;
        }

        .step-card {
            flex: 1;
            text-align: center;
            padding: 0 1rem;
            opacity: 0;
        }

        /* 1.2s duration allows for smoother overlap */
        .step-card.animate-active {
            animation: catchUpFade 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .step-number {
            font-size: 3.5rem;
            font-weight: 800;
            color: rgba(29, 23, 64, 0.25); /* Increased for better visibility */
            line-height: 1;
            margin-bottom: 1rem;
            transition: transform 0.3s ease, color 0.3s ease;
        }

        .step-card:hover .step-number {
             transform: scale(1.1);
             color: rgba(29, 23, 64, 0.40); /* Darker on hover */
        }

        .step-card h3 {
            color: var(--color-primary); /* Dark Navy */
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .step-card p {
            color: var(--color-text-body); /* Gray */
            font-size: 0.95rem;
        }

        .step-divider {
            width: 1px;
            height: 100px;
            background: rgba(29, 23, 64, 0.1); /* Faint Navy */
            align-self: center;
            opacity: 0;
        }

        .step-divider.animate-active {
            animation: expandHeight 1.2s ease forwards;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes catchUpFade {
            0% {
                opacity: 0;
                transform: translateY(80px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes expandHeight {
            0% {
                height: 0;
                opacity: 0;
            }
            100% {
                height: 100px;
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .steps-wrapper {
                flex-direction: column;
                gap: 3rem;
            }
            .step-divider {
                width: 100px;
                height: 1px;
            }
            @keyframes expandHeight {
                from { width: 0; opacity: 0; }
                to { width: 100px; opacity: 1; }
            }
        }
      `}</style>
    </section>
  );
};

export default Methodology;
