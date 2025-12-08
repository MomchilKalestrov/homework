import { duplicate } from '@/lib/utils';

const getAvailableMoves = (game: game): point[] => {
    const pos = game.turn ? game.player1.position : game.player2.position;
    const { width, height, board } = game;
    const moves: point[] = [];

    for (let x = pos.x - 1; x <= pos.x + 1; x++)
        for (let y = pos.y - 1; y <= pos.y + 1; y++)
            if (x >= 0 && y >= 0 && x < width && y < height && !board[ x ][ y ].used)
                moves.push({ x, y });

    return moves;
};

const canMove = (game: game): boolean => {
    const pos = game.turn ? game.player1.position : game.player2.position;
    const { width, height, board } = game;

    for (let i = pos.x - 1; i <= pos.x + 1; i++)
        for (let j = pos.y - 1; j <= pos.y + 1; j++)
            if (i >= 0 && j >= 0 && i < width && j < height && !board[ i ][ j ].used)
                return true;
    
    return false;
};

const evaluate = (game: game): number => {
    return game.player1.score - game.player2.score;
};

const movePlayer = (game: game, { x, y }: point) => {
    const player = game.turn ? game.player1 : game.player2;
    
    const { board } = game;
    const { operation, value } = board[ x ][ y ];
    board[ x ][ y ].used = true;

    player.position = { x, y };
    player.score = eval(`${ player.score }${ operation }${ value }`);
};

const reverseOperation: Record<operation, operation> = {
    '+': '-',
    '-': '+',
    '*': '/',
    '/': '*'
};

const undoMovePlayer = (game: game, { x, y }: point, previous: point) => {
    const player = game.turn ? game.player1 : game.player2;
    
    const { board } = game;
    const { operation, value } = board[ x ][ y ];
    board[ x ][ y ].used = false;

    player.position = { ...previous };
    player.score = eval(`${ player.score }${ reverseOperation[ operation ] }${ value }`);
};

const minimax = (game: game, depth: number): { score: number, move?: point } => {
    if (depth === 0 || !canMove(game))
        return { score: evaluate(game) };

    let bestScore = game.turn ? -Infinity : +Infinity;
    let bestMove: point | undefined = undefined;

    const moves = getAvailableMoves(game);

    for (const move of moves) {
        const player = game.turn ? game.player1 : game.player2;
        const oldPos = { ...player.position };

        movePlayer(game, move);
        game.turn = !game.turn;

        const { score } = minimax(game, depth - 1);

        game.turn = !game.turn;
        undoMovePlayer(game, oldPos, move);


        // Choose best depending on whose turn it was
        if (game.turn) {
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        } else {
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
    }

    return { score: bestScore, move: bestMove };
}


const getBestRoute = (game: game): point | undefined => {
    const { move } = minimax(duplicate(game), game.width * game.height / 2); 
    return move;
};

export { getBestRoute, canMove };