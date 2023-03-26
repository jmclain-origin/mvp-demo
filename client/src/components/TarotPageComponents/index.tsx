import React, { FC, useEffect, useState, SyntheticEvent, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Search } from 'heroicons-react';
import TarotCard from './TarotCard';
import Modal from './Modal';

const BASE_URL = 'http://localhost:5000/api/v2';
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
    rank_int: number;
};

const TarotMainPage: FC = () => {
    const [deck, setDeck] = useState<CardT[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('major');
    const [search, setSearch] = useState('');
    const [expandedCard, setExpandedCard] = useState<CardT | null>(null);
    console.log('🚀 ~ file: index.tsx:27 ~ expandedCard:', expandedCard);

    useEffect(() => {
        deckFetchNFilter(activeFilter);
    }, []);

    useEffect(() => {
        lazyLookUp(search);
    }, [search]);

    const deckFetchNFilter = async (filter: string) => {
        const deckFetch = await fetchCards();
        setActiveFilter(filter);
        const filteredDeck = deckFetch.filter((card) =>
            filter === 'pentacles' ? card.suit === 'coins' : filter === 'all' || card.suit === filter,
        );
        setDeck(filteredDeck);
        setExpandedCard(filteredDeck[0]);
    };

    /**
     * TODO: move data mapping to a backend service and update static data set with additional data before shipping
     */

    const fetchCards = async (): Promise<CardT[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/tarot/new`);
            const results = new Promise<CardT[]>(
                (resolve: (value: CardT[] | PromiseLike<CardT[]>) => void, reject: (reason: any) => void) => {
                    const cards: CardT[] = response.data.map((card: CardT) => ({
                        ...card,
                        imgUrl: `${BASE_URL}/tarot/img/${card?.suit}/${card?.rank_int}?name=${card?.name
                            .split(' ')
                            .join('')}&`,
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

    const lazyLookUp = async (query: string): Promise<void> => {
        const deckFetch = await fetchCards();
        const searchResults = deckFetch.filter((card) => {
            const queryRegex = new RegExp(query, 'gi');
            if (card.name.match(queryRegex)) return true;
            for (const fortune of card.fortune_telling) {
                if (fortune.match(queryRegex)) return true;
            }
            return false;
        });
        setDeck(searchResults);
    };

    const handleSelect = (event: SyntheticEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLSelectElement;
        setActiveFilter(value);
        deckFetchNFilter(value);
    };

    const handleSearch = (event: SyntheticEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setSearch(value);
    };

    const handleClickCard = (_event: SyntheticEvent<HTMLDivElement>, card: CardT) => {
        setExpandedCard(() => card);
    };

    const handleCardView = (viewing: boolean) => {
        if (!viewing) setExpandedCard(null);
    };

    const onClickCard = useCallback(
        (event: SyntheticEvent<HTMLDivElement>, card: CardT) => handleClickCard(event, card),
        [],
    );

    const closeCardView = useCallback((viewing: boolean) => handleCardView(viewing), []);

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
                    <h1 className="text-4xl">The Rider Waite Tarot Deck</h1>
                </div>
                <div className="h-full w-3/5 md:w-1/4 flex items-center justify-center mr-2 md:mr-4">
                    <div className="relative w-full">
                        <Search className="h-5 w-5 absolute left-0 inset-y-0 mt-2 ml-1" />
                        <input
                            type="text"
                            placeholder="search cards..."
                            className="w-full h-8 rounded bg-neutral-500 placeholder:text-gray-100 text-white pl-7 outline-none focus:outline-1 focus:outline-green-700"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </nav>
            <div className="flex flex-wrap justify-center items-center">
                {deck.map((card: CardT, index: number) => (
                    <TarotCard card={card} key={uuid()} onClick={onClickCard} index={index} />
                ))}
            </div>
            {expandedCard !== null && (
                <Modal isShown={expandedCard !== null} setIsShown={closeCardView}>
                    <>
                        <h3 className="text-xl text-center mb-1">{expandedCard.name}</h3>
                        <img className="w-1/3 inline-block" src={expandedCard.imgUrl} alt={expandedCard.name} />
                        <div className="w-2/3 inline-block">
                            <h4></h4>
                        </div>
                        <h3>{expandedCard.rank}</h3>
                    </>
                </Modal>
            )}
        </div>
    );
};

export default TarotMainPage;
