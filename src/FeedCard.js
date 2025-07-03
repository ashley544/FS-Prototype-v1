import React from 'react';
import './FeedCard.css';

export default function FeedCard({ org, date, title, description, author, readTime, image, onClick, onShare }) {
  return (
    <div
      className="feed-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onClick && onClick(); } }}
    >
      <div className="feed-card-content">
        <div className="feed-card-header">
          <span className="feed-card-org">{org}</span>
          <span className="feed-card-date">{date}</span>
        </div>
        <div className="feed-card-title">{title}</div>
        <div className="feed-card-description">{description}</div>
        <div className="feed-card-meta">
          <span className="feed-card-author">{author}</span>
          <span className="feed-card-dot">·</span>
          <span className="feed-card-readtime">{readTime} min read</span>
          <button
            className="feed-card-share-btn"
            title="Share"
            tabIndex={0}
            type="button"
            onClick={e => { e.stopPropagation(); (onShare || (() => {}))(); }}
            style={{ marginLeft: 10 }}
          >
            <span className="feed-card-share-label">Share</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 4 }}>
              <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" fill="#888" />
            </svg>
          </button>
        </div>
      </div>
      <div className="feed-card-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="feed-card-image-placeholder" />
        )}
      </div>
    </div>
  );
} 