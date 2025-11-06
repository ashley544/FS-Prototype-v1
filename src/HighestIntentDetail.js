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
        <h2 className="highest-intent-title">Highest Intent</h2>
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

