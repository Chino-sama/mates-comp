import React, {
	useState,
	useEffect,
} from 'react';
import Matrix from '../Components/Matrix';
// import Gist from 'react-gist';

export default function HW3Route() {
	const [isFirstLanguage, setIsFirstLanguage] = useState(true);
	const [isWordAccepted, setIsWordAccepted] = useState(false);
	const [word, setWord] = useState('')

	const calculate = (languageTable) => {
		let currentState = 'q0';
		for (const char of word)
			currentState = languageTable[currentState][char];
		if (languageTable[currentState].isAccepted)
			return setIsWordAccepted(true);
		setIsWordAccepted(false);
	};

	return (
		<div>
			<h1>Tarea 3</h1>
			<h4>
				Desarrolle un programa (o puede ser en dos programas independientes) que realice el reconocimiento de cadenas para los siguientes lenguajes, tomando en cuenta la definición de los AFDs vistos en clase.
				<br/>
				- Diseñar un AFD que acepte el lenguaje
				L = {'{w | w empieza y acaba en 1}'}
				<br/>
				- Diseñar un AFD que acepte el lenguaje
				L = {'{w | w tiene un número par de ceros y un número par de unos}'}
				<br/>
				Nota: La cadena vacía es aceptada
			</h4>
			<div className='flex'>
				<div className='marginRight'>
					<input 
						className="input-field"
						type="number"
						placeholder='Palabra de 0 y 1 a revisar'
						onChange={(event) => setWord(event.target.value)}
						value={word}
					/>
					<br/>
					<button 
						className={`margin-top ${isFirstLanguage && 'selected-btn'}`} 
						onClick={() => setIsFirstLanguage(true)}
					>
						Empieza y acaba en 1
					</button>
					<br/>
					<button 
						className={`margin-top ${!isFirstLanguage && 'selected-btn'}`}  
						onClick={() => setIsFirstLanguage(false)}
					>
						Número par de 0 y 1
					</button>
					<br/>
					<button 
						onClick={() => calculate(isFirstLanguage ? firstLanguageTable: secondLanguageTable)}
						className='margin-top'
					>
						Calcular!
					</button>
				</div>
				<div className='flex column'>
					<Matrix
						headers={headers}
						data={isFirstLanguage ? firstLanguageTable: secondLanguageTable}
					/>
				</div>
			</div>
		</div>
	);
}
const headers = ['q0', 'q1', 'q2', 'q3'];
const values = ['0', '1'];

const firstLanguageTable = {
	q0: {
		'0': 'q2',
		'1': 'q1'
	},
	q1: {
		'0': 'q3',
		'1': 'q1',
		isAccepted: true
	},
	q2: {
		'0': 'q2',
		'1': 'q2'
	},
	q3: {
		'0': 'q3',
		'1': 'q1'
	}	
};
const secondLanguageTable = {
	q0: {
		'0': 'q1',
		'1': 'q2',
		isAccepted: true
	},
	q1: {
		'0': 'q0',
		'1': 'q3'
	},
	q2: {
		'0': 'q3',
		'1': 'q0'
	},
	q3: {
		'0': 'q2',
		'1': 'q1'
	}	
};