import React from 'react';

type Props = {
	initialCounter?: number | undefinded;
	max?: number | undefined;
	min?: number | undefined;
};

const Counter: React.FC<Props> = ({
	initialCounter = 0,
	max = 0,
	min = 0
}) => {
	const [ counter, setCounter ] = React.useState<number>(initialCounter);

	return (
		<div>
			<h1>Clicker</h1>
			<p>Current counter: { counter }</p>
			<button onClick={ () => setCounter(state => Math.max(min, state - 1)) }>
				-
			</button>
			<button onClick={ () => setCounter(state => Math.min(max, state + 1)) }> 	
                +
            </button>
		</div>
	);
};

export default Counter;
