import React, { useEffect, useRef } from 'react';
import useDrag from './useDrag';

const Triangle = ({
  figure,
  id,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
  workspaceRef,
}) => {
  const itemRef = useRef(null);
  const figureKey = `triangle_${id}_position`;
  const storedPosition = JSON.parse(localStorage.getItem(figureKey));

  const initialX = storedPosition
    ? storedPosition.x
    : Math.floor(Math.random() * 900) + 1;
  const initialY = storedPosition
    ? storedPosition.y
    : Math.floor(Math.random() * 600) + 80;

  const { position, dragging, handleMouseDown } = useDrag(
    { x: initialX, y: initialY },
    workspaceRef,
  );
  useEffect(() => {
    localStorage.setItem(figureKey, JSON.stringify(position));
  }, [position, figureKey]);

  return (
    <div
      style={{
        position: 'absolute',
        cursor: dragging ? 'grabbing' : 'pointer',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      ref={itemRef}
      key={id}
      className={`triangleContainer ${
        selectedFigures === id ? 'selected' : ''
      }`}
      onClick={() => setSelectedFigures(id)}
      onKeyDown={(e) => (e.key === 'Delete' ? deleteFigure() : null)}
      onMouseDown={handleMouseDown}
    >
      <div
        className="newTriangle"
        style={{ borderBottomColor: figure.color }}
      ></div>
    </div>
  );
};

export default Triangle;
