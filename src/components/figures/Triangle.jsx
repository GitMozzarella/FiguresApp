import React from 'react';

const Triangle = ({
  figure,
  id,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
}) => (
  <div
    key={id}
    className={`triangleContainer ${selectedFigures === id ? 'selected' : ''}`}
    onClick={() => setSelectedFigures(id)}
    onKeyDown={(e) => (e.key === 'Delete' ? deleteFigure() : null)}
  >
    <div
      className="newTriangle"
      style={{ borderBottomColor: figure.color }}
    ></div>
  </div>
);

export default Triangle;
