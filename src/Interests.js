import React from 'react';
import './Interests.css';

export default function Interests() {
  const interests = [
    { asset: 'Macro Infra Market Fundamentals', pageNumber: '54' },
    { asset: 'BX Jupiter Industrial Investment', pageNumber: '41' },
    { asset: 'KKR Digital Infra Strategy', pageNumber: '38' },
  ];

  return (
    <div className="interests">
      <div className="interests-header">
        <h2 className="interests-title">Interests</h2>
        <div className="interests-divider"></div>
      </div>
      <div className="interests-table-container">
        <table className="interests-table">
          <thead>
            <tr>
              <th className="interests-table-header">Topic</th>
              <th className="interests-table-header">Contacts</th>
            </tr>
          </thead>
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
