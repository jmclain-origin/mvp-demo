type NewTypeV1 = {
    fortune_telling: string[];
    keywords: string[];
    meanings: {
        light: string[];
        shadow: string[];
    };
    name: string;
    rank: string | number;
    suit: string;
};

export interface Tarot extends NewTypeV1 {
    desc: string;
    type: string;
    meaning_up: string;
    meaning_rev: string;
    roman_numerals: string;
    rank_int: number;
    image: string;
}
