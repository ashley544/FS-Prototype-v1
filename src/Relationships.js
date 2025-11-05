import React, { useState } from 'react';
import './Relationships.css';

export default function Relationships({ exchangeAssets = [], contactsData = [], onNavigateToPage }) {
  const [showAll, setShowAll] = useState(false);
  
  // Get contact names from contactsData
  const contacts = contactsData.map(contact => contact.name);
  
  // Match contacts with relationships - use first few contacts from contactsData
  const relationshipContacts = contacts.slice(0, 6);

  const topics = [
    'Market Analysis',
    'Portfolio Management',
    'Risk Management',
    'Analytics',
    'Client Relations',
    'Regulatory',
  ];

  // Create relationships using exchange assets
  // First row should always be 'BX Digital Infrastructure Strategy'
  const relationships = relationshipContacts.map((contact, index) => {
    let asset;
    if (index === 0) {
      // First row always gets 'BX Digital Infrastructure Strategy'
      asset = 'BX Digital Infrastructure Strategy';
    } else {
      // Other rows cycle through exchangeAssets, starting from index 0
      asset = exchangeAssets[(index - 1) % exchangeAssets.length]?.title || 'Asset';
    }
    
    return {
      contact,
      asset,
      topic: topics[index % topics.length],
    };
  });
  
  const handleRowClick = (contactName) => {
    if (onNavigateToPage) {
      onNavigateToPage('contacts', contactName);
    }
  };

  const handleAssetClick = (e, assetTitle) => {
    e.stopPropagation(); // Prevent row click from triggering
    if (onNavigateToPage) {
      onNavigateToPage('assets', null, assetTitle);
    }
  };

  // Hide "David Thompson" (4th row) - show 3 rows when collapsed, 4 when expanded (skipping David)
  const filteredRelationships = relationships.filter((_, index) => index !== 3); // Remove David at index 3
  const visibleRelationships = showAll ? filteredRelationships : filteredRelationships.slice(0, 3);
  const hasMore = filteredRelationships.length > 3;

  return (
    <div className="relationships">
      <div className="relationships-header">
        <h2 className="relationships-title">Relationships</h2>
        <div className="relationships-divider"></div>
      </div>
      <div className="relationships-table-container">
        <table className="relationships-table">
          <thead>
            <tr>
              <th className="table-header">Contact</th>
              <th className="table-header">Asset</th>
              <th className="table-header">Topic</th>
            </tr>
          </thead>
          <tbody>
            {visibleRelationships.map((relationship, index) => (
              <tr 
                key={index} 
                className="table-row"
                onClick={() => handleRowClick(relationship.contact)}
              >
                <td className="table-cell contact-cell">
                  <div className="contact-cell-wrapper">
                    <div className="relationships-gradient-border"></div>
                    <span>{relationship.contact}</span>
                  </div>
                </td>
                <td className="table-cell asset-cell">
                  <span 
                    className="asset-link"
                    onClick={(e) => handleAssetClick(e, relationship.asset)}
                  >
                    {relationship.asset}
                  </span>
                </td>
                <td className="table-cell topic-cell">{relationship.topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasMore && (
          <div className="relationships-scroll-container">
            <button 
              className="relationships-scroll-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show ${filteredRelationships.length - 3} More`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
