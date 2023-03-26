import { Request, Response, NextFunction } from 'express';
import path from 'path';
import tarotData from '@server/data/tarotJson';
import moreTarotData from '@server/data/moreTarot';
import finalTarot from '@server/data/finalTarot';

const getAll = (_req: Request, res: Response, _next: NextFunction): void => {
    res.json(tarotData);
};

const fetchOneImage = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const suit = req.params.suit as 'major' | 'wands' | 'cups' | 'swords' | 'coins';
    const rank: string = req.params.rank;
    type R = typeof rank;
    type S = typeof suit;
    const parseReqToFileName = (suit: S, rank: R): string => {
        let fileName = '';
        let fileNum = '';
        switch (suit) {
            case 'wands':
                fileName = 'wands';
                break;
            case 'cups':
                fileName = 'cups';
                break;
            case 'swords':
                fileName = 'swords';
                break;
            case 'coins':
                fileName = 'pents';
                break;
            case 'major':
                fileName = 'maj';
                break;
            default:
                break;
        }
        if (!isNaN(parseInt(rank))) {
            fileNum = parseInt(rank) < 10 ? `0${rank}` : rank;
        } else {
            const copy = rank as 'page' | 'knight' | 'queen' | 'king';
            switch (copy) {
                case 'page':
                    fileNum = '11';
                    break;
                case 'knight':
                    fileNum = '12';
                    break;
                case 'queen':
                    fileNum = '13';
                    break;
                case 'king':
                    fileNum = '14';
                    break;
                default:
                    break;
            }
        }
        return '/' + fileName + fileNum + '.jpg';
    };
    const filePath = path.resolve(__dirname, '../server/src/static/tarotImgs/');
    return res.sendFile(filePath + parseReqToFileName(suit, rank));
};

export const sendNewImage = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const suit = req.params.suit as 'major' | 'wands' | 'cups' | 'swords' | 'coins';
    const name = req.query.name as string;
    const rank: string = req.params.rank;
    const convert = parseInt(rank) < 10 ? `0${rank}` : rank;
    const fileName =
        suit !== 'major' ? `${suit.replace(/^[A-Z]/, (m) => m.toUpperCase())}${convert}` : `${convert}-${name}`;

    const filePath = path.resolve(__dirname, '../server/src/static/Cards-jpg/');

    return res.sendFile(filePath + '/' + fileName + '.jpg');
};

export type V1 = typeof tarotData[0];

export type V2 = typeof moreTarotData[0];

export const tarot1: V1[] = tarotData;

export const tarot2: V2[] = moreTarotData;

type NewTypeV1 = {
    fortune_telling: string[];
    keywords: string[];
    meanings: {
        light: string[];
        shadow: string[];
    };
    name: string;
    rank: string;
    suit: string;
};

interface Tarot extends NewTypeV1 {
    desc: string;
    type: string;
    meaning_up: string;
    meaning_rev: string;
    roman_numerals: string;
    rank_int: number;
    image: string;
}

export const int2roman = (original: number): string => {
    if (original < 1 || original > 3999) {
        throw new Error('Error: Input integer limited to 1 through 3,999');
    }

    const numerals = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
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

export const tarotDataCombined = (set1: V1[], set2: V2[]): Tarot[] => {
    const result: Tarot[] = [];
    set1.forEach((v1: V1) => {
        const copy = v1 as Tarot;

        const m = set2.find((v2: V2) => {
            if (v1.suit === 'coins') {
                if (v2.suit === 'pentacles') {
                    if (v1.rank === v2.value_int || v1.rank === v2.value) {
                        copy.suit = 'pentacles';
                        return true;
                    }
                }
            } else if (v1.suit === v2.suit || v1.suit === v2.type) {
                if (v1.rank === v2.value_int || v1.rank === v2.value) {
                    console.log('🚀 ~ file: tarot.controller.ts:111 ~ m ~ v2:', v2);

                    return true;
                }
            }
        });
        if (m) {
            copy.desc = m?.desc;
            copy.type = m?.type;
            copy.meaning_up = m?.meaning_up;
            copy.meaning_rev = m?.meaning_rev;
            copy.rank_int = m?.value_int;
            copy.name = m?.name;
            copy.image = '';
            copy.roman_numerals = m?.value_int > 0 ? int2roman(m?.value_int) : 'ZERO';
            // if (copy.type !== 'major' || copy.rank === 1) copy.rank = 'ace';
            result.push(copy);
        }
    });
    return result;
};

const getAllNew = (_req: Request, res: Response, _next: NextFunction): void => {
    const data = finalTarot;
    res.json(data);
};

export default { getAll, fetchOneImage, getAllNew, sendNewImage };
