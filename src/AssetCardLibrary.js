import React, { useState, useEffect } from 'react';
import './AssetCardLibrary.css';
import { getAssetImageUrl } from './utils/assetImageHelper';

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
  onClick,
  file
}) => {
  const [imageUrl, setImageUrl] = useState(getAssetImageUrl(title, image, file));
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset image error when title, image, or file prop changes
    setImageError(false);
    setImageUrl(getAssetImageUrl(title, image, file));
  }, [title, image, file]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // If image fails to load, set to null to hide broken image
      setImageUrl(null);
    }
  };

  return (
    <div className={`asset-card-library ${highlighted ? 'highlighted' : ''}`} onClick={onClick}>
      {/* Image Container */}
      <div className="asset-card-image-container">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="asset-card-image"
            onError={handleImageError}
          />
        ) : (
          <div className="asset-card-image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="rgba(0, 0, 0, 0.26)"/>
            </svg>
          </div>
        )}
        
        {/* Pin Badge */}
        {isPinned && (
          <button 
            className="asset-card-pin-badge"
            onClick={(e) => {
              e.stopPropagation();
              onPin && onPin();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M16 4V2H8V4H6V6H8V14L10 16V18H14V16L16 14V6H18V4H16ZM10 6H14V12H10V6Z" 
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
              
              {/* Patterns/Contacts Badge */}
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
