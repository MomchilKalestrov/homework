const NOD = (a: number, b: number): number =>
	a === b
	?	a
	:	a > b ? NOD(a - b, b) : NOD(a, b - a);

const NOK = (a: number, b: number): number =>
	a * b / NOD(a, b);

const main = () => {
	console.log(NOD(35, 14));
	console.log(NOK(6, 15));
};

main();
