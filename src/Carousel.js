import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ assets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="carousel-track">
        {/* Cards Container */}
        <div 
          className="carousel-slides"
          style={{
            transform: `translateX(-${currentIndex * 315}px)`,
            width: `${assets.length * 315}px`
          }}
        >
          {assets.map((asset, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{ width: '303px', height: '275px' }}
            >
              <div className="carousel-card">
                <div className="carousel-card-header">
                  <div className="carousel-card-type">{asset.type}</div>
                  <div className="carousel-card-title">{asset.title}</div>
                </div>
                <div className="carousel-card-image">
                  <img src={asset.image} alt={asset.title} />
                </div>
              </div>
            </div>
          ))}
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