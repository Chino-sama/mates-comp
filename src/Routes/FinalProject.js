import React, {
	useState,
	// useEffect
} from 'react';

import Matrix from '../Components/Matrix';
import useFormInput from '../custom-hooks/UseFormInput';

export default function HW1Route() {
	const numberOfStates = useFormInput('');
	const alphabet = useFormInput('');
	const acceptanceStates = useFormInput('');
	const [tableData, setTableData] = useState({});
	const [tableHeaders, setTableHeaders] = useState([]);
	const [tableValues, setTableValues] = useState([]);

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
							<Matrix 
								values={tableValues}
								onChange={onMatrixChange}
								headers={tableHeaders}
								data={tableData}
							/>
							<button 
								className='btn margin-top'
								type='submit'
								onClick={() => {}}
							>
								Iniciar AFND
							</button>
						</div>
					}
				</div>
			</div>
		</div>
	);
}