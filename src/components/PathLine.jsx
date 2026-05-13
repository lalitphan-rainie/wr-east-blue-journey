import React from 'react';

const PathLine = ({ from, to }) => {
  // from and to are island objects with x and y properties
  if (!from || !to) {
    return null;
  }

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Allows clicks to pass through
        zIndex: 1, // Make sure it's above the map but below pins
      }}
    >
      <line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke="red"
        strokeWidth="2"
        strokeDasharray="5, 5" // This creates the dashed effect
      />
    </svg>
  );
};

export default PathLine;