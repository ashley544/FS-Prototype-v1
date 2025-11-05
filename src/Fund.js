import React from 'react';
import './Fund.css';

const Fund = ({ onClick }) => {
  // Chart data - 4 columns with 2 bars each
  // Each column represents a fund with two metrics
  const chartData = [
    { fund: 'BX RE Europe', bar1: 72, bar3: 26 },
    { fund: 'KKR Infra X', bar1: 64, bar3: 46 },
    { fund: 'Ares Global RE', bar1: 265, bar3: 230 },
    { fund: 'BX Jupiter Acquisition', bar1: 101, bar3: 88 },
  ];

  const maxValue = 265; // Maximum value for scaling
  const chartHeight = 242; // Chart height in pixels

  const getBarHeight = (value) => {
    return (value / maxValue) * chartHeight;
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
              <span>120</span>
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
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

