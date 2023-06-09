import { Request, Response, NextFunction } from 'express';
import path from 'path';
import tarotData from '@server/data/tarotJson';

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

export default { getAll, fetchOneImage };
