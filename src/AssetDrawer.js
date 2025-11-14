import React, { useState, useEffect } from 'react';
import './AssetDrawer.css';
import AssetCardLibrary from './AssetCardLibrary';
import { getAssetImageUrl } from './utils/assetImageHelper';

export default function AssetDrawer({ isOpen, onClose, asset, initialMode = 'analytics' }) {
  const [isClosing, setIsClosing] = useState(false);
  const [drawerMode, setDrawerMode] = useState('analytics'); // 'analytics', 'share', or 'shared'
  const [step, setStep] = useState(1); // 1: Share with contacts, 2: Add suggested materials, 3: Confirmation
  const [selectedContacts, setSelectedContacts] = useState(new Set()); // Track selected contact IDs
  const [searchTerm, setSearchTerm] = useState(''); // Track search input
  const [emailInput, setEmailInput] = useState(''); // Track email input
  const [notifyContacts, setNotifyContacts] = useState(true); // Track notify contacts toggle
  const [selectedSuggestedMaterials, setSelectedSuggestedMaterials] = useState(new Set([1, 2, 3, 4, 5])); // All selected by default
  const [showToast, setShowToast] = useState(false);

  // Sample contacts data - first 7 contacts from contacts page
  const allContacts = [
    { id: 'contact1', name: 'Ryan Stanford', email: 'rystanford@yahoo.com', tag: null },
    { id: 'contact2', name: 'Tom Slack', email: 'tslack@gmail.com', tag: null },
    { id: 'contact3', name: 'Olivia Chen', email: 'oliviachen27@outlook.com', tag: null },
    { id: 'contact4', name: 'Marcus Patel', email: 'marcuspatel@gmail.com', tag: null },
    { id: 'contact5', name: 'Hannah Keane', email: 'hannahk32@icloud.com', tag: null },
    { id: 'contact6', name: 'Alex Romero', email: 'alex.romero98@yahoo.com', tag: null },
    { id: 'contact7', name: 'Sophie Delaney', email: 'sophiedelaney@gmail.com', tag: null },
  ];

  // Suggested materials data
  const suggestedMaterials = [
    {
      id: 1,
      title: 'BX Digital Infrastructure Strategy',
      image: '/Assets/BX Digital Infrastructure Strategy.png',
      tag: 'Sector/Topic'
    },
    {
      id: 2,
      title: 'BX Real Assets Case Studies',
      image: '/Assets/$25bn in Pennsylvania Data Centers.jpg',
      tag: 'Sector/Topic'
    },
    {
      id: 3,
      title: 'U.S. Real Estate Market Forecast',
      image: '/Assets/BX Real Estate Partners X.jpg',
      tag: 'Sector/Topic'
    },
    {
      id: 4,
      title: "Blackstone Infrastructure Partners Closes on $14BN in Commitments in it's Inaugural Fundraising Phase",
      image: '/Assets/Artificial Intelligence through Private Markets.jpg',
      tag: 'Fund Series'
    },
    {
      id: 5,
      title: 'Essentials of Private Markets',
      image: '/Assets/CrossBorder Capital Flows.jpg',
      tag: 'Related Material'
    }
  ];

  // Mock data for shared contacts - aligned with first 3 contacts from contacts page
  const sharedContactsData = [
    {
      id: 1,
      name: 'Ryan Stanford',
      email: 'rystanford@yahoo.com',
      lastVisit: '30 mins ago',
      intent: 'High Intent'
    },
    {
      id: 2,
      name: 'Tom Slack',
      email: 'tslack@gmail.com',
      lastVisit: '3 hours ago',
      intent: 'High Intent'
    },
    {
      id: 3,
      name: 'Olivia Chen',
      email: 'oliviachen27@outlook.com',
      lastVisit: '7 days ago',
      intent: null
    }
  ];

  // Filter contacts based on search term
  const filteredContacts = allContacts.filter(contact => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return contact.name.toLowerCase().includes(searchLower) || 
           contact.email.toLowerCase().includes(searchLower);
  });

  useEffect(() => {
    if (isOpen && !isClosing) {
      // Only reset state when opening (not during closing animation)
      setIsClosing(false);
      setDrawerMode(initialMode); // Use initialMode prop
      setStep(1); // Reset to step 1 when opening
      setSelectedContacts(new Set()); // Reset selected contacts when opening
      setSearchTerm(''); // Reset search term when opening
      setEmailInput(''); // Reset email input when opening
      setNotifyContacts(true); // Reset notify contacts toggle when opening
      setSelectedSuggestedMaterials(new Set([1, 2, 3, 4, 5])); // Reset suggested materials
      setShowToast(false); // Reset toast when opening
      // Prevent body scroll when drawer is open
      document.body.classList.add('drawer-open');
      // Force a reflow to ensure transition triggers
      requestAnimationFrame(() => {
        // Transition will trigger automatically via CSS
      });
    } else if (!isOpen && !isClosing) {
      // Only remove body class if not closing (to allow animation to complete)
      document.body.classList.remove('drawer-open');
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen, initialMode, isClosing]);

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple close calls
    setIsClosing(true);
    setShowToast(false); // Hide toast when closing
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
      // Small delay before resetting isClosing to ensure parent has updated
      setTimeout(() => {
        setIsClosing(false);
        // Restore body scroll after closing
        document.body.classList.remove('drawer-open');
      }, 50);
    }, 300); // Match the animation duration
  };

  const handleShareAsset = () => {
    setDrawerMode('share');
    setStep(1);
  };

  const handleBackToAnalytics = () => {
    setDrawerMode('analytics');
    setStep(1);
  };

  const handleShareAssets = () => {
    const canShare = selectedContacts.size > 0 || emailInput.trim().length > 0;
    if (canShare) {
      // Move to step 2: Add suggested materials
      setStep(2);
    }
  };

  const handleProceed = () => {
    // Move to step 3: Confirmation page
    setStep(3);
    // Show toast notification
    setShowToast(true);
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleBackToDashboard = () => {
    handleClose();
  };

  const handleSuggestedMaterialToggle = (materialId) => {
    setSelectedSuggestedMaterials(prev => {
      const newSet = new Set(prev);
      if (newSet.has(materialId)) {
        newSet.delete(materialId);
      } else {
        newSet.add(materialId);
      }
      return newSet;
    });
  };

  // Get the first shared asset (primary asset)
  const primarySharedAsset = asset || {
    title: "KKR Infrastructure - Presentation",
    thumbnail: '/Assets/KKR Infrastructure - Presentation.png',
    image: '/Assets/KKR Infrastructure - Presentation.png'
  };

  const canShare = selectedContacts.size > 0 || emailInput.trim().length > 0;

  const handleContactSelect = (contactId) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = () => {
    if (selectedContacts.size === filteredContacts.length) {
      // If all visible contacts are selected, deselect all
      setSelectedContacts(new Set());
    } else {
      // Select all visible contacts
      const allFilteredIds = new Set(filteredContacts.map(contact => contact.id));
      setSelectedContacts(allFilteredIds);
    }
  };

  // Keep component rendered during closing animation
  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`asset-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Toast Notification */}
      {showToast && (
        <div className="asset-drawer-toast-notification">
          <div className="asset-drawer-toast-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
            </svg>
          </div>
          <p className="asset-drawer-toast-text">Your asset has been shared</p>
        </div>
      )}
      
      {/* Drawer */}
      <div 
        className={`asset-drawer ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - only show in share mode */}
        {drawerMode === 'share' && (
          <div className="asset-drawer-share-header">
            <button 
              className="asset-drawer-share-back-button" 
              onClick={step === 2 ? () => setStep(1) : step === 3 ? () => setStep(2) : handleBackToAnalytics}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
              </svg>
            </button>
            <h2 className="asset-drawer-share-title">
              {step === 1 ? 'Share with contacts' : step === 2 ? 'Add Suggested Materials' : 'Sharing Confirmation'}
            </h2>
          </div>
        )}
        
        {/* Content */}
        <div className={`asset-drawer-content ${drawerMode === 'share' ? 'asset-drawer-share-content' : ''}`}>
          {drawerMode === 'analytics' ? (
            <>
              {/* Asset Preview Section */}
              <div className="asset-drawer-section">
                <div className="asset-drawer-section-header">
                  <button className="asset-drawer-back-btn" onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                    </svg>
                  </button>
                  <h3 className="asset-drawer-section-title">{asset?.title || "Asset Title"}</h3>
                </div>

                {/* Asset Preview Card */}
                <div className="asset-drawer-preview">
                  <AssetCardLibrary
                    image={asset?.image || null} // Pass null instead of fallback to let helper resolve image
                    title={asset?.title || "Asset Title"}
                    duration={asset?.duration || "5 mins"}
                    patterns={asset?.patterns || "patterns"}
                    isPinned={asset?.isPinned || false}
                    highlighted={asset?.highlighted || false}
                    hideMetadata={true} // Hide mins/patterns labels and share button
                    file={asset?.file} // Pass file prop for image resolution
                    onClick={() => {}} // Non-clickable - empty function
                    onPin={() => {}} // Non-clickable - empty function
                    onShare={() => {}} // Non-clickable - empty function
                  />
                </div>

                {/* Analytics Content */}
                <div className="asset-drawer-analytics">
                  <div className="asset-drawer-analytics-section">
                    <div className="asset-drawer-analytics-gradient-border"></div>
                    <div className="asset-drawer-analytics-text-wrapper">
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
                </div>
              </div>

              {/* Shared With Section */}
              <div className="asset-drawer-section">
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
                          <span>Daniel Hurst</span>
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
                          <span>Laura Bishop</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">3 days ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge high">High</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Ben Keller</span>
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
                          <span>Megan Duarte</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">5 days ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge medium">Medium</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Chris Nolan</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">2 weeks ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge low">Low</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Zoe Hart</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">1 week ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge low">Low</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : drawerMode === 'share' ? (
            <>
              {step === 1 && (
                <>
                  {/* Search and Filter */}
                  <div className="asset-drawer-search-section">
                <div className="asset-drawer-search-container">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="asset-drawer-search-icon">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Start typing to search..." 
                    className="asset-drawer-search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <button className="asset-drawer-filter-button">
                  <span>Filter</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="asset_filter_mask" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                      <rect width="20" height="20" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#asset_filter_mask)">
                      <path d="M8.56571 14.5833V13.3333H11.4263V14.5833H8.56571ZM5.33675 10.625V9.37501H14.6555V10.625H5.33675ZM2.91675 6.66667V5.41667H17.0834V6.66667H2.91675Z" fill="#1C1B1F"/>
                    </g>
                  </svg>
                </button>
              </div>

              {/* Select All */}
              <div className="asset-drawer-select-all">
                <input
                  type="checkbox"
                  id="asset-select-all"
                  checked={filteredContacts.length > 0 && selectedContacts.size === filteredContacts.length}
                  onChange={handleSelectAll}
                  className="asset-drawer-checkbox"
                />
                <label htmlFor="asset-select-all" className="asset-drawer-select-all-label">Select all</label>
              </div>

              {/* Contacts List */}
              <div className="asset-drawer-contacts-list">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="asset-drawer-contact-item">
                    <input
                      type="checkbox"
                      id={`asset-contact-${contact.id}`}
                      checked={selectedContacts.has(contact.id)}
                      onChange={() => handleContactSelect(contact.id)}
                      className="asset-drawer-checkbox"
                    />
                    <label htmlFor={`asset-contact-${contact.id}`} className="asset-drawer-contact-label">
                      <div className="asset-drawer-contact-info">
                        <div className="asset-drawer-contact-name">{contact.name}</div>
                        <div className="asset-drawer-contact-email">
                          {contact.email}
                          {contact.tag && (
                            <span className="asset-drawer-contact-tag">{contact.tag}</span>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Share via email */}
              <div className="asset-drawer-email-section">
                <h3 className="asset-drawer-section-title">Share via email</h3>
                <p className="asset-drawer-section-description">
                  To share with people not in your contacts list, enter their work emails separated by a comma.
                </p>
                <div className="asset-drawer-email-input-container">
                  <label htmlFor="asset-email-input" className="asset-drawer-email-label">Work emails</label>
                  <textarea
                    id="asset-email-input"
                    className="asset-drawer-email-input"
                    placeholder="example.1@work.com, example.2@work.com, example.3@work.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Notify contacts */}
              <div className="asset-drawer-notify-section">
                <h3 className="asset-drawer-section-title">Notify contact(s)</h3>
                <div className="asset-drawer-toggle-container">
                  <button
                    className={`asset-drawer-toggle ${notifyContacts ? 'active' : ''}`}
                    onClick={() => setNotifyContacts(!notifyContacts)}
                    type="button"
                  >
                    <div className="asset-drawer-toggle-slider"></div>
                  </button>
                  <span className="asset-drawer-toggle-label">Send email notification with link to asset</span>
                </div>
              </div>
                </>
              )}
              {step === 2 && (
                <>
                  {/* Step 2: Add Suggested Materials */}
                  {/* Sharing Section */}
                  <div className="suggested-materials-sharing-section">
                    <h3 className="suggested-materials-section-title">Sharing</h3>
                    <div className="suggested-materials-primary-asset">
                      <div className="suggested-materials-asset-image">
                        {asset?.thumbnail || asset?.image ? (
                          <img 
                            src={getAssetImageUrl(asset?.title, asset?.thumbnail || asset?.image, asset?.file)} 
                            alt={asset?.title}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <img 
                            src="/Assets/KKR Infrastructure - Presentation.png" 
                            alt="Asset placeholder"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        )}
                        <div className="suggested-materials-asset-image-placeholder" style={{ display: 'none' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div className="suggested-materials-asset-info">
                        <div className="suggested-materials-asset-title">{asset?.title || 'Asset Title'}</div>
                        <div className="suggested-materials-asset-label">Primary asset</div>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Materials Section */}
                  <div className="suggested-materials-section">
                    <div className="suggested-materials-section-header">
                      <h3 className="suggested-materials-section-title">Suggested Materials</h3>
                      <div className="suggested-materials-tooltip-container">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="suggested-materials-info-icon"
                        >
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M8 11V8M8 5H8.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <div className="suggested-materials-tooltip">
                          Suggested documents are conditional and can be shared if recipients need them. These improve context for the shared asset if needed.
                        </div>
                      </div>
                    </div>
                    <div className="suggested-materials-list">
                      {suggestedMaterials.map((material) => (
                        <div key={material.id} className="suggested-materials-item">
                          <label htmlFor={`asset-material-${material.id}`} className="suggested-materials-item-content">
                            <input
                              type="checkbox"
                              id={`asset-material-${material.id}`}
                              checked={selectedSuggestedMaterials.has(material.id)}
                              onChange={() => handleSuggestedMaterialToggle(material.id)}
                              className="suggested-materials-checkbox"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="suggested-materials-item-image">
                              <img 
                                src={material.image} 
                                alt={material.title}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="suggested-materials-item-image-placeholder" style={{ display: 'none' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M14 2V8H20" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            </div>
                            <div className="suggested-materials-item-info">
                              <div className="suggested-materials-item-title">{material.title}</div>
                              <div 
                                className={`suggested-materials-item-tag ${
                                  material.tag === 'Fund Series' 
                                    ? 'suggested-materials-tag-fund-series'
                                    : material.tag === 'Related Material'
                                    ? 'suggested-materials-tag-related-material'
                                    : ''
                                }`}
                              >
                                {material.tag}
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <button className="suggested-materials-add-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  {/* Step 3: Sharing Confirmation */}
                  <div className="share-confirmation-content">
                    {/* Confirmation Message */}
                    <div className="share-confirmation-message">
                      <p className="share-confirmation-text">Your asset has been shared</p>
                    </div>

                    {/* Asset Preview Card */}
                    <div className="share-confirmation-asset-card">
                      <div className="share-confirmation-asset-image-container">
                        <div className="share-confirmation-asset-image">
                          <img 
                            src={getAssetImageUrl(primarySharedAsset?.title, primarySharedAsset?.thumbnail || primarySharedAsset?.image, primarySharedAsset?.file)} 
                            alt={primarySharedAsset?.title}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="share-confirmation-asset-image-placeholder" style={{ display: 'none' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2V8H20" stroke="#808b8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="share-confirmation-asset-title-frame">
                          <div className="share-confirmation-asset-title">{primarySharedAsset?.title || "KKR Infrastructure - Presentation"}</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Summary */}
                    <p className="share-confirmation-summary">
                      '<strong>{primarySharedAsset?.title || "KKR Infrastructure - Presentation"}</strong>' has been shared. Below is how this asset is performing overall.
                    </p>

                    {/* Discovered Interests */}
                    <div className="share-confirmation-interests">
                      <h3 className="share-confirmation-interests-title">Discovered Interests</h3>
                      <ul className="share-confirmation-interests-list">
                        <li>Q2 Logistics performance (p2, p5)</li>
                        <li>Increase in debt facility (p14)</li>
                        <li>Spanish hotel acquisition (p16)</li>
                      </ul>
                    </div>

                    {/* Shared With Table */}
                    <div className="share-confirmation-table-container">
                      <table className="share-confirmation-table">
                        <thead>
                          <tr>
                            <th>Shared with</th>
                            <th>Last visit</th>
                            <th>Intent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sharedContactsData.map((contact) => (
                            <tr key={contact.id}>
                              <td>
                                <div className="share-confirmation-contact-info">
                                  <div className="share-confirmation-contact-name">{contact.name}</div>
                                  <div className="share-confirmation-contact-email">{contact.email}</div>
                                </div>
                              </td>
                              <td>{contact.lastVisit}</td>
                              <td>
                                {contact.intent ? (
                                  <div className="share-confirmation-intent">
                                    <span>{contact.intent}</span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <mask id={`asset_intent_mask_${contact.id}`} style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                        <rect width="16" height="16" fill={`url(#paint0_linear_${contact.id})`}/>
                                      </mask>
                                      <g mask={`url(#asset_intent_mask_${contact.id})`}>
                                        <path d="M2.01835 11.5064C1.91491 11.4031 1.86596 11.2843 1.87152 11.1501C1.87707 11.0159 1.92602 10.9026 2.01835 10.8104L5.38119 7.40391C5.61107 7.16969 5.89568 7.05258 6.23502 7.05258C6.57424 7.05258 6.86096 7.16969 7.09518 7.40391L8.76052 9.07958C8.79907 9.11802 8.84613 9.13725 8.90169 9.13725C8.95724 9.13725 9.00635 9.11802 9.04902 9.07958L12.644 5.52441H11.167C11.0251 5.52441 10.9064 5.47658 10.8107 5.38091C10.7149 5.28514 10.667 5.1663 10.667 5.02441C10.667 4.88253 10.7149 4.76375 10.8107 4.66808C10.9064 4.5723 11.0251 4.52441 11.167 4.52441H13.731C13.9029 4.52441 14.0463 4.58191 14.1612 4.69691C14.2762 4.81191 14.3337 4.9553 14.3337 5.12708V7.69108C14.3337 7.83297 14.2858 7.9518 14.19 8.04758C14.0944 8.14325 13.9756 8.19108 13.8337 8.19108C13.6918 8.19108 13.573 8.1443 13.4774 8.05075C13.3816 7.95719 13.3337 7.83947 13.3337 7.69758V6.22691L9.75552 9.80525C9.52552 10.0351 9.24091 10.1501 8.90169 10.1501C8.56235 10.1501 8.27774 10.0351 8.04785 9.80525L6.38235 8.13975C6.34391 8.1013 6.29480 8.08208 6.23502 8.08208C6.17513 8.08208 6.12596 8.1013 6.08752 8.13975L2.72085 11.5064C2.62430 11.6031 2.50719 11.6514 2.36952 11.6514C2.23196 11.6514 2.11491 11.6031 2.01835 11.5064Z" fill={`url(#paint1_linear_${contact.id})`}/>
                                      </g>
                                      <defs>
                                        <linearGradient id={`paint0_linear_${contact.id}`} x1="-5.56523" y1="-15.0001" x2="15.3023" y2="-14.5106" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#F05524"/>
                                          <stop offset="0.288462" stopColor="#EE454A"/>
                                          <stop offset="0.418269" stopColor="#D5529D"/>
                                          <stop offset="0.649038" stopColor="#926AAE"/>
                                          <stop offset="1" stopColor="#0287FF"/>
                                        </linearGradient>
                                        <linearGradient id={`paint1_linear_${contact.id}`} x1="-2.46373" y1="-2.15718" x2="13.7718" y2="-1.49124" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#0287FF"/>
                                          <stop offset="0.350962" stopColor="#926AAE"/>
                                          <stop offset="0.581731" stopColor="#D5529D"/>
                                          <stop offset="0.711538" stopColor="#EE454A"/>
                                          <stop offset="1" stopColor="#F05524"/>
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                  </div>
                                ) : (
                                  <span>—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Additional Materials Link */}
                    <div className="share-confirmation-materials-section">
                      <h4 className="share-confirmation-materials-title">See conventionally available materials</h4>
                      <div className="share-confirmation-share-link-container">
                        {/* Visual Preview */}
                        <div className="share-confirmation-visual-preview">
                          <div className="visual-preview-image">
                            <img 
                              src="/Assets/$25bn in Pennsylvania Data Centers.jpg" 
                              alt="Data Center"
                              className="visual-preview-content"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {/* Asset Shared Section */}
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
                    image={asset?.image || null} // Pass null instead of fallback to let helper resolve image
                    title={asset?.title || "Asset Title"}
                    duration={asset?.duration || "5 mins"}
                    patterns={asset?.patterns || "patterns"}
                    isPinned={asset?.isPinned || false}
                    highlighted={asset?.highlighted || false}
                    hideMetadata={true} // Hide mins/patterns labels and share button
                    file={asset?.file} // Pass file prop for image resolution
                    onClick={() => {}} // Non-clickable - empty function
                    onPin={() => {}} // Non-clickable - empty function
                    onShare={() => {}} // Non-clickable - empty function
                  />
                </div>

                {/* Shared Success Message */}
                <div className="asset-drawer-shared-message">
                  <p className="asset-drawer-shared-text">
                    'BX Digital Infrastructure Strategy' has been shared. Below is how this asset is performing overall.
                  </p>
                </div>

                {/* Analytics Content */}
                <div className="asset-drawer-analytics">
                  <div className="asset-drawer-analytics-section">
                    <div className="asset-drawer-analytics-gradient-border"></div>
                    <div className="asset-drawer-analytics-text-wrapper">
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
                </div>
              </div>

              {/* Shared With Section */}
              <div className="asset-drawer-section">
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
                          <span>Daniel Hurst</span>
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
                          <span>Laura Bishop</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">3 days ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge high">High</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Ben Keller</span>
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
                          <span>Megan Duarte</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">5 days ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge medium">Medium</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Chris Nolan</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">2 weeks ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge low">Low</div>
                      </div>
                    </div>
                    
                    <div className="asset-drawer-table-row">
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-contact">
                          <span>Zoe Hart</span>
                        </div>
                      </div>
                      <div className="asset-drawer-table-cell">1 week ago</div>
                      <div className="asset-drawer-table-cell">
                        <div className="asset-drawer-intent-badge low">Low</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Bottom Bar */}
        <div className="asset-drawer-bottom-bar">
          {drawerMode === 'analytics' ? (
            <>
              <button className="asset-drawer-cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button className="asset-drawer-share-btn active" onClick={handleShareAsset}>
                Share Asset
              </button>
            </>
          ) : drawerMode === 'share' ? (
            <>
              {step === 1 ? (
                <>
                  <button className="asset-drawer-cancel-btn" onClick={handleClose}>
                    Cancel
                  </button>
                  <button 
                    className={`asset-drawer-share-btn ${canShare ? 'active' : ''}`}
                    disabled={!canShare}
                    onClick={handleShareAssets}
                  >
                    Share Assets
                  </button>
                </>
              ) : step === 2 ? (
                <button 
                  className="asset-drawer-proceed-button"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              ) : (
                <button 
                  className="asset-drawer-proceed-button"
                  onClick={handleBackToDashboard}
                >
                  Back to Dashboard
                </button>
              )}
            </>
          ) : (
            <>
              <button className="asset-drawer-cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button className="asset-drawer-share-btn">
                Share Asset
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
