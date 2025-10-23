import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, images = [], currentImageIndex = 0, onNextImage, onPrevImage, imageAlt = "Modal Image" }) => {
  if (!isOpen || !images.length) return null;

  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
      onPrevImage();
    } else if (e.key === 'ArrowRight' && hasMultipleImages) {
      onNextImage();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {hasMultipleImages && (
          <>
            <button 
              className="modal-nav-btn modal-nav-prev" 
              onClick={onPrevImage}
              disabled={currentImageIndex === 0}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="modal-nav-btn modal-nav-next" 
              onClick={onNextImage}
              disabled={currentImageIndex === images.length - 1}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
        
        <img 
          src={currentImage} 
          alt={`${imageAlt} ${currentImageIndex + 1}`}
          className="modal-image"
        />
        
        {hasMultipleImages && (
          <div className="modal-image-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
