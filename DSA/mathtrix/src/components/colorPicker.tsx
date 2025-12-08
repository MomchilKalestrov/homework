'use client';
import React from 'react';
import { PaintbrushVertical } from 'lucide-react';
import { HexAlphaColorPicker } from 'react-colorful';

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const ColorPicker: React.FC<Props> = ({
    value,
    onChange,
}) => (
    <Popover>
        <PopoverTrigger asChild>
                <div className='flex gap-2 items-stretch'>
                    <div className='grow bg-card text-card-foreground rounded-md border shadow-sm p-1 min-w-9'>
                        <div className='size-full' style={ { borderRadius: 4, backgroundColor: value } } />
                    </div>
                    <Button variant='outline' size='icon'>
                        <PaintbrushVertical />
                    </Button>
                </div>
        </PopoverTrigger>
        <PopoverContent>
            <HexAlphaColorPicker
                color={ value }
                onChange={ onChange }
                className='col-span-full'
                style={ { width: '100%' } }
            />
        </PopoverContent>
    </Popover>
);

export default ColorPicker;