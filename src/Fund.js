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
                  d={createArc(angle.start, angle.end)}
                  fill={pieData[index].color}
                  stroke="#ffffff"
                  strokeWidth="6"
                />
              ))}
              {/* Percentage labels positioned approximately as in design */}
              {/* Label for 50% segment (top, gray) */}
              <text x="150" y="115" textAnchor="middle" className="pie-label" fill="#666666" fontSize="14" fontWeight="500">50%</text>
              {/* Label for 20% segment (right side, black with opacity) */}
              <text x="265" y="125" textAnchor="middle" className="pie-label" fill="#000000" fontSize="14" fontWeight="500">20%</text>
              {/* Label for 45% segment (bottom, appears in design but may be relative) */}
              <text x="155" y="325" textAnchor="middle" className="pie-label" fill="#666666" fontSize="14" fontWeight="500">45%</text>
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

