import React from 'react'
import './App.css'
import AppMenu from './components/AppMenu'
import Workspace from './components/Workspace'

function App() {
	return (
		<div className='App'>
			<div className='container'>
				<div className='wrapper'>
					<AppMenu />
					<Workspace />
				</div>
			</div>
		</div>
	)
}

export default App
