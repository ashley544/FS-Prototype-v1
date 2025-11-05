import React from 'react';
import './Fund.css';

const Fund = ({ onClick }) => {
  // Pie chart data - using SVG to create a pie chart
  // Sizes: 50%, 20%, 30% (normalized to add up to 100%)
  // But the design shows 50%, 20%, 45% which suggests they might be relative to different totals
  // For visualization, I'll use approximate angles based on the design
  
  const pieData = [
    { label: 'High interest in public material', percentage: 50, color: '#D9D9D9' },
    { label: 'Investors with no BX exposure', percentage: 20, color: 'rgba(0, 0, 0, 0.43)' },
    { label: 'Existing BX Investors', percentage: 30, color: '#000000' }, // Adjusted to fit
  ];


  // Calculate angles for pie chart based on the design
  // The design shows approximate segments that should add up visually
  // Segment 1: ~50% (largest segment, gray)
  // Segment 2: ~20% (smaller segment, black with opacity)
  // Segment 3: ~30% (medium segment, black)
  const angles = [
    { start: 0, end: 180, percentage: 50 }, // 50% (180 degrees, starts at top)
    { start: 180, end: 252, percentage: 20 }, // 20% (72 degrees)
    { start: 252, end: 360, percentage: 30 }, // 30% (108 degrees)
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
    <div className={`fund ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <div className="fund-header">
        <h2 className="fund-title">Data center fund prospects</h2>
        <div className="fund-divider"></div>
      </div>

      <div className="fund-content">
        <div className="fund-chart-section">
          <div className="fund-legend">
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
                  d={createRingArc(angle.start, angle.end)}
                  fill={pieData[index].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          <div className="fund-prospects">
            <p className="prospects-text">6218 prospects for the BX Evergreen data center opportunity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fund;

