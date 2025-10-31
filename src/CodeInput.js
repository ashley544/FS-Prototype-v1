import React, { useState, useRef, useEffect } from 'react';
import './CodeInput.css';

const CodeInput = ({ onCodeSubmit, onBack, userEmail }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Only allow single digit input
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      onCodeSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus the next empty field or the last field
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="code-input-container">
      <div className="animated-gradient-blob" />
      <div className="code-input-modal">
        <div className="modal-content">
          <button className="back-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </button>
          <div className="content-header">
            <h1 className="main-title">Enter Your Verification Code</h1>
            <p className="subtitle">
              We've sent you an email. Enter the code or click the link in your email to continue.
            </p>
          </div>

          <div className="code-input-section">
            <div className="code-inputs">
              {code.map((digit, index) => (
                <div key={index} className="input-wrapper">
                  <input
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="code-input"
                    maxLength="1"
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="submit-section">
            <button 
              className="submit-button"
              onClick={() => onCodeSubmit(code.join(''))}
              disabled={code.some(digit => digit === '')}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeInput;
