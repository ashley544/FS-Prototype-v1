import React from 'react';
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
            <button className="locked-profile-enter-btn" onClick={onEnter}>
              Go to Asset Viewer
            </button>
          </DottedRectangle>
        </div>
      </main>
    </div>
  );
} 