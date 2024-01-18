import { useEffect, useState } from 'react';

const useDrag = (initialPosition, workspaceRef) => {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;
      if (workspaceRef.current) {
        const maxX = workspaceRef.current.offsetWidth - offset.x;
        const maxY = workspaceRef.current.offsetHeight - offset.y;
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

  return {
    position,
    dragging,
    handleMouseDown,
  };
};

export default useDrag;
