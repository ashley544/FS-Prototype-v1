import React, { useState, useEffect } from 'react';
import './AssetDrawer.css';

export default function AssetDrawer({ isOpen, onClose, asset }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`asset-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div className={`asset-drawer ${isClosing ? 'closing' : ''}`}>
        {/* Header */}
        <div className="asset-drawer-header">
          <button className="asset-drawer-close" onClick={handleClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="asset-drawer-header-content">
            <button className="asset-drawer-email-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.333 3.518L13.333 12.963" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Email James
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.333 3.518L13.333 12.963" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="asset-drawer-content">
          {/* Asset Preview Section */}
          <div className="asset-drawer-section">
            <div className="asset-drawer-section-header">
              <h3 className="asset-drawer-section-title">Asset-level analytics</h3>
            </div>

            {/* Asset Preview Card */}
            <div className="asset-drawer-preview">
              <div className="asset-drawer-preview-card">
                <div className="asset-drawer-preview-image">
                  <img src={asset?.image || "/Assets/Consider the viewer.png"} alt={asset?.title || "Asset"} />
                </div>
                <div className="asset-drawer-preview-info">
                  <div className="asset-drawer-preview-type">PDF</div>
                  <div className="asset-drawer-preview-title">{asset?.title || "Asset Title"}</div>
                </div>
              </div>
            </div>

            {/* Analytics Content */}
            <div className="asset-drawer-analytics">
              <div className="asset-drawer-analytics-badge">
                <span className="asset-drawer-badge-text">High Intent · AI Insight</span>
              </div>
              
              <div className="asset-drawer-analytics-content">
                <div className="asset-drawer-analytics-text">
                  Q2 Logistics performance (p2, p5) Increase in debt facility (p14) Spanish hotel acquisition (p16)
                </div>
                <div className="asset-drawer-analytics-meta">
                  <div className="asset-drawer-visibility">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M0.667 6.667C0.667 6.667 3.333 2.667 8 2.667C12.667 2.667 15.333 6.667 15.333 6.667C15.333 6.667 12.667 10.667 8 10.667C3.333 10.667 0.667 6.667 0.667 6.667Z" stroke="currentColor" strokeWidth="0.025"/>
                      <circle cx="8" cy="6.667" r="2" stroke="currentColor" strokeWidth="0.025"/>
                    </svg>
                    <span>Level</span>
                  </div>
                  <div className="asset-drawer-progress">
                    <div className="asset-drawer-progress-bar"></div>
                  </div>
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
                      <div className="asset-drawer-contact-avatar">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Contact" />
                      </div>
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
                      <div className="asset-drawer-contact-avatar">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Contact" />
                      </div>
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
                      <div className="asset-drawer-contact-avatar">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Contact" />
                      </div>
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
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="asset-drawer-bottom-bar">
        <button className="asset-drawer-cancel-btn" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 2.5L17.5 17.5M17.5 2.5L2.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Cancel
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.333 3.518L13.333 12.963" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="asset-drawer-share-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.333 3.518L13.333 12.963" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share assets
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.333 3.518L13.333 12.963" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
}
