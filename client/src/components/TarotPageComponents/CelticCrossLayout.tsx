import React from 'react';
import { PositionList } from './PositionList';
import { Card } from './Card';

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

export const CelticCrossLayout = (): JSX.Element => (
    <>
        <PositionList list={CROSS_LIST_MEANING} />
        <div className="flex justify-center items-center">
            <span className="">
                <div className="grid gap-x-5 sm:gap-x-7 md:gap-x-9 gap-y-2 md:gap-y-4 grid-cols-3 grid-rows-3">
                    <div className=""></div>
                    <div>
                        <Card labelTag="5" faceSrc={undefined} />
                    </div>
                    <div className=""></div>
                    <Card labelTag="4" faceSrc={undefined} />
                    <Card labelTag="1" faceSrc={undefined} isLayered={true}>
                        <span className="absolute rotate-90 inset-0">
                            <Card labelTag="2" faceSrc={undefined} rotate90={true} />
                        </span>
                    </Card>
                    <Card labelTag="6" faceSrc={undefined} />
                    <div className=""></div>
                    <Card labelTag="3" faceSrc={undefined} />
                    <div className=""></div>
                </div>
            </span>
            <span className="ml-4">
                <div className="grid gap-2 md:gap-4 grid-cols-1 grid-row-4 text-white">
                    <Card labelTag="10" faceSrc={undefined} />
                    <Card labelTag="9" faceSrc={undefined} />
                    <Card labelTag="8" faceSrc={undefined} />
                    <Card labelTag="7" faceSrc={undefined} />
                </div>
            </span>
        </div>
    </>
);
