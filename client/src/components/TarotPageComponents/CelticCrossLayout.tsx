import React, { useEffect, useState } from 'react';
import { PositionList } from './PositionList';
import { Card } from './Card';
import { CardT } from '.';
import { BASE_URL } from '@client/axiosApi/tarotApi';

export const CROSS_LIST_MEANING = [
    'Question / Situation',
    'What crosses you',
    'Best of Circumstances',
    'Foundation / Reason for reading',
    'The Past',
    'The Near Future',
    'You',
    'Environment',
    'Hopes or Fears',
    'The Outcome',
];

type Props = { cards: CardT[] | null };

export const CelticCrossLayout = ({ cards }: Props): JSX.Element => {
    const [loadDrawn, setLoadDrawn] = useState<string[]>([]);
    const mappingDrawings = (cards: CardT[]): void => {
        (function delay(index = 0): void {
            if (index === cards.length) return;
            else
                setTimeout(() => {
                    const element: HTMLImageElement = document.getElementById(`card-${index + 1}`) as HTMLImageElement;
                    element.src = BASE_URL + cards[index].imgUrl;
                    element.className = element.className.replace('grayscale', 'grayscale-[35%]');
                    setLoadDrawn((prevState) => [...prevState, cards[index].name]);
                    delay(index + 1);
                }, 1000);
        })();
    };

    useEffect(() => {
        if (cards !== null) {
            mappingDrawings(cards);
        }
    }, [cards]);
    return (
        <>
            <PositionList list={CROSS_LIST_MEANING} readingDrawing={loadDrawn} />
            <div className="flex justify-center items-center">
                <span className="">
                    <div className="grid gap-x-5 sm:gap-x-7 md:gap-x-9 gap-y-2 md:gap-y-4 grid-cols-3 grid-rows-3">
                        <div className=""></div>
                        <div>
                            <Card labelTag="5" />
                        </div>
                        <div className=""></div>
                        <Card labelTag="4" />
                        <Card labelTag="1" isLayered={true}>
                            <span className="absolute rotate-90 inset-0">
                                <Card labelTag="2" rotate90={true} />
                            </span>
                        </Card>
                        <Card labelTag="6" />
                        <div className=""></div>
                        <Card labelTag="3" />
                        <div className=""></div>
                    </div>
                </span>
                <span className="ml-4">
                    <div className="grid gap-2 md:gap-4 grid-cols-1 grid-row-4 text-white">
                        <Card labelTag="10" />
                        <Card labelTag="9" />
                        <Card labelTag="8" />
                        <Card labelTag="7" />
                    </div>
                </span>
            </div>
        </>
    );
};
