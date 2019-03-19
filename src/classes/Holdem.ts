import { ALL_CARDS } from '../constants';
import { Hand } from './Hand';
import { Card } from './Card';

function getRandom(arr: Array<string>, n: number) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export class Holdem {
    availableCards: Array<string>;
    communityCards: Array<string>;
    playerCards: Array<Array<string>>;
    numPlayers: number;
    numAvailableCards: number;

    constructor(options: any) {

        const defaults = {
            availableCards: ALL_CARDS.slice(),
            communityCards: [],
            playerCards: [],
        };
        const gameState = Object.assign(defaults, options);
        this.availableCards = gameState.availableCards;
        this.communityCards = gameState.communityCards;
        this.playerCards = gameState.playerCards;
        this.numPlayers = gameState.playerCards.length;
        this.numAvailableCards = gameState.availableCards.length;
    }

    addCommunityCard(card: string) {
        let idx = this.availableCards.indexOf(card);
        if (idx === -1) throw `${card} is not an available card`;
        if (this.communityCards.length >= 5) throw `Only 5 community cards can be selected`;
        this.availableCards.splice(idx, 1);
        this.communityCards.push(card);
        this.numAvailableCards--;
    }

    removeCommunityCard(card: string) {
        let idx = this.communityCards.indexOf(card);
        if (idx === -1) throw `${card} is not a community card`;
        this.communityCards.splice(idx, 1);
        this.availableCards.push(card);
        this.numAvailableCards++;
    }

    addPlayers(n: number) {
        if (n < 1 || n > 9) throw 'Enter a number between 1 and 9';
        if (this.numPlayers + n > 9) throw `Max 9 players allowed`;
        for (let i = 0; i < n; i++) {
            this.playerCards.push(['Back', 'Back']);
        }
        this.numPlayers = this.numPlayers + n;
        this.numAvailableCards = this.numAvailableCards - 2 * n;
    }

    removePlayers(n: number) {
        if (n < 1 || n > 9) throw 'Enter a number between 1 and 9';
        if (this.numPlayers - n < 0) throw `No more players to remove`;
        for (let i = 0; i < n; i++) {
            this.playerCards.pop();
        }
        this.numPlayers = this.numPlayers - n;
        this.numAvailableCards = this.numAvailableCards + 2 * n;
    }

    setPlayerCards(player: number, cards: Array<string>) {
        if (cards.length !== 2) throw `specify exactly 2 cards. Use 'Back' for unknown cards`;
        if (this.numPlayers - 1 < player) throw `Player ${player} does not exist`;
        let idx1 = this.availableCards.indexOf(cards[0]);
        let idx2 = this.availableCards.indexOf(cards[1]);
        if (idx1 === -1) throw `${cards[0]} is not an available card`;
        if (idx2 === -1) throw `${cards[1]} is not an available card`;
        this.availableCards.splice(idx1, 1);

        idx2 = this.availableCards.indexOf(cards[1]);
        this.availableCards.splice(idx2, 1);
        this.playerCards[player] = cards;
    }

    computeWinPercents(): Array<number> {
        if (this.communityCards.length === 5) {
            let scores = [];
            for (let i = 0; i < this.playerCards.length; i++) {
                scores[i] = Holdem.computeHandScore(this.playerCards[i], this.communityCards);
            }
            return Holdem.computeWinnerDistributions(scores);
        }
        let simLimit = 5000;
        let computedAvgScores: number[] = [];

        for (let i = 1; i < simLimit; i++) {
            let scores = [];
            for (let j = 0; j < this.playerCards.length; j++) {
                if (this.playerCards[j][0].length > 2 || this.playerCards[j][1].length > 2) {
                    scores[j] = 2560839; //"Average"
                } else {
                    let cc = [...this.communityCards.slice(), ...getRandom(this.availableCards, 5 - this.communityCards.length)];
                    scores[j] = Holdem.computeHandScore(this.playerCards[j], cc);
                }
            }
            let curSimScore = Holdem.computeWinnerDistributions(scores);
            if (computedAvgScores.length > 0) {
                for (let j = 0; j < curSimScore.length; j++) {
                    computedAvgScores[j] = (curSimScore[j] + computedAvgScores[j]) / 2.0;
                }
            } else {
                computedAvgScores = curSimScore;
            }

        }
        return computedAvgScores;
    }

    static getCombinations(arr: Array<string>, k: number): Array<Array<string>> {
        let allCombinations: Array<Array<string>> = [];
        function combinationHelper(arr: Array<string>, k: number, curIndex: number, cur: Array<string>) {
            if (k === 0) {
                return allCombinations.push(cur);
            }
            for (let i = curIndex; i < arr.length; i++) {
                const curCopy = cur.slice();
                curCopy.push(arr[i]);
                combinationHelper(arr, k - 1, i + 1, curCopy);
            }
        }
        combinationHelper(arr, k, 0, []);

        return allCombinations;
    }

    static findBestHand(hand: Array<string>, board: Array<string>): Hand {
        const allCards = [...hand, ...board];
        const allCombinations = Holdem.getCombinations(allCards, 5);
        let bestHandValue = 0;
        let bestHand: any;
        for (let i = 0; i < allCombinations.length; i++) {
            const h = new Hand(allCombinations[i]);
            let handValue = h.getScore();
            if (handValue > bestHandValue) {
                bestHandValue = handValue;
                bestHand = h;
            }
        }
        return bestHand;
    }

    static computeHandScore(hand: Array<string>, board: Array<string>): number {
        const besthand = this.findBestHand(hand, board);
        return besthand.getScore();
    }

    static computeWinnerDistributions(scores: Array<number>): Array<number> {
        let maxVal = -1;
        let numMax = 1;
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > maxVal) {
                maxVal = scores[i];
                numMax = 1;
            } else if (scores[i] === maxVal) {
                numMax++;
            }
        }
        return scores.map(s => s === maxVal ? 1.0 / numMax : 0);
    }
}
