"use strict";
//tsc -w --outDir 'src/dist/' src/logic/hand.ts
//tsc --outDir 'src/dist/' src/logic/hand.ts | node src/dist/hand.js
exports.__esModule = true;
var constants_1 = require("./constants");
var Card = /** @class */ (function () {
    function Card(card) {
        this.id = card;
        this.suit = constants_1.suitMap[card[card.length - 1]];
        this.rank = constants_1.rankMap[card[0]];
    }
    Card.prototype.print = function () {
        console.log(this.id + ": " + this.rank + " " + this.suit);
    };
    return Card;
}());
var testCard = new Card('5S');
testCard.print();
var testCard2 = new Card('10H');
testCard2.print();
var testCard3 = new Card('JC');
testCard3.print();
var testCard4 = new Card('AD');
testCard4.print();
var Hand = /** @class */ (function () {
    function Hand(cards) {
    }
    return Hand;
}());
exports.Hand = Hand;
