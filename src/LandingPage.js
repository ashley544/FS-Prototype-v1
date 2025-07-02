import React, { useState } from 'react';
import './LandingPage.css';
import Carousel from './Carousel';
import DottedRectangle from './DottedRectangle';

// Sample carousel assets
const carouselAssets = [
  {
    image: "/Assets/The Rules of Attraction.png",
    type: "PDF",
    title: "The Rules of Attraction"
  },
  {
    image: "/Assets/The Scrolling Mind - White Paper.png",
    type: "PDF", 
    title: "The Scrolling Mind - White Paper"
  },
  {
    image: "/Assets/The Goldman Standard.png",
    type: "PDF",
    title: "The Goldman Standard"
  },
  {
    image: "/Assets/Consider the viewer.png",
    type: "PDF",
    title: "Consider the viewer"
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
            <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '40px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7V7a6 6 0 1 0-12 0v3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-8-3a4 4 0 1 1 8 0v3H6V7zm10 12H6v-7h12v7z" fill="#111"/>
                </svg>
                <div style={{ fontSize: 28, fontWeight: 500, color: '#111', fontFamily: 'Inter Variable, Inter, Arial, sans-serif', textAlign: 'center', lineHeight: 1.1 }}>
                  Doorway Exchange
                </div>
                <div style={{ fontSize: 14, color: '#222', fontWeight: 400, textAlign: 'center', marginTop: 0, lineHeight: 1.4 }}>
                  Permission required to access.<br />
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