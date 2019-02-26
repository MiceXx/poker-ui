"use strict";
exports.__esModule = true;
var CardSuit;
(function (CardSuit) {
    CardSuit["Spades"] = "Spades";
    CardSuit["Heart"] = "Hearts";
    CardSuit["Diamonds"] = "Diamonds";
    CardSuit["Clubs"] = "Clubs";
})(CardSuit = exports.CardSuit || (exports.CardSuit = {}));
exports.rankMap = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    1: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
};
exports.suitMap = {
    S: CardSuit.Spades,
    H: CardSuit.Heart,
    D: CardSuit.Diamonds,
    C: CardSuit.Clubs
};
