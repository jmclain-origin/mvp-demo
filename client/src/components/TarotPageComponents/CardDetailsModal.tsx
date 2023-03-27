import React, { useState, useCallback } from 'react';
import { ArrowRightOutline, ArrowLeftOutline } from 'heroicons-react';
import Modal from './Modal';
import { CardT } from '.';

type Props = {
    isOpen: boolean;
    setIsOpen: (boolean: boolean) => void;
    tarotCard: CardT | null;
};

const CardDetailsModal = ({ isOpen, setIsOpen, tarotCard }: Props): JSX.Element | null => {
    const [showMeanings, setShowMeanings] = useState(false);
    console.log('🚀 ~ file: CardDetailsModal.tsx:14 ~ CardDetailsModal ~ setShowMeanings:', setShowMeanings);
    console.log('🚀 ~ file: CardDetailsModal.tsx:14 ~ CardDetailsModal ~ showMeanings:', showMeanings);

    const openMeanings = () => setShowMeanings(true);
    const closeMeanings = () => setShowMeanings(false);

    const handleCloseMeanings = useCallback((bool: boolean) => {
        setShowMeanings(bool);
        setIsOpen(bool);
    }, []);

    return tarotCard !== null ? (
        <Modal isShown={isOpen} setIsShown={setIsOpen}>
            <>
                <span className="text-base absolute top-0">{tarotCard.roman_numerals}</span>
                <h4 className="text-xl w-full text-center">{tarotCard.name}</h4>
                <img className="w-1/3 inline-block float-left mr-1 mb-1" src={tarotCard.imgUrl} alt={tarotCard.name} />

                <p className="text-xs">{tarotCard.desc}</p>

                <hr className="my-1" />
                <p className="mb-1 text-center">{tarotCard.keywords.join('. ').toUpperCase()}</p>
                <button type="button" className="w-full text-right p-1" onClick={openMeanings}>
                    See meanings
                    <ArrowRightOutline className="inline h-5 w-5 pl-1" />
                </button>
                <Modal isShown={showMeanings} setIsShown={handleCloseMeanings}>
                    <div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg">Upright</h3>
                            <p className="text-sm">{tarotCard.meaning_up}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg">Reversed</h3>
                            <p className="text-sm">{tarotCard.meaning_rev}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg">Fortune telling</h3>
                            <p className="text-sm">{tarotCard.fortune_telling.join(', ')}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg">Light</h3>
                            <p className="text-sm">{tarotCard.meanings.light.join(', ')}</p>
                        </div>
                        <div className="border-b border-b-neutral-50 pb-2 mb-1">
                            <h3 className="font-bold underline text-lg">Shadow</h3>
                            <p className="text-sm">{tarotCard.meanings.shadow.join(', ')}</p>
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
