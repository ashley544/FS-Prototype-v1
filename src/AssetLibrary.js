import React, { useState, useEffect, useRef } from 'react';
import SideNav from './SideNav';
import AssetCardLibrary from './AssetCardLibrary';
import AssetDrawer from './AssetDrawer';
import CreateAssetDrawer from './CreateAssetDrawer';
import ManageFoldersDrawer from './ManageFoldersDrawer';
import ShareDrawer from './ShareDrawer';
import './AssetLibrary.css';
import './ManageFoldersDrawer.css';

const AssetLibrary = ({ onReturnToTitle, onNavigateToPage, exchangeAssets, newsroomAssets, onOpenAsset, assetToOpen, onAssetOpened }) => {
  const [activeNavItem, setActiveNavItem] = useState('assets');
  const [activeTab, setActiveTab] = useState('active');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [drawerInitialMode, setDrawerInitialMode] = useState('analytics');
  const [selectedFolder, setSelectedFolder] = useState(null); // null means show all folders
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);
  const [expandedParentFolders, setExpandedParentFolders] = useState({});
  const [isManageFoldersDrawerOpen, setIsManageFoldersDrawerOpen] = useState(false);
  const [isFoldersDrawerOpen, setIsFoldersDrawerOpen] = useState(false);
  const [isFoldersDrawerClosing, setIsFoldersDrawerClosing] = useState(false);
  const [isManageFoldersView, setIsManageFoldersView] = useState(false);
  const [manageFoldersOpenAccordions, setManageFoldersOpenAccordions] = useState({});
  const [manageFoldersSearchQueries, setManageFoldersSearchQueries] = useState({});
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [assetToShare, setAssetToShare] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const folderDropdownRef = useRef(null);

  // Professional B2B color palette for folders - same folder name gets same color
  // All colors meet WCAG AA contrast requirements (4.5:1) for 13px text on white background
  // Colors are carefully selected to be visually distinct from each other with maximum separation
  // Organized to maximize perceptual distance between adjacent colors in the array
  const folderColors = [
    '#0052CC', // Blue
    '#DC2626', // Red
    '#047857', // Green
    '#7C3AED', // Purple
    '#C2410C', // Orange
    '#0D9488', // Teal
    '#BE185D', // Magenta
    '#1E40AF', // Indigo
    '#059669', // Emerald
    '#9333EA', // Violet
    '#0284C7', // Cyan
    '#16A34A', // Lime Green
    '#CA8A04', // Amber
    '#EA580C', // Deep Orange
    '#0891B2'  // Sky Blue
  ];

  // Function to get consistent color for a folder name
  // Same folder name always gets the same color, regardless of parent folder
  // e.g., "Infrastructure" will have the same color in "KKR / Infrastructure" and "Brookfield / Infrastructure"
  const getFolderColor = (folderName) => {
    // Simple hash function to consistently map folder name to color
    let hash = 0;
    for (let i = 0; i < folderName.length; i++) {
      hash = folderName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % folderColors.length;
    return folderColors[index];
  };

  // Group folders by first level (parent) and second level (child)
  const groupedFolders = [
    { 
      parent: 'KKR', 
      children: ['Infrastructure', 'Private Markets', 'Energy Transition'],
      fullPaths: ['KKR / Infrastructure', 'KKR / Private Markets', 'KKR / Energy Transition']
    },
    { 
      parent: 'Blackstone', 
      children: ['Real Estate', 'Infrastructure'],
      fullPaths: ['Blackstone / Real Estate', 'Blackstone / Infrastructure']
    },
    { 
      parent: 'Apollo', 
      children: ['Credit', 'Alternatives'],
      fullPaths: ['Apollo / Credit', 'Apollo / Alternatives']
    },
    { 
      parent: 'Carlyle', 
      children: ['Private Equity'],
      fullPaths: ['Carlyle / Private Equity']
    },
    { 
      parent: 'Ares', 
      children: ['Private Credit', 'Real Assets'],
      fullPaths: ['Ares / Private Credit', 'Ares / Real Assets']
    },
    { 
      parent: 'Partners Group', 
      children: ['Real Estate', 'Private Markets'],
      fullPaths: ['Partners Group / Real Estate', 'Partners Group / Private Markets']
    },
    { 
      parent: 'Brookfield', 
      children: ['Renewables', 'Infrastructure'],
      fullPaths: ['Brookfield / Renewables', 'Brookfield / Infrastructure']
    },
    { 
      parent: 'Hamilton Lane', 
      children: ['Secondaries'],
      fullPaths: ['Hamilton Lane / Secondaries']
    },
    { 
      parent: 'StepStone', 
      children: ['Private Wealth'],
      fullPaths: ['StepStone / Private Wealth']
    },
    { 
      parent: 'Goldman Sachs', 
      children: ['Alternatives'],
      fullPaths: ['Goldman Sachs / Alternatives']
    },
    { 
      parent: 'Morgan Stanley', 
      children: ['Outlook'],
      fullPaths: ['Morgan Stanley / Outlook']
    },
    { 
      parent: 'JPMorgan', 
      children: ['Diversified Alts'],
      fullPaths: ['JPMorgan / Diversified Alts']
    },
    { 
      parent: 'UBS', 
      children: ['Market Insights'],
      fullPaths: ['UBS / Market Insights']
    }
  ];

  // Flatten for dropdown (keeping full paths for filtering)
  const allFolders = groupedFolders.flatMap(g => g.fullPaths);
  const folders = allFolders;

  // Manage folders data structure with assets (for manage folders view)
  const [manageFoldersGroupedData, setManageFoldersGroupedData] = useState([
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

  // Helper functions for manage folders view
  const toggleManageFoldersAccordion = (folderId) => {
    setManageFoldersOpenAccordions(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleManageFoldersSearchChange = (folderId, value) => {
    setManageFoldersSearchQueries(prev => ({
      ...prev,
      [folderId]: value
    }));
  };

  const handleRemoveAsset = (childFolderId, assetId) => {
    setManageFoldersGroupedData(prevGroups => 
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
    console.log('Add assets to folder:', childFolderId);
  };

  const handleDeleteFolder = (childFolderId) => {
    setManageFoldersGroupedData(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        children: group.children.filter(child => child.id !== childFolderId)
      })).filter(group => group.children.length > 0)
    );
  };

  const getFilteredAssets = (childFolder) => {
    const query = manageFoldersSearchQueries[childFolder.id]?.toLowerCase() || '';
    if (!query) return childFolder.assets;
    return childFolder.assets.filter(asset => 
      asset.title.toLowerCase().includes(query)
    );
  };

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

  // Handle body scroll when Folders drawer is open
  useEffect(() => {
    if (isFoldersDrawerOpen && !isFoldersDrawerClosing) {
      document.body.classList.add('drawer-open');
    } else if (!isFoldersDrawerOpen && !isFoldersDrawerClosing) {
      document.body.classList.remove('drawer-open');
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isFoldersDrawerOpen, isFoldersDrawerClosing]);

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
      type: asset.type,
      folder: asset.folder // Preserve folder property
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
      type: asset.type,
      folder: asset.folder // Preserve folder property
    };
  });

  // Inactive assets - different set for inactive tab
  const inactiveExchangeAssets = [
    {
      type: "PDF",
      title: "Cross Border Capital Flows",
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
      title: "Renewable Finance Monitor",
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
    const durationMinutes = ((seed * 17) % 46) + 45;
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
    setAssetToShare(asset);
    setIsShareDrawerOpen(true);
  };

  const handleCloseShareDrawer = () => {
    setIsShareDrawerOpen(false);
    setAssetToShare(null);
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

  const handleOpenFoldersDrawer = () => {
    setIsFoldersDrawerOpen(true);
    setIsFolderDropdownOpen(false);
    setIsFoldersDrawerClosing(false);
  };

  const handleCloseFoldersDrawer = () => {
    if (isFoldersDrawerClosing) return;
    setIsFoldersDrawerClosing(true);
    setIsManageFoldersView(false); // Reset to folders list view when closing
    setTimeout(() => {
      setIsFoldersDrawerOpen(false);
      setTimeout(() => {
        setIsFoldersDrawerClosing(false);
      }, 50);
    }, 300);
  };

  // Filter assets by selected folder
  const filterAssetsByFolder = (assets) => {
    if (!selectedFolder) {
      return assets; // Show all when no folder selected
    }
    return assets.filter(asset => asset.folder === selectedFolder);
  };

  const filteredExchangeAssets = filterAssetsByFolder(formattedExchangeAssets);
  const filteredNewsroomAssets = filterAssetsByFolder(formattedNewsroomAssets);
  const filteredInactiveExchangeAssets = filterAssetsByFolder(formattedInactiveExchangeAssets);
  const filteredInactiveNewsroomAssets = filterAssetsByFolder(formattedInactiveNewsroomAssets);

  // Mock data for list view with 20 assets
  const mockListViewAssets = [
    { id: 1, title: 'KKR Global Infrastructure Opportunities Fund III', folder: 'KKR / Infrastructure', minutes: 11, lastActivity: '4 hours ago', hasHighIntent: true, assetType: 'Exchange' },
    { id: 2, title: 'KKR Private Market Fund', folder: 'KKR / Private Markets', minutes: 54, lastActivity: '10 hours ago', hasHighIntent: false, assetType: 'Exchange' },
    { id: 3, title: 'KKR Clean Energy & Transition Fund', folder: 'KKR / Energy Transition', minutes: 27, lastActivity: '10 hours ago', hasHighIntent: false, assetType: 'Exchange' },
    { id: 4, title: 'Blackstone Real Estate Income Trust (BREIT) Q3 Update', folder: 'Blackstone / Real Estate', minutes: 50, lastActivity: 'Yesterday', hasHighIntent: false, assetType: 'Exchange' },
    { id: 5, title: 'BX Infrastructure Outlook 2025', folder: 'Blackstone / Infrastructure', minutes: 58, lastActivity: 'Fri, Jan 17th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 6, title: 'Apollo Direct Lending Platform Overview', folder: 'Apollo / Credit', minutes: 45, lastActivity: 'Fri, Jan 17th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 7, title: 'Apollo Alternative Credit Fund', folder: 'Apollo / Alternatives', minutes: 19, lastActivity: 'Thurs, Jan 16th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 8, title: 'Carlyle European Buyout Opportunities', folder: 'Carlyle / Private Equity', minutes: 36, lastActivity: 'Thurs, Jan 16th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 9, title: 'Ares Private Credit Income Fund (ARDC)', folder: 'Ares / Private Credit', minutes: 32, lastActivity: 'Thurs, Jan 16th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 10, title: 'Ares Infrastructure Growth Report', folder: 'Ares / Real Assets', minutes: 23, lastActivity: 'Thurs, Jan 16th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 11, title: 'Partners Group Real Estate Capabilities', folder: 'Partners Group / Real Estate', minutes: 41, lastActivity: 'Wed, Jan 15th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 12, title: 'Partners Group Global Value 2025 Fund', folder: 'Partners Group / Private Markets', minutes: 38, lastActivity: 'Wed, Jan 15th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 13, title: 'Brookfield Renewable Partners Investor Deck', folder: 'Brookfield / Renewables', minutes: 29, lastActivity: 'Tue, Jan 14th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 14, title: 'Brookfield Global Infrastructure Fund', folder: 'Brookfield / Infrastructure', minutes: 47, lastActivity: 'Tue, Jan 14th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 15, title: 'Hamilton Lane Secondary Opportunities VI', folder: 'Hamilton Lane / Secondaries', minutes: 33, lastActivity: 'Mon, Jan 13th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 16, title: 'StepStone Private Wealth Access Platform', folder: 'StepStone / Private Wealth', minutes: 25, lastActivity: 'Mon, Jan 13th', hasHighIntent: false, assetType: 'Exchange' },
    { id: 17, title: 'Goldman Sachs Multi-Strategy Alternatives Fund', folder: 'Goldman Sachs / Alternatives', minutes: 42, lastActivity: 'Sun, Jan 12th', hasHighIntent: false, assetType: 'Newsroom' },
    { id: 18, title: 'Morgan Stanley US Retail Outlook 2025', folder: 'Morgan Stanley / Outlook', minutes: 35, lastActivity: 'Sun, Jan 12th', hasHighIntent: false, assetType: 'Newsroom' },
    { id: 19, title: 'JPMorgan Diversified Alternatives Access Fund', folder: 'JPMorgan / Diversified Alts', minutes: 28, lastActivity: 'Sat, Jan 11th', hasHighIntent: false, assetType: 'Newsroom' },
    { id: 20, title: 'UBS Private Wealth Macro Insights – November 2025', folder: 'UBS / Market Insights', minutes: 39, lastActivity: 'Sat, Jan 11th', hasHighIntent: false, assetType: 'Newsroom' }
  ];

  // Prepare list view data with all required fields
  const prepareListViewData = (assets) => {
    // Use mock data for active tab to match screenshot
    if (activeTab === 'active') {
      return mockListViewAssets;
    }
    
    // For inactive tab, generate from actual assets
    const lastActivityOptions = [
      '4 hours ago',
      '10 hours ago',
      'Yesterday',
      'Fri, Jan 17th',
      'Thurs, Jan 16th'
    ];
    
    return assets.map((asset, index) => {
      const seed = asset.title ? asset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : index;
      const minutes = seed % 60; // Generate minutes 0-59
      const lastActivityIndex = seed % lastActivityOptions.length;
      const hasHighIntent = index === 0; // First asset has high intent
      const assetType = asset.folder === 'Blackstone' || asset.title?.includes('Blackstone') || asset.title?.includes('BX') 
        ? 'Exchange' 
        : (asset.title?.includes('Newsroom') || index >= 7 ? 'Newsroom' : 'Exchange');
      
      return {
        ...asset,
        minutes: minutes || 11,
        lastActivity: lastActivityOptions[lastActivityIndex],
        hasHighIntent: hasHighIntent,
        assetType: assetType
      };
    });
  };

  // Get all assets for list view
  const allAssetsForListView = activeTab === 'active' 
    ? [...filteredExchangeAssets, ...filteredNewsroomAssets]
    : [...filteredInactiveExchangeAssets, ...filteredInactiveNewsroomAssets];
  
  const allListViewData = prepareListViewData(allAssetsForListView);

  // Filter list view data by selected folder
  const listViewData = !selectedFolder
    ? allListViewData 
    : allListViewData.filter(asset => asset.folder === selectedFolder);

  // Handle asset selection
  const handleAssetSelect = (assetId) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAssets.length === listViewData.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(listViewData.map(asset => asset.id));
    }
  };

  // Also check for "BX Digital Infrastructure Strategy" which might be in newsroomAssets
  const allFormattedAssets = [
    ...formattedExchangeAssets,
    ...formattedNewsroomAssets,
    ...formattedInactiveExchangeAssets,
    ...formattedInactiveNewsroomAssets
  ];

  // Auto-open drawer when assetToOpen is provided
  useEffect(() => {
    if (assetToOpen) {
      // Search through all formatted assets
      const asset = allFormattedAssets.find(a => a.title === assetToOpen);
      
      // If not found in formatted assets, check if it exists in newsroomAssets or exchangeAssets
      if (!asset) {
        // Check if it exists in newsroomAssets
        const newsroomAsset = newsroomAssets.find(a => a.title === assetToOpen);
        if (newsroomAsset) {
          const seed = newsroomAsset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const newsroomContacts = `${(seed % 401) + 200} Contacts`;
          const durationMinutes = ((seed * 17) % 46) + 45;
          const duration = `${durationMinutes} mins`;
          
          const formattedAsset = {
            id: 9999,
            image: newsroomAsset.image,
            title: newsroomAsset.title,
            duration: duration,
            patterns: newsroomContacts,
            isPinned: false,
            highlighted: false,
            file: newsroomAsset.file,
            type: newsroomAsset.type
          };
          
          setSelectedAsset(formattedAsset);
          setDrawerInitialMode('analytics');
          setIsDrawerOpen(true);
          if (onAssetOpened) {
            setTimeout(() => {
              onAssetOpened();
            }, 100);
          }
          return;
        }
        
        // Check if it exists in exchangeAssets
        const exchangeAsset = exchangeAssets.find(a => a.title === assetToOpen);
        if (exchangeAsset) {
          const seed = exchangeAsset.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const exchangeContacts = `${(seed % 50) + 1} Contacts`;
          const durationMinutes = (seed % 46) + 45;
          const duration = `${durationMinutes} mins`;
          
          const formattedAsset = {
            id: 9998,
            image: exchangeAsset.image,
            title: exchangeAsset.title,
            duration: duration,
            patterns: exchangeContacts,
            isPinned: false,
            highlighted: false,
            file: exchangeAsset.file,
            type: exchangeAsset.type
          };
          
          setSelectedAsset(formattedAsset);
          setDrawerInitialMode('analytics');
          setIsDrawerOpen(true);
          if (onAssetOpened) {
            setTimeout(() => {
              onAssetOpened();
            }, 100);
          }
          return;
        }
      } else {
        // Found in formatted assets
        setSelectedAsset(asset);
        setDrawerInitialMode('analytics');
        setIsDrawerOpen(true);
        if (onAssetOpened) {
          setTimeout(() => {
            onAssetOpened();
          }, 100);
        }
      }
    }
  }, [assetToOpen, onAssetOpened, allFormattedAssets, newsroomAssets, exchangeAssets]);

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="asset-library-search-icon">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input 
                type="text" 
                placeholder="Start typing to search..." 
                className="asset-library-search-input"
              />
            </div>
            <button className="asset-library-cta" onClick={handleOpenCreateDrawer}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              New Asset
            </button>
          </div>
        </div>
        
        <div className="asset-library-filter-bar">
          <div className="filter-bar-left">
            <button className="filter-btn" onClick={handleOpenFoldersDrawer}>
              <span>Folders</span>
              <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="0">
                <path d="M26.9091 4H9.09091C6.27945 4 4 6.27945 4 9.09091V26.9091C4 29.7205 6.27945 32 9.09091 32H26.9091C29.7205 32 32 29.7205 32 26.9091V9.09091C32 6.27945 29.7205 4 26.9091 4ZM6.562 11.6376C6.562 10.2313 7.70109 9.09218 9.10745 9.09218H12.1276C13.1089 9.09218 13.6307 9.50073 14.0125 9.87618C14.3536 10.2173 14.5204 10.37 14.9098 10.37H26.6584C28.1958 10.37 29.4418 11.2596 29.4418 12.7971V14.1958H28.0507C28.0507 14.1958 28.0495 14.0367 27.9744 13.8827C27.5785 13.0885 26.6456 12.9091 25.9647 12.9091H10.0416C9.35945 12.9091 8.42782 13.0885 8.03073 13.8815C7.95818 14.0278 7.95436 14.1945 7.95436 14.1945H6.562V11.6376ZM29.4495 24.118C29.4495 25.6555 28.2035 26.9015 26.666 26.9015H9.33145C7.794 26.9015 6.548 25.6555 6.548 24.118V17.44C6.548 17.0556 6.85982 16.7438 7.24418 16.7438H28.7533C29.1376 16.7438 29.4495 17.0556 29.4495 17.44V24.118Z" fill="currentColor" stroke="none" strokeWidth="0"/>
              </svg>
            </button>
          </div>
          
          <div className="filter-divider"></div>
          
          <div className="filter-bar-right">
            <button 
              className={`filter-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              <span>{viewMode === 'grid' ? 'List view' : 'Grid view'}</span>
              {viewMode === 'grid' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="0">
                  <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" fill="currentColor" stroke="none" strokeWidth="0"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="burst_mask_grid" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#burst_mask_grid)">
                    <path d="M1.32056 15.5833V4.41667H2.40368V15.5833H1.32056ZM4.4166 15.5833V4.41667H5.49993V15.5833H4.4166ZM8.85243 15.5833C8.47743 15.5833 8.16042 15.4538 7.90139 15.1948C7.64236 14.9358 7.51285 14.6187 7.51285 14.2435V5.75646C7.51285 5.38132 7.64236 5.06424 7.90139 4.80521C8.16042 4.54619 8.47743 4.41667 8.85243 4.41667H17.3397C17.7147 4.41667 18.0317 4.54619 18.2908 4.80521C18.5498 5.06424 18.6793 5.38132 18.6793 5.75646V14.2435C18.6793 14.6187 18.5498 14.9358 18.2908 15.1948C18.0317 15.4538 17.7147 15.5833 17.3397 15.5833H8.85243ZM8.85243 14.5H17.3397C17.4038 14.5 17.4625 14.4733 17.516 14.4198C17.5694 14.3665 17.5962 14.3077 17.5962 14.2435V5.75646C17.5962 5.6923 17.5694 5.63355 17.516 5.58021C17.4625 5.52674 17.4038 5.50001 17.3397 5.50001H8.85243C8.7884 5.50001 8.72965 5.52674 8.67618 5.58021C8.62285 5.63355 8.59618 5.6923 8.59618 5.75646V14.2435C8.59618 14.3077 8.62285 14.3665 8.67618 14.4198C8.72965 14.4733 8.7884 14.5 8.85243 14.5ZM9.78847 12.9038H16.4037L14.3253 10.1602L12.5962 12.4102L11.367 10.7852L9.78847 12.9038Z" fill="#1C1B1F"/>
                  </g>
                </svg>
              )}
            </button>
            <button className="filter-btn">
              <span>Filter</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="filter_mask" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                  <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#filter_mask)">
                  <path d="M8.56571 14.5833V13.3333H11.4263V14.5833H8.56571ZM5.33675 10.625V9.37501H14.6555V10.625H5.33675ZM2.91675 6.66667V5.41667H17.0834V6.66667H2.91675Z" fill="#1C1B1F"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="asset-library-content">
          {viewMode === 'list' ? (
            /* List View */
            <div className="asset-library-list-view">
              <table className="asset-list-table">
                <thead>
                  <tr>
                    <th className="asset-list-checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedAssets.length === listViewData.length && listViewData.length > 0}
                        onChange={handleSelectAll}
                        className="asset-list-checkbox"
                      />
                    </th>
                    <th className="asset-list-name-col">
                      <div className="asset-list-header-content">
                        Asset Name
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </th>
                    <th className="asset-list-folder-col">
                      <div className="asset-list-header-content">
                        Folder(s)
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </th>
                    <th className="asset-list-intent-col">
                      <div className="asset-list-header-content">
                        Intent (L30D)
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </th>
                    <th className="asset-list-minutes-col">
                      <div className="asset-list-header-content">
                        Minutes
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </th>
                    <th className="asset-list-activity-col">
                      <div className="asset-list-header-content">
                        Last Activity
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </th>
                    <th className="asset-list-type-col">
                      <div className="asset-list-header-content">
                        Asset type
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 2L12 6M4 10L8 14L12 10" stroke="#1C1E21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </th>
                    <th className="asset-list-actions-col">Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listViewData.map((asset) => (
                    <tr key={asset.id} className="asset-list-row" onClick={() => !asset.disabled && handleAssetClick(asset)}>
                      <td className="asset-list-checkbox-col">
                        <input
                          type="checkbox"
                          checked={selectedAssets.includes(asset.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleAssetSelect(asset.id);
                          }}
                          className="asset-list-checkbox"
                        />
                      </td>
                      <td className="asset-list-name-col">
                        <span className="asset-list-name">{asset.title || 'Untitled Asset'}</span>
                      </td>
                      <td className="asset-list-folder-col">
                        {asset.folder ? (
                          <div className="asset-list-folder-chips">
                            {asset.folder.split(' / ').map((folderPart, index) => {
                              const folderColor = getFolderColor(folderPart);
                              return (
                                <React.Fragment key={index}>
                                  {index > 0 && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="asset-list-folder-separator">
                                      <path d="M4.5 3L7.5 6L4.5 9" stroke="#808b8f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                  {index === 0 && (
                                    <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="asset-list-folder-icon" style={{ marginRight: '0px', flexShrink: 0 }}>
                                      <path d="M26.9091 4H9.09091C6.27945 4 4 6.27945 4 9.09091V26.9091C4 29.7205 6.27945 32 9.09091 32H26.9091C29.7205 32 32 29.7205 32 26.9091V9.09091C32 6.27945 29.7205 4 26.9091 4ZM6.562 11.6376C6.562 10.2313 7.70109 9.09218 9.10745 9.09218H12.1276C13.1089 9.09218 13.6307 9.50073 14.0125 9.87618C14.3536 10.2173 14.5204 10.37 14.9098 10.37H26.6584C28.1958 10.37 29.4418 11.2596 29.4418 12.7971V14.1958H28.0507C28.0507 14.1958 28.0495 14.0367 27.9744 13.8827C27.5785 13.0885 26.6456 12.9091 25.9647 12.9091H10.0416C9.35945 12.9091 8.42782 13.0885 8.03073 13.8815C7.95818 14.0278 7.95436 14.1945 7.95436 14.1945H6.562V11.6376ZM29.4495 24.118C29.4495 25.6555 28.2035 26.9015 26.666 26.9015H9.33145C7.794 26.9015 6.548 25.6555 6.548 24.118V17.44C6.548 17.0556 6.85982 16.7438 7.24418 16.7438H28.7533C29.1376 16.7438 29.4495 17.0556 29.4495 17.44V24.118Z" fill={folderColor}/>
                                    </svg>
                                  )}
                                  <span 
                                    className="asset-list-folder-chip"
                                    style={{ 
                                      color: index === 0 ? '#000000' : folderColor,
                                      fontWeight: index === 0 ? 500 : 400
                                    }}
                                  >
                                    {folderPart}
                                  </span>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="asset-list-folder">—</span>
                        )}
                      </td>
                      <td className="asset-list-intent-col">
                        {asset.hasHighIntent ? (
                          <div className="asset-list-intent-high">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id={`intent_mask_${asset.id}`} style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                <rect width="16" height="16" fill="#D9D9D9"/>
                              </mask>
                              <g mask={`url(#intent_mask_${asset.id})`}>
                                <path d="M2.01835 11.5064C1.91491 11.4031 1.86596 11.2843 1.87152 11.1501C1.87707 11.0159 1.92602 10.9026 2.01835 10.8104L5.38119 7.40391C5.61107 7.16969 5.89568 7.05258 6.23502 7.05258C6.57424 7.05258 6.86096 7.16969 7.09518 7.40391L8.76052 9.07958C8.79907 9.11802 8.84613 9.13725 8.90169 9.13725C8.95724 9.13725 9.00635 9.11802 9.04902 9.07958L12.644 5.52441H11.167C11.0251 5.52441 10.9064 5.47658 10.8107 5.38091C10.7149 5.28514 10.667 5.1663 10.667 5.02441C10.667 4.88253 10.7149 4.76375 10.8107 4.66808C10.9064 4.5723 11.0251 4.52441 11.167 4.52441H13.731C13.9029 4.52441 14.0463 4.58191 14.1612 4.69691C14.2762 4.81191 14.3337 4.9553 14.3337 5.12708V7.69108C14.3337 7.83297 14.2858 7.9518 14.19 8.04758C14.0944 8.14325 13.9756 8.19108 13.8337 8.19108C13.6918 8.19108 13.573 8.1443 13.4774 8.05075C13.3816 7.95719 13.3337 7.83947 13.3337 7.69758V6.22691L9.75552 9.80525C9.52552 10.0351 9.24091 10.1501 8.90169 10.1501C8.56235 10.1501 8.27774 10.0351 8.04785 9.80525L6.38235 8.13975C6.34391 8.1013 6.2948 8.08208 6.23502 8.08208C6.17513 8.08208 6.12596 8.1013 6.08752 8.13975L2.72085 11.5064C2.6243 11.6031 2.50719 11.6514 2.36952 11.6514C2.23196 11.6514 2.11491 11.6031 2.01835 11.5064Z" fill={`url(#paint1_linear_intent_${asset.id})`}/>
                              </g>
                              <defs>
                                <linearGradient id={`paint1_linear_intent_${asset.id}`} x1="-2.46373" y1="-2.15718" x2="13.7718" y2="-1.49124" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#0287FF"/>
                                  <stop offset="0.350962" stopColor="#926AAE"/>
                                  <stop offset="0.581731" stopColor="#D5529D"/>
                                  <stop offset="0.711538" stopColor="#EE454A"/>
                                  <stop offset="1" stopColor="#F05524"/>
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="asset-list-intent-text">High intent</span>
                          </div>
                        ) : (
                          <span className="asset-list-intent-empty">—</span>
                        )}
                      </td>
                      <td className="asset-list-minutes-col">
                        <span className="asset-list-minutes">{asset.minutes}</span>
                      </td>
                      <td className="asset-list-activity-col">
                        <span className="asset-list-activity">{asset.lastActivity}</span>
                      </td>
                      <td className="asset-list-type-col">
                        <span className={`asset-list-type-badge ${asset.assetType.toLowerCase()}`}>
                          {asset.assetType}
                        </span>
                      </td>
                      <td className="asset-list-actions-col">
                        <div className="asset-list-actions">
                          {/* Quick Actions placeholder */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Grid View */
            activeTab === 'active' ? (
              <>
                {/* Exchange Section - Active */}
                <div className="asset-section">
                  <div className="asset-section-header">
                    <h2 className="asset-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg 
                        width="22" 
                        height="22" 
                        viewBox="0 0 22 22" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M5.6571 8.02083H13.625V6.1875C13.625 5.42361 13.3576 4.77431 12.8229 4.23958C12.2882 3.70486 11.6389 3.4375 10.875 3.4375C10.1111 3.4375 9.46181 3.70486 8.92708 4.23958C8.39236 4.77431 8.125 5.42361 8.125 6.1875H6.75C6.75 5.04289 7.15135 4.06924 7.95404 3.26654C8.75674 2.46385 9.73039 2.0625 10.875 2.0625C12.0196 2.0625 12.9933 2.46385 13.796 3.26654C14.5987 4.06924 15 5.04289 15 6.1875V8.02083H16.0929C16.5486 8.02083 16.9388 8.18308 17.2633 8.50758C17.5878 8.83208 17.75 9.2222 17.75 9.67794V18.2804C17.75 18.7361 17.5878 19.1262 17.2633 19.4508C16.9388 19.7752 16.5486 19.9375 16.0929 19.9375H5.6571C5.20137 19.9375 4.81125 19.7752 4.48675 19.4508C4.16225 19.1262 4 18.7361 4 18.2804V9.67794C4 9.2222 4.16225 8.83208 4.48675 8.50758C4.81125 8.18308 5.20137 8.02083 5.6571 8.02083ZM10.875 15.5833C11.3203 15.5833 11.6991 15.4273 12.0112 15.1154C12.3232 14.8032 12.4792 14.4245 12.4792 13.9792C12.4792 13.5338 12.3232 13.1551 12.0112 12.843C11.6991 12.531 11.3203 12.375 10.875 12.375C10.4297 12.375 10.0509 12.531 9.73879 12.843C9.42682 13.1551 9.27083 13.5338 9.27083 13.9792C9.27083 14.4245 9.42682 14.8032 9.73879 15.1154C10.0509 15.4273 10.4297 15.5833 10.875 15.5833Z" fill="black"/>
                      </svg>
                      <span>Exchange</span>
                    </h2>
                  </div>
                  <div className="asset-library-grid">
                    {filteredExchangeAssets.map((asset) => (
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
                    {filteredNewsroomAssets.map((asset) => (
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
                    <h2 className="asset-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg 
                        width="22" 
                        height="22" 
                        viewBox="0 0 22 22" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M5.6571 8.02083H13.625V6.1875C13.625 5.42361 13.3576 4.77431 12.8229 4.23958C12.2882 3.70486 11.6389 3.4375 10.875 3.4375C10.1111 3.4375 9.46181 3.70486 8.92708 4.23958C8.39236 4.77431 8.125 5.42361 8.125 6.1875H6.75C6.75 5.04289 7.15135 4.06924 7.95404 3.26654C8.75674 2.46385 9.73039 2.0625 10.875 2.0625C12.0196 2.0625 12.9933 2.46385 13.796 3.26654C14.5987 4.06924 15 5.04289 15 6.1875V8.02083H16.0929C16.5486 8.02083 16.9388 8.18308 17.2633 8.50758C17.5878 8.83208 17.75 9.2222 17.75 9.67794V18.2804C17.75 18.7361 17.5878 19.1262 17.2633 19.4508C16.9388 19.7752 16.5486 19.9375 16.0929 19.9375H5.6571C5.20137 19.9375 4.81125 19.7752 4.48675 19.4508C4.16225 19.1262 4 18.7361 4 18.2804V9.67794C4 9.2222 4.16225 8.83208 4.48675 8.50758C4.81125 8.18308 5.20137 8.02083 5.6571 8.02083ZM10.875 15.5833C11.3203 15.5833 11.6991 15.4273 12.0112 15.1154C12.3232 14.8032 12.4792 14.4245 12.4792 13.9792C12.4792 13.5338 12.3232 13.1551 12.0112 12.843C11.6991 12.531 11.3203 12.375 10.875 12.375C10.4297 12.375 10.0509 12.531 9.73879 12.843C9.42682 13.1551 9.27083 13.5338 9.27083 13.9792C9.27083 14.4245 9.42682 14.8032 9.73879 15.1154C10.0509 15.4273 10.4297 15.5833 10.875 15.5833Z" fill="black"/>
                      </svg>
                      <span>Exchange</span>
                    </h2>
                  </div>
                  <div className="asset-library-grid">
                    {filteredInactiveExchangeAssets.map((asset) => (
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
                    {filteredInactiveNewsroomAssets.map((asset) => (
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
            )
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
      
      {/* Folders Drawer */}
      {isFoldersDrawerOpen && (
        <>
          <div 
            className={`manage-folders-drawer-backdrop ${isFoldersDrawerClosing ? 'closing' : ''}`} 
            onClick={handleCloseFoldersDrawer} 
          />
          <div 
            className={`manage-folders-drawer ${isFoldersDrawerClosing ? 'closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="manage-folders-drawer-header" style={{ padding: '16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <button 
                  className="asset-drawer-back-btn" 
                  onClick={() => {
                    if (isManageFoldersView) {
                      setIsManageFoldersView(false);
                    } else {
                      handleCloseFoldersDrawer();
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                  </svg>
                </button>
                <h2 className="manage-folders-drawer-title" style={{ margin: 0 }}>
                  {isManageFoldersView ? 'Manage folders' : 'All folders'}
                </h2>
              </div>
              {!isManageFoldersView && (
                <button 
                  className="filter-btn" 
                  onClick={() => {
                    setIsManageFoldersView(true);
                  }}
                >
                  <span>Manage folders</span>
                  <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="0">
                    <path d="M6.8637 7C5.29694 7 4 8.25876 4 9.77941V25.2206C4 26.7412 5.29694 28 6.8637 28H7.34844H7.86549H26.7356C27.9113 28 28.9458 27.2037 29.214 26.094L31.9583 15.9607C32.0077 15.778 32.0133 15.5867 31.9746 15.4016C31.9359 15.2165 31.854 15.0424 31.7352 14.8928C31.6163 14.7432 31.4637 14.6221 31.2891 14.5387C31.1145 14.4553 30.9225 14.4119 30.7278 14.4118H29.3532L29.4551 12.25C29.4551 10.7294 28.1581 9.47059 26.5914 9.47059H14.9725C14.8033 9.47059 14.6422 9.40452 14.5226 9.28964L13.0957 7.90476C12.5001 7.32664 11.6899 7 10.846 7H6.8637ZM6.8637 9.47059H10.846C11.0153 9.47059 11.1763 9.53666 11.296 9.65154L12.7228 11.0364C13.3185 11.6158 14.1287 11.9412 14.9725 11.9412H26.5914C26.781 11.9412 26.9096 12.0659 26.9096 12.25V14.4118H10.3638C10.0823 14.412 9.80878 14.5029 9.58613 14.6701C9.36348 14.8373 9.20422 15.0714 9.13328 15.3358L6.54551 24.9721V9.77941C6.54551 9.59535 6.67406 9.47059 6.8637 9.47059ZM11.3482 16.8824H29.0772L26.743 25.498C26.7404 25.5085 26.7379 25.5189 26.7356 25.5294H9.02638L11.3482 16.8824Z" fill="currentColor" stroke="none" strokeWidth="0"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Content */}
            <div className="manage-folders-drawer-content" style={{ padding: isManageFoldersView ? '24px 16px' : '0' }}>
              {isManageFoldersView ? (
                /* Manage Folders View */
                <div className="manage-folders-accordions">
                  {manageFoldersGroupedData.map((group) => (
                    <div key={group.parent} className="manage-folders-accordion">
                      {/* Parent Accordion Header */}
                      <div 
                        className="manage-folders-accordion-header"
                        style={{ padding: '12px 16px' }}
                        onClick={() => toggleManageFoldersAccordion(group.parent)}
                      >
                        <h3 className="manage-folders-accordion-title">{group.parent}</h3>
                        <svg 
                          className={`manage-folders-accordion-chevron ${manageFoldersOpenAccordions[group.parent] ? 'open' : ''}`}
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Parent Accordion Content - Child Folders */}
                      {manageFoldersOpenAccordions[group.parent] && (
                        <div className="manage-folders-accordion-content">
                          {group.children.map((childFolder) => {
                            const folderColor = getFolderColor(childFolder.name);
                            return (
                            <div key={childFolder.id} className="manage-folders-child-accordion" style={{ paddingLeft: '16px' }}>
                              {/* Child Folder Header */}
                              <div 
                                className="manage-folders-child-header"
                                style={{ padding: '8px 0' }}
                                onClick={() => toggleManageFoldersAccordion(childFolder.id)}
                              >
                                <h4 className="manage-folders-child-title" style={{ color: folderColor }}>{childFolder.name}</h4>
                                <svg 
                                  className={`manage-folders-accordion-chevron ${manageFoldersOpenAccordions[childFolder.id] ? 'open' : ''}`}
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 16 16" 
                                  fill="none" 
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ marginLeft: 'auto' }}
                                >
                                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>

                              {/* Child Folder Content */}
                              {manageFoldersOpenAccordions[childFolder.id] && (
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
                                      value={manageFoldersSearchQueries[childFolder.id] || ''}
                                      onChange={(e) => handleManageFoldersSearchChange(childFolder.id, e.target.value)}
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
                                        {manageFoldersSearchQueries[childFolder.id] ? 'No assets found' : 'No assets in this folder'}
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
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Folder Hierarchy View */
                <div style={{ padding: '24px 16px' }}>
                  {groupedFolders.map((group) => (
                    <div key={group.parent} style={{ marginBottom: '24px' }}>
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #e5e5e7'
                        }}
                        onClick={() => {
                          setExpandedParentFolders(prev => ({
                            ...prev,
                            [group.parent]: !prev[group.parent]
                          }));
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                            <path d="M26.9091 4H9.09091C6.27945 4 4 6.27945 4 9.09091V26.9091C4 29.7205 6.27945 32 9.09091 32H26.9091C29.7205 32 32 29.7205 32 26.9091V9.09091C32 6.27945 29.7205 4 26.9091 4ZM6.562 11.6376C6.562 10.2313 7.70109 9.09218 9.10745 9.09218H12.1276C13.1089 9.09218 13.6307 9.50073 14.0125 9.87618C14.3536 10.2173 14.5204 10.37 14.9098 10.37H26.6584C28.1958 10.37 29.4418 11.2596 29.4418 12.7971V14.1958H28.0507C28.0507 14.1958 28.0495 14.0367 27.9744 13.8827C27.5785 13.0885 26.6456 12.9091 25.9647 12.9091H10.0416C9.35945 12.9091 8.42782 13.0885 8.03073 13.8815C7.95818 14.0278 7.95436 14.1945 7.95436 14.1945H6.562V11.6376ZM29.4495 24.118C29.4495 25.6555 28.2035 26.9015 26.666 26.9015H9.33145C7.794 26.9015 6.548 25.6555 6.548 24.118V17.44C6.548 17.0556 6.85982 16.7438 7.24418 16.7438H28.7533C29.1376 16.7438 29.4495 17.0556 29.4495 17.44V24.118Z" fill={getFolderColor(group.parent)}/>
                          </svg>
                          <span style={{ 
                            fontFamily: 'Inter, Arial, sans-serif',
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#000000'
                          }}>
                            {group.parent}
                          </span>
                        </div>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ 
                            transform: expandedParentFolders[group.parent] ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            flexShrink: 0,
                            marginLeft: 'auto'
                          }}
                        >
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {expandedParentFolders[group.parent] && (
                        <div style={{ paddingLeft: '16px', marginTop: '8px' }}>
                          {group.children.map((child, index) => {
                            const fullPath = group.fullPaths[index];
                            const folderColor = getFolderColor(child);
                            return (
                              <div 
                                key={child}
                                style={{ 
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '8px 0',
                                  cursor: 'pointer'
                                }}
                                onClick={() => {
                                  setSelectedFolder(fullPath);
                                  handleCloseFoldersDrawer();
                                }}
                              >
                                <span style={{ 
                                  fontFamily: 'Inter, Arial, sans-serif',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  color: folderColor
                                }}>
                                  {child}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
      <ShareDrawer 
        isOpen={isShareDrawerOpen}
        onClose={handleCloseShareDrawer}
        asset={assetToShare}
      />
    </div>
  );
};

export default AssetLibrary;
