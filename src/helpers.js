
export function sortCards(a, b) {
    const rankMap = {
        A: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        1: 10,
        J: 11,
        Q: 12,
        K: 13
    }
    const a_suit = a.charAt(a.length - 1);
    const b_suit = b.charAt(b.length - 1);
    let a_rank = a.charAt(0);
    let b_rank = b.charAt(0);
    let suitComp = b_suit.localeCompare(a_suit);
    if (suitComp !== 0) return suitComp;
    return rankMap[a_rank] > rankMap[b_rank];
}