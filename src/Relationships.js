import React, { useState } from 'react';
import './Relationships.css';

export default function Relationships() {
  const [showAll, setShowAll] = useState(false);
  
  const relationships = [
    { contact: 'Sarah Johnson', asset: 'Q4 Market Report', topic: 'Market Analysis' },
    { contact: 'Michael Chen', asset: 'Investment Strategy', topic: 'Portfolio Management' },
    { contact: 'Emily Rodriguez', asset: 'Risk Assessment', topic: 'Risk Management' },
    { contact: 'David Thompson', asset: 'Performance Metrics', topic: 'Analytics' },
    { contact: 'Lisa Wang', asset: 'Client Presentation', topic: 'Client Relations' },
    { contact: 'James Wilson', asset: 'Compliance Report', topic: 'Regulatory' },
  ];

  // Hide "David Thompson" (4th row) - show 3 rows when collapsed, 4 when expanded (skipping David)
  const filteredRelationships = relationships.filter((_, index) => index !== 3); // Remove David at index 3
  const visibleRelationships = showAll ? filteredRelationships : filteredRelationships.slice(0, 3);
  const hasMore = filteredRelationships.length > 3;

  return (
    <div className="relationships">
      <div className="relationships-header">
        <h2 className="relationships-title">Relationships</h2>
      </div>
      <div className="relationships-table-container">
        <table className="relationships-table">
          <thead>
            <tr>
              <th className="table-header">Contact</th>
              <th className="table-header">Asset</th>
              <th className="table-header">Topic</th>
            </tr>
          </thead>
          <tbody>
            {visibleRelationships.map((relationship, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell contact-cell">{relationship.contact}</td>
                <td className="table-cell asset-cell">{relationship.asset}</td>
                <td className="table-cell topic-cell">{relationship.topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasMore && (
          <div className="relationships-scroll-container">
            <button 
              className="relationships-scroll-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show ${filteredRelationships.length - 3} More`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
