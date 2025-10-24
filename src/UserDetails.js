import React from "react";
import "./UserDetails.css";

export default function UserDetails({ onUserNameClick, onLogoClick }) {
  return (
    <div className="user-details-card">
      <div 
        className={onLogoClick ? "user-details-logo clickable" : "user-details-logo"}
        onClick={onLogoClick}
        style={onLogoClick ? { cursor: 'pointer' } : {}}
      >
        <img src="/Blackstone logo.png" alt="Blackstone Logo" />
      </div>
      <div className="user-details-user">
        <div className="user-details-actions">
          {/*
          <button className="user-details-action">
            <span className="user-details-action-text">Save contact</span>
            <span className="user-details-action-icon">
              <img src="/download.svg" alt="Download" width={16} height={16} />
            </span>
          </button>
          <button className="user-details-action">
            <span className="user-details-action-text">Schedule a meeting</span>
            <span className="user-details-action-icon">
              <img src="/arrow_forward.svg" alt="Forward" width={16} height={16} />
            </span>
          </button>
          */}
        </div>
      </div>
    </div>
  );
} 