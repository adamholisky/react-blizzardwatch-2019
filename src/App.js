import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header.js';
import River from './River.js';
import Single from './Single.js';
import './App.css';

class App extends Component {
	render() {
		return (
		<Router>
			<div>
				<Header />
				<section className="content">
					<Route path="/" exact component={River} />
					<Route path="/:slug" component={Single} />
				</section>
			</div>
		</Router>
		);
	}
}

export default App;