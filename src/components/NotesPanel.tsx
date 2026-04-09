import React from 'react';

interface NotesPanelProps {
  activeDateNode: string | null;
  notesObj: Record<string, string>;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onClose: () => void;
}

const NotesPanel: React.FC<NotesPanelProps> = ({
  activeDateNode,
  notesObj,
  handleNotesChange,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  onClose
}) => {
  return (
    <div className="notes-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
        <h2 className="notes-header">Notes {activeDateNode && `(${activeDateNode})`}</h2>
        <div style={{display: 'flex', gap: '8px'}}>
          <button className="heatmap-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
      <input 
        type="text" 
        className="search-input" 
        placeholder="🔍 Search notes..." 
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
      />
      <textarea 
        className="notes-area" 
        placeholder={activeDateNode ? "Type your notes for this day..." : "Click a day to add notes..."}
        value={activeDateNode ? (notesObj[activeDateNode] || '') : ''}
        onChange={handleNotesChange}
        disabled={!activeDateNode}
      />
      {activeDateNode && (
        <button 
          className="reminder-btn" 
          onClick={() => onClose()}
        >
          💾 Save & Close
        </button>
      )}
    </div>
  );
};

export default NotesPanel;
