import React from 'react';
import './Fund.css';

const Fund = ({ onClick }) => {
  // Chart data - 4 columns with 2 bars each
  // Each column represents a fund with two metrics
  const chartData = [
    { fund: 'BX RE Europe', bar1: 90, bar3: 60 },
    { fund: 'KKR Infra X', bar1: 120, bar3: 100 },
    { fund: 'Ares Global RE', bar1: 295, bar3: 275 },
    { fund: 'BX Jupiter Acquisition', bar1: 150, bar3: 130 },
  ];

  const maxValue = 300; // Maximum value for scaling

  const getBarHeight = (value, containerHeight = 242) => {
    // Use containerHeight if provided, otherwise default to 242px
    // The height will be calculated dynamically based on available space
    return (value / maxValue) * containerHeight;
  };

  return (
    <div className={`fund ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <div className="fund-header">
        <h2 className="fund-title">Opportunities</h2>
        <div className="fund-divider"></div>
        <div className="fund-prospects">
          <p className="prospects-text">
            6,218 relationships would be interested in{' '}
            <a href="#" className="fund-link" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
              BX Evergreen Infra Fund
            </a>
          </p>
        </div>
      </div>

      <div className="fund-content">
        <div className="fund-chart-section">
          <div className="fund-legend">
            <span className="legend-label">Viewership</span>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#D9D9D9' }}></div>
                <span className="legend-text">Minutes</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-gradient"></div>
                <span className="legend-text">Contacts</span>
              </div>
            </div>
          </div>

          <div className="bar-chart-container">
            <div className="y-axis-labels">
              <span>300</span>
              <span>250</span>
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            
            <div className="chart-bars-wrapper">
              <div className="chart-bars">
                {chartData.map((data, index) => (
                  <div key={index} className="bar-column">
                    <div className="bar-group">
                      <div 
                        className="bar bar-1" 
                        style={{ height: `${getBarHeight(data.bar1)}px` }}
                      ></div>
                      <div 
                        className="bar bar-3" 
                        style={{ height: `${getBarHeight(data.bar3)}px` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="x-axis-labels">
            {chartData.map((data, index) => (
              <span key={index} className="x-label">{data.fund}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fund;

