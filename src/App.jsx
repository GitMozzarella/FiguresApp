import React, { useEffect, useState } from 'react';
import './App.css';
import AppMenu from './components/AppMenu';
import Workspace from './components/Workspace';

function App() {
    const initialFigures = JSON.parse(localStorage.getItem('figures'));
    const [selectedFigures, setSelectedFigures] = useState(null);

    const [figures, setFigures] = useState(
        initialFigures ? initialFigures : [],
    );

    const [fillColor, setFillColor] = useState('#353535');
    const addFigures = (type) => {
        setFigures([
            ...figures,
            { type, id: figures.length, color: '#353535', x: 0, y: 0 },
        ]);
        setSelectedFigures(figures.length);
    };

    const handleFiguresClick = (id) => {
        setSelectedFigures(id);
    };

    useEffect(() => {
        if (fillColor === figures[selectedFigures]?.color) return;
        setFillColor(figures[selectedFigures]?.color);
    }, [selectedFigures]);

    useEffect(() => {
        setFigures((figures) => {
            return figures.map((figure) => {
                if (figure.id === selectedFigures) {
                    return { ...figure, color: fillColor };
                }
                return figure;
            });
        });
    }, [fillColor, setFillColor]);

    useEffect(() => {
        localStorage.setItem('figures', JSON.stringify(figures));
    }, [figures]);

    return (
        <div className="App">
            <div className="container">
                <div className="wrapper">
                    <AppMenu
                        addFigures={addFigures}
                        fillColor={fillColor}
                        setFillColor={setFillColor}
                    />
                    <Workspace
                        figures={figures}
                        handleFiguresClick={handleFiguresClick}
                        selectedFigures={selectedFigures}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
