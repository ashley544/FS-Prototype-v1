import React, { useState, useEffect } from 'react';
import './AssetDrawer.css';
import AssetCardLibrary from './AssetCardLibrary';

export default function AssetDrawer({ isOpen, onClose, asset, initialMode = 'analytics' }) {
  const [isClosing, setIsClosing] = useState(false);
  const [drawerMode, setDrawerMode] = useState('analytics'); // 'analytics', 'share', or 'shared'
  const [selectedContacts, setSelectedContacts] = useState(new Set()); // Track selected contact IDs
  const [searchTerm, setSearchTerm] = useState(''); // Track search input

  // Sample contacts data
  const allContacts = [
    { id: 'contact1', name: 'James Wilson', email: 'james.wilson@company.com' },
    { id: 'contact2', name: 'Sarah Chen', email: 'sarah.chen@company.com' },
    { id: 'contact3', name: 'Michael Rodriguez', email: 'michael.rodriguez@company.com' },
    { id: 'contact4', name: 'John Doe', email: 'john.doe@company.com' },
    { id: 'contact5', name: 'Jane Smith', email: 'jane.smith@company.com' },
    { id: 'contact6', name: 'David UBS Manager', email: 'david.manager@ubs.com' },
    { id: 'contact7', name: 'Lisa UBS Analyst', email: 'lisa.analyst@ubs.com' },
    { id: 'contact8', name: 'Robert UBS Director', email: 'robert.director@ubs.com' },
    { id: 'contact9', name: 'Maria UBS VP', email: 'maria.vp@ubs.com' },
    { id: 'contact10', name: 'Thomas UBS Associate', email: 'thomas.associate@ubs.com' },
  ];

  // Filter contacts based on search term
  const filteredContacts = allContacts.filter(contact => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return contact.name.toLowerCase().includes(searchLower) || 
           contact.email.toLowerCase().includes(searchLower);
  });

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setDrawerMode(initialMode); // Use initialMode prop
      setSelectedContacts(new Set()); // Reset selected contacts when opening
      setSearchTerm(''); // Reset search term when opening
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
  }, [isOpen, initialMode]);

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

  const handleShareAssetConfirm = () => {
    setDrawerMode('shared');
  };

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
          ) : drawerMode === 'share' ? (
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
                      <input 
                        type="text" 
                        placeholder="Search contacts..." 
                        className="asset-drawer-search-field"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <button className="asset-drawer-search-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16z" stroke="currentColor" strokeWidth="2"/>
                        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>

                  {/* Select All Checkbox */}
                  <div className="asset-drawer-select-all">
                    <div className="asset-drawer-contact-checkbox">
                      <input 
                        type="checkbox" 
                        id="selectAll" 
                        checked={filteredContacts.length > 0 && selectedContacts.size === filteredContacts.length}
                        onChange={handleSelectAll}
                      />
                      <label htmlFor="selectAll"></label>
                    </div>
                    <div className="asset-drawer-contact-info">
                      <span className="asset-drawer-select-all-text">
                        Select all ({filteredContacts.length} contacts)
                      </span>
                    </div>
                  </div>

                  {/* Contact List */}
                  <div className="asset-drawer-contact-list">
                    {filteredContacts.map(contact => (
                      <div key={contact.id} className="asset-drawer-contact-item">
                        <div className="asset-drawer-contact-checkbox">
                          <input 
                            type="checkbox" 
                            id={contact.id} 
                            checked={selectedContacts.has(contact.id)}
                            onChange={() => handleContactSelect(contact.id)}
                          />
                          <label htmlFor={contact.id}></label>
                        </div>
                        <div className="asset-drawer-contact-info">
                          <div className="asset-drawer-contact-details">
                            <span className="asset-drawer-contact-name">{contact.name}</span>
                            <span className="asset-drawer-contact-email">{contact.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Share via email section */}
                  <div className="asset-drawer-email-section">
                    <h4 className="asset-drawer-email-title">Share via email</h4>
                    <p className="asset-drawer-email-helper">To share with people not in your contacts list, enter their work emails separated by a comma.</p>
                    
                    <div className="asset-drawer-title-input-container">
                      <div className="asset-drawer-title-input">
                        <label className="asset-drawer-title-label">
                          Work emails
                        </label>
                      </div>
                      
                      <div className="asset-drawer-title-field-container">
                        <input 
                          type="text" 
                          placeholder="example.1@work.com, example.2@work.com, example.3@work.com" 
                          className="asset-drawer-title-field"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className={`asset-drawer-bottom-bar ${isClosing ? 'closing' : ''}`}>
        <button className="asset-drawer-cancel-btn" onClick={handleClose}>
          Cancel
        </button>
        {drawerMode === 'analytics' ? (
          <button className="asset-drawer-share-btn" onClick={handleShareAsset}>
            Share asset
          </button>
        ) : drawerMode === 'share' ? (
          <button 
            className="asset-drawer-share-btn" 
            onClick={handleShareAssetConfirm}
            disabled={selectedContacts.size === 0}
          >
            Share asset
          </button>
        ) : (
          <button className="asset-drawer-share-btn">
            Share asset
          </button>
        )}
      </div>
    </>
  );
}
