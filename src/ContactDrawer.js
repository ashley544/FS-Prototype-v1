import React, { useState, useEffect } from 'react';
import './ContactDrawer.css';

export default function ContactDrawer({ isOpen, onClose, contact }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }

    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen || !contact) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`contact-drawer-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
      
      {/* Drawer */}
      <div className={`contact-drawer ${isClosing ? 'closing' : ''}`}>
        {/* Header */}
        <div className="contact-drawer-header">
          <h2 className="contact-drawer-title">Contact Details</h2>
          <button className="contact-drawer-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="contact-drawer-content">
          <div className="contact-drawer-section">
            <div className="contact-drawer-info">
              <h3 className="contact-drawer-name">{contact.name}</h3>
              <div className="contact-drawer-meta">
                <div className="contact-drawer-company">
                  <span className="contact-drawer-label">Company:</span>
                  <span className="contact-drawer-value">{contact.company}</span>
                </div>
                <div className="contact-drawer-activity">
                  <span className="contact-drawer-label">Last Activity:</span>
                  <span className="contact-drawer-value">{contact.lastActivity}</span>
                </div>
                <div className="contact-drawer-status-section">
                  <span className="contact-drawer-label">Status:</span>
                  <div className="contact-drawer-status-badge">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3" cy="3" r="3" fill={contact.statusColor}/>
                    </svg>
                    <span className="contact-drawer-status-label">{contact.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


