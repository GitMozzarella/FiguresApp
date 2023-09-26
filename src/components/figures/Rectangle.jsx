import React from 'react';

const Rectangle = ({
  figure,
  id,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
}) => (
  <div
    style={{ backgroundColor: figure.color }}
    key={id}
    className={`newRectangle ${selectedFigures === id ? 'selected' : ''}`}
    onClick={() => setSelectedFigures(id)}
    onKeyDown={(e) => (e.key === 'Delete' ? deleteFigure() : null)}
  ></div>
);

export default Rectangle;
