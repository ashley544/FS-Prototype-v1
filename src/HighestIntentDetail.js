import React from 'react';
import './HighestIntentDetail.css';

const HighestIntentDetail = () => {
  const investors = [
    { name: 'Nathaniel Reed', fund: 'BX IV, BX V' },
    { name: 'Clara Simmons', fund: 'BPP' },
    { name: 'Victor Grant', fund: 'BPP' },
    { name: 'Isabella Hayes', fund: 'Blackstone Alts ETF' },
    { name: 'Oliver King', fund: 'Blackstone Alts ETC' },
    { name: 'Chloe Zhang', fund: 'BX V, BX VI' },
  ];

  return (
    <div className="highest-intent-detail">
      <div className="highest-intent-detail-header">
        <div className="highest-intent-title-section">
          <h2 className="highest-intent-title">Highest Intent</h2>
          <p className="highest-intent-subtitle">Overall intent</p>
        </div>
        <button className="highest-intent-dropdown">
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 8.29906L5.5 15.4581H16.5L11 8.29906Z" fill="#000000"/>
          </svg>
        </button>
      </div>
      <div className="highest-intent-divider"></div>
      <div className="highest-intent-list">
        {investors.map((investor, index) => (
          <div key={index} className="highest-intent-item">
            <span className="investor-name">{investor.name}</span>
            <span className="investor-fund">· {investor.fund}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestIntentDetail;

