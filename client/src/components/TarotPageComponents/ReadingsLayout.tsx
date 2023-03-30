import React, { useState } from 'react';
import cardBack from '../../assets/CardBacks.jpg';

type CardProps = {
    labelTag: string;
    faceSrc?: string;
    isLayered?: boolean;
    children?: JSX.Element;
    rotate90?: boolean;
    inverted?: boolean;
};
const Card = ({ labelTag, faceSrc, isLayered, children, rotate90, inverted }: CardProps): JSX.Element => (
    <div className="relative text-white">
        <span
            className={`absolute z-30 top-0 left-0 bg-black/80 p-1 block leading-4 rounded text-sm${
                faceSrc ? ' hidden' : ''
            }${rotate90 ? ' -rotate-90' : ''}`}
        >
            {labelTag}
        </span>
        <img
            id={`card-${labelTag}`}
            src={faceSrc ? faceSrc : cardBack}
            className={`h-24 grayscale ${inverted ? ' rotate-180' : ''}`}
        />
        {isLayered && children}
    </div>
);

const ReadingsLayout = (): JSX.Element => {
    const [readingType, setReadingType] = useState<string>('');
    console.log('🚀 ~ file: ReadingsLayout.tsx:7 ~ ReadingsLayout ~ setReadingType:', setReadingType);
    console.log('🚀 ~ file: ReadingsLayout.tsx:7 ~ ReadingsLayout ~ readingType:', readingType);

    return (
        <div className="h-screen bg-neutral-800">
            <div className="container mx-auto border-4 bg-neutral-900 p-3">
                <h2 className="text-2xl font-bold text-neutral-600">Celtic Cross</h2>
                <div className="flex flex-col items-center">
                    <ol className="p-2 text-neutral-500 mr-5 space-y-4 hidden">
                        <li>1. the question the situation</li>
                        <li>2. what crosses</li>
                        <li>3. best of circumstances</li>
                        <li>4. the foundation</li>
                        <li>5. the past</li>
                        <li>6. the near future</li>
                        <li>7. you</li>
                        <li>8. environment</li>
                        <li>9. hope or fears</li>
                        <li>10. the outcome</li>
                    </ol>
                    <div className="flex justify-center items-center">
                        <span className="">
                            <div className="grid gap-x-9 gap-y-4 grid-cols-3 grid-rows-3 text-white">
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
                            <div className="grid gap-4 grid-cols-1 grid-row-4 text-white">
                                <Card labelTag="10" faceSrc={undefined} />
                                <Card labelTag="9" faceSrc={undefined} />
                                <Card labelTag="8" faceSrc={undefined} />
                                <Card labelTag="7" faceSrc={undefined} />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingsLayout;
