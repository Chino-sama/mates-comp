import React, {
	useState,
	useEffect
} from 'react';
import Gist from 'react-gist';

export default function HW2Route() {
	const [word, setWord] = useState('');
	const [isFirstLanguage, setIsFirstLanguage] = useState(true);
	const [isSecondLanguage, setIsSecondLanguage] = useState(true);
	const [checkedText, setCheckedText] = useState('');
	const [showGist, setShowGist] = useState(false);

	const checkWord = (event) => {
		//Prevent default of "submit" Buttom
		event.preventDefault();
		//Reset state variable to false
		setIsFirstLanguage(false);
		setIsSecondLanguage(false);
		//If word is empty its accepted by both languages
		//Else if word length is not even then it doesn't belong to any language
		if (word === '') {
			setIsFirstLanguage(true);
			setIsSecondLanguage(true);
			return;
		} else if (word.length % 2 !== 0) return;
		//Couter of ones and zeros of the word
		//foundOtherZero is to know if the word finds a zero after the ones so it can determine 
		//if the word belongs to the first Language
		let counter0 = 0;
		let counter1 = 0;
		let foundOtherZero = false;

		//Iterate string
		for (const char of word) {
			//If its a zero increment counter0, if its one increment counter1
			if (parseInt(char) === 0) {
				counter0++;
				//If counter 1 is greater than 0 it means that it found a 1 after a 0, it means
				//the word doesn't belongs to the first language
				if (counter1 > 0)
					foundOtherZero = true;
			} else counter1++;
		}
		
		//If counter 0 and counter 1 are equal then it means the word belongs to second Laguage
		if (counter0 === counter1) {
			setIsSecondLanguage(true);
			//If it didn't found a zero after a 1 and the counters are equal then it belongs to first Language too
			if (!foundOtherZero)
				setIsFirstLanguage(true);
		}
	}

	useEffect(() => {
		if (isFirstLanguage && isSecondLanguage)
			return setCheckedText('La palabra pertenece a AMBOS lenguajes');
		else if (isFirstLanguage)
			return setCheckedText('La palabra pertenece sólo al PRIMER lenguaje');
		else if (isSecondLanguage)
			return setCheckedText('La palabra pertenece sólo al SEGUNDO lenguaje');
		else
			return setCheckedText('La parabra no pertenece a NINGÚN lenguaje');
	}, [isFirstLanguage, isSecondLanguage]);


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
			<button onClick={() => setShowGist(!showGist)}>{showGist ? 'Ocultar': 'Mostrar'} código</button>
			{showGist && <Gist id='38ad5abbcfb49df67d196e4741f50c3b' />}
			<form className='margin-top'>
				<input 
					className="input-field marginRight"
					onChange={({target}) => setWord(target.value)}
					value={word}
					type="number"
				/>
				<button type='submit' onClick={checkWord}>
					Revisar Palabra
				</button>
			</form>
			<h2>
				{checkedText}
			</h2>
		</div>
	);
}