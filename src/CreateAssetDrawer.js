import React, { useState, useEffect } from 'react';
import './CreateAssetDrawer.css';
import AssetCardLibrary from './AssetCardLibrary';

export default function CreateAssetDrawer({ isOpen, onClose, onOpenShareDrawer }) {
  const [isClosing, setIsClosing] = useState(false);
  const [drawerMode, setDrawerMode] = useState('upload'); // 'upload', 'parsed', or 'nextSteps'
  const [assetType, setAssetType] = useState('exchange'); // 'newsroom' or 'exchange'
  const [assetName, setAssetName] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [publishOption, setPublishOption] = useState('share'); // 'publish' or 'share'

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setDrawerMode('upload'); // Reset to upload mode when opening
      setAssetType('exchange'); // Reset asset type
      setAssetName(''); // Reset asset name
      setIsPinned(false); // Reset pin state
      setPublishOption('share'); // Reset publish option
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

  const handleCancel = () => {
    if (drawerMode === 'nextSteps') {
      setDrawerMode('parsed');
    } else if (drawerMode === 'parsed') {
      setDrawerMode('upload');
    } else {
      handleClose();
    }
  };

  const handleCreate = () => {
    if (drawerMode === 'parsed') {
      // Transition to next steps
      setDrawerMode('nextSteps');
    } else if (drawerMode === 'nextSteps') {
      // Final create
      console.log('Create asset');
      
      // If "Publish and share with contacts" is selected, open share drawer
      if (publishOption === 'share' && onOpenShareDrawer) {
        // Create a temporary asset object for the share drawer
        const newAsset = {
          id: 'new',
          image: "/Assets/Consider the viewer.png",
          title: assetName || "New Asset",
          duration: "0 mins",
          patterns: "0 patterns",
          isPinned: isPinned,
          highlighted: false
        };
        // Open share drawer instantly, then close create drawer
        onOpenShareDrawer(newAsset);
        handleClose();
      } else {
        handleClose();
      }
    }
  };

  const handleBackToParsed = () => {
    setDrawerMode('parsed');
  };

  const handleUploadClick = () => {
    setDrawerMode('parsed');
  };

  const handleBackToUpload = () => {
    setDrawerMode('upload');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`create-asset-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div className={`create-asset-drawer ${isClosing ? 'closing' : ''}`}>
        {/* Content */}
        <div className="create-asset-drawer-content">
          {/* Top Navigation */}
          <div className="create-asset-drawer-header">
            <div className="create-asset-drawer-header-left">
              <button className="create-asset-drawer-back-btn" onClick={
                drawerMode === 'nextSteps' ? handleBackToParsed :
                drawerMode === 'parsed' ? handleBackToUpload : 
                handleClose
              }>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="create-asset-drawer-title">Create Asset</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="create-asset-drawer-body">
            {drawerMode === 'upload' ? (
              <div className="create-asset-drawer-section">
                <h3 className="create-asset-drawer-section-title">Asset Upload</h3>
                
                {/* Upload Area */}
                <div className="create-asset-drawer-upload">
                  <div className="create-asset-drawer-upload-content">
                    <p className="create-asset-drawer-upload-text">
                      <a href="#" className="create-asset-drawer-upload-link" onClick={(e) => { e.preventDefault(); handleUploadClick(); }}>
                        Upload a file
                      </a> or drag and drop here
                    </p>
                    <p className="create-asset-drawer-upload-formats">Accepted formats: CSV.</p>
                  </div>
                </div>
              </div>
            ) : drawerMode === 'parsed' ? (
              <>
                {/* Parsed Content */}
                <div className="create-asset-drawer-section">
                  <h3 className="create-asset-drawer-section-title">Asset Upload</h3>
                  <p className="create-asset-drawer-parsed-text">
                    We've detected the name and cover image, just let us know a bit more about this asset.
                  </p>

                  {/* Name Input */}
                  <div className="create-asset-drawer-input-group">
                    <div className="create-asset-drawer-input-label-row">
                      <label className="create-asset-drawer-input-label">Name</label>
                      <span className="create-asset-drawer-required">*</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter asset name" 
                      className="create-asset-drawer-name-input"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                    />
                  </div>

                  {/* Asset Type Selection */}
                  <div className="create-asset-drawer-type-section">
                    <div className="create-asset-drawer-type-title-row">
                      <h4 className="create-asset-drawer-type-title">What type of asset is this?</h4>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="create-asset-drawer-info-icon-small">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/>
                        <path d="M8 5.5V8M8 10.5H8.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="create-asset-drawer-type-options">
                      <div 
                        className={`create-asset-drawer-type-option ${assetType === 'newsroom' ? 'create-asset-drawer-type-option-selected' : ''}`}
                        onClick={() => setAssetType('newsroom')}
                      >
                        <div className="create-asset-drawer-type-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className="create-asset-drawer-type-content">
                          <h5 className="create-asset-drawer-type-name">Newsroom</h5>
                          <p className="create-asset-drawer-type-description">Public, and visible to all users</p>
                        </div>
                      </div>
                      <div 
                        className={`create-asset-drawer-type-option ${assetType === 'exchange' ? 'create-asset-drawer-type-option-selected' : ''}`}
                        onClick={() => setAssetType('exchange')}
                      >
                        <div className="create-asset-drawer-type-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9.01 14H2v-2h7.01v3L15 9l-5.99 5v-5zm5.98-4v-5H22v2h-7.01v3L10 15l5.99-5z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className="create-asset-drawer-type-content">
                          <h5 className="create-asset-drawer-type-name">Exchange</h5>
                          <p className="create-asset-drawer-type-description">Only visible to the contacts you send it to</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Asset Preview Card */}
                  <div className="create-asset-drawer-preview-section">
                    <div className="create-asset-drawer-preview">
                      <AssetCardLibrary
                        image="/Assets/Consider the viewer.png"
                        title="Asset Title"
                        duration="5 mins"
                        patterns="patterns"
                        isPinned={false}
                        highlighted={false}
                        hideMetadata={true}
                        onClick={() => {}}
                        onPin={() => {}}
                        onShare={() => {}}
                      />
                    </div>
                    <a href="#" className="create-asset-drawer-edit-image">Edit image</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Next Steps Content */}
                <div className="create-asset-drawer-section">
                  <h3 className="create-asset-drawer-section-title">Next steps</h3>

                  {/* Pin to Top Section */}
                  <div className="create-asset-drawer-next-steps-section">
                    <div className="create-asset-drawer-pin-section">
                      <h4 className="create-asset-drawer-pin-title">Spotlight asset</h4>
                      <p className="create-asset-drawer-pin-description">
                        This will pin the asset to the top of the exchange or newsroom, making it more visible to contacts
                      </p>
                      <div className="create-asset-drawer-toggle-group">
                        <span className="create-asset-drawer-toggle-label">Off</span>
                        <div 
                          className={`create-asset-drawer-toggle-switch ${isPinned ? 'on' : ''}`}
                          onClick={() => setIsPinned(!isPinned)}
                        >
                          <div className="create-asset-drawer-toggle-knob"></div>
                        </div>
                        <span className="create-asset-drawer-toggle-label">On</span>
                      </div>
                    </div>

                    {/* Publish Options */}
                    <div className="create-asset-drawer-publish-section">
                      <h4 className="create-asset-drawer-publish-title">Publish and share</h4>
                      <p className="create-asset-drawer-publish-description">
                        You can share with contacts immediately, or publish to your asset library.
                      </p>
                      <div className="create-asset-drawer-publish-options">
                        <div 
                          className={`create-asset-drawer-publish-option ${publishOption === 'publish' ? 'selected' : ''}`}
                          onClick={() => setPublishOption('publish')}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
                          </svg>
                          <span>Publish to your organisation</span>
                        </div>
                        <div 
                          className={`create-asset-drawer-publish-option ${publishOption === 'share' ? 'selected' : ''}`}
                          onClick={() => setPublishOption('share')}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                            <path d="M15.5 16.5l-1.5-1.5L17 13l1.5 1.5-3 3z" fill="currentColor"/>
                          </svg>
                          <span>Publish and share with contacts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className={`create-asset-drawer-bottom-bar ${isClosing ? 'closing' : ''}`}>
        <button className="create-asset-drawer-cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button 
          className={`create-asset-drawer-create-btn ${(drawerMode === 'parsed' && assetName.trim()) || drawerMode === 'nextSteps' ? 'active' : ''}`}
          onClick={handleCreate}
          disabled={drawerMode === 'parsed' && !assetName.trim()}
        >
          Create
        </button>
      </div>
    </>
  );
}

