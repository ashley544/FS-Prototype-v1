import React from "react";
import "./AIResponse.css";
import PDFViewerAssetCard from "./PDFViewerAssetCard";

export default function AIResponse({ userInput, aiAnswer, recommendedAsset, onDismiss, onOpenAsset, onReturnToOriginal }) {
  return (
    <div className="ai-response-card">
      <div className="ai-response-text">
        <div className="ai-response-user-input">
          {userInput}
        </div>
        <div className="ai-response-ai-block">
          <div className="ai-response-gradient-line" />
          <div className="ai-response-ai-content">
            <div className="ai-response-eyebrow">Flagships · Insight</div>
            <div className="ai-response-answer" dangerouslySetInnerHTML={{ __html: aiAnswer }}></div>
            {recommendedAsset && (
              <div className="ai-response-recommendation">
                <PDFViewerAssetCard {...recommendedAsset} selected={false} onClick={() => onOpenAsset(recommendedAsset.file)} />
              </div>
            )}
            <div className="ai-response-return-link">
              <a href="#" onClick={(e) => { e.preventDefault(); onReturnToOriginal ? onReturnToOriginal() : onDismiss(); }}>Return to section</a>
            </div>
          </div>
        </div>
      </div>
      <div className="ai-response-ctas">
        <button className="ai-response-cta ai-response-cta-no" onClick={onDismiss}>Dismiss response</button>
      </div>
    </div>
  );
} 