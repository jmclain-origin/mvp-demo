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
    suit: 'major' | 'wands' | 'cups' | 'swords' | 'coins';
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
    const ListCardDetails = (arr: string[]) => arr.map((item: string) => <li key={uuid()}>{item}</li>);

    const formatName = (
        suit: string,
        rank: string | number,
        name: string,
    ): { roman: string; title: string; mathVal: number } => {
        let title = '';
        let roman = '';
        let mathVal = 0;
        switch (suit) {
            case 'major':
                title = name;
                roman = +rank > 0 ? int2roman(+rank) : '0';
                mathVal = +rank;
                break;
            case 'cups':
            case 'wands':
            case 'swords':
            case 'coins':
                if (+rank === 1) {
                    mathVal = +rank;
                    roman = int2roman(+rank);
                    title = 'Ace of ' + suit.replace(/^([A-Z])/i, (m) => m.toUpperCase());
                } else if (+rank <= 10) {
                    const prefixTitle = name.split(' ')[0].replace(/^([A-Z])/i, (m) => m.toUpperCase());
                    const suffixSuit =
                        suit === 'coins' ? 'Pentacles' : suit.replace(/^([A-Z])/i, (m) => m.toUpperCase());
                    mathVal = +rank;
                    roman = int2roman(+rank);
                    title = prefixTitle + ' of ' + suffixSuit;
                } else {
                    console.log('i hit');
                    mathVal = rank2Num(rank as string);
                    roman = int2roman(rank2Num(rank as string));
                    const prefixTitle = name.split(' ')[0].replace(/^([A-Z])/i, (m) => m.toUpperCase());
                    const suffixSuit =
                        suit === 'coins' ? 'Pentacles' : suit.replace(/^([A-Z])/i, (m) => m.toUpperCase());
                    title = prefixTitle + ' of ' + suffixSuit;
                }
                break;
            default:
                break;
        }
        return { roman, title, mathVal };
    };

    return (
        <div className="min-h-screen w-full bg-neutral-900">
            <div className="flex flex-wrap justify-center items-center">
                {deck.map((card: CardT) => {
                    const { name, fortune_telling, imgUrl, meanings, suit, rank } = card;
                    const { roman, title, mathVal } = formatName(suit, rank, name);
                    return (
                        <div
                            key={uuid()}
                            className="w-full m-3 md:w-[48%] lg:w-1/4 xl:w-1/6 2xl:w-1/12 md:m-1 text-white text-center cursor-pointer"
                        >
                            <div className="w-full mb-1 px-4 bg-neutral-600 rounded-md flex justify-between items-center">
                                <span className='"text-left'>{roman}</span>
                                <span className="font-bold">{title}</span>
                                <span className="text-right">{mathVal}</span>
                            </div>
                            <div className="relative">
                                <img src={imgUrl} alt={name} className="m-auto w-full rounded-sm" />
                                <div className="opacity-0 text-sm lg:text-xs absolute top-0 bottom-0 left-0 right-0 hover:opacity-90 z-10 hover:bg-neutral-800 leading-relaxed px-1 py-1 overflow-scroll transition-all hover">
                                    <div className="border-b border-neutral-50 w-full py-3">
                                        <h3 className="block font-semibold underline">Fortune</h3>
                                        <ul>{ListCardDetails(fortune_telling)}</ul>
                                    </div>
                                    <div className="border-b border-neutral-50 w-full py-3">
                                        <h3 className="block font-semibold underline">Upright</h3>
                                        <ul>{ListCardDetails(meanings?.light)}</ul>
                                    </div>
                                    <div className="border-b border-neutral-50 w-full py-3">
                                        <h3 className="block font-semibold underline">Reversed</h3>
                                        <ul>{ListCardDetails(meanings?.shadow)}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TarotMainPage;

const int2roman = (original: number): string => {
    if (original < 1 || original > 3999) {
        throw new Error('Error: Input integer limited to 1 through 3,999');
    }

    const numerals = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
        ['M', 'MM', 'MMM'], // 1000-3000
    ];

    // TODO: Could expand to support fractions, simply rounding for now
    const digits = Math.round(original).toString().split('');
    let position = digits.length - 1;

    return digits.reduce((roman, digit) => {
        if (digit !== '0') {
            roman += numerals[position][parseInt(digit) - 1];
        }

        position -= 1;

        return roman;
    }, '');
};

const rank2Num = (rank: 'page' | 'knight' | 'queen' | 'king' | string): number => {
    if (rank === 'page') return 11;
    if (rank === 'knight') return 12;
    if (rank === 'queen') return 13;
    if (rank === 'king') return 14;
    return 0;
};
