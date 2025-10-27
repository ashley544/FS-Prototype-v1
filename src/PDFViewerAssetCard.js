import React from "react";
import "./PDFViewerAssetCard.css";

export default function PDFViewerAssetCard({ image, type, title, onSummarise, selected, onClick, showSummarise = true }) {
  return (
    <div
      className={`pdf-viewer-asset-card${selected ? " selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div className="pdf-viewer-asset-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="pdf-viewer-asset-card-details">
        <div className="pdf-viewer-asset-card-type">{type}</div>
        <div className="pdf-viewer-asset-card-title">
          {title === 'Consider the viewer' ? 'Consider the Viewer' : title}
        </div>
        {showSummarise && (
          <div className="pdf-viewer-asset-card-summarise">
            <img src="/flare.svg" alt="Flare" className="pdf-viewer-asset-card-summarise-icon" width={16} height={16} />
            <span className="pdf-viewer-asset-card-summarise-text" onClick={e => { e.stopPropagation(); onSummarise(); }} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>Summarise</span>
          </div>
        )}
      </div>
      {selected && (
        <span className="pdf-viewer-asset-card-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="6,4 12,8 6,12" fill="#E8E8E8" />
          </svg>
        </span>
      )}
    </div>
  );
}
