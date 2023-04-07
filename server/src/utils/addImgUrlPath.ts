import { Tarot } from '@server/types/NewTypeV1';

export const addImgUrlPath = (deck: Tarot[]): Tarot[] => {
    const copyDeck = [...deck];
    return copyDeck.map((card: Tarot) => ({
        ...card,
        imgUrl: `/tarot/img/${card?.suit}/${card?.rank_int}?name=${card?.name.split(' ').join('')}&`,
    }));
};
