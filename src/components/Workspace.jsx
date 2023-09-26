import React, { useEffect, useRef } from 'react';
import Rectangle from './figures/Rectangle';
import Triangle from './figures/Triangle';

const Workspace = ({
  figures,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
}) => {
  const workspaceRef = useRef(null);

  const figuresOutsideClick = (e) => {
    const isClickOutside =
      !e.target.classList.contains('newRectangle') &&
      !e.target.classList.contains('triangleContainer');

    if (isClickOutside) {
      setSelectedFigures(null);
    }
  };

  useEffect(() => {
    const workspace = workspaceRef.current;
    workspace.addEventListener('click', figuresOutsideClick);

    return () => {
      workspace.removeEventListener('click', figuresOutsideClick);
    };
  }, [setSelectedFigures]);

  const handleDelete = (e) => {
    if (e.key === 'Delete' && selectedFigures !== null) {
      const newFigures = figures.filter(
        (figure) => figure.id !== selectedFigures,
      );
      setSelectedFigures(null);
      deleteFigure();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleDelete);
    return () => {
      window.removeEventListener('keydown', handleDelete);
    };
  }, [selectedFigures, figures]);

  return (
    <div className="workspace" ref={workspaceRef}>
      {figures.map((figure) =>
        figure.type === 0 ? (
          <Rectangle
            figure={figure}
            id={figure.id}
            selectedFigures={selectedFigures}
            setSelectedFigures={setSelectedFigures}
            key={figure.id}
            deleteFigure={deleteFigure}
          />
        ) : (
          <Triangle
            figure={figure}
            id={figure.id}
            selectedFigures={selectedFigures}
            setSelectedFigures={setSelectedFigures}
            key={figure.id}
            deleteFigure={deleteFigure}
          />
        ),
      )}
    </div>
  );
};

export default Workspace;
