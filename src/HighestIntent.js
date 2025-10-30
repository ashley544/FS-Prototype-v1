import React from 'react';
import './HighestIntent.css';

const HighestIntent = () => {
  // Sample data for highest intent rankings
  const intentData = [
    {
      name: "Sustainability at Flagships",
      value: 56
    },
    {
      name: "Redefining Client Interaction",
      value: 42
    },
    {
      name: "Flagships & Luxury Retail: Intelligent Clienteling",
      value: 41
    },
    {
      name: "The Flagships Apex Tier",
      value: 29
    },
    {
      name: "Benchmarking Flagships: Preqin and CapIQ",
      value: 29
    },
    {
      name: "Flagships Home Page",
      value: 29
    }
  ];

  return (
    <div className="highest-intent">
      <div className="intent-header">
        <div className="intent-title-section">
          <h3 className="intent-title">Highest Intent</h3>
          <p className="intent-subtitle">Total Intent Signals</p>
        </div>
        <button className="expand-button">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5.5 8.29906L11 14.4581L16.5 8.29906" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="intent-list">
        {intentData.map((item, index) => (
          <div key={index} className="intent-item">
            <span className="intent-name">{item.name}</span>
            <span className="intent-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestIntent;
