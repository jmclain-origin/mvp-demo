import React, { useState } from 'react';
import CardBack from '../../assets/CardBacks.jpg';

const ReadingsLayout = (): JSX.Element => {
    const [readingType, setReadingType] = useState<string>('');
    console.log('🚀 ~ file: ReadingsLayout.tsx:7 ~ ReadingsLayout ~ setReadingType:', setReadingType);
    console.log('🚀 ~ file: ReadingsLayout.tsx:7 ~ ReadingsLayout ~ readingType:', readingType);

    return (
        <div className="h-screen bg-neutral-800">
            <nav className="bg-neutral-600">nav</nav>
            <div id="info" className="container mx-auto text-center p-4 text-white">
                <ul className="inline-block p-2">
                    <li>1 you /the question the situation</li>
                    <li>2 what crosses</li>
                    <li>3 best of circumstances</li>
                    <li>4 the foundation</li>
                    <li>5 the past</li>
                </ul>
                <ul className="inline-block p-2">
                    <li>6 the near future</li>
                    <li>7 you</li>
                    <li>8 environment</li>
                    <li>9 hope or fears</li>
                    <li>10 the outcome</li>
                </ul>
            </div>
            <div className="container mx-auto border flex justify-center items-center">
                <span className="">
                    <div className="grid gap-x-9 gap-y-4 grid-cols-3 grid-rows-3">
                        <div className=""></div>
                        <div className="">
                            <img id="card-5" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className=""></div>
                        <div className="">
                            <img id="card-4" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className="relative">
                            <img id="card-1" src={CardBack} className="h-32 grayscale" />
                            <img id="card-2" src={CardBack} className="h-32 grayscale absolute rotate-90 inset-0" />
                        </div>
                        <div className="">
                            <img id="card-6" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className=""></div>
                        <div className="">
                            <img id="card-3" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className=""></div>
                    </div>
                </span>
                <span className="ml-4">
                    <div className="grid gap-4 grid-cols-1 grid-row-4">
                        <div className="">
                            <img id="card-10" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className="">
                            <img id="card-9" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className="">
                            <img id="card-8" src={CardBack} className="h-32 grayscale" />
                        </div>
                        <div className="">
                            <img id="card-7" src={CardBack} className="h-32 grayscale" />
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default ReadingsLayout;
