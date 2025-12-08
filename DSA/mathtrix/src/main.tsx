import React from 'react';
import { createRoot } from 'react-dom/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import GameProvider, { useGame } from '@/components/gameProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, User } from 'lucide-react';

const SidePanel: React.FC = () => {
    const { game, dispatch } = useGame();

    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const data = new FormData(event.currentTarget);
        dispatch({
            type: 'newGame',
            width: Number(data.get('width')) ?? 6,
            height: Number(data.get('height')) ?? 6,
        });
    }, []);

    return (
        <Card className='p-2 grid gap-2 grid-rows-[1fr_auto]'>
            <CardContent className='p-2'>
                <p>
                    <strong>P1 Score:</strong><br />
                    { game.player1.score.toFixed(2) }
                </p>
                <p>
                    <strong>P2 Score:</strong><br />
                    { game.player2.score.toFixed(2) }
                </p>
            </CardContent>
            <CardFooter className='p-0'>
                <form onSubmit={ onSubmit } className='grid gap-2'>
                    <Input placeholder='Width...' name='width' required />
                    <Input placeholder='Height...' name='height' required />
                    <Button>Create</Button>
                </form>
            </CardFooter>
        </Card>
    );
};

const Board: React.FC = () => {
    const { game, dispatch } = useGame();

    const onClick = React.useCallback((position: point) =>
        dispatch({
            type: 'movePlayer',
            position
        })
    , []);

    return (
        <Card className='p-2'>
            <CardContent className='flex gap-1 p-0 h-full'>
                { game.board.map((column, i) => (
                    <div key={ i } className='grid gap-1 w-full'>
                        { column.map((cell, j) => (
                            <Button
                                key={ j }
                                id={ `${ i }-${ j }` }
                                disabled={ cell.used }
                                className='h-full'
                                variant='outline'
                                onClick={ () => onClick({ x: i, y: j }) }
                            >
                                { cell.used ? 'X' : `${ cell.operation }${ cell.value }` }
                            </Button>
                        )) }
                    </div>
                )) }
            </CardContent>
        </Card>
    );
};

const PlayerPawn: React.FC<{ player: 'player1' | 'player2' }> = ({ player }) => {
    const [ coords, setCoords ] = React.useState<{ top: number; left: number } | null>(null);
    const { game } = useGame();
    const SIZE = React.useMemo(() => 64, []);


    // Measure after DOM updates and when the player's board position changes
    React.useLayoutEffect(() => {
        const { x, y } = game[ player ].position;
        const button = document.getElementById(`${ x }-${ y }`);
        if (!button) return;
        const rect = button.getBoundingClientRect();
        setCoords({
            top: rect.top + rect.height / 2,
            left: rect.left + rect.width / 2,
        });
    }, [ game ]);

    if (!coords) return null;

    return (
        <div
            className='fixed pointer-events-none rounded-full shadow transition-all duration-300 ease-out bg-background grid place-items-center'
            style={ {
                width: SIZE,
                height: SIZE,
                top: coords.top,
                left: coords.left,
                transform: 'translate(-50%, -50%)'
            } }
        >
            {
                player === 'player1'
                ?   <User className='size-9' />
                :   <Bot className='size-9' />
            }
        </div>
    );
};

createRoot(document.getElementById('root')!).render(
    <GameProvider>
        <div className='grid grid-cols-[10rem_1fr] w-dvw h-dvh p-4 gap-4'>
            <SidePanel />
            <Board />
            <PlayerPawn player='player1' />
            <PlayerPawn player='player2' />
        </div>
    </GameProvider>
);