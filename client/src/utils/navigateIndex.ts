export function navigateIndex(index: number | null, arrLength: number): number {
    if (index !== null) {
        if (index + 1 < arrLength) return index + 1;
        else if (index > 0) return index - 1;
        else return index;
    } else return 0;
}
