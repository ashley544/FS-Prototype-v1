import React from 'react';
import './DetailAIResponse.css';

const DetailAIResponse = ({ response }) => {
  return (
    <div className="detail-ai-response-wrapper">
      <div className="detail-ai-response">
        <div className="detail-ai-response-gradient-bar"></div>
        <div className="detail-ai-response-content">
          <div className="detail-ai-response-eyebrow">Rockefeller · AI Insight</div>
          <div className="detail-ai-response-text">
            {response || "There are 6,218 private wealth investors that are interested. I have categorized them by fund participation or general consideration. Shall I optimize the deck for each group for you to review?"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAIResponse;

