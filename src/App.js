import React, { useState } from "react";
import PDFViewer from "./PDFViewer";
import AssetCard from "./AssetCard";
import UserDetails from "./UserDetails";
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

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState(newsroomAssets[0].file);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`app-layout ${isExpanded ? 'expanded' : ''}`}>
      <aside className={`sidebar ${isExpanded ? 'hidden' : ''}`}>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Newsroom</div>
          <div className="sidebar-section-cards">
            {newsroomAssets.map(asset => (
              <AssetCard
                key={asset.title}
                image={asset.image}
                type={asset.type}
                title={asset.title}
                selected={selectedPdf === asset.file}
                onSummarise={() => alert("Summarise Newsroom Asset")}
                onClick={() => setSelectedPdf(asset.file)}
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
                onClick={() => setSelectedPdf(asset.file)}
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
        />
      </main>
    </div>
  );
} 