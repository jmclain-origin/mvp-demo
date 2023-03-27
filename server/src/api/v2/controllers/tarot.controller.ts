import { Request, Response, NextFunction } from 'express';
import path from 'path';
import finalTarot from '@server/data/finalTarot';

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
    const data = finalTarot;
    res.json(data);
};

export default { getAllNew, sendNewImage };
