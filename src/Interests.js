import React from 'react';
import './Interests.css';

export default function Interests() {
  const interests = [
    { asset: 'Q4 Market Analysis Report', pageNumber: '12' },
    { asset: 'Investment Strategy Document', pageNumber: '8' },
    { asset: 'Risk Assessment Framework', pageNumber: '15' },
  ];

  return (
    <div className="interests">
      <div className="interests-header">
        <h2 className="interests-title">Interests</h2>
      </div>
      <div className="interests-table-container">
        <table className="interests-table">
          <tbody>
            {interests.map((interest, index) => (
              <tr key={index} className="interests-row">
                <td className="interests-cell asset-cell">{interest.asset}</td>
                <td className="interests-cell page-cell">{interest.pageNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
