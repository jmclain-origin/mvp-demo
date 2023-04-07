import React, { useState, useCallback } from 'react';
import { ArrowRightOutline, ArrowLeftOutline } from 'heroicons-react';
import Modal from './Modal';
import { CardT } from '.';
import { BASE_URL } from '@client/axiosApi/tarotApi';

type Props = {
    isOpen: boolean;
    setIsOpen: (boolean: boolean) => void;
    tarotCard: CardT | null;
};

const CardDetailsModal = ({ isOpen, setIsOpen, tarotCard }: Props): JSX.Element | null => {
    const [showMeanings, setShowMeanings] = useState(false);
    const openMeanings = () => setShowMeanings(true);
    const closeMeanings = () => setShowMeanings(false);

    const handleCloseMeanings = useCallback((bool: boolean) => {
        setShowMeanings(bool);
        setIsOpen(bool);
    }, []);

    return tarotCard !== null ? (
        <Modal isShown={isOpen} setIsShown={setIsOpen}>
            <>
                <span className="text-base md:text-lg lg:text-xl font-extrabold absolute top-0">
                    {tarotCard.roman_numerals}
                </span>
                <h4 className="text-xl lg:text-2xl font-bold w-full text-center">{tarotCard.name}</h4>
                <img
                    className="w-1/3 max-w-[178px] md:max-w-[200px] lg:max-w-none inline-block float-left mr-1 mb-1"
                    src={BASE_URL + tarotCard.imgUrl}
                    alt={tarotCard.name}
                />

                <p className="text-xs md:text-sm lg:text-base">{tarotCard.desc}</p>

                <hr className="my-1" />
                <p className="mb-1 font-semibold lg:text-lg text-center">
                    {tarotCard.keywords.join('. ').toUpperCase()}
                </p>
                <button type="button" className="w-full text-right p-1" onClick={openMeanings}>
                    See meanings
                    <ArrowRightOutline className="inline h-5 w-5 pl-1" />
                </button>
                <Modal isShown={showMeanings} setIsShown={handleCloseMeanings}>
                    <div className="space-y-2 px-3">
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg lg:text-xl">Upright</h3>
                            <p className="text-sm lg:text-base">{tarotCard.meaning_up}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg lg:text-xl">Reversed</h3>
                            <p className="text-sm lg:text-base">{tarotCard.meaning_rev}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg lg:text-xl">Fortune telling</h3>
                            <p className="text-sm lg:text-base">{tarotCard.fortune_telling.join(', ')}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg lg:text-xl">Light</h3>
                            <p className="text-sm lg:text-base">{tarotCard.meanings.light.join(', ')}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg lg:text-xl">Shadow</h3>
                            <p className="text-sm lg:text-base">{tarotCard.meanings.shadow.join(', ')}</p>
                        </div>
                        <button type="button" className="w-full text-left p-1" onClick={closeMeanings}>
                            <ArrowLeftOutline className="inline h-5 w-5 pr-1" />
                            Go back
                        </button>
                    </div>
                </Modal>
            </>
        </Modal>
    ) : null;
};

export default CardDetailsModal;
