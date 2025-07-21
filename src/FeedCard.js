import React from 'react';
import './FeedCard.css';

// Avatar images used in the 5 relationships component
const avatarImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=28&h=28&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=28&h=28&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=28&h=28&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=28&h=28&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=28&h=28&fit=crop&crop=face"
];

const authorNames = [
  "Alex Morgan",
  "Jordan Lee",
  "Taylor Kim",
  "Morgan Patel",
  "Casey Chen",
  "Riley Singh",
  "Jamie Park",
  "Avery Shah",
  "Drew Nguyen",
  "Skyler Brooks"
];

export default function FeedCard({ org, date, title, description, author, readTime, image, onClick, onShare, variant, hideHeader, idx }) {
  if (variant === 'exchange') {
    // Custom Exchange card design (screenshot reference)
    return (
      <div
        className="feed-card exchange-card"
        onClick={onClick}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onClick && onClick(); } }}
      >
        {!hideHeader && (
          <div className="exchange-card-header">
            <img src="/Assets/Blackstone logo.png" alt="Org logo" className="exchange-card-org-logo" />
            <div className="exchange-card-contacts">
              <span className="exchange-card-contacts-count">5 contacts</span>
              <span className="exchange-card-contacts-avatars">
                <span className="exchange-card-avatar" />
                <span className="exchange-card-avatar" />
                <span className="exchange-card-avatar" />
              </span>
            </div>
          </div>
        )}
        <div className="exchange-card-content">
          <div className="exchange-card-type">PDF</div>
          <div className="exchange-card-title">{title || 'Asset title'}</div>
          {/* <div className="exchange-card-description">{description}</div> */}
          <div className="exchange-card-meta">
            <span className="exchange-card-shared-by">Shared by</span>
            <img 
              src={avatarImages[idx % avatarImages.length]} 
              alt="Author avatar" 
              style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #fff', marginRight: 2, objectFit: 'cover', boxShadow: '0 1px 4px rgba(51,51,51,0.08)' }} 
            />
            <span className="exchange-card-author">{authorNames[idx % authorNames.length]}</span>
          </div>
        </div>
        <div className="exchange-card-image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="exchange-card-image-placeholder" />
          )}
        </div>
      </div>
    );
  }
  // Default card design
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
          <img 
            src={avatarImages[idx % avatarImages.length]} 
            alt="Author avatar" 
            style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #fff', marginRight: 6, objectFit: 'cover', boxShadow: '0 1px 4px rgba(51,51,51,0.08)' }} 
          />
          <span className="feed-card-author">{authorNames[idx % authorNames.length]}</span>
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