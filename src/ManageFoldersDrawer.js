import React, { useState, useEffect } from 'react';
import './ManageFoldersDrawer.css';

export default function ManageFoldersDrawer({ isOpen, onClose, exchangeAssets = [], newsroomAssets = [] }) {
  const [isClosing, setIsClosing] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const [searchQueries, setSearchQueries] = useState({});

  // Sample folder structure with placeholder assets
  // In a real app, this would come from props or API
  const [folders, setFolders] = useState([
    { 
      id: 'kkr', 
      name: 'KKR', 
      assets: [
        { id: 'kkr-1', title: 'KKR Infrastructure - Presentation' },
        { id: 'kkr-2', title: 'KKR Innovative Strategies' },
        { id: 'kkr-3', title: 'Real Estate Partners KRR' },
        { id: 'kkr-4', title: 'Artificial Intelligence through Private Markets' },
        { id: 'kkr-5', title: 'KKR Digital Infrastructure Strategy' }
      ]
    },
    { 
      id: 'coatue', 
      name: 'Coatue', 
      assets: [
        { id: 'sales-1', title: 'Sales Pitch Deck Template' },
        { id: 'sales-2', title: 'Product Comparison Sheet' },
        { id: 'sales-3', title: 'Customer Success Stories' },
        { id: 'sales-4', title: 'Pricing Strategy Document' },
        { id: 'sales-5', title: 'Sales Training Materials' },
        { id: 'sales-6', title: 'Quarterly Sales Report' }
      ]
    },
    { 
      id: 'blackstone', 
      name: 'Blackstone', 
      assets: [
        { id: 'prod-1', title: 'Product Roadmap 2024' },
        { id: 'prod-2', title: 'Feature Specification Document' },
        { id: 'prod-3', title: 'User Research Findings' },
        { id: 'prod-4', title: 'Beta Testing Results' },
        { id: 'prod-5', title: 'Product Launch Checklist' }
      ]
    },
    { 
      id: 'private-equity-all-funds', 
      name: 'Private Equity All Funds', 
      assets: [
        { id: 'eng-1', title: 'Technical Architecture Overview' },
        { id: 'eng-2', title: 'API Documentation' },
        { id: 'eng-3', title: 'Security Best Practices' },
        { id: 'eng-4', title: 'Code Review Guidelines' },
        { id: 'eng-5', title: 'Deployment Procedures' },
        { id: 'eng-6', title: 'System Performance Metrics' }
      ]
    },
    { 
      id: 'infra-all-funds', 
      name: 'Infra All Funds', 
      assets: [
        { id: 'ops-1', title: 'Standard Operating Procedures' },
        { id: 'ops-2', title: 'Vendor Management Guide' },
        { id: 'ops-3', title: 'Budget Planning Template' },
        { id: 'ops-4', title: 'Compliance Documentation' },
        { id: 'ops-5', title: 'Facility Management Policies' }
      ]
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const toggleAccordion = (folderId) => {
    setOpenAccordions(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleSearchChange = (folderId, value) => {
    setSearchQueries(prev => ({
      ...prev,
      [folderId]: value
    }));
  };

  const handleRemoveAsset = (folderId, assetId) => {
    // Remove asset from folder
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        folder.id === folderId
          ? { ...folder, assets: folder.assets.filter(asset => asset.id !== assetId) }
          : folder
      )
    );
  };

  const handleAddAssets = (folderId) => {
    // Handle adding assets to folder - in a real app this would open a modal or drawer
    console.log('Add assets to folder:', folderId);
    // You would open an asset selection modal/drawer here
  };

  const handleDeleteFolder = (folderId) => {
    // Remove folder
    setFolders(prevFolders => 
      prevFolders.filter(folder => folder.id !== folderId)
    );
  };

  const getFilteredAssets = (folder) => {
    const query = searchQueries[folder.id]?.toLowerCase() || '';
    if (!query) return folder.assets;
    return folder.assets.filter(asset => 
      asset.title.toLowerCase().includes(query)
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`manage-folders-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div className={`manage-folders-drawer ${isClosing ? 'closing' : ''}`}>
        {/* Header */}
        <div className="manage-folders-drawer-header">
          <h2 className="manage-folders-drawer-title">Manage folders</h2>
          <button className="manage-folders-drawer-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="manage-folders-drawer-content">
          <div className="manage-folders-accordions">
            {folders.map((folder) => (
              <div key={folder.id} className="manage-folders-accordion">
                {/* Accordion Header */}
                <div 
                  className="manage-folders-accordion-header"
                  onClick={() => toggleAccordion(folder.id)}
                >
                  <h3 className="manage-folders-accordion-title">{folder.name}</h3>
                  <svg 
                    className={`manage-folders-accordion-chevron ${openAccordions[folder.id] ? 'open' : ''}`}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Accordion Content */}
                {openAccordions[folder.id] && (
                  <div className="manage-folders-accordion-content">
                    {/* Search Bar */}
                    <div className="manage-folders-search-container">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 16.6667L13.3334 13.3334M15.8334 9.16671C15.8334 12.8446 12.8446 15.8334 9.16671 15.8334C5.4888 15.8334 2.5 12.8446 2.5 9.16671C2.5 5.4888 5.4888 2.5 9.16671 2.5C12.8446 2.5 15.8334 5.4888 15.8334 9.16671Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search assets..." 
                        className="manage-folders-search-input"
                        value={searchQueries[folder.id] || ''}
                        onChange={(e) => handleSearchChange(folder.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    {/* Assets List */}
                    <div className="manage-folders-assets-list">
                      {getFilteredAssets(folder).length > 0 ? (
                        getFilteredAssets(folder).map((asset) => (
                          <div key={asset.id} className="manage-folders-asset-item">
                            <span className="manage-folders-asset-name">{asset.title}</span>
                            <button 
                              className="manage-folders-remove-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveAsset(folder.id, asset.id);
                              }}
                            >
                              Remove asset
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="manage-folders-empty-state">
                          {searchQueries[folder.id] ? 'No assets found' : 'No assets in this folder'}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="manage-folders-accordion-actions">
                      <button 
                        className="manage-folders-add-assets-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddAssets(folder.id);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 4.16675V15.8334M4.16667 10H15.8333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Add assets</span>
                      </button>
                      <button 
                        className="manage-folders-delete-folder-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}
                      >
                        Delete folder
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
