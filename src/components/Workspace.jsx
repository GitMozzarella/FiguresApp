import React from 'react'

const Workspace = ({
	rectangles,
	triangles,
	selectedRectangle,
	selectedTriangle,
	onRectangleClick,
	onTriangleClick
}) => {
	return (
		<div className='workspace'>
			{rectangles.map((_, id) => (
				<div
					key={id}
					className={`newRectangle ${
						selectedRectangle === id ? 'selected' : ''
					}`}
					onClick={() => onRectangleClick(id)}
				></div>
			))}

			{triangles.map((_, id) => (
				<div
					key={id}
					className={`triangleContainer ${
						selectedTriangle === id ? 'selected' : ''
					}`}
					onClick={() => onTriangleClick(id)}
				>
					<div className='newTriangle'></div>
				</div>
			))}
		</div>
	)
}

export default Workspace
