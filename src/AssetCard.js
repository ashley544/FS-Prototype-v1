import React, { useState, useEffect } from "react";
import "./AssetCard.css";
import { getAssetImageUrl } from "./utils/assetImageHelper";

export default function AssetCard({ image, type, title, selected, onClick, onOpenDrawer, variant, file }) {
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
  if (variant === "feed-newsroom") {
    return (
      <div
        className={`asset-card feed-newsroom-card${selected ? " selected" : ""}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <div className="feed-newsroom-type">{type}</div>
        <div className="feed-newsroom-title">{title}</div>
        <div className="feed-newsroom-image">
          {imageUrl ? (
            <img src={imageUrl} alt={title} onError={handleImageError} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="rgba(0, 0, 0, 0.26)"/>
              </svg>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 6, right: 6, background: '#fff', borderRadius: '3px', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
            <img
              src="/Logomark - White - New.svg"
              alt="Flagships Logo"
              style={{ height: 18, width: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`asset-card${selected ? " selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div className={variant === 'feed-newsroom' ? 'feed-newsroom-image' : 'asset-card-image'}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} onError={handleImageError} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="rgba(0, 0, 0, 0.26)"/>
            </svg>
          </div>
        )}
        {variant === 'feed-newsroom' && (
          <img 
            src="/Logomark - White - New.svg" 
            alt="Flagships Logo" 
            style={{ position: 'absolute', bottom: 6, right: 6, width: 28, height: 28, borderRadius: '6px', background: '#fff', boxShadow: '0 2px 8px rgba(51,51,51,0.10)', padding: 2 }}
          />
        )}
      </div>
      <div className="asset-card-details">
        <div className="asset-card-type">{type}</div>
        <div className="asset-card-title">
          {title === 'Consider the viewer' ? 'Consider the Viewer' : title}
        </div>
      </div>
      {selected && (
        <span className="asset-card-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="6,4 12,8 6,12" fill="#E8E8E8" />
          </svg>
        </span>
      )}
    </div>
  );
} 