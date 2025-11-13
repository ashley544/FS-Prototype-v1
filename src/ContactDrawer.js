import React, { useState, useEffect } from 'react';
import './ContactDrawer.css';
import { getAssetImageUrl } from './utils/assetImageHelper';

export default function ContactDrawer({ isOpen, onClose, contact }) {
  const [isClosing, setIsClosing] = useState(false);
  const [expandedAssetId, setExpandedAssetId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Reset closing state when opening to ensure smooth transition
      setIsClosing(false);
      document.body.classList.add('drawer-open');
      // Set first asset as expanded by default
      if (contact?.sharedAssets && contact.sharedAssets.length > 0) {
        setExpandedAssetId(contact.sharedAssets[0].id || 0);
      }
      // Force a reflow to ensure transition triggers for both backdrop and drawer
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            // Transition will trigger automatically via CSS
          }, 0);
        });
      });
    } else if (!isClosing) {
      // Only remove body class if not closing (to allow animation to complete)
      document.body.classList.remove('drawer-open');
      setExpandedAssetId(null);
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen, contact, isClosing]);

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple close calls
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      // Small delay before resetting isClosing to ensure parent has updated
      setTimeout(() => {
        setIsClosing(false);
        // Restore body scroll after closing
        document.body.classList.remove('drawer-open');
      }, 50);
    }, 300);
  };

  // Keep component rendered during closing animation
  if ((!isOpen || !contact) && !isClosing) return null;

  // Debug: Log contact data
  console.log('ContactDrawer - Contact data:', contact);
  console.log('ContactDrawer - Shared Assets:', contact?.sharedAssets);
  console.log('ContactDrawer - Shared Assets Length:', contact?.sharedAssets?.length);

  return (
    <>
      {/* Backdrop */}
      <div className={`contact-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div 
        className={`contact-drawer ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="contact-drawer-content">
          <div className="contact-drawer-section">
            <div className="contact-drawer-section-header">
              <button className="contact-drawer-back-button" onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                </svg>
              </button>
              <div className="contact-drawer-edit-link">
                <a href="#" onClick={(e) => { e.preventDefault(); }}>Edit contact</a>
              </div>
            </div>
            <h2 className="contact-drawer-name">{contact.name || 'No name'}</h2>
            
            {/* Discovered Interests Section */}
            <div className="contact-drawer-interests-section">
              <h3 className="contact-drawer-interests-title">
                Discovered Interests
              </h3>
              <div className="contact-drawer-ai-summary-section">
                <div className="contact-drawer-ai-summary-gradient-border"></div>
                <p className="contact-drawer-ai-summary">
                  {contact.aiSummary || `${contact.name || 'They'} is interested in BX X and is now in a due diligence process. He has spent a majority of his time on the 'Jupiter Industrial Portfolio' as a seed asset in BX X, also looking to industrial performance in the BX IX quarterly report.`}
                </p>
              </div>
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
                              <div className={`contact-drawer-asset-title ${isExpanded ? 'expanded' : ''}`}>{asset.title}</div>
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
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id={`timelapse_mask_${assetId}`} style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                  <rect width="16" height="16" fill="#D9D9D9"/>
                                </mask>
                                <g mask={`url(#timelapse_mask_${assetId})`}>
                                  <path d="M8 10.8289C8.92468 10.8289 9.71069 10.5053 10.3581 9.85805C11.0053 9.21069 11.3289 8.42468 11.3289 7.5C11.3289 6.7162 11.0871 6.02349 10.6035 5.42187C10.12 4.82034 9.49783 4.43196 8.737 4.25674C8.57818 4.23744 8.43976 4.27922 8.32175 4.38208C8.20374 4.48484 8.14474 4.61564 8.14474 4.77446V7.55572L6.1808 9.51966C6.06279 9.63767 6.01045 9.77517 6.02376 9.93216C6.03718 10.0891 6.10771 10.2151 6.23537 10.3101C6.4929 10.4949 6.77336 10.6276 7.07672 10.7081C7.38019 10.7887 7.68795 10.8289 8 10.8289ZM8.00101 13C7.24028 13 6.52523 12.8556 5.85587 12.5669C5.18651 12.2782 4.60428 11.8864 4.10918 11.3915C3.61409 10.8966 3.22209 10.3146 2.9332 9.64558C2.6444 8.97651 2.5 8.26165 2.5 7.50101C2.5 6.74028 2.64435 6.02523 2.93305 5.35587C3.22175 4.68651 3.61356 4.10428 4.10846 3.60918C4.60336 3.11409 5.18535 2.72209 5.85442 2.4332C6.52349 2.1444 7.23835 2 7.99899 2C8.75972 2 9.47477 2.14435 10.1441 2.43305C10.8135 2.72175 11.3957 3.11356 11.8908 3.60846C12.3859 4.10336 12.7779 4.68535 13.0668 5.35442C13.3556 6.02349 13.5 6.73835 13.5 7.49899C13.5 8.25972 13.3556 8.97477 13.0669 9.64413C12.7782 10.3135 12.3864 10.8957 11.8915 11.3908C11.3966 11.8859 10.8146 12.2779 10.1456 12.5668C9.47651 12.8556 8.76165 13 8.00101 13ZM8 12.1316C9.29298 12.1316 10.3882 11.6829 11.2855 10.7855C12.1829 9.88816 12.6316 8.79298 12.6316 7.5C12.6316 6.20702 12.1829 5.11184 11.2855 4.21447C10.3882 3.31711 9.29298 2.86842 8 2.86842C6.70702 2.86842 5.61184 3.31711 4.71447 4.21447C3.81711 5.11184 3.36842 6.20702 3.36842 7.5C3.36842 8.79298 3.81711 9.88816 4.71447 10.7855C5.61184 11.6829 6.70702 12.1316 8 12.1316Z" fill="#1C1B1F" fillOpacity="0.95"/>
                                </g>
                              </svg>
                              <span>Engaged</span>
                            </div>
                            {index === 0 && (
                              <div className="contact-drawer-asset-badge trending">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <mask id={`mask0_${assetId}`} style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                    <rect width="16" height="16" fill={`url(#paint0_linear_${assetId})`}/>
                                  </mask>
                                  <g mask={`url(#mask0_${assetId})`}>
                                    <path d="M2.01835 11.5064C1.91491 11.4031 1.86596 11.2843 1.87152 11.1501C1.87707 11.0159 1.92602 10.9026 2.01835 10.8104L5.38119 7.40391C5.61107 7.16969 5.89568 7.05258 6.23502 7.05258C6.57424 7.05258 6.86096 7.16969 7.09518 7.40391L8.76052 9.07958C8.79907 9.11802 8.84613 9.13725 8.90169 9.13725C8.95724 9.13725 9.00635 9.11802 9.04902 9.07958L12.644 5.52441H11.167C11.0251 5.52441 10.9064 5.47658 10.8107 5.38091C10.7149 5.28514 10.667 5.1663 10.667 5.02441C10.667 4.88253 10.7149 4.76375 10.8107 4.66808C10.9064 4.5723 11.0251 4.52441 11.167 4.52441H13.731C13.9029 4.52441 14.0463 4.58191 14.1612 4.69691C14.2762 4.81191 14.3337 4.9553 14.3337 5.12708V7.69108C14.3337 7.83297 14.2858 7.9518 14.19 8.04758C14.0944 8.14325 13.9756 8.19108 13.8337 8.19108C13.6918 8.19108 13.573 8.1443 13.4774 8.05075C13.3816 7.95719 13.3337 7.83947 13.3337 7.69758V6.22691L9.75552 9.80525C9.52552 10.0351 9.24091 10.1501 8.90169 10.1501C8.56235 10.1501 8.27774 10.0351 8.04785 9.80525L6.38235 8.13975C6.34391 8.1013 6.2948 8.08208 6.23502 8.08208C6.17513 8.08208 6.12596 8.1013 6.08752 8.13975L2.72085 11.5064C2.6243 11.6031 2.50719 11.6514 2.36952 11.6514C2.23196 11.6514 2.11491 11.6031 2.01835 11.5064Z" fill={`url(#paint1_linear_${assetId})`}/>
                                  </g>
                                  <defs>
                                    <linearGradient id={`paint0_linear_${assetId}`} x1="-5.56523" y1="-15.0001" x2="15.3023" y2="-14.5106" gradientUnits="userSpaceOnUse">
                                      <stop stopColor="#F05524"/>
                                      <stop offset="0.288462" stopColor="#EE454A"/>
                                      <stop offset="0.418269" stopColor="#D5529D"/>
                                      <stop offset="0.649038" stopColor="#926AAE"/>
                                      <stop offset="1" stopColor="#0287FF"/>
                                    </linearGradient>
                                    <linearGradient id={`paint1_linear_${assetId}`} x1="-2.46373" y1="-2.15718" x2="13.7718" y2="-1.49124" gradientUnits="userSpaceOnUse">
                                      <stop stopColor="#0287FF"/>
                                      <stop offset="0.350962" stopColor="#926AAE"/>
                                      <stop offset="0.581731" stopColor="#D5529D"/>
                                      <stop offset="0.711538" stopColor="#EE454A"/>
                                      <stop offset="1" stopColor="#F05524"/>
                                    </linearGradient>
                                  </defs>
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

                        {/* Interest Patterns */}
                        <div className="contact-drawer-asset-engagement">
                          <div className="contact-drawer-asset-engagement-header">
                            <div className="contact-drawer-asset-engagement-title">Interest patterns</div>
                          </div>
                          <div className="contact-drawer-asset-engagement-items">
                            <div className="contact-drawer-asset-engagement-item">
                              <div className="contact-drawer-asset-engagement-item-title">Market fundamentals (p2, p5)</div>
                            </div>
                            <div className="contact-drawer-asset-engagement-item">
                              <div className="contact-drawer-asset-engagement-item-title">Jupiter Industrial tenant breakdown (p14)</div>
                            </div>
                            <div className="contact-drawer-asset-engagement-item">
                              <div className="contact-drawer-asset-engagement-item-header">
                                <div className="contact-drawer-asset-engagement-item-title">Cap rate movement (p16)</div>
                                <a 
                                  href="#" 
                                  className="contact-drawer-remove-asset-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Handle remove asset logic
                                    console.log('Remove asset:', asset.title);
                                  }}
                                >
                                  Remove asset
                                </a>
                              </div>
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
        
        {/* Email Button - Fixed at bottom */}
        <div className="contact-drawer-bottom-bar">
          <button className="contact-drawer-email-button">
            Email {contact.name?.split(' ')[0] || 'Contact'}
          </button>
        </div>
      </div>
    </>
  );
}


