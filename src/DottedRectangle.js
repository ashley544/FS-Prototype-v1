import React from 'react';
import './DottedRectangle.css';

export default function DottedRectangle({ children, style }) {
  return (
    <div className="dotted-rectangle" style={style}>
      {children}
    </div>
  );
} 