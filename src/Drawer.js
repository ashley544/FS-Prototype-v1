import React from 'react';
import './Drawer.css';

const Drawer = ({ isOpen, onClose, asset }) => {
  if (!isOpen || !asset) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-header-left">
            <div className="drawer-asset-image">
              <img src={asset.image} alt={asset.title} />
            </div>
            <div className="drawer-asset-info">
              <h2 className="drawer-title">{asset.title}</h2>
              <div className="drawer-meta">
                <span className="drawer-duration">{asset.duration}</span>
                <span className="drawer-patterns">{asset.patterns}</span>
              </div>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section">
            <h3 className="drawer-section-title">Asset Details</h3>
            <div className="drawer-details">
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">PDF Document</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Size:</span>
                <span className="detail-value">2.4 MB</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Modified:</span>
                <span className="detail-value">Dec 15, 2024</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Created:</span>
                <span className="detail-value">Nov 28, 2024</span>
              </div>
            </div>
          </div>

          <div className="drawer-section">
            <h3 className="drawer-section-title">Description</h3>
            <p className="drawer-description">
              This document provides comprehensive insights into the current market landscape and strategic recommendations for data center investments. It covers key market trends, competitive analysis, and future outlook for the industry.
            </p>
          </div>

          <div className="drawer-section">
            <h3 className="drawer-section-title">Tags</h3>
            <div className="drawer-tags">
              <span className="tag">Data Centers</span>
              <span className="tag">Infrastructure</span>
              <span className="tag">Investment</span>
              <span className="tag">Strategy</span>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <div className="drawer-actions">
            <button className="drawer-action-btn drawer-action-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </button>
            <button className="drawer-action-btn drawer-action-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Share
            </button>
            <button className="drawer-action-btn drawer-action-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
