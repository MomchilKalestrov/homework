var rotate = (matrix: number[][]) => {
    const edgeLength = matrix.length;

    let top = 0;
    let bottom = edgeLength - 1;

    while (top < bottom) {
        for (let col = 0; col < edgeLength; col++) {
            let temp = matrix[top][col];
            matrix[top][col] = matrix[bottom][col];
            matrix[bottom][col] = temp;
        }
        top++;
        bottom--;
    }

    for (let row = 0; row < edgeLength; row++) {
        for (let col = row + 1; col < edgeLength; col++) {
            let temp = matrix[row][col];
            matrix[row][col] = matrix[col][row];
            matrix[col][row] = temp;
        }
    }    
};

const canMoveIn = (matrix: number[][], x: number, y: number): boolean => {
    if (matrix.length <= x) return false;
    if (matrix[ x ].length <= y) return false;
    return !!matrix[ x ][ y ];
};

const mouse = (matrix: number[][], x: number, y: number, solution: number[][]): boolean => {
    if (
        x === matrix.length - 1
        && y === matrix[ matrix.length - 1 ].length - 1
    ) return true;

    if (!canMoveIn(matrix, x, y))
        return false;

    if (mouse(matrix, x + 1, y, solution)) {
        solution[ x + 1 ][ y ] = 1;
        return true;
    };

    if (mouse(matrix, x, y + 1, solution)) {
        solution[ x ][ y + 1 ] = 1;
        return true;
    };

    return false;
};

const canPlace = (board: number[][], n: number, row: number, column: number): boolean => {
    for (let i = 0; i < column; i++)
        if (board[ row ][ i ] == 1)
            return false;

    for (let i = row, j = column; i >= 0 && j >= 0; i--, j--)
        if (board[ i ][ j ] == 1)
            return false;

    for (let i = row, j = column; j >= 0 && i < n; i++, j--)
        if (board[ i ][ j ] == 1)
            return false;
    
    return true;
};

const queens = (board: number[][], n: number, column: number = 0): boolean => {
    if (column === n) return true;

    for (let row = 0; row < n; row++) {
        if (!canPlace(board, n, row, column))
            continue;

        board[ row ][ column ] = 1;
        if (queens(board, n, column + 1))
            return true;
        board[ row ][ column ] = 0;
    };

    return false;
};

const main = () => {
    // Zadacha 1
    const matrix = [
        [ 1, 1, 0, 1 ],
        [ 0, 1, 1, 1 ],
        [ 0, 1, 0, 1 ],
        [ 0, 1, 0, 1 ]
    ];
    const solution = [
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
    ];
    mouse(matrix, 0, 0, solution);
    for (let _ in [ 1, 2, 3 ])
        rotate(solution);
    solution.reverse().forEach(row => console.log(row));

    // Zadacha 2
    let board = [
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0 ]
    ];
    queens(board, 6);
    console.log(board);
};

main();