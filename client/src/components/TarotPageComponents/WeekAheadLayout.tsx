import React from 'react';
import { Card } from './Card';

export const WeekAheadLayout = (): JSX.Element => (
    <>
        <div className="flex flex-col justify-center items-center">
            <span className="">
                <div className="grid gap-x-4 sm:gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-8 grid-cols-3 grid-rows-2">
                    <div>
                        <Card labelTag="6" faceSrc={undefined} />
                    </div>
                    <div className="-translate-y-4 md:-translate-y-8">
                        <Card labelTag="7" faceSrc={undefined} />
                    </div>
                    <div>
                        <Card labelTag="1" faceSrc={undefined} />
                    </div>

                    <div>
                        <Card labelTag="5" faceSrc={undefined} />
                    </div>
                    <div className="-translate-y-4 md:-translate-y-8">
                        <Card labelTag="8" faceSrc={undefined} />
                    </div>
                    <div>
                        <Card labelTag="2" faceSrc={undefined} />
                    </div>
                </div>
            </span>
            <span className="mt-4 md:mt-6">
                <div className="grid gap-4 md:gap-8 grid-cols-2 grid-row-1 text-white">
                    <Card labelTag="4" faceSrc={undefined} />
                    <Card labelTag="3" faceSrc={undefined} />
                </div>
            </span>
        </div>
    </>
);
