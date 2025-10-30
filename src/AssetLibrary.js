import React, { useState } from 'react';
import SideNav from './SideNav';
import AssetCardLibrary from './AssetCardLibrary';
import AssetDrawer from './AssetDrawer';
import CreateAssetDrawer from './CreateAssetDrawer';
import './AssetLibrary.css';

const AssetLibrary = ({ onReturnToTitle, onNavigateToPage }) => {
  const [activeNavItem, setActiveNavItem] = useState('assets');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [drawerInitialMode, setDrawerInitialMode] = useState('analytics');

  // Sample asset data organized by sections
  const exchangeAssets = [
    {
      id: 1,
      image: "/Assets/Prototype/BX Digital Infrastructure Strategy.png",
      title: "Blackstone 2Q25 Earnings Press Release",
      duration: "15 mins",
      patterns: "2 Patterns",
      isPinned: true
    },
    {
      id: 2,
      image: "/Assets/Prototype/BX Digital Infrastructure Strategy.png",
      title: "BREIF II Fact Card",
      duration: "5 mins",
      patterns: "0 Patterns",
      isPinned: false
    },
    {
      id: 3,
      image: "/Assets/Prototype/BX Digital Infrastructure Strategy.png",
      title: "BX Digital Infrastructure Strategy",
      duration: "17 mins",
      patterns: "0 Patterns",
      isPinned: true,
      highlighted: true
    }
  ];

  const newsroomAssets = [
    {
      id: 4,
      image: "/Assets/Prototype/BX Digital Infrastructure Strategy.png",
      title: "Artificial Intelligence through Private Markets",
      duration: "12 mins",
      patterns: "3 Patterns",
      isPinned: false
    },
    {
      id: 5,
      image: "/Assets/Prototype/BX Digital Infrastructure Strategy.png",
      title: "$25bn in Pennsylvania Data Centers",
      duration: "8 mins",
      patterns: "1 Pattern",
      isPinned: false
    },
    {
      id: 6,
      image: "/Assets/Prototype/BX Digital Infrastructure Strategy.png",
      title: "Long Term Case for Data Centers",
      duration: "22 mins",
      patterns: "4 Patterns",
      isPinned: false
    }
  ];

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
    setSelectedAsset(asset);
    setDrawerInitialMode('analytics');
    setIsDrawerOpen(true);
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
            <button className="filter-btn">
              <span>Manage folders</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <div className="filter-divider"></div>
          
          <div className="filter-bar-center">
            <button className="filter-btn">
              <span>All folders</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <div className="filter-divider"></div>
          
          <div className="filter-bar-right">
            <button className="filter-btn">
              <span>List view</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="filter-btn">
              <span>Filter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17H21V19H3V17ZM3 5V7H21V5H3ZM3 11H21V13H3V11Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="asset-library-content">
          {/* Exchange Section */}
          <div className="asset-section">
            <div className="asset-section-header">
              <h2 className="asset-section-title">Exchange</h2>
            </div>
            <div className="asset-library-grid">
              {exchangeAssets.map((asset) => (
                <AssetCardLibrary
                  key={asset.id}
                  image={asset.image}
                  title={asset.title}
                  duration={asset.duration}
                  patterns={asset.patterns}
                  isPinned={asset.isPinned}
                  highlighted={asset.highlighted}
                  onPin={() => handlePinAsset(asset)}
                  onShare={() => handleShareAsset(asset)}
                  onClick={() => handleAssetClick(asset)}
                />
              ))}
            </div>
          </div>

          {/* Newsroom Section */}
          <div className="asset-section">
            <div className="asset-section-header">
              <h2 className="asset-section-title">Newsroom</h2>
            </div>
            <div className="asset-library-grid">
              {newsroomAssets.map((asset) => (
                <AssetCardLibrary
                  key={asset.id}
                  image={asset.image}
                  title={asset.title}
                  duration={asset.duration}
                  patterns={asset.patterns}
                  isPinned={asset.isPinned}
                  highlighted={asset.highlighted}
                  onPin={() => handlePinAsset(asset)}
                  onShare={() => handleShareAsset(asset)}
                  onClick={() => handleAssetClick(asset)}
                />
              ))}
            </div>
          </div>
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
    </div>
  );
};

export default AssetLibrary;
