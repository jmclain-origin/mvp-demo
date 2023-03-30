import React, { FC, useEffect, useState, SyntheticEvent, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { Search } from 'heroicons-react';
import TarotCard from './TarotCard';
import CardDetailsModal from './CardDetailsModal';
import { fetchTarotCards as fetchCards } from '@client/axiosApi/tarotApi';

export type MeaningsT = {
    light: string[];
    shadow: string[];
};
export type CardT = {
    name: string;
    fortune_telling: string[];
    keywords: string[];
    imgUrl: string;
    meanings: MeaningsT;
    suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
    rank: string | number;
    rank_int: number;
    desc: string;
    type: string;
    meaning_up: string;
    meaning_rev: string;
    roman_numerals: string;
    image: string;
};

const TarotMainPage: FC = () => {
    const [deck, setDeck] = useState<CardT[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('major');
    const [search, setSearch] = useState('');
    const [expandedCard, setExpandedCard] = useState<CardT | null>(null);

    const deckFetchNFilter = async (filter: string) => {
        const deckFetch = await fetchCards();
        setActiveFilter(() => filter);
        const filteredDeck = deckFetch.filter((card) => card.suit === filter || filter === 'all');
        setDeck(filteredDeck);
    };
    const lazyLookUp = async (query: string): Promise<void> => {
        const deckFetch = await fetchCards();
        const queryRegex = new RegExp(query, 'i');
        const searchResults = deckFetch.filter(
            (card) => queryRegex.test(card.name) || queryRegex.test(card.keywords.join(' ')),
        );
        setDeck(searchResults);
    };

    const handleSelect = (event: SyntheticEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLSelectElement;
        setActiveFilter(value);
    };

    const handleSearch = (event: SyntheticEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setSearch(value);
    };

    const handleClickCard = useCallback((_event: SyntheticEvent<HTMLDivElement>, card: CardT) => {
        setExpandedCard(() => card);
    }, []);

    const handleCardView = useCallback((viewing: boolean) => {
        if (!viewing) setExpandedCard(null);
    }, []);

    useEffect(() => {
        deckFetchNFilter(activeFilter);
    }, [activeFilter]);

    useEffect(() => {
        if (search) lazyLookUp(search);
    }, [search]);

    return (
        <div className="min-h-screen w-full bg-neutral-900 p-6 pt-16 lg:pt-24">
            <nav className="fixed top-0 inset-x-0 h-16 md:h-20 bg-neutral-800 z-20 border-b border-neutral-400 text-white flex justify-between">
                <div className="h-full w-1/4 flex items-center ml-2 md:ml-4">
                    <select
                        className="appearance-none w-full text-center bg-neutral-500 uppercase font-semibold h-8 rounded cursor-pointer"
                        value={activeFilter}
                        onChange={handleSelect}
                    >
                        {['major', 'wands', 'cups', 'swords', 'pentacles', 'all'].map((val) => (
                            <option key={uuid()} value={val}>
                                {val.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="h-full w-full hidden md:flex justify-center items-center md:w-2/4 text-center">
                    <h1 className="text-4xl">The Rider Waite Tarot Deck</h1>
                </div>
                <div className="h-full w-3/5 md:w-1/4 flex items-center justify-center mr-2 md:mr-4">
                    <div className="relative w-full">
                        <Search className="h-5 w-5 absolute left-0 inset-y-0 mt-2 ml-1" />
                        <input
                            type="text"
                            placeholder="search by keywords or name"
                            className="w-full h-8 rounded bg-neutral-500 placeholder:text-gray-100 text-white pl-7 outline-none focus:outline-1 focus:outline-green-700"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </nav>
            <div className="flex flex-wrap justify-center items-center">
                {deck.map((card: CardT) => (
                    <TarotCard card={card} key={uuid()} onClick={handleClickCard} />
                ))}
            </div>
            <CardDetailsModal tarotCard={expandedCard} setIsOpen={handleCardView} isOpen={expandedCard !== null} />
        </div>
    );
};

export default TarotMainPage;
