import React from "react";
import "./UserDetails.css";

export default function UserDetails() {
  return (
    <div className="user-details-card">
      <div className="user-details-logo">
        <img src="/Doorway logo.svg" alt="Doorway Logo" />
      </div>
      <div className="user-details-user">
        <div className="user-details-name">Grace Parkerson</div>
        <div className="user-details-title">Vice President · North America</div>
        <div className="user-details-actions">
          <button className="user-details-action">
            <span className="user-details-action-text">Save contact</span>
            <span className="user-details-action-icon">
              {/* Download icon */}
              <img src="/download.svg" alt="Download" width={20} height={20} />
            </span>
          </button>
          <button className="user-details-action">
            <span className="user-details-action-text">Schedule a meeting</span>
            <span className="user-details-action-icon">
              {/* Arrow forward icon */}
              <img src="/arrow_forward.svg" alt="Arrow Forward" width={18} height={18} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 