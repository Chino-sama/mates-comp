import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HW1Route from './Routes/HW1Route';
import HW2Route from './Routes/HW2Route';

const HW1 = () => <HW1Route />
const HW2 = () => <HW2Route />

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
					</ul>
				</nav>

				<Route path="/tarea1" component={HW1} />
				<Route path="/tarea2" component={HW2} />
			</div>
		</Router>
	);
}