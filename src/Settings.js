import React, { useState } from 'react';
import SideNav from './SideNav';
import './Settings.css';

function TableIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="15" height="15" stroke="currentColor" strokeWidth="1" fill="none"/>
      <line x1="2.5" y1="7.5" x2="17.5" y2="7.5" stroke="currentColor" strokeWidth="1"/>
      <line x1="7.5" y1="2.5" x2="7.5" y2="17.5" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4.17V15.83M4.17 10H15.83" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="9.5" r="6.67" stroke="currentColor" strokeWidth="1"/>
      <path d="m16.67 16.67-3.34-3.34" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function DropdownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 8.33L10 13.33L15 8.33" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.67" stroke="currentColor" strokeWidth="1"/>
      <path d="M8 5.33V8M8 10.67H8.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

const Settings = ({ onReturnToTitle, onNavigateToPage }) => {
  const [activeNavItem, setActiveNavItem] = useState('settings');
  const [openAccordions, setOpenAccordions] = useState({
    brandSuite: false,
    inviteTeam: false,
    contactManagement: false
  });

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

  const toggleAccordion = (accordionKey) => {
    setOpenAccordions(prev => ({
      ...prev,
      [accordionKey]: !prev[accordionKey]
    }));
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
          {/* User Settings Section */}
          <div className="user-settings-card">
            {/* Section Header */}
            <div className="user-settings-header">
              <div className="user-settings-title-section">
                <div className="user-settings-title-row">
                  <h2 className="user-settings-title">User settings</h2>
                </div>
                <p className="user-settings-subtitle">Manage the admins in your organisation.</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="user-settings-form">
              {/* First Row */}
              <div className="form-row">
                <div className="form-field">
                  <div className="field-label-row">
                    <div className="field-label-wrapper">
                      <span className="field-label">First name</span>
                      <span className="field-required">*</span>
                    </div>
                  </div>
                  <div className="input-wrapper">
                    <input type="text" className="form-input" placeholder="" />
                  </div>
                </div>
                
                <div className="form-field">
                  <div className="field-label-row">
                    <div className="field-label-wrapper">
                      <span className="field-label">Last name</span>
                      <span className="field-required">*</span>
                      <InfoIcon />
                    </div>
                    <span className="field-optional">Optional</span>
                  </div>
                  <div className="input-wrapper">
                    <input type="text" className="form-input" placeholder="" />
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="form-row">
                <div className="form-field">
                  <div className="field-label-row">
                    <div className="field-label-wrapper">
                      <span className="field-label">Role</span>
                      <span className="field-required">*</span>
                      <InfoIcon />
                    </div>
                    <span className="field-optional">Optional</span>
                  </div>
                  <div className="input-wrapper">
                    <input type="text" className="form-input" placeholder="" />
                  </div>
                </div>
                
                <div className="form-field">
                  <div className="field-label-row">
                    <div className="field-label-wrapper">
                      <span className="field-label">Email</span>
                    </div>
                  </div>
                  <div className="input-wrapper input-wrapper-disabled">
                    <input type="text" className="form-input" placeholder="Disabled" disabled />
                  </div>
                </div>
              </div>

              {/* Third Row */}
              <div className="form-row">
                <div className="form-field form-field-full">
                  <div className="field-label-row">
                    <div className="field-label-wrapper">
                      <span className="field-label">Organisation</span>
                      <span className="field-required">*</span>
                      <InfoIcon />
                    </div>
                    <span className="field-optional">Optional</span>
                  </div>
                  <div className="input-wrapper">
                    <input type="text" className="form-input" placeholder="" />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="form-divider"></div>

              {/* Update Button */}
              <button className="form-add-button">
                <span>Update</span>
              </button>
            </div>
          </div>

          {/* Admins Section */}
          <div className="admins-card">
            <div className="admins-header">
              <div className="admins-header-content">
                <div className="admins-title-row">
                  <h2 className="admins-title">Organisation settings</h2>
                </div>
              </div>
            </div>

            <div className="admins-content">
              {/* Brand Suite Section */}
              <div className="settings-section">
                <div 
                  className="settings-section-header"
                  onClick={() => toggleAccordion('brandSuite')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="settings-section-title-content">
                    <div className="settings-section-icon">
                      <StackIcon />
                    </div>
                    <div className="settings-section-text">
                      <h3 className="settings-section-title">Brand suite</h3>
                    </div>
                  </div>
                  <div className={`accordion-chevron ${openAccordions.brandSuite ? 'open' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#1C1B1F"/>
                    </svg>
                  </div>
                </div>
                {openAccordions.brandSuite && (
                  <div className="settings-section-content">
                    <div className="brand-suite-drawer">
                      <div className="brand-suite-inner-content">
                        {/* Admins Header Section */}
                        <div className="brand-suite-header-section">
                          <div className="brand-suite-header-left">
                            <div className="brand-suite-header-top">
                              <h2 className="brand-suite-title">Admins</h2>
                              <div className="brand-suite-badge">
                                <span className="brand-suite-badge-label">Active</span>
                              </div>
                            </div>
                            <p className="brand-suite-subtitle">Manage the admins in your organisation.</p>
                          </div>
                          <button className="brand-suite-add-button">
                            <TableIcon />
                            <span>Add Admin</span>
                            <ArrowRightIcon />
                          </button>
                        </div>

                        {/* First Row of Permission Cards */}
                        <div className="brand-suite-cards-row">
                          <div className="brand-suite-permission-card">
                            <div className="brand-suite-permission-card-content">
                              <div className="brand-suite-permission-icon">
                                <LockIcon />
                              </div>
                              <span className="brand-suite-permission-title">Cardholder Permissions</span>
                            </div>
                            <button className="brand-suite-permission-link-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                          </div>

                          <div className="brand-suite-permission-card">
                            <div className="brand-suite-permission-card-content">
                              <div className="brand-suite-permission-icon">
                                <LinkIcon />
                              </div>
                              <span className="brand-suite-permission-title">Cardholder Permissions</span>
                            </div>
                            <button className="brand-suite-permission-link-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                          </div>

                          <div className="brand-suite-permission-card">
                            <div className="brand-suite-permission-card-content">
                              <div className="brand-suite-permission-icon">
                                <StackIcon />
                              </div>
                              <span className="brand-suite-permission-title">Cardholder Permissions</span>
                            </div>
                            <button className="brand-suite-permission-link-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                          </div>
                        </div>

                        {/* Second Row of Permission Cards */}
                        <div className="brand-suite-cards-row">
                          <div className="brand-suite-permission-card">
                            <div className="brand-suite-permission-card-content">
                              <div className="brand-suite-permission-icon">
                                <MailSendIcon />
                              </div>
                              <span className="brand-suite-permission-title">Cardholder Permissions</span>
                            </div>
                            <button className="brand-suite-permission-link-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                          </div>

                          <div className="brand-suite-scheduled-card"></div>
                          <div className="brand-suite-scheduled-card"></div>
                        </div>

                        {/* Section Titles */}
                        <div className="brand-suite-section-titles">
                          <div className="brand-suite-section-title-item">
                            <div className="brand-suite-section-title-left">
                              <div className="brand-suite-section-title-content">
                                <div className="brand-suite-section-title-icon">
                                  <StackIcon />
                                </div>
                                <span className="brand-suite-section-title-text">Brand suite</span>
                              </div>
                              <p className="brand-suite-section-title-subtitle">Manage the Super Admins in your organisation.</p>
                            </div>
                            <button className="brand-suite-section-title-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                            <div className="brand-suite-arrow-forward">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="rgba(28, 27, 31, 1)"/>
                              </svg>
                            </div>
                          </div>

                          <div className="brand-suite-section-title-item">
                            <div className="brand-suite-section-title-left">
                              <div className="brand-suite-section-title-content">
                                <div className="brand-suite-section-title-icon">
                                  <SendIcon />
                                </div>
                                <span className="brand-suite-section-title-text">Invite team members</span>
                              </div>
                            </div>
                            <button className="brand-suite-section-title-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                            <div className="brand-suite-arrow-forward">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="rgba(28, 27, 31, 1)"/>
                              </svg>
                            </div>
                          </div>

                          <div className="brand-suite-section-title-item">
                            <div className="brand-suite-section-title-left">
                              <div className="brand-suite-section-title-content">
                                <div className="brand-suite-section-title-icon">
                                  <ContactsIcon />
                                </div>
                                <span className="brand-suite-section-title-text">Contact management</span>
                              </div>
                            </div>
                            <button className="brand-suite-section-title-button">
                              <TableIcon />
                              <span>View</span>
                              <ArrowRightIcon />
                            </button>
                            <div className="brand-suite-arrow-forward">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="rgba(28, 27, 31, 1)"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Invite Team Members Section */}
              <div className="settings-section">
                <div 
                  className="settings-section-header"
                  onClick={() => toggleAccordion('inviteTeam')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="settings-section-title-content">
                    <div className="settings-section-icon">
                      <SendIcon />
                    </div>
                    <div className="settings-section-text">
                      <h3 className="settings-section-title">Invite team members</h3>
                    </div>
                  </div>
                  <div className={`accordion-chevron ${openAccordions.inviteTeam ? 'open' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#1C1B1F"/>
                    </svg>
                  </div>
                </div>
                {openAccordions.inviteTeam && (
                  <div className="settings-section-content">
                    {/* Accordion content goes here */}
                  </div>
                )}
              </div>

              {/* Contact Management Section */}
              <div className="settings-section">
                <div 
                  className="settings-section-header"
                  onClick={() => toggleAccordion('contactManagement')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="settings-section-title-content">
                    <div className="settings-section-icon">
                      <ContactsIcon />
                    </div>
                    <div className="settings-section-text">
                      <h3 className="settings-section-title">Contact management</h3>
                    </div>
                  </div>
                  <div className={`accordion-chevron ${openAccordions.contactManagement ? 'open' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#1C1B1F"/>
                    </svg>
                  </div>
                </div>
                {openAccordions.contactManagement && (
                  <div className="settings-section-content">
                    {/* Accordion content goes here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional Icon Components
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="20" height="20" fill="none"/>
      <path d="M2.5 6.67C2.5 5.75 3.24 5 4.17 5H15.83C16.76 5 17.5 5.75 17.5 6.67V17.5C17.5 18.43 16.76 19.17 15.83 19.17H4.17C3.24 19.17 2.5 18.43 2.5 17.5V6.67Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 10H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="20" height="20" fill="none"/>
      <circle cx="10" cy="10" r="7.36" stroke="currentColor" strokeWidth="1"/>
      <circle cx="10" cy="10" r="3.68" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

function StackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="20" height="20" fill="none"/>
      <path d="M2.06 0.97H17.94V18.49H2.06V0.97Z" stroke="currentColor" strokeWidth="1"/>
      <path d="M2.06 0.97L17.94 0.97V18.49H2.06V0.97Z" fill="currentColor"/>
    </svg>
  );
}

function MailSendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="20" height="20" fill="none"/>
      <path d="M0 2.5L9.17 10L18.33 2.5" stroke="currentColor" strokeWidth="1"/>
      <rect x="0" y="2.5" width="18.33" height="15" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.38 3.21L16.1 9.58L2.38 16.79V9.58M2.38 9.58H16.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ContactsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="6.67" r="2.5" stroke="currentColor" strokeWidth="0.42"/>
      <path d="M5 18.33C5 15.24 7.24 12.67 10 12.67C12.76 12.67 15 15.24 15 18.33" stroke="currentColor" strokeWidth="0.42"/>
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#1C1B1F"/>
    </svg>
  );
}

export default Settings;

