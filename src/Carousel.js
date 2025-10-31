import React, { useState, useEffect } from 'react';
import { getAssetImageUrl } from './utils/assetImageHelper';
import './Carousel.css';

const Carousel = ({ assets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(303);
  const [gap, setGap] = useState(12);

  // Calculate responsive card width and gap
  useEffect(() => {
    const updateCardSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setCardWidth(280);
        setGap(8);
      } else if (width <= 768) {
        setCardWidth(300);
        setGap(10);
      } else if (width <= 1200) {
        setCardWidth(310);
        setGap(12);
      } else {
        setCardWidth(303);
        setGap(12);
      }
    };

    updateCardSize();
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % assets.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + assets.length) % assets.length);
  };

  return (
    <div className="carousel-container">
      {/* Header */}
      <div className="carousel-header">
        <h3 className="carousel-title">Newsroom</h3>
        <div className="carousel-navigation">
          <button className="carousel-nav-btn" onClick={prevSlide}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="carousel-nav-btn" onClick={nextSlide}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="carousel-track" style={{position: 'relative'}}>
        {/* Left Gradient Overlay (conditionally rendered) */}
        {currentIndex > 0 && (
          <div
            className="carousel-gradient-left"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 48,
              height: '100%',
              zIndex: 2,
              pointerEvents: 'none',
              background: 'linear-gradient(to right, #fff 50%, transparent 100%)'
            }}
          />
        )}
        {/* Right Gradient Overlay (always rendered) */}
        <div
          className="carousel-gradient-right"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 48,
            height: '100%',
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(to left, #fff 50%, transparent 100%)'
          }}
        />
        {/* Cards Container */}
        <div 
          className="carousel-slides"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
            width: '100%',
            gap: `${gap}px`
          }}
        >
          {assets.map((asset, index) => {
            const imageUrl = getAssetImageUrl(asset.title, asset.image, asset.file);
            return (
              <div
                key={index}
                className="carousel-slide"
                style={{ width: `${cardWidth}px`, height: '200px', flex: '0 0 auto' }}
              >
                <div className="carousel-card">
                  <div className="carousel-card-header">
                    <div className="carousel-card-type">{asset.type}</div>
                    <div className="carousel-card-title">{asset.title}</div>
                  </div>
                  <div className="carousel-card-image">
                    {imageUrl ? (
                      <img src={imageUrl} alt={asset.title} onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                          <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="rgba(0, 0, 0, 0.26)"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="carousel-indicators">
        {Array.from({ length: Math.max(1, assets.length - 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 