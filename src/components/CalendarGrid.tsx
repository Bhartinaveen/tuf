import React, { type TouchEvent } from 'react';

interface CalendarGridProps {
  days: (Date | null)[];
  startDate: Date | null;
  endDate: Date | null;
  notesObj: Record<string, string>;
  activeDateNode: string | null;
  holidays: Record<string, string>;
  isDragging: boolean;
  handleMouseDown: (date: Date) => void;
  handleMouseEnter: (date: Date) => void;
  searchQuery: string;
}

// @ts-ignore
import { DAYS_OF_WEEK } from '../utils/calendarUtils';

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days, startDate, endDate, notesObj, activeDateNode, holidays, isDragging, handleMouseDown, handleMouseEnter, searchQuery
}) => {
  
  const isSelected = (date: Date) => {
    return (startDate && date.getTime() === startDate.getTime()) ||
           (endDate && date.getTime() === endDate.getTime());
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };



  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const elem = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elem) {
      const dateStr = elem.getAttribute('data-date');
      if (dateStr) {
        handleMouseEnter(new Date(dateStr));
      }
    }
  };

  return (
    <div className="grid-container">
      <div className="days-header">
        {DAYS_OF_WEEK.map((day: any) => <span key={day}>{day}</span>)}
      </div>
      <div 
        className="days-grid"
        onTouchMove={handleTouchMove}
        style={{ touchAction: 'none' }}
      >
        {days.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} className="day-cell empty" />;
          
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const isStart = startDate && date.getTime() === startDate.getTime();
          const isEnd = endDate && date.getTime() === endDate.getTime();
          
          const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          const holidayName = holidays[dateKey];
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const hasNote = notesObj[dateKey] && notesObj[dateKey].trim() !== '';
          const isSearchMatch = searchQuery.trim() !== '' && hasNote && notesObj[dateKey].toLowerCase().includes(searchQuery.toLowerCase());

          let classes = 'day-cell';
          if (selected) classes += ' selected';
          if (inRange) classes += ' in-range';
          if (isStart) classes += ' range-start';
          if (isEnd) classes += ' range-end';
          if (holidayName) classes += ' holiday';
          if (isToday(date)) classes += ' today';
          if (isWeekend) classes += ' weekend';
          if (activeDateNode === dateKey) classes += ' active-note-node';
          if (isSearchMatch) classes += ' search-match';

          const dynamicTitle = []
          if (holidayName) dynamicTitle.push(`🎉 ${holidayName}`);
          if (hasNote) dynamicTitle.push(`📝 ${notesObj[dateKey]}`);

          return (
            <div 
              key={date.toISOString()} 
              data-date={date.toISOString()}
              className={classes}
              onMouseDown={() => handleMouseDown(date)}
              onMouseEnter={() => handleMouseEnter(date)}
              onTouchStart={() => handleMouseDown(date)}
              title={dynamicTitle.length > 0 ? dynamicTitle.join('\n') : undefined}
            >
              {date.getDate()}
              {holidayName && (
                <>
                  <div className="festival-dot" />
                  <div className="holiday-text">{holidayName}</div>
                </>
              )}
              {hasNote && <div className="note-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
