import React from 'react';
import './FundDetail.css';

const FundDetail = () => {
  const pieData = [
    { label: 'High interest in public material', percentage: 50, color: '#D9D9D9' },
    { label: 'Investors with no BX exposure', percentage: 20, color: 'rgba(0, 0, 0, 0.43)' },
    { label: 'Existing BX Investors', percentage: 30, color: '#000000' },
  ];

  const angles = [
    { start: 0, end: 180, percentage: 50 },
    { start: 180, end: 252, percentage: 20 },
    { start: 252, end: 360, percentage: 30 },
  ];

  const exposureData = [
    { fund: 'BX IV', value: 621 },
    { fund: 'BX V', value: 405 },
    { fund: 'BX VI', value: 112 },
    { fund: 'Blackstone Alts ETF', value: 89 },
    { fund: 'BPP', value: 70 },
  ];

  const radius = 100;
  const centerX = 150;
  const centerY = 150;

  const createArc = (startAngle, endAngle) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(start);
    const y1 = centerY + radius * Math.sin(start);
    const x2 = centerX + radius * Math.cos(end);
    const y2 = centerY + radius * Math.sin(end);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="fund-detail">
      <div className="fund-detail-header">
        <h2 className="fund-detail-title">Data center fund prospects</h2>
        <div className="fund-detail-divider"></div>
      </div>

      <div className="fund-detail-content">
        <div className="fund-detail-legend">
          <span className="legend-label">Viewership</span>
          <div className="legend-items">
            {pieData.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="legend-text">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pie-chart-container">
          <svg width="300" height="300" viewBox="0 0 300 300" className="pie-chart-svg">
            {angles.map((angle, index) => (
              <path
                key={index}
                d={createArc(angle.start, angle.end)}
                fill={pieData[index].color}
                stroke="#ffffff"
                strokeWidth="6"
              />
            ))}
            <text x="150" y="115" textAnchor="middle" className="pie-label" fill="#666666" fontSize="14" fontWeight="500">50%</text>
            <text x="265" y="125" textAnchor="middle" className="pie-label" fill="#000000" fontSize="14" fontWeight="500">20%</text>
            <text x="155" y="325" textAnchor="middle" className="pie-label" fill="#666666" fontSize="14" fontWeight="500">45%</text>
          </svg>
        </div>

        <div className="fund-breakdown">
          <div className="breakdown-header">
            <div className="breakdown-indicator"></div>
            <span className="breakdown-title">Existing BX Investors' Exposure</span>
          </div>
          <div className="breakdown-list">
            {exposureData.map((item, index) => (
              <div key={index} className="breakdown-item">
                <span className="breakdown-fund">{item.fund}</span>
                <span className="breakdown-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;

