import React, {
	useState,
	useEffect
} from 'react';
import './App.css';

function App() {
	const [nSize, setNSize] = useState('');
	const [matrixA, setMatrixA] = useState([]);
	const [matrixB, setMatrixB] = useState([]);
	// const matrixA = null;
	// const matrixB = null;

	const changeMatrixValue = ({ target }, matrix, index1, index2) => {
		if (matrix === 'matrixA') {
			let newMatrixVals = matrixA.slice();
			newMatrixVals[index1][index2] = target.value;
			setMatrixA(newMatrixVals);
		} else {
			let newMatrixVals = matrixB.slice();
			newMatrixVals[index1][index2] = target.value;
			setMatrixB(newMatrixVals);
		}
	};
 
	const renderMatrixA = 
		matrixA.map((item, index1) => 
			<div key={index1}>
				{
					item.map((item2, index2) => {
						return (
							<div
								className={'inline matrixContainer'}
								key={`${index1}${index2}`}
							>
								<input 
									className="matrix-input"
									type="number"
									value={item2}
									onChange={(event) => changeMatrixValue(event, 'matrixA', index1, index2)}
								/>
							</div>
					)})
				}
			</div>
		);

	const renderMatrixB = 
		matrixB.map((item, index1) => 
			<div key={index1}>
				{
					item.map((item2, index2) => {
						return (
							<div
								className={'inline matrixContainer'}
								key={`${index1}${index2}`}
							>
								<input 
									className="matrix-input"
									type="number"
									value={matrixB[index1][index2]}
									onChange={(event) => changeMatrixValue(event, 'matrixB', index1, index2)}
								/>
							</div>
					)})
				}
			</div>
		);

	const calculate = () => {

	}

	useEffect(() => {
		const n = parseInt(nSize);
		if (n > 0) {
			setMatrixA(Array(n).fill(0).map(x => Array(n).fill(0)));
			setMatrixB(Array(n).fill(0).map(x => Array(n).fill(0)));
		} else {
			setMatrixA([]);
			setMatrixB([]);
		}
	}, [nSize]);

	return (
		<div className="app-container">
			<h1>Tarea 1</h1>
			<h3>Desarrollar un programa que lea dos matrices de n × n, las convierta en forma de vector de  dimensiones n2 × 1, y llevar a cabo la suma, resta y multiplicación entre ellas a partir de su representación unidimensional. Posteriormente, a los resultados de las operaciones matriciales, denotados como vectores, convertirlos a su correspondiente representación bidimensional y mostrar los resultados en pantalla. Aplique el método de la fila principal para llevar a cabo las conversiones de forma bidimensional a forma unidimensional y viceversa, así como en el proceso de las operaciones matriciales de suma, resta y multiplicación.</h3>
			<input 
				className="input-field"
				type="number"
				placeholder='Tamaño n de las matrices'
				onChange={(event) => event.target.value.length > 1 ? null: setNSize(event.target.value)}
				value={nSize}
			/>
			{!!matrixA.length && (
				<div>
					<div className='inline marginRight'>
						<h3>Matriz A</h3>
						{renderMatrixA}
					</div>
					<div className='inline marginRight'>
						<h3>Matriz B</h3>
						{renderMatrixB}
					</div>
					<button
						onClick={calculate}
					>
						¡Calcular!
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
