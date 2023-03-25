import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { CardT } from './index';
import { formatCardLabelObj } from '@client/utils/formatCardLabelObj';

type CardPropsT = {
    card: CardT;
};
const TarotCard: FC<CardPropsT> = ({ card }: CardPropsT) => {
    const { name, fortune_telling, imgUrl, meanings, suit, rank } = card;
    const { roman, title, mathVal } = formatCardLabelObj(suit, rank, name);
    const ListCardDetails = (arr: string[]) => arr.map((item: string) => <li key={uuid()}>{item}</li>);

    return (
        <div className="w-full m-3 max-w-[315px] md:w-[48%] lg:w-1/4 xl:w-1/6 2xl:w-1/12 min-w-[240px] md:m-1 text-white text-center cursor-pointer">
            <div className="w-full mb-1 px-4 bg-neutral-600 rounded-md flex justify-between items-center">
                <span className='"text-left'>{roman}</span>
                <span className="font-bold">{title}</span>
                <span className="text-right">{mathVal}</span>
            </div>
            <div className="relative">
                <img src={imgUrl} alt={name} className="m-auto w-full rounded-sm" />
                <div className="opacity-0 text-sm absolute top-0 bottom-0 left-0 right-0 hover:opacity-90 z-10 hover:bg-neutral-800 leading-relaxed px-1 py-1 overflow-scroll transition-all hover">
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
};

export default TarotCard;
