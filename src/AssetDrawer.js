import React, { useState, useEffect } from 'react';
import './AssetDrawer.css';
import AssetCardLibrary from './AssetCardLibrary';

export default function AssetDrawer({ isOpen, onClose, asset }) {
  const [isClosing, setIsClosing] = useState(false);
  const [drawerMode, setDrawerMode] = useState('analytics'); // 'analytics' or 'share'

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setDrawerMode('analytics'); // Reset to analytics mode when opening
      // Prevent body scroll when drawer is open
      document.body.classList.add('drawer-open');
    } else {
      // Restore body scroll when drawer is closed
      document.body.classList.remove('drawer-open');
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Match the animation duration
  };

  const handleShareAsset = () => {
    setDrawerMode('share');
  };

  const handleBackToAnalytics = () => {
    setDrawerMode('analytics');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`asset-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div className={`asset-drawer ${isClosing ? 'closing' : ''}`}>
        {/* Content */}
        <div className="asset-drawer-content">
          {drawerMode === 'analytics' ? (
            <>
              {/* Asset Preview Section */}
              <div className="asset-drawer-section">
                <div className="asset-drawer-section-header">
                  <button className="asset-drawer-back-btn" onClick={handleClose}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h3 className="asset-drawer-section-title">Asset-level analytics</h3>
                </div>

                {/* Asset Preview Card */}
                <div className="asset-drawer-preview">
                  <AssetCardLibrary
                    image={asset?.image || "/Assets/Consider the viewer.png"}
                    title={asset?.title || "Asset Title"}
                    duration={asset?.duration || "5 mins"}
                    patterns={asset?.patterns || "patterns"}
                    isPinned={asset?.isPinned || false}
                    highlighted={asset?.highlighted || false}
                    hideMetadata={true} // Hide mins/patterns labels and share button
                    onClick={() => {}} // Non-clickable - empty function
                    onPin={() => {}} // Non-clickable - empty function
                    onShare={() => {}} // Non-clickable - empty function
                  />
                </div>

                {/* Analytics Content */}
                <div className="asset-drawer-analytics">
                  <div className="asset-drawer-analytics-badge">
                    <span className="asset-drawer-badge-text">High Intent · AI Insight</span>
                  </div>
                  
                  <div className="asset-drawer-analytics-content">
                    <div className="asset-drawer-analytics-text">
                      Q2 Logistics performance (p2, p5)<br />
                      Increase in debt facility (p14)<br />
                      Spanish hotel acquisition (p16)
                    </div>
                  </div>
                </div>
              </div>

              {/* Shared With Section */}
              <div className="asset-drawer-section">
                <h3 className="asset-drawer-section-title">Shared with</h3>
                
                <div className="asset-drawer-shared-table">
                  <div className="asset-drawer-table-header">
                    <div className="asset-drawer-table-cell">Shared with</div>
                    <div className="asset-drawer-table-cell">Last visit</div>
                    <div className="asset-drawer-table-cell">Intent</div>
                  </div>
                  
                  <div className="asset-drawer-table-rows">
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>James Wilson</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">2 days ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge high">High</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Sarah Chen</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">1 week ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge medium">Medium</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Michael Rodriguez</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">2 weeks ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge low">Low</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Share Asset Section */}
              <div className="asset-drawer-section">
                <div className="asset-drawer-section-header">
                  <button className="asset-drawer-back-btn" onClick={handleBackToAnalytics}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h3 className="asset-drawer-section-title">Share Asset</h3>
                </div>

                {/* Share to contacts section */}
                <div className="asset-drawer-share-section">
                  <h4 className="asset-drawer-share-title">Share to contacts</h4>
                  
                  {/* Search/Filter Input */}
                  <div className="asset-drawer-search-container">
                    <div className="asset-drawer-search-input">
                      <label className="asset-drawer-search-label">
                        Name *
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="currentColor"/>
                          <path d="M8 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
                        </svg>
                      </label>
                      <input 
                        type="text" 
                        placeholder="Search contacts..." 
                        className="asset-drawer-search-field"
                      />
                    </div>
                    <button className="asset-drawer-search-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16z" stroke="currentColor" strokeWidth="2"/>
                        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>

                  {/* Contact List */}
                  <div className="asset-drawer-contact-list">
                    <div className="asset-drawer-contact-item">
                      <div className="asset-drawer-contact-checkbox">
                        <input type="checkbox" id="contact1" />
                        <label htmlFor="contact1"></label>
                      </div>
                      <div className="asset-drawer-contact-info">
                        <div className="asset-drawer-contact-details">
                          <span className="asset-drawer-contact-name">James Wilson</span>
                          <span className="asset-drawer-contact-email">james.wilson@company.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="asset-drawer-contact-item">
                      <div className="asset-drawer-contact-checkbox">
                        <input type="checkbox" id="contact2" />
                        <label htmlFor="contact2"></label>
                      </div>
                      <div className="asset-drawer-contact-info">
                        <div className="asset-drawer-contact-details">
                          <span className="asset-drawer-contact-name">Sarah Chen</span>
                          <span className="asset-drawer-contact-email">sarah.chen@company.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="asset-drawer-contact-item">
                      <div className="asset-drawer-contact-checkbox">
                        <input type="checkbox" id="contact3" />
                        <label htmlFor="contact3"></label>
                      </div>
                      <div className="asset-drawer-contact-info">
                        <div className="asset-drawer-contact-details">
                          <span className="asset-drawer-contact-name">Michael Rodriguez</span>
                          <span className="asset-drawer-contact-email">michael.rodriguez@company.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="asset-drawer-contact-item">
                      <div className="asset-drawer-contact-checkbox">
                        <input type="checkbox" id="contact4" />
                        <label htmlFor="contact4"></label>
                      </div>
                      <div className="asset-drawer-contact-info">
                        <div className="asset-drawer-contact-details">
                          <span className="asset-drawer-contact-name">John Doe</span>
                          <span className="asset-drawer-contact-email">john.doe@company.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="asset-drawer-contact-item">
                      <div className="asset-drawer-contact-checkbox">
                        <input type="checkbox" id="contact5" />
                        <label htmlFor="contact5"></label>
                      </div>
                      <div className="asset-drawer-contact-info">
                        <div className="asset-drawer-contact-details">
                          <span className="asset-drawer-contact-name">Jane Smith</span>
                          <span className="asset-drawer-contact-email">jane.smith@company.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="asset-drawer-bottom-bar">
        <button className="asset-drawer-cancel-btn" onClick={handleClose}>
          Cancel
        </button>
        {drawerMode === 'analytics' ? (
          <button className="asset-drawer-share-btn" onClick={handleShareAsset}>
            Share asset
          </button>
        ) : (
          <button className="asset-drawer-share-btn">
            Email James
          </button>
        )}
      </div>
    </>
  );
}
