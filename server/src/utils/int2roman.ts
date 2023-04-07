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
