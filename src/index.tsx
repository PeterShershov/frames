import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import './reset.st.css';

const container = document.createElement('div');
container.style.height = '100%';
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.body.appendChild(container)
);
