declare global {
    type operation = '+' | '-' | '*' | '/';

    type cell = {
        operation: operation;
        value: number;
        used: boolean;
    };

    type point = {
        x: number;
        y: number;
    };

    type player = {
        score: number;
        position: point;
    };

    type game = {
        width: number;
        height: number;
        
        board: cell[][];

        player1: player;
        player2: player;

        turn: boolean;
        [ key: 'player1' | 'player2' ]: player;
    };
};

export {};