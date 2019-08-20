import React, {
	useState,
	useEffect
} from 'react';
// import Gist from 'react-gist';

export default function HW1Route() {
	return (
		<div>
			<h1>Tarea 2</h1>
			<h4>
				Realizar un programa que pueda reconocer palabras de los siguientes lenguajes: <br/>
				1) El lenguaje de todas las cadenas que constan de n ceros seguidos de n unos para cualquier n ≥  0.<br/>
					&nbsp;&nbsp;{`{λ, 01, 0011, 000111, …}`}<br/>
				2) El conjunto de cadenas formadas por el mismo número de ceros que de unos:<br/>
					&nbsp;&nbsp;{`{λ, 01, 10, 0011, 0101, 1001, …}`}<br/>
			</h4>

			<input 
				className="input-field"
				type="number"
			/>
		</div>
	);
}