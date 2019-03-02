
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

export const handScores: { [key: string]: number } = { //TODO NEED TO FINISH
    '14,13,12,11,10': 909,
    '13,12,11,10,9': 908,
    '12,11,10,9,8': 907,
    '11,10,9,8,7': 906,
    '10,9,8,7,6': 905,
    '9,8,7,6,5': 904,
    '8,7,6,5,4': 903,
    '7,6,5,4,3': 902,
    '6,5,4,3,2': 901,
    '14,5,4,3,2': 900,
};