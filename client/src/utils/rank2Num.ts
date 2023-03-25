export const rank2Num = (rank: 'page' | 'knight' | 'queen' | 'king' | string): number => {
    if (rank === 'page') return 11;
    if (rank === 'knight') return 12;
    if (rank === 'queen') return 13;
    if (rank === 'king') return 14;
    return 0;
};
