import React, {
	useState,
	useEffect,
} from 'react';
import Matrix from '../Components/Matrix';
// import Gist from 'react-gist';

export default function HW6Route() {
	const [table, setTable] = useState({
		q0: {
			'0': 'q0, q1',
			'1': 'q0'
		},
		q1: {
			'0': 'q2',
			'1': 'q2',
		},
		q2: {
			'0': 'q3',
			'1': ''
		},
		q3: {
			'0': 'q3',
			'1': 'q3',
		}	
	});

	const [AFNTransitions, setAFNTransitions] = useState({});
	const [AFDTable, setAFDTable] = useState({});

	const convert = () => {
		setAFDTable({});
		let intermediateTable = { q0: table.q0 };
		calculateIntermediate(intermediateTable);
	};

	const calculateIntermediate = (intermediateTable) => {
		const numberOfKeys = Object.keys(intermediateTable).length;
		for (let key in intermediateTable) {
			for (let value in intermediateTable[key]) {
				if (!intermediateTable.hasOwnProperty(intermediateTable[key][value])) {
					const keys = intermediateTable[key][value].split(',');
					let newObjValues = {};
					for (let i = 0; keys.length > i; i++) {
						for (let valueKey in table[keys[i].trim()]) {
							if (table[keys[i].trim()][valueKey]) {
								if (newObjValues[valueKey]) {
									const tableKeys = table[keys[i].trim()][valueKey].replace(/\s+/g, '').split(',');
									const newObjValueKeys = newObjValues[valueKey].replace(/\s+/g, '').split(',');
									const allValues = [...new Set(newObjValueKeys.concat(tableKeys))];
									newObjValues[valueKey] = `${allValues.join(', ')}`;
								} else {
									newObjValues[valueKey] = `${table[keys[i].trim()][valueKey]}`;
								}
							}
						}
					}
					intermediateTable[intermediateTable[key][value]] = newObjValues;
				}

			}
		}
		if (numberOfKeys < Object.keys(intermediateTable).length)
			calculateIntermediate(intermediateTable);
		else
			return setAFNTransitions(intermediateTable);
	}

	const onMatrixChange = ({value}, key, valueKey) => {
		const newTable = Object.assign(table);
		newTable[key][valueKey] = value;
		setTable({
			...table,
			...newTable[valueKey]
		});
	};

	return (
		<div>
			<h1>Tarea 6</h1>
			<h4>Implemente en código la construcción de subconjuntos, para convertir un AFN a su correspondiente AFD.</h4>
			<div className='flex column'>
				<div className='flex'>
					<Matrix 
						values={values}
						onChange={onMatrixChange}
						headers={headers}
						data={table}
					/>
				</div>
				<div className='flex'>
					<button 
						onClick={convert}
						className='margin-top'
					>
						Convertir a AFD!
					</button>
				</div>
				<div className='flex'>
					<Matrix 
						values={values}
						disabled
						headers={Object.keys(AFNTransitions)}
						data={AFNTransitions}
					/>
				</div>
			</div>
		</div>

	)
}

const headers = ['q0', 'q1', 'q2', 'q3'];
const values = ['0', '1'];

