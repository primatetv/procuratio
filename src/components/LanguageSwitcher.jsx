import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="globe-btn"
        aria-label="Select Language"
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          <button
            onClick={() => changeLanguage('es')}
            className={`lang-option ${i18n.language.startsWith('es') ? 'active' : ''}`}
          >
            <span className="flag">🇪🇸</span> Español
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`lang-option ${i18n.language.startsWith('en') ? 'active' : ''}`}
          >
            <span className="flag">🇬🇧</span> English
          </button>
          <button
            onClick={() => changeLanguage('it')}
            className={`lang-option ${i18n.language.startsWith('it') ? 'active' : ''}`}
          >
            <span className="flag">🇮🇹</span> Italiano
          </button>
        </div>
      )}

      <style>{`
        .language-switcher {
            position: relative;
            display: flex;
            align-items: center;
        }

        .globe-btn {
            background: none;
            border: none;
            color: var(--color-primary);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .globe-btn:hover {
            background-color: rgba(0, 85, 140, 0.1); /* Light primary bg */
            transform: scale(1.1);
        }

        .lang-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 0.5rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 0.5rem;
            min-width: 140px;
            z-index: 1001;
            border: 1px solid #f0f0f0;
            animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .lang-option {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            width: 100%;
            padding: 0.6rem 1rem;
            border: none;
            background: none;
            color: var(--color-text-body);
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
            text-align: left;
        }

        .lang-option:hover {
            background-color: #f8f9fa;
            color: var(--color-primary);
        }

        .lang-option.active {
            background-color: rgba(0, 85, 140, 0.05); /* Very light primary */
            color: var(--color-primary);
            font-weight: 700;
        }

        .flag {
            font-size: 1.2rem;
            line-height: 1;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
