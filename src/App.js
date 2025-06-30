import React, { useState } from "react";
import PDFViewer from "./PDFViewer";
import AssetCard from "./AssetCard";
import UserDetails from "./UserDetails";
import AIResponse from "./AIResponse";
import "./App.css";

const placeholderImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256";

const newsroomAssets = [
  {
    image: "/Assets/The Rules of Attraction.png",
    type: "PDF",
    title: "The Rules of Attraction",
    file: "/pdfs/The Rules of Attraction.pdf",
  },
  {
    image: "/Assets/The Scrolling Mind - White Paper.png",
    type: "PDF",
    title: "The Scrolling Mind - White Paper",
    file: "/pdfs/The Scrolling Mind - White Paper.pdf",
  },
  {
    image: "/Assets/The Goldman Standard.png",
    type: "PDF",
    title: "The Goldman Standard",
    file: "/pdfs/The Goldman Standard.pdf",
  },
  {
    image: "/Assets/Consider the viewer.png",
    type: "PDF",
    title: "Consider the viewer",
    file: "/pdfs/Consider the viewer.pdf",
  },
];

const exchangeAssets = [
  {
    image: "/Assets/Doorway - Overview.png",
    type: "PDF",
    title: "Doorway Overview",
    file: "/pdfs/Doorway - Overview.pdf",
  },
  {
    image: "/Assets/Doorway - FAQ .png",
    type: "PDF",
    title: "Doorway FAQs",
    file: "/pdfs/Doorway - FAQ .pdf",
  },
  {
    image: placeholderImg,
    type: "PDF",
    title: "Data Protection Procedures",
    file: "/pdfs/Data Protection Procedures.pdf",
  },
];

// Mapping: which newsroom asset cards to show for each open PDF
const assetDisplayMap = {
  '/pdfs/The Rules of Attraction.pdf': [
    'The Rules of Attraction',
    'The Scrolling Mind - White Paper',
    'The Goldman Standard'
  ],
  '/pdfs/The Goldman Standard.pdf': [
    'The Scrolling Mind - White Paper',
    'The Goldman Standard'
    // 'The Rules of Attraction' and 'Consider the viewer' are omitted to hide them
  ],
  // Add more mappings as needed
};

// Per-PDF AI response mapping
const aiResponseMap = {
  '/pdfs/The Rules of Attraction.pdf': {
    trigger: 'test',
    answer: "The 'Fixed Service Fee' is 0.15%. I've highlighted this information in the document for you. Do you want me to show you the fees last year?"
  },
  '/pdfs/Doorway - Overview.pdf': {
    trigger: 'security',
    answer: "Information security procedures take <strong>2-4 weeks</strong>. Would you like to read Data Protection Procedures next?",
    recommendedAsset: {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256",
      type: "PDF",
      title: "Data Protection Procedures",
      file: "/pdfs/Data Protection Procedures.pdf"
    }
  },
  // Add more PDFs and their triggers/answers here
};

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState(newsroomAssets[0].file);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [enterPressed, setEnterPressed] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(""); // Store the last trigger that was activated

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine which newsroom asset cards to show based on selectedPdf
  const filteredNewsroomAssets = assetDisplayMap[selectedPdf]
    ? newsroomAssets.filter(asset => assetDisplayMap[selectedPdf].includes(asset.title))
    : newsroomAssets;

  // AI Response logic (per PDF) - triggered by main search input + Enter key
  const aiConfig = aiResponseMap[selectedPdf];
  const shouldShowAIResponse = aiConfig && lastTrigger === aiConfig.trigger && enterPressed && showAIResponse;
  const highlightPage =
    selectedPdf === '/pdfs/Doorway - Overview.pdf' && lastTrigger === 'security' && enterPressed ? 12 : null;

  // Handle main search input changes (from PDF viewer header)
  const handleMainSearchInputChange = (value) => {
    setSearchInput(value);
    // Reset enter pressed when user types something different
    if (value.trim() !== aiConfig?.trigger) {
      setEnterPressed(false);
    }
  };

  // Handle Enter key press in search input
  const handleSearchEnterPress = (value) => {
    if (aiConfig && value.trim() === aiConfig.trigger) {
      setEnterPressed(true);
      setShowAIResponse(true);
      setLastTrigger(value.trim()); // Store the trigger that was activated
    }
  };

  // Handle dismissing AI response
  const handleDismissAIResponse = () => {
    setShowAIResponse(false);
    setSearchInput("");
    setEnterPressed(false);
    setLastTrigger(""); // Clear the stored trigger
  };

  // Handle PDF selection - clear AI response when navigating away
  const handlePdfSelection = (pdfFile) => {
    setSelectedPdf(pdfFile);
    setShowAIResponse(false);
    setSearchInput("");
    setEnterPressed(false);
    setLastTrigger(""); // Clear the stored trigger
  };

  return (
    <div className={`app-layout ${isExpanded ? 'expanded' : ''}`}>
      <aside className={`sidebar ${isExpanded ? 'hidden' : ''}`}>
        {/* AI Response appears at the top of the sidebar if triggered */}
        {shouldShowAIResponse && (
          <AIResponse 
            userInput={lastTrigger} 
            aiAnswer={aiConfig.answer} 
            recommendedAsset={aiConfig.recommendedAsset}
            onDismiss={handleDismissAIResponse}
          />
        )}
        <div className={`sidebar-section ${!shouldShowAIResponse ? 'with-top-padding' : ''}`}>
          <div className="sidebar-section-title">Newsroom</div>
          <div className="sidebar-section-cards">
            {filteredNewsroomAssets.map(asset => (
              <AssetCard
                key={asset.title}
                image={asset.image}
                type={asset.type}
                title={asset.title}
                selected={selectedPdf === asset.file}
                onSummarise={() => alert("Summarise Newsroom Asset")}
                onClick={() => handlePdfSelection(asset.file)}
              />
            ))}
          </div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Exchange</div>
          <div className="sidebar-section-cards">
            {exchangeAssets.map(asset => (
              <AssetCard
                key={asset.title}
                image={asset.image}
                type={asset.type}
                title={asset.title}
                selected={selectedPdf === asset.file}
                onSummarise={() => alert("Summarise Exchange Asset")}
                onClick={() => handlePdfSelection(asset.file)}
              />
            ))}
          </div>
        </div>
        <UserDetails />
      </aside>
      <main className={`main-content ${isExpanded ? 'expanded' : ''}`}>
        <PDFViewer 
          file={selectedPdf} 
          isExpanded={isExpanded}
          onToggleExpand={handleToggleExpand}
          onSearchInputChange={handleMainSearchInputChange}
          onSearchEnterPress={handleSearchEnterPress}
          highlightPage={highlightPage}
        />
      </main>
    </div>
  );
} 