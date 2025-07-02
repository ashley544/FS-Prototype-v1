import React from "react";
import "./AssetCard.css";

export default function AssetCard({ image, type, title, onSummarise, selected, onClick }) {
  return (
    <div
      className={`asset-card${selected ? " selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div className="asset-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="asset-card-details">
        <div className="asset-card-type">{type}</div>
        <div className="asset-card-title">{title === 'Consider the viewer' ? 'Consider the Viewer' : title}</div>
        {/* Summarise CTA hidden as requested */}
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