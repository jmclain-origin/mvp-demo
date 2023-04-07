import tarotData from '@server/data/tarotJson';
import moreTarotData from '@server/data/moreTarot';

export type V1 = typeof tarotData[0];

export type V2 = typeof moreTarotData[0];

export const tarot1: V1[] = tarotData;

export const tarot2: V2[] = moreTarotData;
