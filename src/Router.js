import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HW1Route from './Routes/HW1Route';
import HW2Route from './Routes/HW2Route';
import HW3Route from './Routes/HW3Route';
import HW6Route from './Routes/HW6Route';

const HW1 = () => <HW1Route />
const HW2 = () => <HW2Route />
const HW3 = () => <HW3Route />
const HW6 = () => <HW6Route />

export default function AppRouter () {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/tarea1">Tarea 1</Link>
						</li>
						<li>
							<Link to="/tarea2">Tarea 2</Link>
						</li>
						<li>
							<Link to="/tarea3">Tarea 3</Link>
						</li>
						<li>
							<Link to="/tarea6">Tarea 6</Link>
						</li>
					</ul>
				</nav>

				<Route path="/tarea1" component={HW1} />
				<Route path="/tarea2" component={HW2} />
				<Route path="/tarea3" component={HW3} />
				<Route path="/tarea6" component={HW6} />
			</div>
		</Router>
	);
}