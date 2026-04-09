export const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FIXED_HOLIDAYS = {
  '01-01': "New Year",
  '01-14': "Makar Sankranti",
  '01-26': "Republic Day",
  '02-14': "Valentine's Day",
  '03-08': "Women's Day",
  '03-17': "St. Patrick's Day",
  '04-13': "Vaisakhi",
  '04-14': "Ambedkar Jayanti",
  '04-22': "Earth Day",
  '05-01': "Labor Day",
  '06-21': "Yoga Day",
  '08-15': "Independence Day",
  '10-02': "Gandhi Jayanti",
  '10-31': "Halloween",
  '11-01': "All Saints' Day",
  '12-25': "Christmas",
  '12-31': "NYE"
};

const VARIABLE_HOLIDAYS = {
  // 2024
  '2024-03-08': "Maha Shivaratri", '2024-03-25': "Holi", '2024-03-29': "Good Friday", '2024-03-31': "Easter", '2024-04-10': "Eid al-Fitr", '2024-04-17': "Ram Navami", '2024-04-21': "Mahavir Jayanti", '2024-05-23': "Buddha Purnima", '2024-06-17': "Eid al-Adha", '2024-07-17': "Muharram", '2024-08-19': "Raksha Bandhan", '2024-08-26': "Janmashtami", '2024-09-07': "Ganesh Chaturthi", '2024-10-12': "Dussehra", '2024-10-31': "Diwali", '2024-11-15': "Guru Nanak Jayanti",
  // 2025
  '2025-02-26': "Maha Shivaratri", '2025-03-14': "Holi", '2025-03-31': "Eid al-Fitr", '2025-04-06': "Ram Navami", '2025-04-10': "Mahavir Jayanti", '2025-04-18': "Good Friday", '2025-04-20': "Easter", '2025-05-12': "Buddha Purnima", '2025-06-07': "Eid al-Adha", '2025-07-06': "Muharram", '2025-08-09': "Raksha Bandhan", '2025-08-16': "Janmashtami", '2025-08-27': "Ganesh Chaturthi", '2025-10-02': "Dussehra", '2025-10-20': "Diwali", '2025-11-05': "Guru Nanak Jayanti",
  // 2026
  '2026-02-15': "Maha Shivaratri",
  '2026-03-04': "Holi",
  '2026-03-20': "Eid al-Fitr",
  '2026-03-26': "Ram Navami",
  '2026-03-31': "Mahavir Jayanti",
  '2026-04-03': "Good Friday",
  '2026-04-05': "Easter",
  '2026-05-01': "Buddha Purnima",
  '2026-05-27': "Eid al-Adha",
  '2026-06-26': "Muharram",
  '2026-08-28': "Raksha Bandhan",
  '2026-09-04': "Janmashtami",
  '2026-09-14': "Ganesh Chaturthi",
  '2026-10-20': "Dussehra",
  '2026-11-08': "Diwali",
  '2026-11-24': "Guru Nanak Jayanti",
  // 2027
  '2027-03-06': "Maha Shivaratri", '2027-03-09': "Eid al-Fitr", '2027-03-22': "Holi", '2027-03-26': "Good Friday", '2027-03-28': "Easter", '2027-04-15': "Ram Navami", '2027-04-19': "Mahavir Jayanti", '2027-05-16': "Eid al-Adha", '2027-05-20': "Buddha Purnima", '2027-06-15': "Muharram", '2027-08-17': "Raksha Bandhan", '2027-08-24': "Janmashtami", '2027-09-04': "Ganesh Chaturthi", '2027-10-09': "Dussehra", '2027-10-29': "Diwali", '2027-11-13': "Guru Nanak Jayanti"
};

import Holidays from 'date-holidays';

const hdUS = new Holidays('US');
const hdIN = new Holidays('IN');
const hdGB = new Holidays('GB');

export const HOLIDAYS = new Proxy({}, {
  get: (target, dateKey) => {
    if (typeof dateKey !== 'string') return undefined;
    const parts = dateKey.split('-');
    if (parts.length !== 3) return undefined;
    const mmdd = `${parts[1]}-${parts[2]}`;
    
    // First, check for explicitly mapped major festivals
    let matched = VARIABLE_HOLIDAYS[dateKey] || FIXED_HOLIDAYS[mmdd];
    if (matched) return matched;
    
    // Dynamically fallback to any public/bank holidays worldwide using date-holidays across all years (past/future)
    try {
      const dateObj = new Date(dateKey);
      
      const resIN = hdIN.isHoliday(dateObj);
      if (resIN && resIN.length > 0) return resIN[0].name;
      
      const resUS = hdUS.isHoliday(dateObj);
      if (resUS && resUS.length > 0 && resUS[0].type === 'public') return resUS[0].name;

      const resGB = hdGB.isHoliday(dateObj);
      if (resGB && resGB.length > 0 && resGB[0].type === 'public') return resGB[0].name;
    } catch(e) {}
    
    return undefined;
  }
});

export const SEASONAL_THEMES = [
  { img: '/backgrounds/01_jan.png', theme: { '--primary': '#0284c7', '--range-bg': 'rgba(2, 132, 199, 0.1)' } }, 
  { img: '/backgrounds/02_feb.png', theme: { '--primary': '#c026d3', '--range-bg': 'rgba(192, 38, 211, 0.1)' } }, 
  { img: '/backgrounds/03_mar.png', theme: { '--primary': '#65a30d', '--range-bg': 'rgba(101, 163, 13, 0.1)' } }, 
  { img: '/backgrounds/04_apr.png', theme: { '--primary': '#db2777', '--range-bg': 'rgba(219, 39, 119, 0.1)' } }, 
  { img: '/backgrounds/05_may.png', theme: { '--primary': '#16a34a', '--range-bg': 'rgba(22, 163, 74, 0.1)' } }, 
  { img: '/backgrounds/06_jun.png', theme: { '--primary': '#ca8a04', '--range-bg': 'rgba(202, 138, 4, 0.1)' } }, 
  { img: '/backgrounds/07_jul.png', theme: { '--primary': '#0891b2', '--range-bg': 'rgba(8, 145, 178, 0.1)' } }, 
  { img: '/backgrounds/08_aug.png', theme: { '--primary': '#ea580c', '--range-bg': 'rgba(234, 88, 12, 0.1)' } }, 
  { img: '/backgrounds/09_sep.png', theme: { '--primary': '#d97706', '--range-bg': 'rgba(217, 119, 6, 0.1)' } }, 
  { img: '/backgrounds/10_oct.png', theme: { '--primary': '#c2410c', '--range-bg': 'rgba(194, 65, 12, 0.1)' } }, 
  { img: '/backgrounds/11_nov.png', theme: { '--primary': '#475569', '--range-bg': 'rgba(71, 85, 105, 0.1)' } }, 
  { img: '/backgrounds/12_dec.png', theme: { '--primary': '#4f46e5', '--range-bg': 'rgba(79, 70, 229, 0.1)' } }  
];

export const getDaysInMonth = (y, m) => {
  const date = new Date(y, m, 1);
  const days = [];
  let firstDayShift = date.getDay() - 1;
  if (firstDayShift === -1) firstDayShift = 6; 
  for (let i = 0; i < firstDayShift; i++) {
    days.push(null);
  }
  while (date.getMonth() === m) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  // Force exactly 42 grid cells (6 rows * 7 days) to prevent the DOM height from violently collapsing/expanding
  while (days.length < 42) {
    days.push(null);
  }
  return days;
};

export const playClickSound = () => {
  // Sound disabled per user request
};

export const getIntensityClass = (noteData) => {
  const len = noteData.length;
  if (len > 50) return 'heatmap-high';
  if (len > 15) return 'heatmap-med';
  if (len > 0) return 'heatmap-low';
  return '';
};

export const loadNotesFromStorage = () => {
  const savedNotes = localStorage.getItem('calendar_sticky_notes');
  if (savedNotes) {
    try {
      return JSON.parse(savedNotes);
    } catch (e) {
      console.error("Data Parse Failed - Restoring dictionary");
    }
  }
  return {};
};

export const saveNotesToStorage = (notes) => {
  localStorage.setItem('calendar_sticky_notes', JSON.stringify(notes));
};
