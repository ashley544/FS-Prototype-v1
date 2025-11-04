import React, { useState, useEffect, useRef } from 'react';
import SideNav from './SideNav';
import AssetCardLibrary from './AssetCardLibrary';
import AssetDrawer from './AssetDrawer';
import CreateAssetDrawer from './CreateAssetDrawer';
import ManageFoldersDrawer from './ManageFoldersDrawer';
import './AssetLibrary.css';

const AssetLibrary = ({ onReturnToTitle, onNavigateToPage, exchangeAssets, newsroomAssets, onOpenAsset }) => {
  const [activeNavItem, setActiveNavItem] = useState('assets');
  const [activeTab, setActiveTab] = useState('active');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [drawerInitialMode, setDrawerInitialMode] = useState('analytics');
  const [selectedFolder, setSelectedFolder] = useState('All folders');
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);
  const [isManageFoldersDrawerOpen, setIsManageFoldersDrawerOpen] = useState(false);
  const folderDropdownRef = useRef(null);

  const folders = [
    'All folders',
    'KKR',
    'Coatue',
    'Blackstone',
    'Private Equity All Funds',
    'Infra All Funds'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target)) {
        setIsFolderDropdownOpen(false);
      }
    };

    if (isFolderDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFolderDropdownOpen]);

  // Convert exchange assets to the format expected by AssetCardLibrary
  const formattedExchangeAssets = exchangeAssets.map((asset, index) => {
    const isHighlighted = index === 0; // Make the first asset highlighted with rainbow gradient
    // Generate random number between 1-50 for exchange contacts (non-highlighted)
    // Use a seed based on title to ensure consistent number per asset
    const seed = asset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const exchangeContacts = isHighlighted ? "3 Patterns" : `${(seed % 50) + 1} Contacts`;
    // Generate duration between 45-90 minutes using seed for consistency
    const durationMinutes = (seed % 46) + 45; // 46 possible values (45-90)
    const duration = `${durationMinutes} mins`;
    
    return {
      id: index + 1,
      image: asset.image,
      title: asset.title,
      duration: duration,
      patterns: exchangeContacts,
      isPinned: false,
      highlighted: isHighlighted,
      file: asset.file, // Keep the file reference for PDF viewing
      type: asset.type
    };
  });

  // Convert newsroom assets to the format expected by AssetCardLibrary
  const formattedNewsroomAssets = newsroomAssets.map((asset, index) => {
    // Generate random number between 200-600 for newsroom contacts
    // Use a seed based on title to ensure consistent number per asset
    const seed = asset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const newsroomContacts = `${(seed % 401) + 200} Contacts`; // 401 possible values (200-600)
    // Generate duration between 45-90 minutes using seed for consistency
    // Use a different calculation to ensure variety from exchange assets
    const durationMinutes = ((seed * 17) % 46) + 45; // 46 possible values (45-90), different pattern
    const duration = `${durationMinutes} mins`;
    
    return {
      id: index + 100, // Use different ID range to avoid conflicts
      image: asset.image,
      title: asset.title,
      duration: duration,
      patterns: newsroomContacts,
      isPinned: false,
      highlighted: false,
      file: asset.file, // Keep the file reference for PDF viewing
      type: asset.type
    };
  });

  // Inactive assets - different set for inactive tab
  const inactiveExchangeAssets = [
    {
      type: "PDF",
      title: "Blackstone - Presentation",
      file: "/pdfs/Blackstone - Presentation (1).pdf",
    },
    {
      type: "PDF",
      title: "Doorway - Overview",
      file: "/pdfs/Doorway - Overview.pdf",
    },
  ];

  const inactiveNewsroomAssets = [
    {
      type: "PDF",
      title: "The Rules of Attraction",
      file: "/pdfs/Rules of Attraction.pdf",
    },
    {
      type: "PDF",
      title: "When Relevance wins",
      file: "/pdfs/When Relevance wins.pdf",
    },
    {
      type: "PDF",
      title: "Why Your Personal Relationships Matter Now More Than Ever",
      file: "/pdfs/Why Your Personal Relationships Matter Now More Than Ever.pdf",
    },
  ];

  // Convert inactive exchange assets
  const formattedInactiveExchangeAssets = inactiveExchangeAssets.map((asset, index) => {
    const seed = asset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const exchangeContacts = `${(seed % 50) + 1} Contacts`;
    // Generate duration between 45-90 minutes using seed for consistency
    const durationMinutes = (seed % 46) + 45; // 46 possible values (45-90)
    const duration = `${durationMinutes} mins`;
    
    return {
      id: index + 1000, // Use different ID range
      image: asset.image,
      title: asset.title,
      duration: duration,
      patterns: exchangeContacts,
      isPinned: false,
      highlighted: false,
      file: asset.file,
      type: asset.type,
      disabled: true // Mark as disabled
    };
  });

  // Convert inactive newsroom assets
  const formattedInactiveNewsroomAssets = inactiveNewsroomAssets.map((asset, index) => {
    const seed = asset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const newsroomContacts = `${(seed % 401) + 200} Contacts`;
    // Generate duration between 45-90 minutes using seed for consistency
    const durationMinutes = ((seed * 17) % 46) + 45; // 46 possible values (45-90), different pattern
    const duration = `${durationMinutes} mins`;
    
    return {
      id: index + 2000, // Use different ID range
      image: asset.image,
      title: asset.title,
      duration: duration,
      patterns: newsroomContacts,
      isPinned: false,
      highlighted: false,
      file: asset.file,
      type: asset.type,
      disabled: true // Mark as disabled
    };
  });

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
    
    // Handle navigation between pages
    if (itemId === 'insights') {
      onNavigateToPage && onNavigateToPage('insights');
    } else if (itemId === 'contacts') {
      onNavigateToPage && onNavigateToPage('contacts');
    } else if (itemId === 'settings') {
      onNavigateToPage && onNavigateToPage('settings');
    }
    
    // Handle special navigation items
    if (itemId === 'logout') {
      // Handle logout logic
      console.log('Logout clicked');
    } else if (itemId === 'my-account') {
      // Handle my account logic
      console.log('My account clicked');
    }
  };

  const handleAssetClick = (asset) => {
    // Don't allow clicks on disabled/inactive assets
    if (asset.disabled) {
      return;
    }
    
    // If asset is highlighted (rainbow gradient), open the analytics drawer
    if (asset.highlighted) {
      setSelectedAsset(asset);
      setDrawerInitialMode('analytics');
      setIsDrawerOpen(true);
    }
    // If asset has a file (PDF), open it in the PDF viewer
    else if (asset.file && onOpenAsset) {
      onOpenAsset(asset);
    } else {
      // Otherwise, open the asset drawer
      setSelectedAsset(asset);
      setDrawerInitialMode('analytics');
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
    setDrawerInitialMode('analytics'); // Reset to analytics mode for next time
  };

  const handlePinAsset = (asset) => {
    console.log('Pin asset:', asset.title);
  };

  const handleShareAsset = (asset) => {
    console.log('Share asset:', asset.title);
  };

  const handleOpenCreateDrawer = () => {
    setIsCreateDrawerOpen(true);
  };

  const handleCloseCreateDrawer = () => {
    setIsCreateDrawerOpen(false);
  };

  const handleOpenShareDrawer = (asset) => {
    setSelectedAsset(asset);
    setDrawerInitialMode('share');
    setIsDrawerOpen(true);
  };

  const handleOpenManageFoldersDrawer = () => {
    setIsManageFoldersDrawerOpen(true);
  };

  const handleCloseManageFoldersDrawer = () => {
    setIsManageFoldersDrawerOpen(false);
  };

  return (
    <div className="asset-library">
      <SideNav 
        onNavItemClick={handleNavItemClick}
        activeItem={activeNavItem}
        onLogoClick={onReturnToTitle}
      />
      
      <div className="asset-library-main">
        <div className="asset-library-header">
          <div className="asset-library-header-left">
            <h1 className="asset-library-title">Assets</h1>
            <div className="asset-library-tabs">
              <button 
                className={`asset-library-tab ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                <span>Active</span>
              </button>
              <button 
                className={`asset-library-tab ${activeTab === 'inactive' ? 'active' : ''}`}
                onClick={() => setActiveTab('inactive')}
              >
                <span>Inactive</span>
              </button>
            </div>
          </div>
          <div className="asset-library-header-right">
            <div className="asset-library-search">
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="asset-library-search-input"
              />
              <button className="asset-library-search-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <button className="asset-library-cta" onClick={handleOpenCreateDrawer}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Asset
            </button>
          </div>
        </div>
        
        <div className="asset-library-filter-bar">
          <div className="filter-bar-left">
            <button className="filter-btn" onClick={handleOpenManageFoldersDrawer}>
              <span>Manage folders</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="0">
                <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" fill="currentColor" stroke="none" strokeWidth="0"/>
              </svg>
            </button>
          </div>
          
          <div className="filter-divider"></div>
          
          <div className="filter-bar-center">
            <div className="folder-dropdown-container" ref={folderDropdownRef}>
              <button 
                className="filter-btn folder-dropdown-btn"
                onClick={() => setIsFolderDropdownOpen(!isFolderDropdownOpen)}
              >
                <span>{selectedFolder}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={isFolderDropdownOpen ? 'dropdown-open' : ''}
                  stroke="none"
                  strokeWidth="0"
                >
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor" stroke="none" strokeWidth="0"/>
                </svg>
              </button>
              {isFolderDropdownOpen && (
                <div className="folder-dropdown-menu">
                  {folders.map((folder) => (
                    <button
                      key={folder}
                      className={`folder-dropdown-item ${selectedFolder === folder ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedFolder(folder);
                        setIsFolderDropdownOpen(false);
                      }}
                    >
                      {folder}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="filter-divider"></div>
          
          <div className="filter-bar-right">
            <button className="filter-btn">
              <span>List view</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="0">
                <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" fill="currentColor" stroke="none" strokeWidth="0"/>
              </svg>
            </button>
            <button className="filter-btn">
              <span>Filter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="0">
                <path d="M3 17H21V19H3V17ZM3 5V7H21V5H3ZM3 11H21V13H3V11Z" fill="currentColor" stroke="none" strokeWidth="0"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="asset-library-content">
          {activeTab === 'active' ? (
            <>
              {/* Exchange Section - Active */}
              <div className="asset-section">
                <div className="asset-section-header">
                  <h2 className="asset-section-title">Exchange</h2>
                </div>
                <div className="asset-library-grid">
                  {formattedExchangeAssets.map((asset) => (
                    <AssetCardLibrary
                      key={asset.id}
                      image={asset.image}
                      title={asset.title}
                      duration={asset.duration}
                      patterns={asset.patterns}
                      isPinned={asset.isPinned}
                      highlighted={asset.highlighted}
                      file={asset.file}
                      disabled={false}
                      onPin={() => handlePinAsset(asset)}
                      onShare={() => handleShareAsset(asset)}
                      onClick={() => handleAssetClick(asset)}
                    />
                  ))}
                </div>
              </div>

              {/* Newsroom Section - Active */}
              <div className="asset-section">
                <div className="asset-section-header">
                  <h2 className="asset-section-title">Newsroom</h2>
                </div>
                <div className="asset-library-grid">
                  {formattedNewsroomAssets.map((asset) => (
                    <AssetCardLibrary
                      key={asset.id}
                      image={asset.image}
                      title={asset.title}
                      duration={asset.duration}
                      patterns={asset.patterns}
                      isPinned={asset.isPinned}
                      highlighted={asset.highlighted}
                      file={asset.file}
                      disabled={false}
                      onPin={() => handlePinAsset(asset)}
                      onShare={() => handleShareAsset(asset)}
                      onClick={() => handleAssetClick(asset)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Exchange Section - Inactive */}
              <div className="asset-section">
                <div className="asset-section-header">
                  <h2 className="asset-section-title">Exchange</h2>
                </div>
                <div className="asset-library-grid">
                  {formattedInactiveExchangeAssets.map((asset) => (
                    <AssetCardLibrary
                      key={asset.id}
                      image={asset.image}
                      title={asset.title}
                      duration={asset.duration}
                      patterns={asset.patterns}
                      isPinned={asset.isPinned}
                      highlighted={asset.highlighted}
                      file={asset.file}
                      disabled={true}
                      onPin={() => handlePinAsset(asset)}
                      onShare={() => handleShareAsset(asset)}
                      onClick={() => handleAssetClick(asset)}
                    />
                  ))}
                </div>
              </div>

              {/* Newsroom Section - Inactive */}
              <div className="asset-section">
                <div className="asset-section-header">
                  <h2 className="asset-section-title">Newsroom</h2>
                </div>
                <div className="asset-library-grid">
                  {formattedInactiveNewsroomAssets.map((asset) => (
                    <AssetCardLibrary
                      key={asset.id}
                      image={asset.image}
                      title={asset.title}
                      duration={asset.duration}
                      patterns={asset.patterns}
                      isPinned={asset.isPinned}
                      highlighted={asset.highlighted}
                      file={asset.file}
                      disabled={true}
                      onPin={() => handlePinAsset(asset)}
                      onShare={() => handleShareAsset(asset)}
                      onClick={() => handleAssetClick(asset)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <AssetDrawer 
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        asset={selectedAsset}
        initialMode={drawerInitialMode}
      />
      
      <CreateAssetDrawer 
        isOpen={isCreateDrawerOpen}
        onClose={handleCloseCreateDrawer}
        onOpenShareDrawer={handleOpenShareDrawer}
      />
      
      <ManageFoldersDrawer 
        isOpen={isManageFoldersDrawerOpen}
        onClose={handleCloseManageFoldersDrawer}
        exchangeAssets={exchangeAssets}
        newsroomAssets={newsroomAssets}
      />
    </div>
  );
};

export default AssetLibrary;
