const calculateCoinsRecursively = (sum: number, coins: number[]): number[] => {
    if (sum === 0) return [];
    for (const coin of coins)
        if (sum >= coin)
            return [ coin, ...calculateCoinsRecursively(sum - coin, coins) ];
    throw new Error('Well fuck you shithead.');
};

const calculateCoinsIteratively = (sum: number, coins: number[]): number[] => {
    let calculatedCoins: number[] = [];

    for (let i = 0; i < coins.length || !sum; i++) {
        if (sum < coins[ i ]) continue;
        sum -= coins[ i ];
        calculatedCoins.push(coins[ i ]);
        i--;
    };

    return calculatedCoins;
};

function reduce(p: number, q: number): [number, number] {
    var a = p;
    var b = q;
    var c;
    while (b) {
        c = a % b; a = b; b = c;
    }
    return [ p / a, q / a ];
}


const egyptianFractionRecursively = (p: number, q: number): [ number, number ][] => {
    if (p <= 1) return [ [ p, q ] ];
    const r = Math.floor((p + q) / p);
    p = p * r - q;
    q = q * r;
    [ p, q ] = reduce(p, q);
    return [ [ 1, r ], ...egyptianFractionRecursively(p, q) ];
};

const egyptianFractionIteratively = (p: number, q: number): [ number, number ][] => {
    let calculatedFractions: [ number, number ][] = [];

    while (p > 1) {
        const r = Math.floor((p + q) / p);
        p = p * r - q;
        q = q * r;
        [ p, q ] = reduce(p, q);
        calculatedFractions.push([ 1, r ]);
    };

    calculatedFractions.push([ p, q ]);

    return calculatedFractions;
};

const coins = egyptianFractionRecursively(7, 9);
console.log(coins);