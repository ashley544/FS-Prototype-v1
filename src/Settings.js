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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
    </svg>
  );
}

function ArrowBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
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
                    </div>
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
                    </div>
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
                    </div>
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
                      <PaintbrushIcon />
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
                      <div className="brand-suite-form-container">
                        {/* Left Image Preview */}
                        <div className="brand-suite-image-preview">
                          <img src="/Assets/Frame 1321315244.png" alt="Brand suite preview" />
                        </div>

                        {/* Right Form Column */}
                        <div className="brand-suite-form-column">
                          {/* Locked Profile Section */}
                          <div className="brand-suite-form-section">
                            <h3 className="brand-suite-form-section-title">Locked profile</h3>
                            
                            <div className="brand-suite-form-fields">
                              {/* Logo Color Input */}
                              <div className="brand-suite-form-field">
                                <div className="brand-suite-field-label-row">
                                  <div className="brand-suite-field-label-content">
                                    <span className="brand-suite-field-label">Logo color</span>
                                  </div>
                                </div>
                                <div className="brand-suite-color-picker-input">
                                  <div className="brand-suite-color-preview" style={{ backgroundColor: '#54e33c' }}></div>
                                  <span className="brand-suite-color-value">#54e33c</span>
                                  <CloseIcon />
                                </div>
                              </div>

                              {/* Logo Input */}
                              <div className="brand-suite-form-field">
                                <div className="brand-suite-field-label-row">
                                  <div className="brand-suite-field-label-content">
                                    <span className="brand-suite-field-label">Logo</span>
                                  </div>
                                </div>
                                <div className="brand-suite-image-picker-input">
                                  <div className="brand-suite-image-preview-small"></div>
                                  <span className="brand-suite-image-filename">image.png</span>
                                  <CloseIcon />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* PDF Viewer Section */}
                          <div className="brand-suite-form-section">
                            <h3 className="brand-suite-form-section-title">PDF viewer</h3>
                            
                            <div className="brand-suite-form-fields">
                              {/* Logo Input */}
                              <div className="brand-suite-form-field">
                                <div className="brand-suite-field-label-row">
                                  <div className="brand-suite-field-label-content">
                                    <span className="brand-suite-field-label">Logo</span>
                                  </div>
                                </div>
                                <div className="brand-suite-image-picker-input">
                                  <div className="brand-suite-image-preview-small"></div>
                                  <span className="brand-suite-image-filename">image.png</span>
                                  <DeleteIcon />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Update Button */}
                          <button className="brand-suite-primary-button">
                            <span>Update</span>
                          </button>
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
                    <div className="invite-team-content">
                      <p className="invite-team-subtitle">
                        Invite users from your organization to join [organization's] workspace, enter their work emails followed by a comma. Or see existing members.
                      </p>
                      
                      <div className="invite-team-form">
                        <div className="invite-team-input-field">
                          <div className="invite-team-label-row">
                            <div className="invite-team-label-content">
                              <span className="invite-team-label">Work emails</span>
                            </div>
                          </div>
                          
                          <div className="invite-team-input-container">
                            <div className="invite-team-input-content">
                            </div>
                          </div>
                        </div>
                        
                        <button className="invite-team-primary-button">
                          <span>Invite</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Integrations Section */}
              <div className="settings-section">
                <div 
                  className="settings-section-header"
                  onClick={() => toggleAccordion('contactManagement')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="settings-section-title-content">
                    <div className="settings-section-icon">
                      <IntegrationsIcon />
                    </div>
                    <div className="settings-section-text">
                      <h3 className="settings-section-title">Integrations</h3>
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
                    <div className="integrations-content">
                      <div className="integrations-header">
                        <h3 className="integrations-title">Import contacts</h3>
                        <p className="integrations-description">Import contacts for your organization via Salesforce or DealCloud.</p>
                      </div>
                      
                      <div className="integrations-buttons">
                        <button className="integrations-button-primary">
                          <span>Import Salesforce contacts</span>
                        </button>
                        
                        <button className="integrations-button-secondary">
                          <span>Import DealCloud contacts</span>
                        </button>
                        
                        <a href="#" className="integrations-link" onClick={(e) => { e.preventDefault(); }}>
                          Upload via CSV
                        </a>
                      </div>
                    </div>
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

function PaintbrushIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.71 4.63L19.37 3.29C19 2.9 18.35 2.9 17.96 3.29L9 12.25L11.75 15L20.71 6.04C21.1 5.65 21.1 5.02 20.71 4.63ZM7 14C5.34 14 4 15.34 4 17C4 18.31 2.84 19 2 19C2.92 20.22 4.5 21 6 21C8.21 21 10 19.21 10 17C10 15.34 8.66 14 7 14Z" fill="currentColor"/>
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
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

function IntegrationsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 11H19V7C19 5.89 18.1 5 17 5H13V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4C2.89 5 2 5.89 2 7V10.8H3.5C4.88 10.8 6 11.92 6 13.3S4.88 15.8 3.5 15.8H2V19C2 20.11 2.89 21 4 21H7.8V19.5C7.8 18.12 8.92 17 10.3 17S12.8 18.12 12.8 19.5V21H17C18.11 21 19 20.11 19 19V15H20.5C21.88 15 23 13.88 23 12.5S21.88 10 20.5 10H19V7H17V10H20.5C20.78 10 21 10.22 21 10.5S20.78 11 20.5 11Z" fill="currentColor"/>
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

function SearchIcon2() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="9.5" r="6.67" stroke="currentColor" strokeWidth="1"/>
      <path d="m16.67 16.67-3.34-3.34" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function PaintIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.26 0.9L17.82 1.9L12.56 18.42L4.51 17.32L1.26 0.9Z" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M2.05 3.52L10.1 2.42L15.36 16.84L8.82 16.18L2.05 3.52Z" fill="currentColor"/>
      <circle cx="16.37" cy="3.95" r="1.84" fill="currentColor"/>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.17 4.17L15.83 15.83M15.83 4.17L4.17 15.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AddLineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4.17V15.83M4.17 10H15.83" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export default Settings;

