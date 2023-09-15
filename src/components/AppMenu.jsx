import React from 'react'

const AppMenu = ({ addRectangle, addTriangle }) => {
	return (
		<div className='app-menu'>
			<div className='shapes'>
				<h2>Shapes</h2>
				<div className='figures'>
					<div className='rectangle' onClick={addRectangle}></div>
					<div className='triangleblock' onClick={addTriangle}>
						<div className='triangle'>
							<div className='triangle-fill'></div>
						</div>
					</div>
				</div>
			</div>
			<div className='style'>
				<h2>Style</h2>
				<div className='style-props'>
					<span className='fill'>Fill</span>
					<input className='color-picker' type='color' />
				</div>
			</div>
		</div>
	)
}

export default AppMenu
