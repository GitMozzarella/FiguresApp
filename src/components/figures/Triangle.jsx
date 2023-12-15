import React, { useEffect, useRef, useState } from 'react';

const Triangle = ({
  figure,
  id,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
  workspaceRef
}) => {
  const itemRef = useRef(null);
  const storedPosition = JSON.parse(localStorage.getItem(`triangle_${id}_position`));

  const initialX = storedPosition ? storedPosition.x : Math.floor(Math.random() * 900) + 1;
  const initialY = storedPosition ? storedPosition.y : Math.floor(Math.random() * 600) + 80;

  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;

      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      if (itemRef.current && workspaceRef.current) {
        const maxX = workspaceRef.current.offsetWidth - itemRef.current.offsetWidth;
        const maxY = workspaceRef.current.offsetHeight - itemRef.current.offsetHeight;

        newX = Math.min(Math.max(newX, 0), maxX);
        newY = Math.min(Math.max(newY, 0), maxY);
      }

      setPosition({
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset, workspaceRef]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    localStorage.setItem(`triangle_${id}_position`, JSON.stringify(position));
  }, [position, id]);

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
      className={`triangleContainer ${selectedFigures === id ? 'selected' : ''}`}
      onClick={() => setSelectedFigures(id)}
      onKeyDown={(e) => (e.key === 'Delete' ? deleteFigure() : null)}
      onMouseDown={handleMouseDown}
    >
      <div className="newTriangle" style={{ borderBottomColor: figure.color }}></div>
    </div>
  );
};

export default Triangle;
