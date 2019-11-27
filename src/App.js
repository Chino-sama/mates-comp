import React, {
	// useState,
	// useEffect
} from 'react';
import './App.css';
import AppRouter from './Router';

function App() {
	return (
		<div className="app-container">
			<AppRouter />
			<footer>
				<a className='github-link' href="https://github.com/Chino-sama/mates-comp" target="_blank"></a>
				Github para código fuente
				<br/>
				<br/>
				Roberto Javier Huerta González - A01273164
			</footer>
		</div>
	);
}

export default App;
