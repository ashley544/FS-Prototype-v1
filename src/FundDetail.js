import React, { useState } from 'react';
import './FundDetail.css';

const FundDetail = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

        <div className="fund-detail-main-row">
          <div className="fund-detail-chart-section">
            <div className="pie-chart-container">
            <svg width="300" height="300" viewBox="0 0 300 300" className="pie-chart-svg">
              {angles.map((angle, index) => {
                const midAngle = (angle.start + angle.end) / 2;
                const midRad = (midAngle - 90) * (Math.PI / 180);
                
                // Calculate expanded radius for hover effect
                const isHovered = hoveredIndex === index;
                const currentOuterRadius = isHovered ? outerRadius + 8 : outerRadius;
                const currentInnerRadius = isHovered ? innerRadius + 8 : innerRadius;
                
                // Calculate label position to the side of the segment
                // Position label outside the chart, offset from the outer edge
                const labelOffset = 10; // Distance from outer edge
                
                // Calculate Y position to align vertically with the segment's midpoint
                const radialY = centerY + (currentOuterRadius + labelOffset) * Math.sin(midRad);
                const labelY = radialY;
                
                // Position labels based on segment: 20% and 30% on left, 50% on right
                const percentage = angles[index].percentage;
                const isLeftSide = percentage === 20 || percentage === 30;
                
                // Position labels to the left or right side of the chart
                const labelX = isLeftSide 
                  ? centerX - currentOuterRadius - labelOffset - 5  // Left side
                  : centerX + currentOuterRadius + labelOffset + 5; // Right side
                
                // Use appropriate text alignment
                const textAnchor = isLeftSide ? 'end' : 'start';
                
                // Create expanded arc path for hover
                const createExpandedRingArc = (startAngle, endAngle) => {
                  const startRad = (startAngle - 90) * (Math.PI / 180);
                  const endRad = (endAngle - 90) * (Math.PI / 180);
                  
                  const outerX1 = centerX + currentOuterRadius * Math.cos(startRad);
                  const outerY1 = centerY + currentOuterRadius * Math.sin(startRad);
                  const outerX2 = centerX + currentOuterRadius * Math.cos(endRad);
                  const outerY2 = centerY + currentOuterRadius * Math.sin(endRad);
                  
                  const innerX1 = centerX + currentInnerRadius * Math.cos(startRad);
                  const innerY1 = centerY + currentInnerRadius * Math.sin(startRad);
                  const innerX2 = centerX + currentInnerRadius * Math.cos(endRad);
                  const innerY2 = centerY + currentInnerRadius * Math.sin(endRad);
                  
                  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                  
                  return `M ${outerX1} ${outerY1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArc} 1 ${outerX2} ${outerY2} L ${innerX2} ${innerY2} A ${currentInnerRadius} ${currentInnerRadius} 0 ${largeArc} 0 ${innerX1} ${innerY1} Z`;
                };
                
                return (
                  <g key={index}>
                    <path
                      d={isHovered ? createExpandedRingArc(angle.start, angle.end) : createRingArc(angle.start, angle.end)}
                      fill={pieData[index].color}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? "3" : "2"}
                      onMouseEnter={() => {
                        setHoveredSegment(index);
                        setHoveredIndex(index);
                        // Calculate label position for tooltip
                        const tooltipY = centerY + (currentOuterRadius + labelOffset) * Math.sin(midRad);
                        const percentage = angles[index].percentage;
                        const isLeftSide = percentage === 20 || percentage === 30;
                        const tooltipX = isLeftSide 
                          ? centerX - currentOuterRadius - labelOffset - 5
                          : centerX + currentOuterRadius + labelOffset + 5;
                        setTooltipPosition({ x: tooltipX, y: tooltipY });
                      }}
                      onMouseLeave={() => {
                        setHoveredSegment(null);
                        setHoveredIndex(null);
                      }}
                      style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transformOrigin: `${centerX}px ${centerY}px`
                      }}
                      className="pie-segment"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          </div>

          <div className="fund-detail-right-column">
            <div className="fund-detail-info-section">
              {hoveredIndex !== null && (
                <div className="pie-chart-hover-info">
                  <div className="pie-chart-hover-label">
                    {pieData[hoveredIndex].label}
                  </div>
                  <div className="pie-chart-hover-percentage">
                    {angles[hoveredIndex].percentage}%
                  </div>
                </div>
              )}
            </div>

            <div className="fund-breakdown">
          <div className="breakdown-header">
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
      </div>
    </div>
  );
};

export default FundDetail;

