import React, { useState } from 'react';
import './WhatWouldYouLikeToLearn.css';

const WhatWouldYouLikeToLearn = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
  };

  return (
    <div className="what-would-you-like-to-learn">
      <h2 className="learn-title">What would you like to learn?</h2>
      
      <div className="search-container">
        <div className="search-input-wrapper">
          <div className="search-input">
            <div className="search-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#3D3D3D" strokeWidth="1.25"/>
                <path d="m21 21-4.35-4.35" stroke="#3D3D3D" strokeWidth="1.25"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Ask anything about your data..."
              value={searchValue}
              onChange={handleSearchChange}
              className="search-field"
            />
          </div>
        </div>
        
        <div className="suggestion-buttons">
          <button 
            className="suggestion-btn"
            onClick={() => handleSuggestionClick("Show me insights about document engagement")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="btn-icon">
              <path d="M2.5 1.67L15 8.33L2.5 15V1.67Z" stroke="#4F4F4F" strokeWidth="1.2"/>
              <path d="M2.5 1.67L15 8.33L2.5 15V1.67Z" fill="#4F4F4F"/>
            </svg>
            <span>Show me insights about document engagement</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="btn-arrow">
              <path d="M3.33 3.52L13.33 10L3.33 16.48" stroke="#4F4F4F" strokeWidth="1.2"/>
            </svg>
          </button>
          
          <button 
            className="suggestion-btn"
            onClick={() => handleSuggestionClick("Analyze user behavior patterns")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="btn-icon">
              <circle cx="10" cy="6.67" r="2.5" stroke="#4F4F4F" strokeWidth="1.2"/>
              <path d="M5 18.33C5 15.24 7.24 12.67 10 12.67C12.76 12.67 15 15.24 15 18.33" stroke="#4F4F4F" strokeWidth="1.2"/>
            </svg>
            <span>Analyze user behavior patterns</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="btn-arrow">
              <path d="M3.33 3.52L13.33 10L3.33 16.48" stroke="#4F4F4F" strokeWidth="1.2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatWouldYouLikeToLearn;
