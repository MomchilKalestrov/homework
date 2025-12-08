// const sequence = (n: number, values: number[] = [ 0, 1 ]): string[] => {
//     let res: string[] = [];
//     
//     (function s(i: number, curr: string) {
//         if (i === n - 1) {
//             values.forEach(value => res.push(curr + value.toString()));
//             return;
//         };
//         values.forEach(value => s(i + 1, curr + value.toString()));
//     })(0, '');
// 
//     return res;
// };

const permutation = (n: number): number =>
    n === 1 ? 1 : n * permutation(n - 1);

const variation = (n: number, len: number): number =>
    len === 0 ? 1 : n * variation(n - 1, len - 1);

const combination = (n: number, len: number): number =>
    permutation(n) / variation(n, len);

const main = () => {
    console.log(permutation(3));
    console.log(variation(9, 3));
    console.log(combination(9, 4));
};

main();
