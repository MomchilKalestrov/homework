const sequence = (n: number) => {
    let res = [];
    
    (function s(i: number, curr: string) {
        if (i === n - 1) {
            res.push(curr + '0');
            res.push(curr + '1');
            return;
        };
        s(i + 1, curr + '0');
        s(i + 1, curr + '1');
    })(0, '');

    return res;
};

const main = () => {
    console.log(sequence(4));
};

main();
