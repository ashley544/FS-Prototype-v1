import React, { useState } from 'react';
import './DetailHeader.css';

const DetailHeader = ({ onBack }) => {
  const [showDateFilter, setShowDateFilter] = useState(true);

  return (
    <div className="detail-header">
      <h1 className="detail-header-title">Insights</h1>
      <div className="detail-header-controls">
        {showDateFilter && (
          <div className="date-filter">
            <div className="date-filter-item">
              <span className="date-label">From</span>
              <span className="date-value">05/05/2025</span>
            </div>
            <div className="date-filter-item">
              <span className="date-label">To</span>
              <span className="date-value">12/05/2025</span>
            </div>
            <button 
              className="date-filter-close"
              onClick={() => setShowDateFilter(false)}
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 5.25L5.25 15.75M5.25 5.25L15.75 15.75" stroke="#000000" strokeWidth="0.88" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        <button className="filter-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H17.5M5 10H15M7.5 15H12.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span>Filter</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="detail-close-btn" onClick={onBack} title="Close detail view">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DetailHeader;

