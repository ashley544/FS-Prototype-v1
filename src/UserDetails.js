import React from "react";
import "./UserDetails.css";

export default function UserDetails({ onUserNameClick }) {
  return (
    <div className="user-details-card">
      <div 
        className={onUserNameClick ? "user-details-logo clickable" : "user-details-logo"}
        onClick={onUserNameClick}
        style={onUserNameClick ? { cursor: 'pointer' } : {}}
      >
        <img src="/doorway logo.svg" alt="Logo" />
      </div>
      <div className="user-details-user">
        <div className="user-details-actions">
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
        </div>
      </div>
    </div>
  );
} 