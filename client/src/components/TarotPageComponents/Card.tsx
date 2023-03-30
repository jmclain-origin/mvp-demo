import React from 'react';
import cardBack from '../../assets/CardBacks.jpg';

type CardProps = {
    labelTag: string;
    faceSrc?: string;
    isLayered?: boolean;
    children?: JSX.Element;
    rotate90?: boolean;
    inverted?: boolean;
};
export const Card = ({ labelTag, faceSrc, isLayered, children, rotate90, inverted }: CardProps): JSX.Element => (
    <div className="relative text-white">
        <span
            className={`absolute z-30 top-0 left-0 bg-black/80 p-1 block leading-3 rounded text-[10px] sm:text-xs md:text-sm${
                faceSrc ? ' hidden' : ''
            }${rotate90 ? ' -rotate-90' : ''}`}
        >
            {labelTag}
        </span>
        <img
            id={`card-${labelTag}`}
            src={faceSrc ? faceSrc : cardBack}
            className={`h-16 sm:h-24 md:h-32 grayscale hover:border cursor-pointer${inverted ? ' rotate-180' : ''}`}
        />
        {isLayered && children}
    </div>
);
