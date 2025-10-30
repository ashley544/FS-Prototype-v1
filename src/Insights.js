import React, { useState } from 'react';
import SideNav from './SideNav';
import EngagementChart from './EngagementChart';
import IntelligentInteractions from './IntelligentInteractions';
import HighestIntent from './HighestIntent';
import WhatWouldYouLikeToLearn from './WhatWouldYouLikeToLearn';
import './Insights.css';

const Insights = ({ onReturnToTitle, onNavigateToPage }) => {
  const [activeNavItem, setActiveNavItem] = useState('insights');

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
          {/* Chart and Right Side Section */}
          <div className="chart-intent-container">
            <EngagementChart />
            <div className="right-side-container">
              <IntelligentInteractions />
              <HighestIntent />
            </div>
          </div>

          {/* What would you like to learn Section */}
          <WhatWouldYouLikeToLearn />
        </div>
      </div>
    </div>
  );
};

export default Insights;

