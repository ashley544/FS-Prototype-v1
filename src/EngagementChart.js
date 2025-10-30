import React from 'react';
import './EngagementChart.css';

const EngagementChart = () => {
  // Sample data for the chart
  const chartData = [
    {
      name: "Flagships Home Page",
      impressions: 72,
      interactions: 12,
      intent: 26
    },
    {
      name: "Flagships & Luxury Retail: Intelligent Clienteling",
      impressions: 64,
      interactions: 136,
      intent: 136
    },
    {
      name: "Sustainability at Flagships",
      impressions: 265,
      interactions: 165,
      intent: 230
    },
    {
      name: "Redefining Client Interaction",
      impressions: 190,
      interactions: 166,
      intent: 166
    },
    {
      name: "Benchmarking Flagships: Preqin and CapIQ",
      impressions: 33,
      interactions: 141,
      intent: 43
    },
    {
      name: "The Flagships Apex Tier",
      impressions: 229,
      interactions: 69,
      intent: 134
    }
  ];

  const maxValue = 265; // Maximum value for scaling

  const getBarHeight = (value) => {
    return (value / maxValue) * 200; // Scale to max 200px height
  };

  return (
    <div className="engagement-chart">
      <div className="chart-header">
        <h2 className="chart-title">Overall Engagement</h2>
        <div className="chart-date">Monday 17th, February</div>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color impressions"></div>
          <span>Impressions</span>
        </div>
        <div className="legend-item">
          <div className="legend-color interactions"></div>
          <span>Interactions</span>
        </div>
        <div className="legend-item">
          <div className="legend-color intent"></div>
          <span>Intent</span>
        </div>
      </div>

      <div className="chart-container">
        <div className="y-axis">
          <div className="y-label">120</div>
          <div className="y-label">100</div>
          <div className="y-label">80</div>
          <div className="y-label">60</div>
          <div className="y-label">40</div>
          <div className="y-label">20</div>
          <div className="y-label">0</div>
        </div>
        
        <div className="chart-bars">
          {chartData.map((data, index) => (
            <div key={index} className="bar-group">
              <div className="bar impressions" style={{ height: `${getBarHeight(data.impressions)}px` }}></div>
              <div className="bar interactions" style={{ height: `${getBarHeight(data.interactions)}px` }}></div>
              <div className="bar intent" style={{ height: `${getBarHeight(data.intent)}px` }}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="x-axis">
        {chartData.map((data, index) => (
          <div key={index} className="x-label">
            {data.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementChart;
