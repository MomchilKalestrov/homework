const countJumps = (length) => {
	const jump = (passed, skip) => {
		const restOfDistance = length - passed;
		if (restOfDistance <= 1) return restOfDistance;
		return jump(passed + skip, 1) + jump(passed + skip, 2);
	};
	return jump(0, 1) + jump(0, 2);
};

const factorial = (n) => n === 1 ? 1 : n * factorial(n - 1);

const fibonacci = (n) => {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(countJumps(4), factorial(3), fibonacci(5));
