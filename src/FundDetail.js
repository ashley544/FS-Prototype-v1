import React, { useState } from 'react';
import './FundDetail.css';

const FundDetail = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
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

  const outerRadius = 100;
  const innerRadius = 60; // Inner radius for ring shape
  const centerX = 150;
  const centerY = 150;

  const createRingArc = (startAngle, endAngle) => {
    // Convert angles to radians, adjusting for SVG coordinate system (0° at top)
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    // Outer arc points
    const outerX1 = centerX + outerRadius * Math.cos(startRad);
    const outerY1 = centerY + outerRadius * Math.sin(startRad);
    const outerX2 = centerX + outerRadius * Math.cos(endRad);
    const outerY2 = centerY + outerRadius * Math.sin(endRad);
    
    // Inner arc points
    const innerX1 = centerX + innerRadius * Math.cos(startRad);
    const innerY1 = centerY + innerRadius * Math.sin(startRad);
    const innerX2 = centerX + innerRadius * Math.cos(endRad);
    const innerY2 = centerY + innerRadius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    // Create ring path: outer arc -> line to inner arc -> inner arc -> close
    return `M ${outerX1} ${outerY1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerX2} ${outerY2} L ${innerX2} ${innerY2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerX1} ${innerY1} Z`;
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
            {angles.map((angle, index) => {
              const midAngle = (angle.start + angle.end) / 2;
              const midRad = (midAngle - 90) * (Math.PI / 180);
              const tooltipRadius = (outerRadius + innerRadius) / 2;
              const tooltipX = centerX + tooltipRadius * Math.cos(midRad);
              const tooltipY = centerY + tooltipRadius * Math.sin(midRad);
              
              return (
                <path
                  key={index}
                  d={createRingArc(angle.start, angle.end)}
                  fill={pieData[index].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  onMouseEnter={() => {
                    setHoveredSegment(index);
                    setTooltipPosition({ x: tooltipX, y: tooltipY });
                  }}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}
            {hoveredSegment !== null && (
              <text
                x={tooltipPosition.x}
                y={tooltipPosition.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pie-chart-tooltip"
                fontSize="14"
                fontWeight="500"
                fill={pieData[hoveredSegment].color === '#000000' || pieData[hoveredSegment].color === 'rgba(0, 0, 0, 0.43)' ? '#ffffff' : '#1d1d1f'}
              >
                {angles[hoveredSegment].percentage}%
              </text>
            )}
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

