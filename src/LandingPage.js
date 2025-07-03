import React, { useState } from 'react';
import './LandingPage.css';
import Carousel from './Carousel';
import DottedRectangle from './DottedRectangle';

const carouselAssets = [
  {
    image: "/Assets/The Scrolling Mind - White Paper.png",
    type: "PDF",
    title: "The Scrolling Mind - White Paper"
  },
  {
    image: "/Assets/Prove Your Marketing Team's Performance.png",
    type: "PDF",
    title: "Prove Your Marketing Team's Performance"
  },
  {
    image: "/Assets/The Goldman Standard.png",
    type: "PDF",
    title: "The Goldman Standard"
  },
  {
    image: "/Assets/Consider the viewer.png",
    type: "PDF",
    title: "Consider the Viewer"
  }
];

export default function LockedProfile({ onEnter }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        setError("Please enter your email address.");
      } else if (!emailPattern.test(email)) {
        setError("Please enter a valid email address.");
      } else {
        setError("");
        onEnter();
      }
    }
  };

  return (
    <div className="locked-profile-layout">
      <aside className="locked-profile-side-panel">
        <div className="locked-profile-user-card">
          <div className="user-details-actions">
            {/*
            <button className="user-details-action">
              <span className="user-details-action-text">Schedule a meeting</span>
              <span className="user-details-action-icon">
                <img src="/arrow_forward.svg" alt="Forward" width={16} height={16} style={{ filter: 'brightness(0) invert(1)' }} />
              </span>
            </button>
            <button className="user-details-action">
              <span className="user-details-action-text">Save contact</span>
              <span className="user-details-action-icon">
                <img src="/download.svg" alt="Download" width={16} height={16} style={{ filter: 'brightness(0) invert(1)' }} />
              </span>
            </button>
            */}
          </div>
        </div>
        <div className="locked-profile-logo">
          <img src="/doorway light logo.svg" alt="Doorway Light Logo" style={{ maxWidth: 191, maxHeight: 80 }} />
        </div>
      </aside>
      <main className="locked-profile-main">
        <div className="locked-profile-content">
          <Carousel assets={carouselAssets} />
          <DottedRectangle>
            <div className="animated-gradient-blob-summarise" />
            <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '40px 0', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="9" width="14" height="11" rx="3" fill="#111"/>
                  <circle cx="12" cy="15" r="2" fill="#fff"/>
                  <path d="M8 9V7a4 4 0 1 1 8 0" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                </svg>
                <div style={{ fontSize: 24, fontWeight: 500, color: '#111', fontFamily: 'Inter Variable, Inter, Arial, sans-serif', textAlign: 'center', lineHeight: 1.1 }}>
                  Doorway Exchange
                </div>
                <div style={{ fontSize: 14, color: '#222', fontWeight: 400, textAlign: 'center', marginTop: 0, lineHeight: 1.4 }}>
                  Permission required to access<br />
                  Enter your email to view Exchange assets
                </div>
              </div>
              <div style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <input
                  type="email"
                  placeholder="Enter work email"
                  value={email}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="locked-profile-email-input"
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    borderRadius: '12px',
                    border: '1.5px solid #ececec',
                    fontSize: '14px',
                    fontFamily: 'Inter Variable, Inter, Arial, sans-serif',
                    marginBottom: error ? 4 : 0,
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(51,51,51,0.06)'
                  }}
                  autoFocus
                />
                {error && <div style={{ color: '#e94b4b', fontSize: 6, marginTop: 0 }}>{error}</div>}
              </div>
            </div>
          </DottedRectangle>
        </div>
      </main>
    </div>
  );
} 