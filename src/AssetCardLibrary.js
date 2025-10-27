import React from 'react';
import './AssetCardLibrary.css';

const AssetCardLibrary = ({ 
  image, 
  title, 
  duration, 
  patterns, 
  isPinned = false,
  highlighted = false,
  hideMetadata = false,
  onPin,
  onShare,
  onClick 
}) => {
  return (
    <div className={`asset-card-library ${highlighted ? 'highlighted' : ''}`} onClick={onClick}>
      {/* Image Container */}
      <div className="asset-card-image-container">
        <img 
          src={image} 
          alt={title}
          className="asset-card-image"
        />
        
        {/* Pin Badge */}
        {isPinned && (
          <button 
            className="asset-card-pin-badge"
            onClick={(e) => {
              e.stopPropagation();
              onPin && onPin();
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" 
                fill="rgba(0, 0, 0, 0.38)"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="asset-card-content">
        {/* Title */}
        <h3 className="asset-card-title">{title}</h3>
        
        {/* Asset Info */}
        {!hideMetadata && (
          <div className="asset-card-info">
            <div className="asset-card-metadata">
              {/* Duration Badge */}
              <div className="asset-card-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>{duration}</span>
              </div>
              
              {/* Separator */}
              <div className="asset-card-separator">·</div>
              
              {/* Patterns Badge */}
              <div className="asset-card-badge">
                <span>{patterns}</span>
              </div>
            </div>
            
            {/* Share Button */}
            <button 
              className="asset-card-share"
              onClick={(e) => {
                e.stopPropagation();
                onShare && onShare();
              }}
            >
              <span>Share</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCardLibrary;
