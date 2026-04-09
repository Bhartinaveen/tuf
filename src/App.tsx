import React, { useState, useEffect } from 'react';
import './index.css';
import HangingMechanism from './components/HangingMechanism';
import HeroSection from './components/HeroSection';
import NotesPanel from './components/NotesPanel';
import CalendarGrid from './components/CalendarGrid';

// @ts-ignore
import { MONTHS, HOLIDAYS, SEASONAL_THEMES, getDaysInMonth, playClickSound, loadNotesFromStorage, saveNotesToStorage } from './utils/calendarUtils';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [notesObj, setNotesObj] = useState<Record<string, string>>({});
  const [activeDateNode, setActiveDateNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [slideAnim, setSlideAnim] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const activeTheme = SEASONAL_THEMES[month].theme;
  const heroImage = SEASONAL_THEMES[month].img;

  useEffect(() => {
    setNotesObj(loadNotesFromStorage());
  }, []);

  const saveNotes = (newNotes: Record<string, string>) => {
    setNotesObj(newNotes);
    saveNotesToStorage(newNotes);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeDateNode) return;
    const value = e.target.value;
    saveNotes({ ...notesObj, [activeDateNode]: value });
  };

  const days = getDaysInMonth(year, month);

  const handleMouseDown = (date: Date) => {
    if (!isZoomed) return;
    playClickSound();
    setIsDragging(true);
    setStartDate(date);
    setEndDate(null);
    
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setActiveDateNode(dateKey);
  };

  const handleMouseEnter = (date: Date) => {
    if (isDragging && startDate) {
      if (date >= startDate) {
        setEndDate(date);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      playClickSound();
    }
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideAnim('flip-right');
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }, 450);
    setTimeout(() => setSlideAnim(null), 1000);
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideAnim('flip-left');
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }, 450);
    setTimeout(() => setSlideAnim(null), 1000);
  };

  const handleYearSelect = (newYear: number) => {
    setSlideAnim('flip-left');
    setTimeout(() => {
      setCurrentDate(prev => new Date(newYear, prev.getMonth(), 1));
    }, 450);
    setTimeout(() => setSlideAnim(null), 1000);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  });

  return (
    <div className={`scene-container ${isZoomed ? 'zoomed-in' : 'zoomed-out'} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div 
        className="calendar-wrapper"
        onClick={() => {
          if (!isZoomed) setIsZoomed(true);
        }}
        style={{ cursor: isZoomed ? 'default' : 'pointer', ...activeTheme }}
      >
      {isZoomed && (
        <button 
          className="back-to-wall-btn"
          onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
        >
          &larr; Back to Wall
        </button>
      )}
      
      <HangingMechanism />

      <div className={slideAnim || ''}>
        <HeroSection 
          heroImage={heroImage} 
          year={year} 
          monthName={MONTHS[month]} 
          onPrevMonth={handlePrevMonth} 
          onNextMonth={handleNextMonth} 
          onYearSelect={handleYearSelect}
        />

        <div className="calendar-body">
          <NotesPanel 
            activeDateNode={activeDateNode}
            notesObj={notesObj}
            handleNotesChange={handleNotesChange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onClose={() => setActiveDateNode(null)}
          />

          <CalendarGrid 
            days={days}
            startDate={startDate}
            endDate={endDate}
            notesObj={notesObj}
            activeDateNode={activeDateNode}
            holidays={HOLIDAYS}
            isDragging={isDragging}
            handleMouseDown={handleMouseDown}
            handleMouseEnter={handleMouseEnter}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
