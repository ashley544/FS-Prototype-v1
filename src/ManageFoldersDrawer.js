import React, { useState, useEffect } from 'react';
import './ManageFoldersDrawer.css';

export default function ManageFoldersDrawer({ isOpen, onClose, exchangeAssets = [], newsroomAssets = [] }) {
  const [isClosing, setIsClosing] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const [searchQueries, setSearchQueries] = useState({});

  // Grouped folder structure by parent and child
  const [groupedFolders, setGroupedFolders] = useState([
    {
      parent: 'KKR',
      children: [
        { 
          id: 'kkr-infrastructure', 
          name: 'Infrastructure',
          fullPath: 'KKR / Infrastructure',
          assets: [{ id: 1, title: 'KKR Global Infrastructure Opportunities Fund III' }]
        },
        { 
          id: 'kkr-private-markets', 
          name: 'Private Markets',
          fullPath: 'KKR / Private Markets',
          assets: [{ id: 2, title: 'KKR Private Market Fund' }]
        },
        { 
          id: 'kkr-energy-transition', 
          name: 'Energy Transition',
          fullPath: 'KKR / Energy Transition',
          assets: [{ id: 3, title: 'KKR Clean Energy & Transition Fund' }]
        }
      ]
    },
    {
      parent: 'Blackstone',
      children: [
        { 
          id: 'blackstone-real-estate', 
          name: 'Real Estate',
          fullPath: 'Blackstone / Real Estate',
          assets: [{ id: 4, title: 'Blackstone Real Estate Income Trust (BREIT) Q3 Update' }]
        },
        { 
          id: 'blackstone-infrastructure', 
          name: 'Infrastructure',
          fullPath: 'Blackstone / Infrastructure',
          assets: [{ id: 5, title: 'BX Infrastructure Outlook 2025' }]
        }
      ]
    },
    {
      parent: 'Apollo',
      children: [
        { 
          id: 'apollo-credit', 
          name: 'Credit',
          fullPath: 'Apollo / Credit',
          assets: [{ id: 6, title: 'Apollo Direct Lending Platform Overview' }]
        },
        { 
          id: 'apollo-alternatives', 
          name: 'Alternatives',
          fullPath: 'Apollo / Alternatives',
          assets: [{ id: 7, title: 'Apollo Alternative Credit Fund' }]
        }
      ]
    },
    {
      parent: 'Carlyle',
      children: [
        { 
          id: 'carlyle-private-equity', 
          name: 'Private Equity',
          fullPath: 'Carlyle / Private Equity',
          assets: [{ id: 8, title: 'Carlyle European Buyout Opportunities' }]
        }
      ]
    },
    {
      parent: 'Ares',
      children: [
        { 
          id: 'ares-private-credit', 
          name: 'Private Credit',
          fullPath: 'Ares / Private Credit',
          assets: [{ id: 9, title: 'Ares Private Credit Income Fund (ARDC)' }]
        },
        { 
          id: 'ares-real-assets', 
          name: 'Real Assets',
          fullPath: 'Ares / Real Assets',
          assets: [{ id: 10, title: 'Ares Infrastructure Growth Report' }]
        }
      ]
    },
    {
      parent: 'Partners Group',
      children: [
        { 
          id: 'partners-group-real-estate', 
          name: 'Real Estate',
          fullPath: 'Partners Group / Real Estate',
          assets: [{ id: 11, title: 'Partners Group Real Estate Capabilities' }]
        },
        { 
          id: 'partners-group-private-markets', 
          name: 'Private Markets',
          fullPath: 'Partners Group / Private Markets',
          assets: [{ id: 12, title: 'Partners Group Global Value 2025 Fund' }]
        }
      ]
    },
    {
      parent: 'Brookfield',
      children: [
        { 
          id: 'brookfield-renewables', 
          name: 'Renewables',
          fullPath: 'Brookfield / Renewables',
          assets: [{ id: 13, title: 'Brookfield Renewable Partners Investor Deck' }]
        },
        { 
          id: 'brookfield-infrastructure', 
          name: 'Infrastructure',
          fullPath: 'Brookfield / Infrastructure',
          assets: [{ id: 14, title: 'Brookfield Global Infrastructure Fund' }]
        }
      ]
    },
    {
      parent: 'Hamilton Lane',
      children: [
        { 
          id: 'hamilton-lane-secondaries', 
          name: 'Secondaries',
          fullPath: 'Hamilton Lane / Secondaries',
          assets: [{ id: 15, title: 'Hamilton Lane Secondary Opportunities VI' }]
        }
      ]
    },
    {
      parent: 'StepStone',
      children: [
        { 
          id: 'stepstone-private-wealth', 
          name: 'Private Wealth',
          fullPath: 'StepStone / Private Wealth',
          assets: [{ id: 16, title: 'StepStone Private Wealth Access Platform' }]
        }
      ]
    },
    {
      parent: 'Goldman Sachs',
      children: [
        { 
          id: 'goldman-sachs-alternatives', 
          name: 'Alternatives',
          fullPath: 'Goldman Sachs / Alternatives',
          assets: [{ id: 17, title: 'Goldman Sachs Multi-Strategy Alternatives Fund' }]
        }
      ]
    },
    {
      parent: 'Morgan Stanley',
      children: [
        { 
          id: 'morgan-stanley-outlook', 
          name: 'Outlook',
          fullPath: 'Morgan Stanley / Outlook',
          assets: [{ id: 18, title: 'Morgan Stanley US Retail Outlook 2025' }]
        }
      ]
    },
    {
      parent: 'JPMorgan',
      children: [
        { 
          id: 'jpmorgan-diversified-alts', 
          name: 'Diversified Alts',
          fullPath: 'JPMorgan / Diversified Alts',
          assets: [{ id: 19, title: 'JPMorgan Diversified Alternatives Access Fund' }]
        }
      ]
    },
    {
      parent: 'UBS',
      children: [
        { 
          id: 'ubs-market-insights', 
          name: 'Market Insights',
          fullPath: 'UBS / Market Insights',
          assets: [{ id: 20, title: 'UBS Private Wealth Macro Insights – November 2025' }]
        }
      ]
    }
  ]);

  useEffect(() => {
    if (isOpen && !isClosing) {
      // Only reset state when opening (not during closing animation)
      setIsClosing(false);
      document.body.classList.add('drawer-open');
      // Force a reflow to ensure transition triggers
      requestAnimationFrame(() => {
        // Transition will trigger automatically via CSS
      });
    } else if (!isOpen && !isClosing) {
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
      onClose();
      // Small delay before resetting isClosing to ensure parent has updated
      setTimeout(() => {
        setIsClosing(false);
        // Restore body scroll after closing
        document.body.classList.remove('drawer-open');
      }, 50);
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

  const handleRemoveAsset = (childFolderId, assetId) => {
    // Remove asset from child folder
    setGroupedFolders(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        children: group.children.map(child => 
          child.id === childFolderId
            ? { ...child, assets: child.assets.filter(asset => asset.id !== assetId) }
            : child
        )
      }))
    );
  };

  const handleAddAssets = (childFolderId) => {
    // Handle adding assets to folder - in a real app this would open a modal or drawer
    console.log('Add assets to folder:', childFolderId);
    // You would open an asset selection modal/drawer here
  };

  const handleDeleteFolder = (childFolderId) => {
    // Remove child folder
    setGroupedFolders(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        children: group.children.filter(child => child.id !== childFolderId)
      })).filter(group => group.children.length > 0)
    );
  };

  const getFilteredAssets = (childFolder) => {
    const query = searchQueries[childFolder.id]?.toLowerCase() || '';
    if (!query) return childFolder.assets;
    return childFolder.assets.filter(asset => 
      asset.title.toLowerCase().includes(query)
    );
  };

  // Keep component rendered during closing animation
  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`manage-folders-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div 
        className={`manage-folders-drawer ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
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
            {groupedFolders.map((group) => (
              <div key={group.parent} className="manage-folders-accordion">
                {/* Parent Accordion Header */}
                <div 
                  className="manage-folders-accordion-header"
                  onClick={() => toggleAccordion(group.parent)}
                >
                  <h3 className="manage-folders-accordion-title">{group.parent}</h3>
                  <svg 
                    className={`manage-folders-accordion-chevron ${openAccordions[group.parent] ? 'open' : ''}`}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Parent Accordion Content - Child Folders */}
                {openAccordions[group.parent] && (
                  <div className="manage-folders-accordion-content">
                    {group.children.map((childFolder) => (
                      <div key={childFolder.id} className="manage-folders-child-accordion">
                        {/* Child Folder Header */}
                        <div 
                          className="manage-folders-child-header"
                          onClick={() => toggleAccordion(childFolder.id)}
                        >
                          <h4 className="manage-folders-child-title">{childFolder.name}</h4>
                          <svg 
                            className={`manage-folders-accordion-chevron ${openAccordions[childFolder.id] ? 'open' : ''}`}
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
                          </svg>
                        </div>

                        {/* Child Folder Content */}
                        {openAccordions[childFolder.id] && (
                          <div className="manage-folders-child-content">
                            {/* Search Bar */}
                            <div className="manage-folders-search-container">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6667 16.6667L13.3334 13.3334M15.8334 9.16671C15.8334 12.8446 12.8446 15.8334 9.16671 15.8334C5.4888 15.8334 2.5 12.8446 2.5 9.16671C2.5 5.4888 5.4888 2.5 9.16671 2.5C12.8446 2.5 15.8334 5.4888 15.8334 9.16671Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <input 
                                type="text" 
                                placeholder="Search assets..." 
                                className="manage-folders-search-input"
                                value={searchQueries[childFolder.id] || ''}
                                onChange={(e) => handleSearchChange(childFolder.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>

                            {/* Assets List */}
                            <div className="manage-folders-assets-list">
                              {getFilteredAssets(childFolder).length > 0 ? (
                                getFilteredAssets(childFolder).map((asset) => (
                                  <div key={asset.id} className="manage-folders-asset-item">
                                    <span className="manage-folders-asset-name">{asset.title}</span>
                                    <button 
                                      className="manage-folders-remove-link"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveAsset(childFolder.id, asset.id);
                                      }}
                                    >
                                      Remove asset
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <div className="manage-folders-empty-state">
                                  {searchQueries[childFolder.id] ? 'No assets found' : 'No assets in this folder'}
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="manage-folders-accordion-actions">
                              <button 
                                className="manage-folders-add-assets-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddAssets(childFolder.id);
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
                                  handleDeleteFolder(childFolder.id);
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
