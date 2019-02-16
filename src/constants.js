export const CARD_RANKS = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
];

export const CARD_SUITS = [
    'S', 'H', 'D', 'C',
];

export const ALL_CARDS = [];

export const ALL_SEATS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

CARD_SUITS.forEach(suit => CARD_RANKS.map(rank => ALL_CARDS.push(`${rank}${suit}`)));
