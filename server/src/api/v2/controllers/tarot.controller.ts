import { Request, Response, NextFunction } from 'express';
import path from 'path';
import finalTarot from '@server/data/finalTarot';
import { shuffleDeck } from '../../../utils/shuffleDeck';
import { addImgUrlPath } from '../../../utils/addImgUrlPath';

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

const getAllNew = (_req: Request, res: Response, _next: NextFunction): void => {
    const data = addImgUrlPath(finalTarot);
    res.json(data);
};

const getByCount = (req: Request, res: Response, _next: NextFunction): Response<void> => {
    const count = req.query.count as string;
    if (count && !isNaN(parseInt(count))) {
        const drawings = shuffleDeck(finalTarot, +count);
        if (drawings.length === +count) {
            const data = addImgUrlPath(drawings);
            return res.status(200).json(data);
        } else {
            return res.status(400).json({ error: 'Invalid count' });
        }
    } else {
        return res.status(500).json({ error: 'Missing count query' });
    }
};

export default { getAllNew, sendNewImage, getByCount };
