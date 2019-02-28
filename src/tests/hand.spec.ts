import { Hand, evalArrayBinValue } from '../logic/hand';

describe('Creates Hand from array of strings', () => {
  test('Basic array', () => {
    const card1 = new Hand(['10C', 'AS', '3D', 'QH', 'JC']);
    expect(card1.cards).toHaveLength(5);
    expect(card1.score).toEqual(0);
  });
  test('Failure with insufficient arguments', () => {
    expect(() => new Hand(['10C', 'AS', '3D', 'QH'])).toThrowError(/You need 5 cards/);
  });
  test('Failure with duplicates', () => {
    expect(() => new Hand(['10C', 'AS', '3D', 'JC', 'JC'])).toThrowError(/cannot have duplicate/);
  });
});

describe('Test Straight Flush', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'KS', 'QS', 'JS', '10S']);
    const card2 = new Hand(['5H', '4H', '8H', '6H', '7H']);
    const card3 = new Hand(['4C', '5C', 'AC', '3C', '2C']);
    expect(card1._isStraightFlush()).toBeTruthy();
    expect(card2._isStraightFlush()).toBeTruthy();
    expect(card3._isStraightFlush()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KS', 'QC', 'JS', '10S']);
    const card2 = new Hand(['5H', '4H', '10H', '6H', '7H']);
    const card3 = new Hand(['4C', '5C', 'AC', 'KC', '2C']);
    expect(card1._isStraightFlush()).toBeFalsy();
    expect(card2._isStraightFlush()).toBeFalsy();
    expect(card3._isStraightFlush()).toBeFalsy();
  });
});

describe('Test Four of a Kind', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'AC', 'AH', 'KS', 'AD']);
    const card2 = new Hand(['7H', '4D', '7D', '7C', '7S']);
    const card3 = new Hand(['6C', '10H', '10C', '10S', '10D']);
    expect(card1._isFourOfAKind()).toBeTruthy();
    expect(card2._isFourOfAKind()).toBeTruthy();
    expect(card3._isFourOfAKind()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KC', 'AH', 'KS', 'AD']);
    const card2 = new Hand(['7H', '4D', '2D', '3C', '7S']);
    const card3 = new Hand(['4C', '5C', 'AC', '3C', '2C']);
    expect(card1._isFourOfAKind()).toBeFalsy();
    expect(card2._isFourOfAKind()).toBeFalsy();
    expect(card3._isFourOfAKind()).toBeFalsy();
  });
});

describe('Test Full House', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'AC', 'AH', 'KS', 'KD']);
    const card2 = new Hand(['7H', '4D', '4S', '7C', '7S']);
    const card3 = new Hand(['6C', '10H', '10C', '10S', '6D']);
    expect(card1._isFullHouse()).toBeTruthy();
    expect(card2._isFullHouse()).toBeTruthy();
    expect(card3._isFullHouse()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KC', 'AH', 'AC', 'AD']);
    const card2 = new Hand(['7H', '3S', '3D', '3C', 'AS']);
    const card3 = new Hand(['4C', '3H', '2D', '3C', '2C']);
    expect(card1._isFullHouse()).toBeFalsy();
    expect(card2._isFullHouse()).toBeFalsy();
    expect(card3._isFullHouse()).toBeFalsy();
  });
});

describe('Test Flush', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'KS', 'QS', 'JS', '10S']);
    const card2 = new Hand(['9H', 'KH', 'AH', '6H', '7H']);
    const card3 = new Hand(['4C', '3C', '8C', '9C', '5C']);
    expect(card1._isFlush()).toBeTruthy();
    expect(card2._isFlush()).toBeTruthy();
    expect(card3._isFlush()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KS', 'QC', 'JS', '10C']);
    const card2 = new Hand(['5H', '4H', '10D', '6H', '7H']);
    const card3 = new Hand(['4C', '5S', 'AC', 'KC', '2D']);
    expect(card1._isFlush()).toBeFalsy();
    expect(card2._isFlush()).toBeFalsy();
    expect(card3._isFlush()).toBeFalsy();
  });
});

describe('Test Straight', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'KS', 'QS', 'JS', '10S']);
    const card2 = new Hand(['5H', '4H', '8H', '6H', '7H']);
    const card3 = new Hand(['4C', '5S', 'AC', '3H', '2C']);
    expect(card1._isStraight()).toBeTruthy();
    expect(card2._isStraight()).toBeTruthy();
    expect(card3._isStraight()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KS', 'QC', '9C', '10C']);
    const card2 = new Hand(['5H', '4H', '2H', '6H', '7H']);
    const card3 = new Hand(['4C', '5C', 'AC', 'KC', '2C']);
    expect(card1._isStraight()).toBeFalsy();
    expect(card2._isStraight()).toBeFalsy();
    expect(card3._isStraight()).toBeFalsy();
  });
});

describe('Test Three of a Kind', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'KS', 'KC', 'KD', '10S']);
    const card2 = new Hand(['4C', '4H', '8H', '6H', '4S']);
    const card3 = new Hand(['AC', '2S', 'AS', '2H', '2C']);
    expect(card1._isThreeOfAKind()).toBeTruthy();
    expect(card2._isThreeOfAKind()).toBeTruthy();
    expect(card3._isThreeOfAKind()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KS', 'QC', '9C', '10C']);
    const card2 = new Hand(['4S', '4H', '2H', '6H', '6S']);
    const card3 = new Hand(['4C', 'AS', 'AC', 'KC', 'JC']);
    expect(card1._isThreeOfAKind()).toBeFalsy();
    expect(card2._isThreeOfAKind()).toBeFalsy();
    expect(card3._isThreeOfAKind()).toBeFalsy();
  });
});

describe('Test Two Pairs', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'KS', 'KC', 'KD', 'AH']);
    const card2 = new Hand(['4C', '4H', '8H', '6H', '8S']);
    const card3 = new Hand(['AC', '3H', 'AS', '2H', '2C']);
    expect(card1._isTwoPairs()).toBeTruthy();
    expect(card2._isTwoPairs()).toBeTruthy();
    expect(card3._isTwoPairs()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KS', 'KC', 'KH', '10C']);
    const card2 = new Hand(['4S', '4H', '2H', '6H', '7S']);
    const card3 = new Hand(['AD', 'AS', 'AC', 'AH', 'JC']);
    expect(card1._isTwoPairs()).toBeFalsy();
    expect(card2._isTwoPairs()).toBeFalsy();
    expect(card3._isTwoPairs()).toBeFalsy();
  });
});

describe('Test Pair', () => {
  test('Test True', () => {
    const card1 = new Hand(['AS', 'KS', 'KC', 'KD', '10S']);
    const card2 = new Hand(['4C', '3H', '8H', '6H', '4S']);
    const card3 = new Hand(['AC', '2S', 'AD', '2H', '2C']);
    expect(card1._isPair()).toBeTruthy();
    expect(card2._isPair()).toBeTruthy();
    expect(card3._isPair()).toBeTruthy();
  });
  test('Test False', () => {
    const card1 = new Hand(['AS', 'KS', 'QC', '9C', '10C']);
    const card2 = new Hand(['4S', '3H', '2H', 'AH', '6S']);
    const card3 = new Hand(['4C', 'AS', 'QC', 'KC', 'JC']);
    expect(card1._isPair()).toBeFalsy();
    expect(card2._isPair()).toBeFalsy();
    expect(card3._isPair()).toBeFalsy();
  });
});

describe('Test bin Eval', () => {
  test('Test eval', () => {
    const arr1 = [14, 5, 4, 3, 2];
    const arr2 = [14, 14, 3, 3, 3];
    const arr3 = [8, 6, 5, 2, 1];
    const arr4 = [13, 10, 8, 6, 3];
    const arr5 = [14, 14, 14, 14, 13];
    expect(evalArrayBinValue(arr1)).toBe(939058);
    expect(evalArrayBinValue(arr2)).toBe(975667);
    expect(evalArrayBinValue(arr3)).toBe(550177);
    expect(evalArrayBinValue(arr4)).toBe(895075);
    expect(evalArrayBinValue(arr5)).toBe(978669);
  });
});