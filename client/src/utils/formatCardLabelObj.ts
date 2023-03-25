import { CardT } from '@client/components/TarotPageComponents';
import { int2roman } from './int2roman';
import { rank2Num } from './rank2Num';

export const formatCardLabelObj = (
    suit: string,
    rank: string | number,
    name: string,
): { roman: string; title: string; mathVal: number } => {
    let title = '';
    let roman = '';
    let mathVal = 0;
    switch (suit) {
        case 'major':
            title = name;
            roman = +rank > 0 ? int2roman(+rank) : '0';
            mathVal = +rank;
            break;
        case 'cups':
        case 'wands':
        case 'swords':
        case 'coins':
            if (+rank === 1) {
                mathVal = +rank;
                roman = int2roman(+rank);
                title = 'Ace of ' + suit.replace(/^([A-Z])/i, (m) => m.toUpperCase());
            } else if (+rank <= 10) {
                const prefixTitle = name.split(' ')[0].replace(/^([A-Z])/i, (m) => m.toUpperCase());
                const suffixSuit = suit === 'coins' ? 'Pentacles' : suit.replace(/^([A-Z])/i, (m) => m.toUpperCase());
                mathVal = +rank;
                roman = int2roman(+rank);
                title = prefixTitle + ' of ' + suffixSuit;
            } else {
                console.log('i hit');
                mathVal = rank2Num(rank as string);
                roman = int2roman(rank2Num(rank as string));
                const prefixTitle = name.split(' ')[0].replace(/^([A-Z])/i, (m) => m.toUpperCase());
                const suffixSuit = suit === 'coins' ? 'Pentacles' : suit.replace(/^([A-Z])/i, (m) => m.toUpperCase());
                title = prefixTitle + ' of ' + suffixSuit;
            }
            break;
        default:
            break;
    }
    return { roman, title, mathVal };
};
export type CardPropsT = {
    card: CardT;
};
