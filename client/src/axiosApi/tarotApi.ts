import axios from 'axios';
import { CardT } from '@client/components/TarotPageComponents/index';

export const BASE_URL = 'http://localhost:5000/api/v2';

export const fetchTarotCards = async (): Promise<CardT[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/tarot`);
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
