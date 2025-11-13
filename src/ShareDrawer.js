import React, { useState, useEffect } from 'react';
import './ShareDrawer.css';
import { getAssetImageUrl } from './utils/assetImageHelper';

export default function ShareDrawer({ isOpen, onClose, asset }) {
  const [isClosing, setIsClosing] = useState(false);
  const [step, setStep] = useState(1); // 1: Share with contacts, 2: Add suggested materials, 3: Confirmation
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [emailInput, setEmailInput] = useState('');
  const [notifyContacts, setNotifyContacts] = useState(true);
  const [selectedSuggestedMaterials, setSelectedSuggestedMaterials] = useState(new Set([1, 2, 3, 4, 5])); // All selected by default

  // Sample contacts data matching the image
  const allContacts = [
    { id: 1, name: 'Tom Edwards', email: 'tedwards@kkr.com', tag: null },
    { id: 2, name: 'Laura Kim', email: 'lkim@jpmorgan.com', tag: 'Salesforce' },
    { id: 3, name: 'Michael Johnson', email: 'mjonson@bofa.com', tag: null },
    { id: 4, name: 'Sara Patel', email: 'spatel@citi.com', tag: null },
    { id: 5, name: 'Hannah Keana', email: 'hkeana@example.com', tag: null }
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset closing state when opening to ensure smooth transition
      setIsClosing(false);
      document.body.classList.add('drawer-open');
      // Force a reflow to ensure transition triggers
      // Use double RAF to ensure initial state is set before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Transition will trigger automatically via CSS
        });
      });
    } else if (!isClosing) {
      // Only remove body class if not closing (to allow animation to complete)
      document.body.classList.remove('drawer-open');
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen, isClosing]);

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple close calls
    setIsClosing(true);
    setTimeout(() => {
      // Reset state when closing
      setStep(1);
      setSearchTerm('');
      setSelectedContacts(new Set());
      setEmailInput('');
      setNotifyContacts(true);
      setSelectedSuggestedMaterials(new Set([1, 2, 3, 4, 5]));
      onClose();
      // Small delay before resetting isClosing to ensure parent has updated
      setTimeout(() => {
        setIsClosing(false);
        // Restore body scroll after closing
        document.body.classList.remove('drawer-open');
      }, 50);
    }, 300);
  };

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

  const handleShareAssets = () => {
    if (canShare) {
      // Move to step 2: Add suggested materials
      setStep(2);
    }
  };

  const handleProceed = () => {
    // Move to step 3: Confirmation page
    setStep(3);
  };

  const handleBackToDashboard = () => {
    handleClose();
  };

  // Get the first shared asset (primary asset)
  const primarySharedAsset = asset || {
    title: "Blackstone's Digital Infrastructure Strategy",
    thumbnail: '/Assets/BX Digital Infrastructure Strategy.png',
    image: '/Assets/BX Digital Infrastructure Strategy.png'
  };

  // Mock data for shared contacts
  const sharedContactsData = [
    {
      id: 1,
      name: 'James Lawson',
      email: 'j.lawson@invesco.com',
      lastVisit: '30 mins ago',
      intent: 'High Intent'
    },
    {
      id: 2,
      name: 'Lawrence Hooper',
      email: 'l.hooper@stanhope.com',
      lastVisit: '3 hours ago',
      intent: 'High Intent'
    },
    {
      id: 3,
      name: 'John S',
      email: 'johns@forbesfamily.com',
      lastVisit: '7 days ago',
      intent: null
    }
  ];

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

  const filteredContacts = allContacts.filter(contact => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return contact.name.toLowerCase().includes(searchLower) || 
           contact.email.toLowerCase().includes(searchLower);
  });

  const handleSelectAll = () => {
    if (selectedContacts.size === filteredContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(filteredContacts.map(c => c.id)));
    }
  };

  const handleContactToggle = (contactId) => {
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

  const canShare = selectedContacts.size > 0 || emailInput.trim().length > 0;

  // Keep component rendered during closing animation
  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`share-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div 
        className={`share-drawer ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="share-drawer-header">
          <button 
            className="share-drawer-back-button" 
            onClick={step === 2 ? () => setStep(1) : step === 3 ? () => setStep(2) : handleClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
          </button>
          <h2 className="share-drawer-title">
            {step === 1 ? 'Share with contacts' : step === 2 ? 'Add Suggested Materials' : 'Sharing Confirmation'}
          </h2>
        </div>

        {/* Content */}
        <div className="share-drawer-content">
          {step === 1 && (
            <>
              {/* Search and Filter */}
              <div className="share-drawer-search-section">
            <div className="share-drawer-search-container">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="share-drawer-search-icon">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input 
                type="text" 
                placeholder="Start typing to search..." 
                className="share-drawer-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="share-drawer-filter-button">
              <span>Filter</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="share_filter_mask" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                  <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#share_filter_mask)">
                  <path d="M8.56571 14.5833V13.3333H11.4263V14.5833H8.56571ZM5.33675 10.625V9.37501H14.6555V10.625H5.33675ZM2.91675 6.66667V5.41667H17.0834V6.66667H2.91675Z" fill="#1C1B1F"/>
                </g>
              </svg>
            </button>
          </div>

          {/* Select All */}
          <div className="share-drawer-select-all">
            <input
              type="checkbox"
              id="share-select-all"
              checked={filteredContacts.length > 0 && selectedContacts.size === filteredContacts.length}
              onChange={handleSelectAll}
              className="share-drawer-checkbox"
            />
            <label htmlFor="share-select-all" className="share-drawer-select-all-label">Select all</label>
          </div>

          {/* Contacts List */}
          <div className="share-drawer-contacts-list">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="share-drawer-contact-item">
                <input
                  type="checkbox"
                  id={`contact-${contact.id}`}
                  checked={selectedContacts.has(contact.id)}
                  onChange={() => handleContactToggle(contact.id)}
                  className="share-drawer-checkbox"
                />
                <label htmlFor={`contact-${contact.id}`} className="share-drawer-contact-label">
                  <div className="share-drawer-contact-info">
                    <div className="share-drawer-contact-name">{contact.name}</div>
                    <div className="share-drawer-contact-email">
                      {contact.email}
                      {contact.tag && (
                        <span className="share-drawer-contact-tag">{contact.tag}</span>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Share via email */}
          <div className="share-drawer-email-section">
            <h3 className="share-drawer-section-title">Share via email</h3>
            <p className="share-drawer-section-description">
              To share with people not in your contacts list, enter their work emails separated by a comma.
            </p>
            <div className="share-drawer-email-input-container">
              <label htmlFor="share-email-input" className="share-drawer-email-label">Work emails</label>
              <textarea
                id="share-email-input"
                className="share-drawer-email-input"
                placeholder="example.1@work.com, example.2@work.com, example.3@work.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Notify contacts */}
          <div className="share-drawer-notify-section">
            <h3 className="share-drawer-section-title">Notify contact(s)</h3>
            <div className="share-drawer-toggle-container">
              <button
                className={`share-drawer-toggle ${notifyContacts ? 'active' : ''}`}
                onClick={() => setNotifyContacts(!notifyContacts)}
                type="button"
              >
                <div className="share-drawer-toggle-slider"></div>
              </button>
              <span className="share-drawer-toggle-label">Send email notification with link to asset</span>
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
                      <label htmlFor={`material-${material.id}`} className="suggested-materials-item-content">
                        <input
                          type="checkbox"
                          id={`material-${material.id}`}
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
                          <div className="suggested-materials-item-tag">{material.tag}</div>
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
                  <div className="share-confirmation-checkmark">
                    <img src="/checkmark.svg" alt="Checkmark" />
                  </div>
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
                      <div className="share-confirmation-asset-title">{primarySharedAsset?.title || "Blackstone's Digital Infrastructure Strategy"}</div>
                    </div>
                  </div>
                </div>

                {/* Performance Summary */}
                <p className="share-confirmation-summary">
                  '<strong>{primarySharedAsset?.title || "Blackstone's Digital Infrastructure Strategy"}</strong>' has been shared. Below is how this asset is performing overall.
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
                                  <mask id={`intent_mask_${contact.id}`} style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                    <rect width="16" height="16" fill={`url(#paint0_linear_${contact.id})`}/>
                                  </mask>
                                  <g mask={`url(#intent_mask_${contact.id})`}>
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
                    <svg className="share-confirmation-share-link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 11C13.5705 10.4259 13.0226 9.95086 12.3934 9.60707C11.7643 9.26328 11.0685 9.05886 10.3533 9.00766C9.63816 8.95645 8.92037 9.05972 8.24864 9.31028C7.57691 9.56084 6.96688 9.95301 6.46 10.46L3.46 13.46C2.54918 14.403 2.04519 15.6661 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <a href="https://demo.kkr.com/shared/materials" target="_blank" rel="noopener noreferrer" className="share-confirmation-share-link-url">
                      https://demo.kkr.com/shared/materials
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="share-drawer-footer">
          {step === 1 ? (
            <>
              <button className="share-drawer-cancel-button" onClick={handleClose}>
                Cancel
              </button>
              <button 
                className={`share-drawer-share-button ${canShare ? 'active' : ''}`}
                disabled={!canShare}
                onClick={handleShareAssets}
              >
                Share Assets
              </button>
            </>
          ) : step === 2 ? (
            <button 
              className="share-drawer-proceed-button"
              onClick={handleProceed}
            >
              Proceed
            </button>
          ) : (
            <button 
              className="share-drawer-proceed-button"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    </>
  );
}

