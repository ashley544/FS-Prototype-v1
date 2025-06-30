import React, { useState } from 'react';
import './Carousel.css';

export default function Carousel({ assets }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === assets.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? assets.length - 1 : prevIndex - 1
    );
  };

  // Calculate transform distance: card width (170px) + gap (12px) = 182px per card
  const transformDistance = currentIndex * 182;

  return (
    <div className="carousel-container">
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
      
      <div className="carousel-track">
        <div 
          className="carousel-slides" 
          style={{ transform: `translateX(-${transformDistance}px)` }}
        >
          {assets.map((asset, index) => (
            <div key={index} className="carousel-slide">
              <div className="carousel-card">
                <div className="carousel-card-header">
                  <div className="carousel-card-type">{asset.type}</div>
                  <div className="carousel-card-title">{asset.title}</div>
                </div>
                <div className="carousel-card-image">
                  <img src={asset.image} alt={asset.title} />
                  <div className="carousel-play-button">
                    <div className="play-button-circle">
                      <div className="play-button-triangle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-indicators">
        {assets.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
} 