import React, {
	// useState,
	// useEffect
} from 'react';

export default function Matrix(props) {
	const headers = () => {
		let renderedHeaders = props.headers.map((item) => 
			<div key={item}>{item}</div>
		);
		return renderedHeaders;
	};
	const renderTable = () => (
		<div className='table'>
			<div className='flex'>
				<div></div>
				{headers()}
			</div>
			<div className='flex'>
				<div>0</div>
			</div>
			<div className='flex'>
				<div>1</div>
			</div>
		</div>
	);
	return renderTable();
}