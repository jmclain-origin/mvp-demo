import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Search } from 'heroicons-react';
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
    const [activeFilter, setActiveFilter] = useState<string>('major');
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

    const handleSelect = (event: SyntheticEvent<HTMLSelectElement>) => {
        console.log('🚀 ~ file: index.tsx:40 ~ handleSelect ~ event:', event);
        const { value } = event.target as HTMLSelectElement;
        console.log('🚀 ~ file: index.tsx:40 ~ handleSelect ~ value:', value);
        setActiveFilter(value);
        deckFetchNFilter(value);
    };

    return (
        <div className="min-h-screen w-full bg-neutral-900 p-6 pt-16 lg:pt-24">
            <nav className="fixed top-0 inset-x-0 h-16 md:h-20 bg-neutral-800 z-20 border-b border-neutral-400 text-white flex justify-between">
                <div className="h-full w-1/4 flex items-center ml-2 md:ml-4">
                    <select
                        className="appearance-none w-full text-center bg-neutral-500 uppercase font-semibold h-8 rounded cursor-pointer"
                        value={activeFilter}
                        onChange={handleSelect}
                    >
                        {['all', 'major', 'wands', 'cups', 'swords', 'pentacles'].map((val) => (
                            <option key={uuid()} value={val}>
                                {val.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="h-full w-full hidden md:flex justify-center items-center md:w-2/4 text-center">
                    <h1 className="text-4xl">Rider Waite Tarot</h1>
                </div>
                <div className="h-full w-3/5 md:w-1/4 flex items-center justify-center mr-2 md:mr-4">
                    <div className="relative w-full">
                        <Search className="h-5 w-5 absolute left-0 inset-y-0 mt-2 ml-1" />
                        <input
                            type="text"
                            placeholder="search"
                            className="w-full h-8 rounded bg-neutral-500 placeholder:text-gray-100 text-white pl-7 outline-none focus:outline-1 focus:outline-green-700"
                        />
                    </div>
                </div>
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
