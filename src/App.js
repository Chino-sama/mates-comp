import React, {
	useState,
	useEffect
} from 'react';
import './App.css';
import Gist from 'react-gist';

function App() {
	const [nSize, setNSize] = useState('');
	const [matrixA, setMatrixA] = useState([]);
	const [matrixB, setMatrixB] = useState([]);
	const [sumMatrix, setSumMatrix] = useState([]);
	const [subsMatrix, setSubsMatrix] = useState([]);
	const [multMatrix, setMultMatrix] = useState([]);
	const [linearForms, setLinearForms] = useState({});
	const [showGist, setShowGist] = useState(false);

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
 
	const renderArray = (array) => {
		let text = '[';
		array.forEach((item, index) => {
			text += index + 1 === array.length ?  `${item}]`: `${item}, `;
		});
		return text;
	}

	const renderMatrix = (matrix, matrixName, disabled) => {
		let renderedMatrix = matrix.map((item, index1) => 
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
									disabled={disabled}
									type="number"
									value={item2}
									onChange={(event) => changeMatrixValue(event, matrixName, index1, index2)}
								/>
							</div>
					)})
				}
			</div>
		);
		return renderedMatrix;
	}

	const calculate = () => {
		//Define vatiables lineal and matrix where operations are going to be saved
		let linealA = [];
		let linealB = [];
		let sum = [];
		let subs = [];
		let mult = [];
		//slice to make a copy of the original matrix
		let newSumMatrix = sumMatrix.slice();
		let newSubsMatrix = subsMatrix.slice();
		let newMultMatrix = multMatrix.slice();
		let multCount = 0;
		//parseInt because is a string that was gotten from input
		let n = parseInt(nSize);

		// Matrix to linear array
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				linealA[i * n + j] = parseInt(matrixA[i][j]);
				linealB[i * n + j] = parseInt(matrixB[i][j]);
			}
		}
	
		//Do operations in linear form
		for (let i = 0; i < n * n; i++) {
			//sum
			sum[i] = linealA[i] + linealB[i];
			//substraction
			subs[i] = linealA[i] - linealB[i];
			//multiplication
			for (let j = Math.floor(i/ n) * n, k = 0; j < n + Math.floor(i/ n) * n; j++, k += n) {
				multCount += linealA[j] * linealB[k + i % n];
			}
			mult[i] = multCount;
			multCount = 0;
		}

		//Return lineal operations to matrix form
		for (let i = 0; i < n * n; i++) {
			newSumMatrix[Math.floor(i / n)][i % n] = sum[i];
			newSubsMatrix[Math.floor(i / n)][i % n] = subs[i];
			newMultMatrix[Math.floor(i / n)][i % n] = mult[i];
		}

		//set results to state variables
		setLinearForms({
			linealA,
			linealB,
			sum,
			subs,
			mult
		});
		setSumMatrix(newSumMatrix)
		setSubsMatrix(newSubsMatrix)
		setMultMatrix(newMultMatrix)
	}

	useEffect(() => {
		const n = parseInt(nSize);
		if (n > 0) {
			setMatrixA(Array(n).fill(0).map(x => Array(n).fill(0)));
			setMatrixB(Array(n).fill(0).map(x => Array(n).fill(0)));
			setSumMatrix(Array(n).fill(0).map(x => Array(n).fill(0)));
			setSubsMatrix(Array(n).fill(0).map(x => Array(n).fill(0)));
			setMultMatrix(Array(n).fill(0).map(x => Array(n).fill(0)));
		} else {
			setMatrixA([]);
			setMatrixB([]);
		}
	}, [nSize]);

	return (
		<div className="app-container">
			<div>
				<h1>Tarea 1</h1>
				<h3>Desarrollar un programa que lea dos matrices de n × n, las convierta en forma de vector de  dimensiones n2 × 1, y llevar a cabo la suma, resta y multiplicación entre ellas a partir de su representación unidimensional. Posteriormente, a los resultados de las operaciones matriciales, denotados como vectores, convertirlos a su correspondiente representación bidimensional y mostrar los resultados en pantalla. Aplique el método de la fila principal para llevar a cabo las conversiones de forma bidimensional a forma unidimensional y viceversa, así como en el proceso de las operaciones matriciales de suma, resta y multiplicación.</h3>
				<input 
					className="input-field"
					type="number"
					placeholder='Tamaño n de las matrices'
					onChange={(event) => event.target.value.length > 1 ? null: setNSize(event.target.value)}
					value={nSize}
				/>
				<br/>
				<br/>
				<button onClick={() => setShowGist(!showGist)}>{showGist ? 'Ocultar': 'Mostrar'} código</button>
				{showGist && <Gist id='3044bc76d4b8425da079fef98bbcb5ef' />}
				{!!matrixA.length && (
					<div>
						<div className='inline marginRight'>
							<h3>Matriz A</h3>
							{renderMatrix(matrixA, 'matrixA')}
						</div>
						<div className='inline marginRight'>
							<h3>Matriz B</h3>
							{renderMatrix(matrixB, 'matrixB')}
						</div>
						<button
							onClick={calculate}
						>
							¡Calcular!
						</button>
					</div>
				)}
				{!!linearForms.sum &&
					<div>
						<div>
							<h3>Formas Lineales</h3>
							<div className="linearText">LinealA: {renderArray(linearForms.linealA)}</div>
							<div className="linearText">LinealB: {renderArray(linearForms.linealB)}</div>
							<div className="linearText">Suma: {renderArray(linearForms.sum)}</div>
							<div className="linearText">Resta: {renderArray(linearForms.subs)}</div>
							<div className="linearText">Multiplicación: {renderArray(linearForms.mult)}</div>
						</div>
						<div>
							<div className='inline marginRight'>
								<h3>Suma</h3>
								{renderMatrix(sumMatrix, 'sumMatrix', true)}
							</div>
							<div className='inline marginRight'>
								<h3>Resta</h3>
								{renderMatrix(subsMatrix, 'subsMatrix', true)}
							</div>
							<div className='inline marginRight'>
								<h3>Multiplicación</h3>
								{renderMatrix(multMatrix, 'multMatrix', true)}
							</div>
						</div>
					</div>
				}
			</div>
			<footer>
				<a className='github-link' href="https://github.com/Chino-sama/mates-comp" target="_blank"></a>
				Github para el código fuente
				<br/>
				<br/>
				Roberto Javier Huerta González - A01273164
			</footer>
		</div>
	);
}

export default App;
