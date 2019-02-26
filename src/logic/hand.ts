//tsc -w --outDir 'src/dist/' src/logic/hand.ts
//tsc --outDir 'src/dist/' src/logic/hand.ts | node src/dist/hand.js

import { Card } from './card';

const sortDecending = (a: number, b: number) => b - a

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
