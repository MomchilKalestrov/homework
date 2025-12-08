import React from 'react';
import { getBestRoute, canMove } from '@/lib/ai';

type dispatchType = {
    type: 'movePlayer';
    position: point;
} | {
    type: 'newGame';
    width: number;
    height: number;
};

const newCell = (from: number, to: number): cell => ({
    operation: ([ '+', '-', '*', '/' ])[ Math.floor(Math.random() * 4) ] as operation,
    value: (Math.floor(Math.random() * (to - from) + from)) || 1,
    used: false
});

const newGame = (width: number, height: number): game => {
    const from = Math.floor(Math.max(width, height) / 4);
    const to = Math.ceil(width * height / 4);

    let board: cell[][] = [];

    for (let i = 0; i < width; i++) {
        board.push([]);
        for (let j = 0; j < height; j++)
            board[ i ].push(newCell(from, to));
    };

    board[ 0 ][ 0 ].used = true;
    board[ width - 1 ][ height - 1 ].used = true;

    return {
        width,
        height,

        board,

        player1: {
            score: 0,
            position: {
                x: 0,
                y: 0
            }
        },
        player2: {
            score: 0,
            position: {
                x: width - 1,
                y: height - 1
            }
        },
        turn: true
    };
};

const useGame = () => React.useContext(GameCTX);

const GameCTX = React.createContext<{
    game: game;
    dispatch: (dispatch: dispatchType) => void;
}>({} as any);

const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [ game, setGame ] = React.useState(newGame(6, 6));

    const movePlayer = React.useCallback(({ x, y }: point) => {
        setGame(state => {
            if (!canMove(state)) {
                alert(`GAME END! P1: ${ state.player1.score }; P2: ${ state.player2.score }.`);
                return newGame(state.width, state.height);
            }

            const player: 'player1' | 'player2' = state.turn ? 'player1' : 'player2';
            const xDiff = Math.abs(state[ player ].position.x - x);
            const yDiff = Math.abs(state[ player ].position.y - y);

            if (!(xDiff <= 1 && yDiff <= 1 && !state.board[ x ][ y ].used))
                return state;

            const board = state.board.map(row => row.map(cell => ({ ...cell })));
            board[ x ][ y ].used = true;

            const { score } = state[ player ];
            const { operation, value } = board[ x ][ y ];
            return {
                ...state,
                [ player ]: {
                    position: { x, y },
                    score: eval(`${ score }${ operation }${ value }`)
                },
                board,
                turn: !state.turn
            };
        });
    }, [ game ]);

    React.useEffect(() => {
        if (game.turn) return;
        const point = getBestRoute(game);
        if (!point) {
            alert(`GAME END! P1: ${ game.player1.score }; P2: ${ game.player2.score }.`);
            setGame(newGame(game.width, game.height));
            return;
        }
        setTimeout(() => 
            dispatch({
                type: 'movePlayer',
                position: point
            }),
            300
        );
    }, [ game ]);

    const dispatch = React.useCallback((dispatch: dispatchType) => {
        switch (dispatch.type) {
            case 'movePlayer':
                movePlayer(dispatch.position);
                break;
            case 'newGame':
                setGame(newGame(dispatch.width, dispatch.height))
        };
    }, []);

    return (
        <GameCTX.Provider value={ { game, dispatch } }>
            { children }
        </GameCTX.Provider>
    );
};

export default GameProvider;
export { useGame };