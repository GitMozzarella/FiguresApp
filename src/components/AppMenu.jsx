import React from 'react';
import initialColor from '../App.jsx'

const AppMenu = ({
  addFigures,
  fillColor,
  setFillColor,
  figures,
  selectedFigures,
}) => {
  const rectangle = 0;
  const triangle = 1;
  const isDisabled = figures.length === 0;

  return (
    <div className="app-menu">
      <div className="shapes">
        <h2>Shapes</h2>
        <div className="figures">
          <div
            className="rectangle"
            onClick={() => addFigures(rectangle)}
          ></div>
          <div className="triangleblock" onClick={() => addFigures(triangle)}>
            <div className="triangle">
              <div className="triangle-fill"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="style">
        <h2>Style</h2>
        <div className="style-props">
          <span className="fill">Fill</span>
          <input
            className="color-picker"
            type="color"
            value={fillColor || initialColor}
            onChange={(e) => setFillColor(e.target.value)}
            disabled={!selectedFigures || isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default AppMenu;
