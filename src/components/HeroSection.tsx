import React, { useState, useRef, useEffect } from 'react';

interface HeroSectionProps {
  heroImage: string;
  year: number;
  monthName: string;
  onPrevMonth: (e: React.MouseEvent) => void;
  onNextMonth: (e: React.MouseEvent) => void;
  onYearSelect: (year: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, year, monthName, onPrevMonth, onNextMonth, onYearSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When expanding we might want to auto scroll to the selected year, but we keep it simple for now
  return (
    <div className="hero-section">
      <img src={heroImage} alt="Calendar Season Hero" className="hero-image" />
      <div className="hero-overlay">
        <div className="month-year-display">
          <div className="custom-year-selector" style={{ marginBottom: '6px', textAlign: 'center', position: 'relative' }} ref={dropdownRef}>
            <button 
              className="custom-year-btn" 
              onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
            >
              {year} <span className={`arrow ${isDropdownOpen ? 'up' : ''}`}>▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="custom-year-dropdown">
                {Array.from({ length: 151 }, (_, i) => 1950 + i).map(y => (
                  <div 
                    key={y} 
                    className={`year-item ${y === year ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onYearSelect(y);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {y}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="month-navigation">
            <button className="month-nav-btn" onClick={onPrevMonth}>&lsaquo;</button>
            <span className="month-text">{monthName}</span>
            <button className="month-nav-btn" onClick={onNextMonth}>&rsaquo;</button>
          </div>
        </div>
      </div>
      <div className="hero-decoration"></div>
    </div>
  );
};

export default HeroSection;
