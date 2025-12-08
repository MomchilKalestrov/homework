const permutation = (n: number): number =>
    n === 1 ? 1 : n * permutation(n - 1);

const variation = (n: number, len: number): number =>
    len === 0 ? 1 : n * variation(n - 1, len - 1);

const combination = (n: number, len: number): number =>
    variation(n, len) / permutation(len);

const main = () => {
    // Task 1 solution
    console.log(permutation(10) - permutation(9));
    // Task 77 solution
    console.log(`${ (1 / variation(10, 2) * 100).toFixed(3) }%`);
    // Task 250 solution
    console.log(`${
        (
            (combination(7, 3) + combination(4, 2))
            // ------------------------------------
                    / combination(11, 5)
        
        * 100).toFixed(3) }%`);
};

main();
