import React from 'react';

const Workspace = ({ figures, selectedFigures, handleFiguresClick }) => {
    return (
        <div className="workspace">
            {figures.map((figure, id) => {
                if (figure.type === 0) {
                    return (
                        <div
                            style={{ backgroundColor: figure.color }}
                            key={id}
                            className={`newRectangle ${
                                selectedFigures === id ? 'selected' : ''
                            }`}
                            onClick={() => handleFiguresClick(id)}
                        ></div>
                    );
                } else {
                    return (
                        <div
                            key={id}
                            className={`triangleContainer ${
                                selectedFigures === id ? 'selected' : ''
                            }`}
                            onClick={() => handleFiguresClick(id)}
                        >
                            <div
                                className="newTriangle"
                                style={{ borderBottomColor: figure.color }}
                            ></div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Workspace;
