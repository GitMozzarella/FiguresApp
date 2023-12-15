import React, { useEffect, useRef, useState } from 'react';

const Rectangle = ({
  figure,
  id,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
  workspaceRef
}) => {
  const itemRef = useRef(null);
  const storedPosition = JSON.parse(localStorage.getItem(`rectangle_${id}_position`));
  const initialX = storedPosition ? storedPosition.x : Math.floor(Math.random() * 900) + 1;
  const initialY = storedPosition ? storedPosition.y : Math.floor(Math.random() * 600) + 80;

  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = e => {
      if (!dragging) return;

      let newX = Math.min(
        Math.max(e.clientX - offset.x, 0),
        workspaceRef.current.offsetWidth - itemRef.current.offsetWidth
      );

      let newY = Math.min(
        Math.max(e.clientY - offset.y, 0),
        workspaceRef.current.offsetHeight - itemRef.current.offsetHeight
      );

      setPosition({ x: newX, y: newY });
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

  const handleMouseDown = e => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    localStorage.setItem(`rectangle_${id}_position`, JSON.stringify(position));
  }, [position, id]);

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: figure.color,
        cursor: dragging ? 'grabbing' : 'pointer',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      ref={itemRef}
      key={id}
      className={`newRectangle ${selectedFigures === id ? 'selected' : ''}`}
      onClick={() => setSelectedFigures(id)}
      onKeyDown={e => (e.key === 'Delete' ? deleteFigure() : null)}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

export default Rectangle;
