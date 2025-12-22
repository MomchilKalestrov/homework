let _memoizedFibonachiValues: Record<number, number> = {};

const memoizedFibonachi = (num: number): number => {
    if (num in _memoizedFibonachiValues)
        return _memoizedFibonachiValues[num];

    if (num <= 2)
        _memoizedFibonachiValues[num] = 1;
    else
        _memoizedFibonachiValues[num] = memoizedFibonachi(num - 1) + memoizedFibonachi(num - 2);

    return _memoizedFibonachiValues[num];
};

const knapsackRecursive = (
    capacity: number,
    items: ({
        value: number,
        weight: number
    })[],
    n: number = items.length - 1,
    memo: number[][] = Array.from({ length: items.length }, () => Array(capacity + 1).fill(-1))
): number => {
    if (capacity <= 0 || n < 0)
        return 0;

    if (memo[ n ][ capacity ] !== -1)
        return memo[ n ][ capacity ];

    if (items[ n ].weight > capacity) {
        memo[ n ][ capacity ] = knapsackRecursive(capacity, items, n - 1, memo);
        return memo[ n ][ capacity ];
    }

    const skip = knapsackRecursive(capacity, items, n - 1, memo);
    const take = items[ n ].value + knapsackRecursive(capacity - items[ n ].weight, items, n - 1, memo);

    memo[n][capacity] = Math.max(skip, take);
    return memo[n][capacity];
};

const knapsackIterative = (
    capacity: number,
    items: ({
        value: number,
        weight: number
    })[],
): number => {
    const table: number[][] = Array.from({ length: items.length + 1 }, () =>
        Array(capacity + 1).fill(0)
    );

    for (let n = 1; n <= items.length; n++)
        for (let w = 1; w <= capacity; w++)
            table[n][w] = items[n - 1].weight <= w
                ? Math.max(
                    items[n - 1].value + table[n - 1][w - items[n - 1].weight],
                    table[n - 1][w]
                )
                : table[n - 1][w];

    return table[items.length][capacity];
};

const knapsackList = (
    capacity: number,
    items: ({
        value: number,
        weight: number
    })[],
): number => {
    let states: typeof items = [ { weight: 0, value: 0 } ];

    for (const item of items) {
        const nextStates = [ ...states ];

        for (const state of states) {
            const newWeight = state.weight + item.weight;
            const newValue = state.value + item.value;

            if (newWeight <= capacity) {
                const existing = nextStates.find(s => s.weight === newWeight);
                if (!existing || existing.value < newValue)
                    nextStates.push({ weight: newWeight, value: newValue });
            }
        }

        states = nextStates;
    }

    return Math.max(...states.map(s => s.value));
};

const jagg = () => {
    const jaggedArray = [
        [ 1, 2, 3, 4, 5 ],
        [ 6, 7 ],
        [ 8, 9, 0 ]
    ];

    for (const arr of jaggedArray) {
        let str = '';
        for (const el of arr)
            str += el.toString() + ', ';
        console.log(str);
    };

    for (let i = 0; i < jaggedArray.length; i++) {
        let str = '';
        for (let j = 0; j < jaggedArray[ i ].length; j++)
            str += jaggedArray[ i ][ j ].toString() + ', ';
        console.log(str);
    }
};

const trackTime = <T extends (...args: any[]) => any>(name: string, func: T, ...params: Parameters<T>): ReturnType<T> => {
    const start = Date.now();
    let ret = func(...params);
    const end = Date.now();

    console.log(`Function "${ name }" took ${end - start}ms.`);
    
    return ret;
};

const test1: {
    items: ({
        value: number,
        weight: number
    })[];
    capacity: number;
    expected: number
} = {
    items: [
        { value: 60, weight: 10 },
        { value: 100, weight: 20 },
        { value: 120, weight: 30 },
    ],
    capacity: 50,
    expected: 220, // take items 2 and 3
};

const knapsackTestCases = [ test1 ];

const main = () => {
    const fibNum = 10000;
    console.log(trackTime('fibonachi', memoizedFibonachi, fibNum));
    console.log(trackTime('fibonachi', memoizedFibonachi, fibNum + 1));
    jagg();
    knapsackTestCases.forEach(({ items, capacity }) => {
        console.log(knapsackList(capacity, items));
    })
};

main();