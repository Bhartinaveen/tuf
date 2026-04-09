import React from 'react';

const HangingMechanism: React.FC = () => {
  return (
    <div className="hanging-mechanism">
      <div className="hanging-nail"></div>
      <div className="hanging-string string-left"></div>
      <div className="hanging-string string-right"></div>
      <div className="hanging-bar">
        <div className="hanging-grommet"></div>
        <div className="hanging-grommet"></div>
      </div>
    </div>
  );
};

export default HangingMechanism;
