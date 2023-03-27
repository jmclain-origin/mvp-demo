import React, { FC, SyntheticEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { CardT } from './index';

type CardPropsT = {
    card: CardT;
    onClick: (event: SyntheticEvent<HTMLDivElement>, card: CardT) => void;
    index: number;
};
const TarotCard: FC<CardPropsT> = ({ card, onClick, index }: CardPropsT) => {
    console.log('🚀 ~ file: TarotCard.tsx:12 ~ index:', index);
    const { name, fortune_telling, imgUrl, meanings, roman_numerals, rank_int } = card;
    const ListCardDetails = (arr: string[]) => arr.map((item: string) => <li key={uuid()}>{item}</li>);

    return (
        <div
            className="w-full m-3 max-w-[360px] md:w-[48%] lg:w-1/4 xl:w-1/6 2xl:w-1/12 min-w-[240px] md:m-1 text-white text-center cursor-pointer"
            onClick={(ev) => onClick(ev, card)}
        >
            <div className="w-full mb-1 px-4 bg-neutral-600 rounded-md flex justify-between items-center">
                <span className='"text-left'>{roman_numerals}</span>
                <span className="font-bold">{name}</span>
                <span className="text-right">{rank_int}</span>
            </div>
            <div className="relative">
                <img src={imgUrl} alt={name} className="m-auto w-full rounded-sm grayscale-[25%]" />
                <div className="opacity-0 text-xs absolute top-0 bottom-0 left-0 right-0 hover:opacity-90 z-10 hover:bg-neutral-800 leading-relaxed px-1 py-1 overflow-scroll transition-all duration-300">
                    <div className="border-b border-neutral-50 w-full py-3">
                        <h3 className="block font-semibold underline">Fortune telling</h3>
                        <ul>{ListCardDetails(fortune_telling)}</ul>
                    </div>
                    <div className="border-b border-neutral-50 w-full py-3">
                        <h3 className="block font-semibold underline">Light</h3>
                        <ul>{ListCardDetails(meanings?.light)}</ul>
                    </div>
                    <div className="border-b border-neutral-50 w-full py-3">
                        <h3 className="block font-semibold underline">Shadows</h3>
                        <ul>{ListCardDetails(meanings?.shadow)}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TarotCard;
