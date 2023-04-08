import React from 'react';
import { Card } from './Card';

export const CelticCrossLayout = (): JSX.Element => (
    <>
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
