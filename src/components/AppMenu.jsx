import React from 'react';

const AppMenu = ({ addFigures, fillColor, setFillColor }) => {
    return (
        <div className="app-menu">
            <div className="shapes">
                <h2>Shapes</h2>
                <div className="figures">
                    <div
                        className="rectangle"
                        onClick={() => addFigures(0)}
                    ></div>
                    <div
                        className="triangleblock"
                        onClick={() => addFigures(1)}
                    >
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
                        value={fillColor}
                        onChange={(e) => setFillColor(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppMenu;
