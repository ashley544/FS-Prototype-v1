import React from 'react';
import './SideNav.css';

const SideNav = ({ onNavItemClick, activeItem, onLogoClick }) => {
  const navItems = [
    { id: 'assets', label: 'Assets', active: true },
    { id: 'contacts', label: 'Contacts' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' }
  ];

  const userActions = [
    { id: 'my-account', label: 'My account' },
    { id: 'logout', label: 'Logout' }
  ];

  return (
    <div className="side-nav">
      <div className="side-nav-content">
        {/* Logo Section */}
        <div 
          className="side-nav-logo"
          onClick={() => onLogoClick && onLogoClick()}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/rockefeller-logo-light.webp" 
            alt="Rockefeller Logo" 
            className="rockefeller-logo"
          />
        </div>

        {/* Navigation Items */}
        <div className="side-nav-items">
          {navItems.map((item) => (
            <div 
              key={item.id}
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={() => onNavItemClick && onNavItemClick(item.id)}
            >
              <div className="nav-item-content">
                <div className="nav-indicator" />
                <span className="nav-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* User Actions */}
        <div className="side-nav-user-actions">
          <div className="user-info">
            <span className="user-name">Evelyn Waugh</span>
          </div>
          {userActions.map((action) => (
            <div 
              key={action.id}
              className="nav-item"
              onClick={() => onNavItemClick && onNavItemClick(action.id)}
            >
              <div className="nav-item-content">
                <span className="nav-label">{action.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
