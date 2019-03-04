import { ALL_CARDS } from '../constants';
import { Hand } from './Hand';
import { Card } from './Card';

export class Holdem {
    availableCards: Array<string>;
    communityCards: Array<string>;
    playerCards: Array<Array<string>>;
    numPlayers: number;
    numAvailableCards: number;
    numAssumedOutstanding: number;

    constructor() {
        this.availableCards = ALL_CARDS;
        this.communityCards = [];
        this.playerCards = [[]];
        this.numPlayers = 0;
        this.numAvailableCards = 52;
        this.numAssumedOutstanding = 52;
    }

    addCommunityCard(card: string) {
        let idx = this.availableCards.indexOf(card);
        if (idx === -1) throw `${card} is not an available card`;
        if (this.communityCards.length >= 5) throw `Only 5 community cards can be selected`;
        this.availableCards.splice(idx, 1);
        this.communityCards.push(card);
        this.numAvailableCards--;
        this.numAssumedOutstanding--;
    }

    removeCommunityCard(card: string) {
        let idx = this.communityCards.indexOf(card);
        if (idx === -1) throw `${card} is not a community card`;
        if (this.communityCards.length === 0) throw `There are no community cards to remove`;
        this.communityCards.splice(idx);
        this.availableCards.push(card);
        this.numAvailableCards++;
        this.numAssumedOutstanding++;
    }

    addPlayer() {
        if (this.numPlayers >= 9) throw `Max 9 players allowed`;
        this.playerCards.push(['Back', 'Back']);
        this.numPlayers++;
        this.numAssumedOutstanding = this.numAssumedOutstanding - 2;
    }

    removePlayer() {
        if (this.numPlayers <= 9) throw `No more players to remove`;
        this.playerCards.pop();
        this.numPlayers--;
        this.numAssumedOutstanding = this.numAssumedOutstanding + 2;
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
        this.numAvailableCards = this.numAvailableCards - 2;

        this.playerCards[player] = cards;
    }

}