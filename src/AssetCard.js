import React from "react";
import "./AssetCard.css";

export default function AssetCard({ image, type, title, onSummarise, selected, onClick, onOpenDrawer, showSummarise = true, variant }) {
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
          <img src={image} alt={title} />
          <div style={{ position: 'absolute', bottom: 6, right: 6, background: '#fff', borderRadius: '3px', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
            <img
              src="/Logomark - White - New.svg"
              alt="Flagships Logo"
              style={{ height: 18, width: 'auto', display: 'block' }}
            />
          </div>
        </div>
        {onOpenDrawer && (
          <button 
            className="asset-card-drawer-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDrawer();
            }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 24,
              height: 24,
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              zIndex: 10
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3L9 9M9 3L3 9" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
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
        <img src={image} alt={title} />
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
        {showSummarise && (
          <div className="asset-card-summarise">
            <img src="/flare.svg" alt="Flare" className="asset-card-summarise-icon" width={16} height={16} />
            <span className="asset-card-summarise-text" onClick={e => { e.stopPropagation(); onSummarise(); }} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>Summarise</span>
          </div>
        )}
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