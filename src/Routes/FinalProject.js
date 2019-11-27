import React, {
	useState,
	useEffect
} from 'react';

import Matrix from '../Components/Matrix';
import useFormInput from '../custom-hooks/UseFormInput';

export default function HW1Route() {
	const numberOfStates = useFormInput('3');
	const alphabet = useFormInput('0, 1');
	const acceptanceStates = useFormInput('q2');
	const testString = useFormInput('');
	const [tableData, setTableData] = useState({});
	const [tableHeaders, setTableHeaders] = useState([]);
	const [tableValues, setTableValues] = useState([]);
	const [threads, setThreads] = useState([]);
	const [playThreads, setPlayThreads] = useState(false);

	//MATRIX
	const generateMatrix = (e) => {
		e.preventDefault();
		const alphabetArr = alphabet.value.split(",").map(item => item.trim());
		const acceptanceStatesArr = acceptanceStates.value.split(",").map(item => item.trim());
		const objData = alphabetArr.reduce((a,b)=> (a[b]='',a),{});
		const data = {};

		for (let i = 0; i < numberOfStates.value; i++) {
			data[`q${i}`] = { ...objData };
			if (acceptanceStatesArr.indexOf(`q${i}`) !== -1)
				data[`q${i}`].isAccepted = true;
		}
		setTableData(data);
		setTableHeaders(Object.keys(data));
		setTableValues(alphabetArr);
	}

	const onMatrixChange = ({value}, key, valueKey) => {
		const newTable = Object.assign(tableData);
		newTable[key][valueKey] = value;
		setTableData({
			...tableData,
			...newTable[valueKey]
		});
	};

	//AFND
	//Format Matrix values
	const startAFND = (e) => {
		e.preventDefault();
		setPlayThreads(false);
	
		let formattedTable = JSON.parse(JSON.stringify(tableData));
		for (let key in formattedTable) {
			for (let key2 in formattedTable[key]) {
				if (formattedTable[key][key2] && key2 !== 'isAccepted') {
					formattedTable[key][key2] = formattedTable[key][key2].split(",").map(item => item.trim());
				}
			}
		}

		const allThreads = startAFNDThread(formattedTable, 0, 'q0');
		setThreads(allThreads);
	}

	//Start AFND Thread
	const startAFNDThread = (table, charIndex, startState) => {
		//Current thread state
		let currentState = startState;
		let currentThreads = [{
			start: charIndex,
			finish: charIndex,
			fullThread: startState,
			fullThreadArr: [startState],
			finalState: startState
		}];
		let i = 0;
		//Iterate word to test
		for (const value of testString.value) {
			//Access object properties, currentState and then value of the current char of the word
			if (i > charIndex) {
				if (table[currentState][value]) {
					if (table[currentState][value].length === 1)
						currentState = table[currentState][value][0];
					else {
						for (let j = 1; j < table[currentState][value].length; j++) {
							let newThread = startAFNDThread(table, i, table[currentState][value][j]);
							currentThreads.push(...newThread);
						}
						currentState = table[currentState][value][0];
					}
					currentThreads[0].fullThread += ` -> ${currentState}`;
					currentThreads[0].fullThreadArr.push(currentState);
					currentThreads[0].finalState = currentState;
					currentThreads[0].finish = i;
				} else
					break;
			}
			i++;
		}
		return currentThreads;
	}

	const renderWord = () => {
		let renderedWord = [];
		let i = 0;
		for (const value of testString.value) {
			renderedWord.push(<div key={i} id={`c${i}`} className='word'>{value}</div>);
			i++;
		}
		return renderedWord;
	}
 
	const renderThreads = () => {
		const renderStates = () =>
			tableHeaders.map((item, index) => 
				<div key={item} id={item} className='header'><b>{item}</b></div>
			);

		return threads.map((item, index) =>
			<div key={index} id={`container${index}`} className='hidden'>
				<p id={`path${index}`} className='margin-top small-margin-bottom'></p>
				<div id={`t${index}`} className='table inline-block'>
					<div className='flex'>
						{renderStates()}
					</div>
				</div>
			</div>
		);
	}

	const startThreads = () => {
		let i = 0;
		let j = 0;
		for (const value of testString.value) {
			setTimeout(() => {
				if (i - 1 > -1)
					document.querySelector(`#c${i - 1}`).style.color = "#000";
				document.querySelector(`#c${i}`).style.color = "#EF2626";
				threads.forEach((thread, index) => {
					if (thread.start <= i && thread.finish >= i) {
						if ((i - thread.start - 1) > -1)
							document.querySelector(`#t${index} #${thread.fullThreadArr[i - thread.start - 1]}`).style.backgroundColor = "#fff";
						document.querySelector(`#container${index}`).classList.remove('hidden');
						document.querySelector(`#path${index}`).innerHTML = thread.fullThreadArr.slice(0, i - thread.start + 1).join(' -> ');
						document.querySelector(`#t${index} #${thread.fullThreadArr[i - thread.start]}`).style.backgroundColor = "#5faaffaa";
						if (testString.value.length === i + 1) {
							const acceptanceStatesArr = acceptanceStates.value.split(",").map(item => item.trim());
							if (acceptanceStatesArr.indexOf(thread.finalState) > -1) {
								document.querySelector(`#path${index}`).innerHTML = thread.fullThreadArr.slice(0, i - thread.start + 1).join(' -> ') + " -> <span style='color: #30dd77'>ACEPTADO :D</span>";
								document.querySelector(`#t${index} #${thread.fullThreadArr[i - thread.start]}`).style.backgroundColor = "#30dd77";
							} else {
								document.querySelector(`#path${index}`).innerHTML = thread.fullThreadArr.slice(0, i - thread.start + 1).join(' -> ') + " -> <span style='color: #EF2626'>NO ACEPTADO</span>";
								document.querySelector(`#t${index} #${thread.fullThreadArr[i - thread.start]}`).style.backgroundColor = "#EF2626";
							}
						}
					} else if (thread.start <= i && thread.finish === i - 1) {
						document.querySelector(`#path${index}`).innerHTML = thread.fullThreadArr.slice(0, i - thread.start + 1).join(' -> ') + " -> <span style='color: #EF2626'>NO ACEPTADO</span>";
						document.querySelector(`#t${index} #${thread.fullThreadArr[i - thread.start - 1]}`).style.backgroundColor = "#EF2626";
					}
				});
				i++;
			}, 1000 * (j + 1));
			j++;
		}
	}

	useEffect(() => {
		if (threads.length)
			setPlayThreads(true);
	}, [threads]);

	useEffect(() => {
		if (threads.length && playThreads)
			startThreads() 
	}, [playThreads]);

	return (
		<div>
			<h1>Proyecto Final: Autómata Finito No Determinista (AFND)</h1>
			<div className='flex'>
				<form className='flex column marginRight'>
					<h4 className='no-margin-top'>Datos del AFND</h4>
					<h5 className='no-margin-top'>Número de estados</h5>
					<input
						className='input-field'
						type='number'
						placeholder='Número de estados'
						{...numberOfStates}
					/>
					<h5>Alfabeto (separado por comas)</h5>
					<input
						className='input-field'
						type='text'
						placeholder='Ej. 0, 1, 2, 3'
						{...alphabet}
					/>
					<h5>Estados de aceptación (separados por comas)</h5>
					<input
						className='input-field'
						type='text'
						placeholder='Ej. q5, q6'
						{...acceptanceStates}
					/>
					<h5>NOTA: se asume que q0 es el estado inicial</h5>
					<button 
						className='btn'
						type='submit'
						disabled={!numberOfStates.value || !alphabet.value || !acceptanceStates.value}
						onClick={generateMatrix}
					>
						Generar matriz de transiciones
					</button>
				</form>
				<div className='flex justify-content-center'>
					{!!tableHeaders.length &&
						<div>
							<h4 className='no-margin-top'>Matriz de Transiciones</h4>
							<div className='flex'>
								<Matrix 
									values={tableValues}
									onChange={onMatrixChange}
									headers={tableHeaders}
									data={tableData}
								/>
							</div>
							<h4 className='vertical-margin'>Cadena a probar</h4>
							<form>
								<input
									className='input-field'
									type='text'
									placeholder='Ej. 10101010'
									{...testString}
								/>
								<button 
									className='btn margin-left'
									type='submit'
									disabled={!testString.value}
									onClick={startAFND}
								>
									Iniciar AFND
								</button>
							</form>
							{!!threads.length && playThreads &&
								<div className='flex'>
									<div className='flex column'>
										<div className='flex margin-top'>
											{renderWord()}
										</div>
										{renderThreads()}
									</div>
								</div>
							}
						</div>
					}
				</div>
			</div>
		</div>
	);
}