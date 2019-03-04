//tsc -w --outDir 'src/dist/' src/logic/hand.ts
//tsc --outDir 'src/dist/' src/logic/hand.ts | node src/dist/hand.js

import { rankMap, suitMap, CardSuit } from './constants';

export class Card {
    id: string;
    suit: CardSuit;
    rank: number;

    constructor(card: string) {
        this.id = card;
        this.suit = suitMap[card[card.length - 1]];
        this.rank = rankMap[card[0]];
        this.validate();
    }

    validate() {
        if (this.id === undefined || this.id === '') throw 'You must specify the Rank and Suit';
        if (this.rank === undefined || this.suit === undefined) throw `Invalid Card ${this.id}`;
    }

    get() {
        return `${this.id}: ${this.rank} ${this.suit}`;
    }

}