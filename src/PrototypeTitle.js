import React from 'react';
import './PrototypeTitle.css';

const PrototypeTitle = ({ onSelectFlow }) => {
  return (
    <div className="prototype-title-container">
      <div className="prototype-title-content">
        <div className="prototype-title-header">
          <h1 className="prototype-title-main">Flagships Prototype</h1>
          <p className="prototype-title-subtitle">Choose a flow to explore</p>
        </div>
        
        <div className="prototype-flows">
          <button 
            className="prototype-flow-button"
            onClick={() => onSelectFlow(1)}
          >
            <div className="flow-button-content">
              <div className="flow-button-number">01</div>
              <div className="flow-button-text">
                <h3>Admin flow</h3>
                <p>Asset Library & Navigation</p>
              </div>
            </div>
          </button>

          <button 
            className="prototype-flow-button"
            onClick={() => onSelectFlow(2)}
          >
            <div className="flow-button-content">
              <div className="flow-button-number">02</div>
              <div className="flow-button-text">
                <h3>User flow</h3>
                <p>PDF Viewer & AI Search</p>
              </div>
            </div>
          </button>
        </div>

        <div className="prototype-footer">
          <p className="prototype-footer-text">Rockefeller Exchange Platform</p>
        </div>
      </div>
    </div>
  );
};

export default PrototypeTitle;
