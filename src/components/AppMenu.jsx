import React from 'react'

const AppMenu = () => {
	return (
		<div className='app-menu'>
			<div className='shapes'>
				<h2>Shapes</h2>
				<div className='figures'>
					<div className='rectangle'></div>
					<div className='triangleblock'>
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
