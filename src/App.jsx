import React, { useState } from 'react'
import './App.css'
import AppMenu from './components/AppMenu'
import Workspace from './components/Workspace'

function App() {
	const [rectangles, setRectangles] = useState([])
	const [triangles, setTriangles] = useState([])
	const [selectedRectangle, setSelectedRectangle] = useState(-1)
	const [selectedTriangle, setSelectedTriangle] = useState(-1)

	const addRectangle = () => {
		setRectangles([...rectangles, rectangles.length])
	}

	const addTriangle = () => {
		setTriangles([...triangles, triangles.length])
	}

	const handleRectangleClick = id => {
		setSelectedRectangle(id)
		setSelectedTriangle(null)
	}
	const handleTriangleClick = id => {
		setSelectedTriangle(id)
		setSelectedRectangle(null)
	}

	return (
		<div className='App'>
			<div className='container'>
				<div className='wrapper'>
					<AppMenu addRectangle={addRectangle} addTriangle={addTriangle} />
					<Workspace
						rectangles={rectangles}
						triangles={triangles}
						selectedRectangle={selectedRectangle}
						selectedTriangle={selectedTriangle}
						onRectangleClick={handleRectangleClick}
						onTriangleClick={handleTriangleClick}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
