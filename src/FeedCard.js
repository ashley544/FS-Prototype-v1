import React from 'react';
import './FeedCard.css';

export default function FeedCard({ org, date, title, description, author, readTime, image, onClick }) {
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