import { useState } from 'react';

const App = () => {
	const [isHappy, setIsHappy] = useState(false);
	const [text, setText] = useState('');

	const checkForHappy = () => {
		if (text === 'dog') {
			setIsHappy(true);
			return;
		}
		if (text === 'cat') {
			setIsHappy(false);
			return;
		}
		setText('');
	};
	return (
		<div>
			<p>We are {isHappy ? 'Happy' : 'Not Happy'}</p>
			<input onChange={(e) => setText(e.target.value)} value={text} />
			<button onClick={checkForHappy}>Click me</button>
		</div>
	);
};

export default App;
