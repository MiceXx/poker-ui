import { ALL_CARDS } from '../constants';
import { Hand } from './Hand';
import { Card } from './Card';

export class Holdem {
    availableCards: Array<string>;
    communityCards: Array<string>;
    playerCards: Array<Array<string>>;
    numPlayers: number;
    numAvailableCards: number;

    constructor() {
        this.availableCards = ALL_CARDS;
        this.communityCards = [];
        this.playerCards = [];
        this.numPlayers = 0;
        this.numAvailableCards = 52;
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
        if (this.communityCards.length === 0) throw `There are no community cards to remove`;
        this.communityCards.splice(idx);
        this.availableCards.push(card);
        this.numAvailableCards++;
    }

    addPlayers(n: number = 1) {
        if (n < 1 || n > 9) throw 'Enter a number between 1 and 9';
        if (this.numPlayers + n > 9) throw `Max 9 players allowed`;
        for (let i = 0; i < n; i++) {
            this.playerCards.push(['Back', 'Back']);
        }
        this.numPlayers = this.numPlayers + n;
        this.numAvailableCards = this.numAvailableCards - 2 * n;
    }

    removePlayers(n: number = 1) {
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
        let idx1 = this.communityCards.indexOf(cards[0]);
        let idx2 = this.communityCards.indexOf(cards[1]);
        if (idx1 === -1) throw `${cards[0]} is not an available card`;
        if (idx2 === -1) throw `${cards[1]} is not an available card`;
        if (this.numPlayers < player) throw `Player ${player} does not exist`;
        this.availableCards.splice(idx1, 1);
        this.availableCards.splice(idx2, 1);
        this.playerCards[player] = cards;
    }

    computeWinPercent() {

    }

    static getCombinations(arr: Array<string>, len: number): Array<Array<string>> {
        let allCombinations: Array<Array<string>> = [];
        function combinationHelper(arr: Array<string>, len: number, cur: Array<string> = []) {
            if (len > 0) {
                for (let i = 0; i < arr.length; i++) {
                    cur.push(arr[i]);
                    combinationHelper(arr, len - 1, cur);
                }
            } else {
                allCombinations.push(cur);
            }
        }
        combinationHelper(arr, len);
        return allCombinations;
    }

    static findBestHand(hand: Array<string>, board: Array<string>) {
        const allCards = [...hand, ...board];
        const allCombinations = Holdem.getCombinations(allCards, 5);
        let bestHandValue = 0;
        let bestHand;
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
}

