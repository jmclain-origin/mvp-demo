import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import TarotCard from './TarotCard';

const BASE_URL = 'http://localhost:5000/api/v1';
export type MeaningsT = {
    light: string[];
    shadow: string[];
};
export type CardT = {
    name: string;
    fortune_telling: string[];
    imgUrl: string;
    meanings: MeaningsT;
    suit: 'major' | 'wands' | 'cups' | 'swords' | 'coins';
    rank: string | number;
};

const TarotMainPage: FC = () => {
    const [deck, setDeck] = useState<CardT[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    useEffect(() => {
        console.log('🚀 ~ file: index.tsx:20 ~ deck:', deck);
    }, [deck]);

    useEffect(() => {
        deckFetchNFilter(activeFilter);
    }, []);

    const deckFetchNFilter = async (filter: string) => {
        const deckFetch = await fetchCards();
        console.log('🚀 ~ file: index.tsx:32 ~ deckFetchNFilter ~ deckFetch:', deckFetch);
        setActiveFilter(filter);
        const filteredDeck = deckFetch.filter((card) =>
            filter === 'pentacles' ? card.suit === 'coins' : filter === 'all' || card.suit === filter,
        );
        console.log('🚀 ~ file: index.tsx:37 ~ deckFetchNFilter ~ filteredDeck:', filteredDeck);
        setDeck(filteredDeck);
    };

    const fetchCards = async (): Promise<CardT[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/tarot`);
            const results = new Promise<CardT[]>(
                (resolve: (value: CardT[] | PromiseLike<CardT[]>) => void, reject: (reason: any) => void) => {
                    const cards: CardT[] = response.data.map((card: CardT) => ({
                        ...card,
                        imgUrl: `${BASE_URL}/tarot/img/${card?.suit}/${card?.rank}`,
                    }));
                    if (response.data.length === 0) {
                        reject(new Error('No cards found'));
                    } else {
                        resolve(cards);
                    }
                },
            );
            return results;
        } catch (error: any) {
            console.log('🚀 ~ file: index.tsx:28 ~ error:', error);
            return error;
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-900 p-24">
            <nav className="fixed top-0 inset-x-0 h-20 bg-neutral-800 z-20 border-b border-neutral-400 flex justify-around text-white">
                {['all', 'major', 'wands', 'cups', 'swords', 'pentacles'].map((val) => (
                    <button
                        key={uuid()}
                        value={val}
                        className={`uppercase w-1/6 font-semibody ${
                            activeFilter === val ? 'bg-green-600 font-extrabold' : ''
                        }`}
                        onClick={() => deckFetchNFilter(val)}
                    >
                        {val}
                    </button>
                ))}
            </nav>
            <div className="flex flex-wrap justify-center items-center">
                {deck.map((card: CardT) => (
                    <TarotCard card={card} key={uuid()} />
                ))}
            </div>
        </div>
    );
};

export default TarotMainPage;
