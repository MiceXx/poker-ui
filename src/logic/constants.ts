
export enum CardSuit {
    Spades = 'Spades',
    Heart = 'Hearts',
    Diamonds = 'Diamonds',
    Clubs = 'Clubs',
}

export const rankMap: { [key: string]: number } = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    1: 10,  //  first letter of 10 mapped
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
    t: 10,
    j: 11,
    q: 12,
    k: 13,
    a: 14,
};

export const suitMap: { [key: string]: CardSuit } = {
    S: CardSuit.Spades,
    H: CardSuit.Heart,
    D: CardSuit.Diamonds,
    C: CardSuit.Clubs,
    s: CardSuit.Spades,
    h: CardSuit.Heart,
    d: CardSuit.Diamonds,
    c: CardSuit.Clubs,
};