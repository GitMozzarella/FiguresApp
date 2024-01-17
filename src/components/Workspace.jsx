import React, { useEffect, useRef, useState } from 'react';
import Rectangle from './figures/Rectangle';
import Triangle from './figures/Triangle';

const Workspace = ({
  figures,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
}) => {
  const workspaceRef = useRef(null);

  useEffect(() => {
    const figuresOutsideClick = (e) => {
      const isClickOutside = e.target.classList.contains('workspace');
      isClickOutside ? setSelectedFigures(null) : null;
    };
    const workspace = workspaceRef.current;
    workspace.addEventListener('click', figuresOutsideClick);
    return () => {
      workspace.removeEventListener('click', figuresOutsideClick);
    };
  }, [setSelectedFigures]);

  useEffect(() => {
    const handleDelete = (e) => {
      e.key === 'Delete' && selectedFigures !== null
        ? (setSelectedFigures(null), deleteFigure())
        : null;
    };

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
            workspaceRef={workspaceRef}
          />
        ) : (
          <Triangle
            figure={figure}
            id={figure.id}
            selectedFigures={selectedFigures}
            setSelectedFigures={setSelectedFigures}
            key={figure.id}
            deleteFigure={deleteFigure}
            workspaceRef={workspaceRef}
          />
        ),
      )}
    </div>
  );
};

export default Workspace;
