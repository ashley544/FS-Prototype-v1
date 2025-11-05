import React, { useState, useEffect } from 'react';
import './ContactDrawer.css';
import { getAssetImageUrl } from './utils/assetImageHelper';

export default function ContactDrawer({ isOpen, onClose, contact }) {
  const [isClosing, setIsClosing] = useState(false);
  const [expandedAssetId, setExpandedAssetId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.classList.add('drawer-open');
      // Set first asset as expanded by default
      if (contact?.sharedAssets && contact.sharedAssets.length > 0) {
        setExpandedAssetId(contact.sharedAssets[0].id || 0);
      }
    } else {
      document.body.classList.remove('drawer-open');
      setExpandedAssetId(null);
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen, contact]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen || !contact) return null;

  // Debug: Log contact data
  console.log('ContactDrawer - Contact data:', contact);
  console.log('ContactDrawer - Company:', contact.company);
  console.log('ContactDrawer - Name:', contact.name);
  console.log('ContactDrawer - AI Summary:', contact.aiSummary);

  return (
    <>
      {/* Backdrop */}
      <div className={`contact-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div className={`contact-drawer ${isClosing ? 'closing' : ''}`}>
        {/* Content */}
        <div className="contact-drawer-content">
          <button className="contact-drawer-back-button" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
          </button>
          <div className="contact-drawer-edit-link">
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Edit contact</a>
          </div>
          <p 
            className="contact-drawer-company-name"
            style={{ 
              display: 'block', 
              visibility: 'visible', 
              opacity: 1,
              color: '#7A7A7A',
              fontSize: '14px',
              margin: '24px 0 8px 0',
              padding: '0',
              lineHeight: '20px',
              width: '100%',
              height: 'auto',
              position: 'relative',
              zIndex: 10
            }}
          >
            <span style={{ color: '#1d1d1f' }}>{contact.company || 'Invesco'}</span> · {contact.email || 'j.lawson@invesco.com'}
          </p>
          <h3 
            className="contact-drawer-name"
            style={{ 
              display: 'block', 
              visibility: 'visible', 
              opacity: 1,
              color: '#1d1d1f',
              fontSize: '24px',
              margin: '0 0 12px 0',
              padding: '0',
              fontWeight: 500,
              lineHeight: '1.2',
              width: '100%',
              height: 'auto',
              position: 'relative',
              zIndex: 10
            }}
          >
            {contact.name || 'No name'}
          </h3>
          <div className="contact-drawer-ai-summary-section">
            <div className="contact-drawer-ai-summary-gradient-border"></div>
            <p 
              className="contact-drawer-ai-summary"
              style={{ 
                display: 'block', 
                visibility: 'visible', 
                opacity: 1,
                color: '#1d1d1f',
                fontSize: '14px',
                margin: '0',
                padding: '0',
                lineHeight: '24px',
                width: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 10
              }}
            >
              {contact.aiSummary || "James is interested in BX X and is now in a due diligence process. He has spent a majority of his time on the 'Jupiter Industrial Portfolio' as a seed asset in BX X, also looking to industrial performance in the BX IX quarterly report."}
            </p>
          </div>

          {/* Assets Shared Section */}
          <div className="contact-drawer-assets-section">
            <div className="contact-drawer-assets-list">
              {(contact.sharedAssets || []).map((asset, index) => {
                const assetId = asset.id || index;
                const isExpanded = expandedAssetId === assetId;
                
                return (
                <div key={assetId} className={`contact-drawer-asset-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="contact-drawer-asset-card-content">
                    <div className="contact-drawer-asset-card-inner">
                      <div className="contact-drawer-asset-card-main">
                        <div className="contact-drawer-asset-thumbnail">
                          <img 
                            src={getAssetImageUrl(asset.title, asset.thumbnail, asset.file) || '/Assets/Blackstone logo.png'} 
                            alt={asset.title}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="contact-drawer-asset-thumbnail-placeholder" style={{ display: 'none' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2V8H20" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="contact-drawer-asset-info">
                          <div className="contact-drawer-asset-header">
                            <div className="contact-drawer-asset-title-section">
                              <div className="contact-drawer-asset-title">{asset.title}</div>
                            </div>
                            <button 
                              className={`contact-drawer-asset-expand ${isExpanded ? 'expanded' : ''}`}
                              onClick={() => setExpandedAssetId(isExpanded ? null : assetId)}
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                          <div className="contact-drawer-asset-badges">
                            <div className="contact-drawer-asset-badge">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1C1E21"/>
                              </svg>
                              <span>Engaged</span>
                            </div>
                            {index === 0 && (
                              <div className="contact-drawer-asset-badge trending">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <defs>
                                    <linearGradient id={`trendingGradient-${assetId}`} x1="2" y1="8.66667" x2="13.3333" y2="4" gradientUnits="userSpaceOnUse">
                                      <stop stopColor="#F05E24"/>
                                      <stop offset="0.29" stopColor="#EE454A"/>
                                      <stop offset="0.42" stopColor="#D4539D"/>
                                      <stop offset="0.65" stopColor="#924FAE"/>
                                      <stop offset="1" stopColor="#0290FF"/>
                                    </linearGradient>
                                  </defs>
                                  <path d="M13.3333 4L8 9.33333L4.66667 6L2 8.66667" stroke={`url(#trendingGradient-${assetId})`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>High Intent</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="contact-drawer-asset-expanded-content">
                        {/* AI Summary */}
                        <div className="contact-drawer-asset-ai-summary">
                          <div className="contact-drawer-asset-ai-summary-section">
                            <div className="contact-drawer-asset-ai-summary-gradient-border"></div>
                            <div className="contact-drawer-asset-ai-summary-text">
                              Focusing on tenancy projections and cap rate movements for industrial assets
                            </div>
                          </div>
                        </div>

                        {/* Engagement Patterns */}
                        <div className="contact-drawer-asset-engagement">
                          <div className="contact-drawer-asset-engagement-header">
                            <div className="contact-drawer-asset-engagement-title">Engagement patterns</div>
                          </div>
                          <div className="contact-drawer-asset-engagement-items">
                            <div className="contact-drawer-asset-engagement-item">
                              <div className="contact-drawer-asset-engagement-item-title">Market fundamentals (p2, p5)</div>
                            </div>
                            <div className="contact-drawer-asset-engagement-item">
                              <div className="contact-drawer-asset-engagement-item-title">Jupiter Industrial tenant breakdown (p14)</div>
                            </div>
                            <div className="contact-drawer-asset-engagement-item">
                              <div className="contact-drawer-asset-engagement-item-title">Cap rate movement (p16)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
              })}
              {(!contact.sharedAssets || contact.sharedAssets.length === 0) && (
                <div className="contact-drawer-no-assets">
                  <p>No assets shared with this contact yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


