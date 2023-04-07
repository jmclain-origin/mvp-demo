import { Tarot } from '@server/types/NewTypeV1';

export function shuffleDeck(array: Tarot[], count: number): Tarot[] {
    const copyDeck: Tarot[] = [...array];
    const results: Tarot[] = [];
    while (results.length < count) {
        const randomIndex = Math.floor(Math.random() * copyDeck.length);
        const card = copyDeck.splice(randomIndex, 1)[0];
        if (!results.find((C) => C.name === card.name)) results.push(card);
    }
    return results;
}
