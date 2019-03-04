//tsc -w --outDir 'src/dist/' src/logic/hand.ts
//tsc --outDir 'src/dist/' src/logic/hand.ts | node src/dist/hand.js

import { Card } from './Card';

export class Hand {
    raw: Array<string>;
    cards: Array<Card>;
    _sortedCardRanks: Array<number>;  //needed for hand computations
    score: number = 0;

    constructor(cards: Array<string>) {
        this.raw = cards;
        this.cards = cards.map(card => new Card(card));
        this._sortedCardRanks = [];
        this._sortPokerHand();
        this._validate();
    }

    getScore() {
        if (this._isStraightFlush()) {
            if (this._sortedCardRanks[0] === 14 && this._sortedCardRanks[1] === 5) {
                this.score = 9000000;
            }
            else this.score = 9000000 + this._sortedCardRanks[0];
        }
        else if (this._isFourOfAKind()) {
            this.score = 8000000 + this._sortedCardRanks[1];
        }
        else if (this._isFullHouse()) {
            this.score = 7000000 + this._sortedCardRanks[2];
        }
        else if (this._isFlush()) {
            this.score = 6000000 + Hand.evalArrayBinValue(this._sortedCardRanks);
        }
        else if (this._isStraight()) {
            this.score = 5000000 + Hand.evalArrayBinValue(this._sortedCardRanks);
        }
        else if (this._isThreeOfAKind()) {
            this.score = 4000000 + Hand.evalArrayBinValue(this._sortedCardRanks);
        }
        else if (this._isTwoPairs()) {
            this.score = 3000000 + Hand.evalArrayBinValue(this._sortedCardRanks);
        }
        else if (this._isPair()) {
            this.score = 2000000 + Hand.evalArrayBinValue(this._sortedCardRanks);
        }
        else {
            this.score = 1000000 + Hand.evalArrayBinValue(this._sortedCardRanks);
        }
        return this.score;
    }

    _validate() {
        if (this.raw.length < 5) throw 'You need 5 cards to create a hand!';
        if ((new Set(this.raw)).size !== 5) throw 'Hands cannot have duplicate cards';
    }

    _sortPokerHand() {
        const sortDecending = (a: number, b: number) => b - a;
        const sortedCards = (this.cards.map(card => card.rank)).sort(sortDecending);
        if (sortedCards[2] === sortedCards[3] &&
            sortedCards[3] === sortedCards[4]
            && sortedCards[4] === sortedCards[5]) {
            return this._sortedCardRanks = [...sortedCards.slice(-4), ...sortedCards.slice(0, 1)];
        }
        if (sortedCards[3] === sortedCards[4]
            && sortedCards[4] === sortedCards[5]) {
            return this._sortedCardRanks = [...sortedCards.slice(-3), ...sortedCards.slice(0, 2)];
        }

        let freqMap: any = {};

        const getHighestCardObjIndex = () => {
            let highestFreq = 0;
            let highestCard = 0;
            let highest = '';
            for (let i in freqMap) {
                if (freqMap[i].freq > highestFreq) {
                    highest = i;
                    highestFreq = freqMap[i].freq;
                    highestCard = freqMap[i].card;
                }
                else if (freqMap[i].freq === highestFreq) {
                    if (freqMap[i].card > highestCard) {
                        highest = i;
                        highestFreq = freqMap[i].freq;
                        highestCard = freqMap[i].card;
                    }
                }
            }
            return highest;
        }
        const repeat = (num: any, repeat: number) => {
            let arr = [];
            for (let i = 0; i < repeat; i++) {
                arr.push(num);
            }
            return arr;
        }

        sortedCards.forEach(card => {
            if (card in freqMap) freqMap[card].freq = freqMap[card].freq + 1;
            else freqMap[card] = { card, freq: 1 };
        });
        while (Object.keys(freqMap).length > 0) {
            let i = getHighestCardObjIndex();
            this._sortedCardRanks.push(...repeat(freqMap[i].card, freqMap[i].freq));
            delete freqMap[i];
        }

    }

    _isStraightFlush() {
        return this._isFlush() && this._isStraight();
    }

    _isFourOfAKind() {
        return this._sortedCardRanks[0] === this._sortedCardRanks[3];
    }

    _isFullHouse() {
        return this._sortedCardRanks[0] === this._sortedCardRanks[2]
            && this._sortedCardRanks[3] === this._sortedCardRanks[4];
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
        return this._sortedCardRanks[0] === this._sortedCardRanks[2];
    }

    _isTwoPairs() {
        return this._sortedCardRanks[0] === this._sortedCardRanks[1]
            && this._sortedCardRanks[2] === this._sortedCardRanks[3];
    }

    _isPair() {
        return this._sortedCardRanks[0] === this._sortedCardRanks[1];
    }


    /*  Converts an array of numbers into a number based on a most significant value first ordering.
    e.g. [14,13,9,8,3], [2,2,13,8,3], [3,3,3,3,7] */
    static evalArrayBinValue = (arr: Array<number>): number => {
        let val = 0;
        arr.forEach(a => {
            val = (val << 4) + a;
        });
        return val;
    }
}
