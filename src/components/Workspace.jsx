import React, { useEffect, useRef , useState} from 'react';
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
	const isClickOutside = e.target.classList.contains('workspace');

	isClickOutside ? setSelectedFigures(null) : null;
 };

  useEffect(() => {
    const workspace = workspaceRef.current;
    workspace.addEventListener('click', figuresOutsideClick);

    return () => {
      workspace.removeEventListener('click', figuresOutsideClick);
    };
  }, [setSelectedFigures]);

const handleDelete = (e) => {
  e.key === 'Delete' && selectedFigures !== null ? (
    setSelectedFigures(null),
    deleteFigure()
  ) : null;
};


  useEffect(() => {
    window.addEventListener('keydown', handleDelete);
    return () => {
      window.removeEventListener('keydown', handleDelete);
    };
  }, [selectedFigures, figures]);

console.log(workspaceRef);



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
