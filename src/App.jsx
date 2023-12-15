import React, { useEffect, useState } from 'react';
import './App.css';
import AppMenu from './components/AppMenu';
import Workspace from './components/Workspace';
export const initialColor = '#353535';


function App() {
	

  const itemLC = 'figures';
  const initialFigures = JSON.parse(localStorage.getItem(itemLC));

  const [selectedFigures, setSelectedFigures] = useState(null);
  const [figures, setFigures] = useState(
    Array.isArray(initialFigures) ? initialFigures : [],
  );
  const [fillColor, setFillColor] = useState(initialColor);

  const addFigures = (type) => {
    const generateId = Date.now() + Math.round(Math.random() * 1000);
    setFigures((figures) => [
      ...figures,
      { type, id: generateId, color: initialColor, x: 0, y: 0 },
    ]);
    setSelectedFigures(generateId);
  };
  const deleteFigure = () => {
    selectedFigures !== null
      ? setFigures((figures) => figures.filter((x) => x.id !== selectedFigures))
      : null;
    setSelectedFigures(null);
  };

  useEffect(() => {
    const findId = figures.find((x) => x.id === selectedFigures);
    fillColor === findId?.color ? null : setFillColor(findId?.color);
  }, [selectedFigures]);

  useEffect(() => {
    setFigures((figures) =>
      figures.map((x) =>
        x.id === selectedFigures ? { ...x, color: fillColor } : x,
      ),
    );
  }, [fillColor, setFillColor]);

  useEffect(() => {
    localStorage.setItem(itemLC, JSON.stringify(figures));
  }, [figures]);

  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <AppMenu
            figures={figures}
            addFigures={addFigures}
            fillColor={fillColor}
            setFillColor={setFillColor}
            selectedFigures={selectedFigures}
				initialColor={initialColor}
          />
          <Workspace
            figures={figures}
            setSelectedFigures={setSelectedFigures}
            selectedFigures={selectedFigures}
            deleteFigure={deleteFigure}
				setFigures={  setFigures}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
