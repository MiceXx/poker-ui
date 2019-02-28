//tsc -w --outDir 'src/dist/' src/logic/hand.ts
//tsc --outDir 'src/dist/' src/logic/hand.ts | node src/dist/hand.js

import { Card } from './card';

const sortDecending = (a: number, b: number) => b - a;

/*
Converts an array of numbers into a number based on a most significant value first ordering.
e.g. [14,13,9,8,3], [2,2,13,8,3], [3,3,3,3,7]
*/
export const evalArrayBinValue = (arr: Array<number>): number => {
    let val = 0;
    arr.forEach(a => {
        val = (val << 4) + a;
    });
    return val;
}

export class Hand {
    raw: Array<string>;
    cards: Array<Card>;
    _sortedCardRanks: Array<number>;  //useful for hand computations
    score: number = 0;

    constructor(cards: Array<string>) {
        this.raw = cards;
        this.cards = cards.map(card => new Card(card));
        this._sortedCardRanks = (this.cards.map(card => card.rank)).sort(sortDecending);
        this.validate();
    }

    validate() {
        if (this.raw.length < 5) throw 'You need 5 cards to create a hand!';
        if ((new Set(this.raw)).size !== 5) throw 'Hands cannot have duplicate cards';
    }

    getScore() {
        let score = 0;
        if (this._isStraightFlush()) {
            if (this._sortedCardRanks[0] === 14 && this._sortedCardRanks[1] === 5) score = 900;
            else score = 90000000 + this._sortedCardRanks[0];
        }
        else if (this._isFourOfAKind()) {
            score = 80000000 + this._sortedCardRanks[1];
        }
        else if (this._isFullHouse()) {
            score = 70000000 + this._sortedCardRanks[2];
        }
        else if (this._isFlush()) {
            score = 60000000 + 0; //TODO
        }
        else if (this._isStraight()) score = 400000;
        else if (this._isThreeOfAKind()) {
            score = 40000000 + this._sortedCardRanks[2];
        }
        else if (this._isTwoPairs()) score = 200000;
        else if (this._isPair()) score = 100000;



        this.score = score;
    }

    _isStraightFlush() {
        return this._isFlush() && this._isStraight();
    }

    _isFourOfAKind() {
        return this._sortedCardRanks[0] === this._sortedCardRanks[3]
            || this._sortedCardRanks[1] === this._sortedCardRanks[4];
    }

    _isFullHouse() {
        return (this._sortedCardRanks[0] === this._sortedCardRanks[2]
            && this._sortedCardRanks[3] === this._sortedCardRanks[4])
            || (this._sortedCardRanks[0] === this._sortedCardRanks[1]
                && this._sortedCardRanks[2] === this._sortedCardRanks[4]);
    }

    _isFlush() {
        return (new Set(this.cards.map(card => card.suit))).size === 1;
    }

    _isStraight() {
        return !this._isPair()
            && (this._sortedCardRanks[0] - this._sortedCardRanks[4] === 4
                || (this._sortedCardRanks[0] === 14
                    && this._sortedCardRanks[1] === 5
                    && this._sortedCardRanks[4] === 2));
    }

    _isThreeOfAKind() {
        return this._sortedCardRanks[0] === this._sortedCardRanks[2]
            || this._sortedCardRanks[1] === this._sortedCardRanks[3]
            || this._sortedCardRanks[2] === this._sortedCardRanks[4];
    }

    _isTwoPairs() {
        return !this._isFourOfAKind()
            && ((this._sortedCardRanks[0] === this._sortedCardRanks[1]
                && this._sortedCardRanks[2] === this._sortedCardRanks[3])
                || (this._sortedCardRanks[0] === this._sortedCardRanks[1]
                    && this._sortedCardRanks[3] === this._sortedCardRanks[4])
                || (this._sortedCardRanks[1] === this._sortedCardRanks[2]
                    && this._sortedCardRanks[3] === this._sortedCardRanks[4]));
    }

    _isPair() {
        return (new Set(this._sortedCardRanks)).size !== 5;
    }
}
