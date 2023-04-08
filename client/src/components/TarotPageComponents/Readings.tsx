import React, { useState, useEffect } from 'react';

import { ReadingMatLayout } from './ReadingMatLayout';
import { fetchCardDrawing, BASE_URL } from '@client/axiosApi/tarotApi';

import { CardT } from '.';

const Readings = (): JSX.Element => {
    const [cardDrawing, setCardDrawing] = useState<CardT[] | null>(null);

    const handleDrawing = async () => {
        const responseData = await fetchCardDrawing(10);
        setCardDrawing(responseData);
    };

    const mappingDrawings = (cards: CardT[]): void => {
        (function delay(index = 0): void {
            if (index === cards.length) return;
            else
                setTimeout(() => {
                    const element = document.getElementById(`card-${index + 1}`) as HTMLImageElement;
                    element.src = BASE_URL + cards[index].imgUrl;
                    element.className = element.className.replace('grayscale', 'grayscale-[35%]');
                    // setLoadDrawn((prevState) => [...prevState, cards[index].name]);
                    delay(index + 1);
                }, 1000);
        })();
    };
    console.log('🚀 ~ file: Readings.tsx:19 ~ mappingDrawings ~ mappingDrawings:', mappingDrawings);

    useEffect(() => {
        if (!cardDrawing) {
            handleDrawing();
        }
    }, []);

    return (
        <div className="min-h-screen bg-neutral-800">
            <ReadingMatLayout />
        </div>
    );
};

export default Readings;
