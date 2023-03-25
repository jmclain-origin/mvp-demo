import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const BASE_URL = 'http://localhost:5000/api/v1';
type MeaningsT = {
    light: string[];
    shadow: string[];
};
type CardT = {
    name: string;
    fortune_telling: string[];
    imgUrl: string;
    meanings: MeaningsT;
    suit: string;
    rank: string | number;
};
const TarotMainPage: FC = () => {
    const [deck, setDeck] = useState<CardT[]>([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/tarot`).then((res) => {
            setDeck(
                res?.data.map((item: any) => ({
                    ...item,
                    imgUrl: `${BASE_URL}/tarot/img/${item?.suit}/${item?.rank}`,
                })),
            );
        });
    }, []);
    return (
        <div className="min-h-screen w-full bg-neutral-900">
            <div className="flex flex-wrap justify-center items-center">
                {deck.map((card: CardT) => {
                    const { name, fortune_telling, imgUrl, meanings, suit, rank } = card;
                    return (
                        <div
                            key={uuid()}
                            className="w-1/3 sm:w-2/6 md:w-1/4 lg:w-1/6 m-1 md:m-2 text-white text-center cursor-pointer"
                        >
                            <h2 className="text-center md:font-semibold bold sm:text-xs md:text-lg mb-2 hidden sm:block">
                                {name}
                            </h2>
                            <img src={imgUrl} alt={name} className="m-auto rounded-sm" />
                            <div className="hidden">
                                <p>Fortune: {fortune_telling.join(', ')}</p>
                                <p>Meanings: {JSON.stringify(meanings)}</p>
                                <p>Suit: {suit}</p>
                                <p>Rank: {rank}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TarotMainPage;
