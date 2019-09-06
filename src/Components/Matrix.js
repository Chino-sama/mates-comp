import React, {
	// useState,
	// useEffect
} from 'react';

export default function Matrix(props) {
	const headers = () => {
		let renderedHeaders = props.headers.map((header) => 
			<div key={header} className='header'><b>{header}</b></div>
		);
		return renderedHeaders;
	};
	
	const data = (valueKey) => {
		let renderedData = [];
		for (let key in props.data) {
			renderedData.push(
				<input 
					className='matrix-input'
					onChange={({target}) => props.onChange(target, key, valueKey)}
					disabled={props.disabled}
					key={key}
					value={props.data[key][valueKey]}
				/>
			);
		}
		return renderedData;
	};
	
	const sections = () => props.values.map(value =>
		<div key={value} className='flex section'>
			<div><b>{value}</b></div>
			{data(value)}
		</div>
	);

	const renderTable = () => (
		<div className='table'>
			<div className='flex'>
				<div className='header'></div>
				{headers()}
			</div>
			{sections()}
		</div>
	);
	return renderTable();
}