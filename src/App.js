import React, { useState, useRef, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import AssetCard from "./AssetCard";
import UserDetails from "./UserDetails";
import AIResponse from "./AIResponse";
import LockedProfile from "./LandingPage";
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
  {
    image: "/Assets/Why Your Personal Relationships Matter Now More Than Ever.png",
    type: "PDF",
    title: "Why Your Personal Relationships Matter Now More Than Ever",
    file: "/pdfs/Why Your Personal Relationships Matter Now More Than Ever.pdf",
  },
  {
    image: "/Assets/Prove Your Marketing Team's Performance.png",
    type: "PDF",
    title: "Prove Your Marketing Team's Performance",
    file: "/pdfs/Prove Your Marketing Team's Performance.pdf",
  },
  {
    image: "/Assets/The Key to Passive Relationship Management.png",
    type: "PDF",
    title: "The Key to Passive Relationship Management",
    file: "/pdfs/The Key to Passive Relationship Management.pdf",
  },
  {
    image: "/Assets/Creating Competitive Deal Processes in Real Estate.png",
    type: "PDF",
    title: "Creating Competitive Deal Processes in Real Estate",
    file: "/pdfs/Creating Competitive Deal Processes in Real Estate.pdf",
  },
  {
    image: "/Assets/Shared Service Teams- The Backbone of Continuity and Scale.png",
    type: "PDF",
    title: "Shared Service Teams - The Backbone of Continuity and Scale",
    file: "/pdfs/Shared Service Teams- The Backbone of Continuity and Scale.pdf",
  },
  {
    image: "/Assets/Salesforce vs Hubspot.png",
    type: "PDF",
    title: "Salesforce vs Hubspot",
    file: "/pdfs/Salesforce vs Hubspot.pdf",
  },
  {
    image: "/Assets/Intralinks vs Datasite.png",
    type: "PDF",
    title: "Intralinks vs Datasite",
    file: "/pdfs/Intralinks vs Datasite.pdf",
  },
  {
    image: "/Assets/DocSend vs Firmex.png",
    type: "PDF",
    title: "DocSend vs Firmex",
    file: "/pdfs/DocSend vs Firmex.pdf",
  },
  {
    image: "/Assets/Highspot vs Seismic.png",
    type: "PDF",
    title: "Highspot vs Seismic",
    file: "/pdfs/Highspot vs Seismic.pdf",
  },
  {
    image: "/Assets/Liferay vs Diligent.png",
    type: "PDF",
    title: "Liferay vs Diligent",
    file: "/pdfs/Liferay vs Diligent.pdf",
  },
  {
    image: placeholderImg,
    type: "PDF",
    title: "Blackstone - Presentation",
    file: "/pdfs/Blackstone - Presentation (1).pdf",
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
  '/pdfs/The Scrolling Mind - White Paper.pdf': [
    'The Scrolling Mind - White Paper',
    'Consider the viewer',
    'The Rules of Attraction',
    'The Key to Passive Relationship Management'
  ],
  '/pdfs/The Rules of Attraction.pdf': [
    'The Rules of Attraction',
    'The Key to Passive Relationship Management',
    'The Scrolling Mind - White Paper',
    'Prove Your Marketing Team\'s Performance'
  ],
  '/pdfs/Why Your Personal Relationships Matter Now More Than Ever.pdf': [
    'Why Your Personal Relationships Matter Now More Than Ever',
    'The Key to Passive Relationship Management',
    'The Rules of Attraction',
    'Creating Competitive Deal Processes in Real Estate'
  ],
  '/pdfs/Prove Your Marketing Team\'s Performance.pdf': [
    'Prove Your Marketing Team\'s Performance',
    'Shared Service Teams - The Backbone of Continuity and Scale',
    'Salesforce vs Hubspot',
    'Highspot vs Seismic'
  ],
  // Empty by default - will show all newsroom assets
  // Add specific mappings here if you want to filter assets for certain PDFs
};

// Per-PDF AI response mapping
const aiResponseMap = {
  '/pdfs/The Rules of Attraction.pdf': {
    trigger: 'test',
    answer: "The 'Fixed Service Fee' is 0.15%. I've highlighted this information in the document for you. Do you want me to show you the fees last year?"
  },
  '/pdfs/Doorway - Overview.pdf': {
    trigger: 'show me the security procedure',
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
  const [lastTrigger, setLastTrigger] = useState("");
  const [pdfHovered, setPdfHovered] = useState(false);
  const [pdfRect, setPdfRect] = useState(null);
  const pdfRef = useRef();
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'asset-viewer'

  // Update bounding box when hovered or window resizes
  useEffect(() => {
    function updateRect() {
      if (pdfRef.current) {
        setPdfRect(pdfRef.current.getBoundingClientRect());
      }
    }
    if (pdfHovered) {
      updateRect();
      window.addEventListener("resize", updateRect);
    }
    return () => window.removeEventListener("resize", updateRect);
  }, [pdfHovered]);

  useEffect(() => {
    function handleResize() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // PDF border radius (should match .pdf-page in CSS)
  const pdfBorderRadius = 8;

  // SVG overlay with rounded cut-out
  const OverlayWithCutout = () => {
    // Always render overlays for smooth animation
    const overlayBg = 'rgba(0,0,0,0.25)'; // 25% black
    const overlayClass = pdfHovered ? 'page-overlay-with-cutout page-overlay-active' : 'page-overlay-with-cutout page-overlay-inactive';
    const inset = 1;
    let left = 0, top = 0, width = 0, height = 0, vw = window.innerWidth, vh = window.innerHeight;
    if (pdfRect) {
      ({ left, top, width, height } = pdfRect);
      vw = viewport.width;
      vh = viewport.height;
    }
    return (
      <>
        {/* Top overlay */}
        <div className={overlayClass} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: pdfRect ? Math.max(top - inset, 0) : '100vh',
          background: overlayBg,
          pointerEvents: 'none',
          zIndex: 1000
        }} />
        {/* Bottom overlay */}
        <div className={overlayClass} style={{
          position: 'fixed',
          top: pdfRect ? top + height + inset : 0,
          left: 0,
          width: '100vw',
          height: pdfRect ? Math.max(vh - (top + height + inset), 0) : '0',
          background: overlayBg,
          pointerEvents: 'none',
          zIndex: 1000
        }} />
        {/* Left overlay */}
        <div className={overlayClass} style={{
          position: 'fixed',
          top: pdfRect ? top - inset : 0,
          left: 0,
          width: pdfRect ? Math.max(left - inset, 0) : '100vw',
          height: pdfRect ? Math.max(height + 2 * inset, 0) : '100vh',
          background: overlayBg,
          pointerEvents: 'none',
          zIndex: 1000,
          overflow: 'hidden'
        }} />
        {/* Right overlay */}
        <div className={overlayClass} style={{
          position: 'fixed',
          top: pdfRect ? top - inset : 0,
          left: pdfRect ? left + width + inset : 0,
          width: pdfRect ? Math.max(vw - (left + width + inset), 0) : '0',
          height: pdfRect ? Math.max(height + 2 * inset, 0) : '100vh',
          background: overlayBg,
          pointerEvents: 'none',
          zIndex: 1000,
          overflow: 'hidden'
        }} />
      </>
    );
  };

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
    selectedPdf === '/pdfs/Doorway - Overview.pdf' && lastTrigger === 'show me the security procedure' && enterPressed ? 12 : null;

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

  // Overlay should be hidden when AI response is shown for the security procedure trigger
  const overlayShouldBeVisible = !(
    selectedPdf === '/pdfs/Doorway - Overview.pdf' &&
    lastTrigger === 'show me the security procedure' &&
    enterPressed &&
    showAIResponse
  );

  // Handler to go to asset viewer
  const handleEnterAssetViewer = () => setCurrentPage('asset-viewer');
  // Handler to go to landing page
  const handleGoToLanding = () => setCurrentPage('landing');

  if (currentPage === 'landing') {
    return <LockedProfile onEnter={handleEnterAssetViewer} />;
  }

  return (
    <div className={`app-layout ${isExpanded ? 'expanded' : ''}`}>
      {overlayShouldBeVisible && <OverlayWithCutout />}
      <aside
        className={`sidebar ${isExpanded ? 'hidden' : ''}`}
        onMouseEnter={() => setPdfHovered(false)}
        style={{ position: 'relative' }}
      >
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
        <UserDetails onUserNameClick={handleGoToLanding} />
      </aside>
      <main
        className={`main-content ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setPdfHovered(true)}
        onMouseLeave={() => setPdfHovered(false)}
      >
        <PDFViewer 
          file={selectedPdf} 
          isExpanded={isExpanded}
          onToggleExpand={handleToggleExpand}
          onSearchInputChange={handleMainSearchInputChange}
          onSearchEnterPress={handleSearchEnterPress}
          highlightPage={highlightPage}
          pdfRef={pdfRef}
        />
      </main>
    </div>
  );
} 