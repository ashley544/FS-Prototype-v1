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
        <img src="/Rockefeller-logo.png" alt="Rockefeller Logo" />
      </div>
      
      <div className="user-details-info">
        <div className="user-details-name-section">
          <div className="user-details-name">Georgina Matthews</div>
          <div className="user-details-title">Vice President · North America</div>
        </div>
      </div>
    </div>
  );
} 