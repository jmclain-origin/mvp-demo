import { V1, V2 } from './V1';
import { int2roman } from './int2roman';
import { Tarot } from './NewTypeV1';

const findNewMatchFromOld = (v1: V1, set2: V2[]) =>
    set2.find((v2: V2) => {
        if (v1.suit === 'coins') {
            if (v2.suit === 'pentacles') {
                if (v1.rank === v2.value_int || v1.rank === v2.value) {
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
export const tarotDataCombined = (set1: V1[], set2: V2[]): Tarot[] => {
    const result: Tarot[] = [];
    set1.forEach((v1: V1) => {
        const copy = v1 as Tarot;
        const m = findNewMatchFromOld(v1, set2);
        if (m) {
            if (copy.suit === 'coins') copy.suit = 'pentacles';
            copy.desc = m?.desc;
            copy.type = m?.type;
            copy.meaning_up = m?.meaning_up;
            copy.meaning_rev = m?.meaning_rev;
            copy.rank_int = m?.value_int;
            copy.name = m?.name;
            copy.image = '';
            copy.roman_numerals = m?.value_int > 0 ? int2roman(m?.value_int) : 'ZERO';
            result.push(copy);
        }
    });
    return result;
};
