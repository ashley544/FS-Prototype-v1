import React, { useState, useRef, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import AssetCard from "./AssetCard";
import UserDetails from "./UserDetails";
import AIResponse from "./AIResponse";
import LockedProfile from "./LandingPage";
import FeedCard from './FeedCard';
import "./App.css";

const placeholderImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256";

const newsroomAssets = [
  {
    image: "/Assets/The Rules of Attraction.png",
    type: "PDF",
    title: "The Rules of Attraction",
    file: "/pdfs/Rules of Attraction.pdf",
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
  '/pdfs/Rules of Attraction.pdf': [
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
  '/pdfs/The Key to Passive Relationship Management.pdf': [
    'The Key to Passive Relationship Management',
    'The Rules of Attraction',
    'Why Your Personal Relationships Matter Now More Than Ever',
    'The Goldman Standard'
  ],
  '/pdfs/Creating Competitive Deal Processes in Real Estate.pdf': [
    'Creating Competitive Deal Processes in Real Estate',
    'The Rules of Attraction',
    'Consider the viewer',
    'The Goldman Standard'
  ],
  '/pdfs/Shared Service Teams- The Backbone of Continuity and Scale.pdf': [
    'Shared Service Teams - The Backbone of Continuity and Scale',
    'The Goldman Standard',
    'Salesforce vs Hubspot',
    'Prove Your Marketing Team\'s Performance'
  ],
  '/pdfs/Consider the viewer.pdf': [
    'Consider the viewer',
    'The Scrolling Mind - White Paper',
    'Intralinks vs Datasite',
    'Liferay vs Diligent'
  ],
  '/pdfs/The Goldman Standard.pdf': [
    'The Goldman Standard',
    'Shared Service Teams - The Backbone of Continuity and Scale',
    'Prove Your Marketing Team\'s Performance',
    'Creating Competitive Deal Processes in Real Estate'
  ],
  '/pdfs/Salesforce vs Hubspot.pdf': [
    'Salesforce vs Hubspot',
    'Intralinks vs Datasite',
    'Highspot vs Seismic',
    'Liferay vs Diligent'
  ],
  '/pdfs/Intralinks vs Datasite.pdf': [
    'Intralinks vs Datasite',
    'DocSend vs Firmex',
    'Salesforce vs Hubspot',
    'Highspot vs Seismic'
  ],
  '/pdfs/DocSend vs Firmex.pdf': [
    'DocSend vs Firmex',
    'Intralinks vs Datasite',
    'Salesforce vs Hubspot',
    'Liferay vs Diligent'
  ],
  '/pdfs/Highspot vs Seismic.pdf': [
    'Highspot vs Seismic',
    'Liferay vs Diligent',
    'Salesforce vs Hubspot',
    'Intralinks vs Datasite'
  ],
  '/pdfs/Liferay vs Diligent.pdf': [
    'Liferay vs Diligent',
    'Salesforce vs Hubspot',
    'Highspot vs Seismic',
    'Intralinks vs Datasite'
  ],
  // Show these three assets when either exchange asset is open
  '/pdfs/Doorway - Overview.pdf': [
    'The Scrolling Mind - White Paper',
    'Consider the viewer',
    'The Key to Passive Relationship Management'
  ],
  '/pdfs/Doorway - FAQ .pdf': [
    'The Scrolling Mind - White Paper',
    'Consider the viewer',
    'The Key to Passive Relationship Management'
  ],
  '/pdfs/Data Protection Procedures.pdf': [
    'The Scrolling Mind - White Paper',
    'Consider the viewer',
    'The Key to Passive Relationship Management'
  ],
  // Empty by default - will show all newsroom assets
  // Add specific mappings here if you want to filter assets for certain PDFs
};

// Per-PDF AI response mapping
const aiResponseMap = {
  '/pdfs/Rules of Attraction.pdf': {
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

// New Feed page component
function Feed({ onGoToAssetViewer, onOpenAsset }) {
  const [tab, setTab] = React.useState('newsroom'); // 'newsroom' or 'exchange'
  // Example placeholder values for FeedCard fields
  const getOrg = () => 'Doorway';
  const getDate = () => '12/06/24';
  const getDescription = (asset) => asset.title === 'The Rules of Attraction'
    ? "We're living in the golden age of sales enablement. Today's client-facing professionals are equipped with a dizzying array of tools designed to turn outreach into a science..."
    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nulla et est dictum bibendum. Proin a sem nec justo....';
  const getAuthor = () => 'Author name';
  const getReadTime = () => 5;

  const assetList = tab === 'newsroom' ? newsroomAssets : exchangeAssets;

  // Helper to get a random date between Aug 1 of last year and today
  function getRandomDate() {
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year - 1, 7, 1); // Aug is month 7 (0-indexed)
    const end = now;
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const d = new Date(randomTime);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const shortYear = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${shortYear}`;
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: '48px 0 32px 0' }}>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 28, textAlign: 'left', fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '-0.01em' }}>Feed</h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, gap: 32 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: '#18171A', fontFamily: 'Inter, Arial, sans-serif' }}>
              Recommended topics
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['Tech', 'Business', 'Research'].map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-block',
                    background: '#f3f3f3',
                    color: '#222',
                    fontSize: 15,
                    fontWeight: 500,
                    borderRadius: 20,
                    padding: '7px 20px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    marginBottom: 4,
                    cursor: 'pointer',
                    transition: 'background 0.18s, color 0.18s',
                    userSelect: 'none',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#e0e0e0'; e.currentTarget.style.color = '#18171A'; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#f3f3f3'; e.currentTarget.style.color = '#222'; }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
            <input
              type="text"
              placeholder="Search assets, companies, or tags..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                fontSize: 15,
                fontFamily: 'Inter, Arial, sans-serif',
                outline: 'none',
                boxShadow: '0 1px 4px rgba(51,51,51,0.04)',
                background: '#fafbfc',
                color: '#18171A',
                transition: 'border 0.18s, box-shadow 0.18s',
                marginTop: 0,
                display: 'block',
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', gap: 32, height: 38, alignItems: 'flex-end' }}>
            <button
              onClick={() => setTab('newsroom')}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, Arial, sans-serif',
                fontSize: 14,
                fontWeight: tab === 'newsroom' ? 600 : 400,
                color: tab === 'newsroom' ? '#18171A' : '#b0b0b0',
                cursor: 'pointer',
                padding: 0,
                borderBottom: tab === 'newsroom' ? '3px solid #18171A' : '3px solid transparent',
                transition: 'color 0.18s, border-bottom 0.18s',
                height: 36,
                marginBottom: 0,
              }}
            >
              Newsroom
            </button>
            <button
              onClick={() => setTab('exchange')}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, Arial, sans-serif',
                fontSize: 14,
                fontWeight: tab === 'exchange' ? 600 : 400,
                color: tab === 'exchange' ? '#18171A' : '#b0b0b0',
                cursor: 'pointer',
                padding: 0,
                borderBottom: tab === 'exchange' ? '3px solid #18171A' : '3px solid transparent',
                transition: 'color 0.18s, border-bottom 0.18s',
                height: 36,
                marginBottom: 0,
              }}
            >
              Exchange
            </button>
          </div>
          <div style={{ width: '100%', height: 1, background: '#ededed', marginTop: '-1px', marginBottom: 12 }} />
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        {assetList.map((asset, idx) => (
          <FeedCard
            key={asset.title + idx}
            org={getOrg()}
            date={getRandomDate()}
            title={asset.title}
            description={getDescription(asset)}
            author={getAuthor()}
            readTime={Math.floor(Math.random() * 20) + 1}
            image={asset.image}
            onClick={() => onOpenAsset(asset.file)}
            onShare={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState("/pdfs/Doorway - Overview.pdf");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [enterPressed, setEnterPressed] = useState(false);
  const [lastTrigger, setLastTrigger] = useState("");
  const [pdfHovered, setPdfHovered] = useState(false);
  const [pdfRect, setPdfRect] = useState(null);
  const pdfRef = useRef();
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'asset-viewer', or 'feed'

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
  // Handler to go to feed page
  const handleGoToFeed = () => setCurrentPage('feed');
  // Handler to go to landing page
  const handleGoToLanding = () => setCurrentPage('landing');

  if (currentPage === 'feed') {
    return <Feed 
      onGoToAssetViewer={handleEnterAssetViewer} 
      onOpenAsset={(file) => { setSelectedPdf(file); setCurrentPage('asset-viewer'); }}
    />;
  }
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
        {currentPage === 'asset-viewer' && (
          <button
            className="sidebar-home-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 500,
              color: '#222',
              margin: '24px 0 8px 8px',
              padding: 0
            }}
            onClick={handleGoToFeed}
          >
            <div className="sidebar-home-btn-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 10.5V19a1.5 1.5 0 0 0 1.5 1.5H9V15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5.5h3.5A1.5 1.5 0 0 0 20 19v-8.5L12 4Z" fill="#18171A"/>
                <rect x="10" y="15" width="4" height="5" rx="1" fill="#fff"/>
              </svg>
            </div>
          </button>
        )}
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
            {filteredNewsroomAssets
              .filter(asset => asset.file !== selectedPdf)
              .map(asset => (
                <AssetCard
                  key={asset.title}
                  image={asset.image}
                  type={asset.type}
                  title={asset.title}
                  onSummarise={() => alert("Summarise Newsroom Asset")}
                  onClick={() => handlePdfSelection(asset.file)}
                  showSummarise={true}
                />
              ))}
          </div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 6 }}>
              {/* Material Design lock open filled icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
                <rect x="4" y="9" width="16" height="11" rx="3" fill="#000"/>
                <circle cx="12" cy="15" r="2" fill="#fff"/>
                <path d="M8 9V7a4 4 0 1 1 8 0" stroke="#000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              </svg>
              Exchange
            </span>
          </div>
          <div className="sidebar-section-cards">
            {exchangeAssets.filter(asset => asset.title !== "Doorway FAQs").map(asset => (
              <AssetCard
                key={asset.title}
                image={asset.image}
                type={asset.type}
                title={asset.title}
                selected={selectedPdf === asset.file}
                onSummarise={() => alert("Summarise Exchange Asset")}
                onClick={() => handlePdfSelection(asset.file)}
                showSummarise={false}
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