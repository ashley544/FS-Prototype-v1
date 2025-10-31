import React, { useState } from 'react';
import SideNav from './SideNav';
import './Settings.css';

const Settings = ({ onReturnToTitle, onNavigateToPage }) => {
  const [activeNavItem, setActiveNavItem] = useState('settings');

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
    
    // Handle navigation between pages
    if (itemId === 'assets') {
      onNavigateToPage && onNavigateToPage('assets');
    } else if (itemId === 'contacts') {
      onNavigateToPage && onNavigateToPage('contacts');
    } else if (itemId === 'insights') {
      onNavigateToPage && onNavigateToPage('insights');
    }
    
    // Handle special navigation items
    if (itemId === 'logout') {
      console.log('Logout clicked');
    } else if (itemId === 'my-account') {
      console.log('My account clicked');
    }
  };

  return (
    <div className="settings">
      <SideNav 
        onNavItemClick={handleNavItemClick}
        activeItem={activeNavItem}
        onLogoClick={onReturnToTitle}
      />
      
      <div className="settings-main">
        {/* Header */}
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          <div className="settings-section">
            <h2 className="settings-section-title">Account</h2>
            <div className="settings-card">
              <p className="settings-placeholder">Settings content coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

