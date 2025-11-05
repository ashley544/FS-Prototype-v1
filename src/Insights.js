import React, { useState } from 'react';
import SideNav from './SideNav';
import WhatWouldYouLikeToLearn from './WhatWouldYouLikeToLearn';
import Relationships from './Relationships';
import Interests from './Interests';
import Fund from './Fund';
import FundDetail from './FundDetail';
import InterestedInvestors from './InterestedInvestors';
import HighestIntentDetail from './HighestIntentDetail';
import DetailHeader from './DetailHeader';
import DetailAIResponse from './DetailAIResponse';
import './Insights.css';

const Insights = ({ onReturnToTitle, onNavigateToPage, exchangeAssets = [], contactsData = [] }) => {
  const [activeNavItem, setActiveNavItem] = useState('insights');
  const [isDetailView, setIsDetailView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
    
    // Handle navigation between pages
    if (itemId === 'assets') {
      onNavigateToPage && onNavigateToPage('assets');
    } else if (itemId === 'contacts') {
      onNavigateToPage && onNavigateToPage('contacts');
    } else if (itemId === 'settings') {
      onNavigateToPage && onNavigateToPage('settings');
    }
    
    // Handle special navigation items
    if (itemId === 'logout') {
      console.log('Logout clicked');
    } else if (itemId === 'my-account') {
      console.log('My account clicked');
    }
  };

  const handleFundClick = () => {
    setIsDetailView(true);
    setSearchQuery('');
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setIsDetailView(true);
  };

  const handleBackToOverview = () => {
    setIsDetailView(false);
    setSearchQuery('');
  };

  // Detail view layout
  if (isDetailView) {
    return (
      <div className="insights">
        <SideNav 
          onNavItemClick={handleNavItemClick}
          activeItem={activeNavItem}
          onLogoClick={onReturnToTitle}
        />
        
        <div className="insights-main">
          <DetailHeader onBack={handleBackToOverview} />
          
          <div className="insights-detail-content">
            <div className="detail-layout">
              <div className="detail-left-column">
                <FundDetail />
              </div>
              <div className="detail-right-column">
                <InterestedInvestors />
                <HighestIntentDetail />
              </div>
            </div>
            
            {/* AI Response and Search Input */}
            <div className="detail-search-section">
              <DetailAIResponse response="There are 6,218 private wealth investors that are interested. I have categorized them by fund participation or general consideration. Shall I optimize the deck for each group for you to review?" />
              <div className="detail-search-input-wrapper">
                <input
                  type="text"
                  value={searchQuery}
                  readOnly
                  className="detail-search-input"
                  placeholder="Anything else?"
                />
                <button className="detail-search-arrow-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#000000"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Overview view layout
  return (
    <div className="insights">
      <SideNav 
        onNavItemClick={handleNavItemClick}
        activeItem={activeNavItem}
        onLogoClick={onReturnToTitle}
      />
      
      <div className="insights-main">
        {/* Header */}
        <div className="insights-header">
          <h1 className="insights-title">Insights</h1>
          <button className="view-all-btn">View all</button>
        </div>

        {/* Main Content */}
        <div className="insights-content">
          {/* Left and Right Column */}
          <div className="chart-intent-container">
            <div className="left-stack-container">
              <Relationships exchangeAssets={exchangeAssets} contactsData={contactsData} onNavigateToPage={onNavigateToPage} />
              <Interests />
            </div>
            <div className="right-side-container">
              <Fund onClick={handleFundClick} />
            </div>
          </div>

          {/* What would you like to learn Section */}
          <WhatWouldYouLikeToLearn onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Insights;

