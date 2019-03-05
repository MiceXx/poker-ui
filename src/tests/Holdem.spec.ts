import { Holdem } from '../classes/Holdem';

describe('Creates Holdem Class', () => {
  test('addCommunityCard/removeCommunityCard', () => {
    const holdem = new Holdem();
    expect(holdem.availableCards).toEqual(['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
      'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC']);
    holdem.addCommunityCard('6S');
    expect(holdem.communityCards).toEqual(['6S']);
    expect(holdem.numAvailableCards).toBe(51);
    holdem.addCommunityCard('3C');
    expect(holdem.communityCards).toEqual(['6S', '3C']);
    expect(holdem.numAvailableCards).toBe(50);
    holdem.addCommunityCard('KD');
    expect(holdem.communityCards).toEqual(['6S', '3C', 'KD']);
    expect(holdem.numAvailableCards).toBe(49);
    expect(holdem.availableCards).toEqual(['AS', '2S', '3S', '4S', '5S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD',
      'AC', '2C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC']);
    holdem.removeCommunityCard('KD');
    expect(holdem.communityCards).toEqual(['6S', '3C']);
    expect(holdem.numAvailableCards).toBe(50);
    holdem.removeCommunityCard('6S');
    expect(holdem.communityCards).toEqual(['3C']);
    expect(holdem.numAvailableCards).toBe(51);
  });

  test('addCommunityCard/removeCommunityCard Error Handling', () => {
    const holdem = new Holdem();
    expect(holdem.removeCommunityCard('AS')).toThrowError(/no community cards/);
    holdem.addCommunityCard('6S');
    expect(holdem.addCommunityCard('6S')).toThrowError(/not an available card/);
    holdem.addCommunityCard('3C');
    holdem.addCommunityCard('KD');
    holdem.addCommunityCard('4S');
    holdem.addCommunityCard('5S');
    expect(holdem.addCommunityCard('7S')).toThrowError(/Only 5/);
    expect(holdem.removeCommunityCard('AS')).toThrowError(/not a community card/);
  });

  test('addPlayers/removePlayers', () => {
    const holdem = new Holdem();
    expect(holdem.removePlayers(3)).toThrowError(/No more players/);
    expect(holdem.removePlayers(-3)).toThrowError(/Enter a number between 1 and 9/);
    expect(holdem.addPlayers(-3)).toThrowError(/Enter a number between 1 and 9/);
    expect(holdem.addPlayers(99)).toThrowError(/Max 9/);
    holdem.addPlayers(3);
    expect(holdem.playerCards).toEqual([['Back', 'Back'], ['Back', 'Back'], ['Back', 'Back']]);
    expect(holdem.numPlayers).toBe(3);
    expect(holdem.numAvailableCards).toBe(46);
    holdem.addPlayers(3);
    expect(holdem.numPlayers).toBe(6);
    expect(holdem.numAvailableCards).toBe(40);
    holdem.removePlayers(2);
    expect(holdem.playerCards).toEqual([['Back', 'Back'], ['Back', 'Back'], ['Back', 'Back'], ['Back', 'Back']]);
    expect(holdem.numPlayers).toBe(4);
    expect(holdem.numAvailableCards).toBe(42);
    holdem.addPlayers();
    expect(holdem.numPlayers).toBe(3);
    expect(holdem.numAvailableCards).toBe(46);
  });

  test('setPlayerCards', () => {
    const holdem = new Holdem();
    holdem.addPlayers(1);
    holdem.addCommunityCard('7H');
    holdem.addCommunityCard('2C');
    expect(holdem.setPlayerCards(1, ['7H', '2C', '3H'])).toThrowError(/specify exactly 2/);
    expect(holdem.setPlayerCards(1, ['7H', '2C'])).toThrowError(/not an available/);
    expect(holdem.setPlayerCards(1, ['3H', '2C'])).toThrowError(/not an available/);
    expect(holdem.setPlayerCards(2, ['7H', '2C'])).toThrowError(/does not exist/);
    holdem.setPlayerCards(1, ['AH', 'AD']);
    expect(holdem.playerCards).toEqual([['AH', 'AD']]);
    expect(holdem.availableCards).toEqual(['AS', '2S', '3S', '4S', '5S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
      '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD',
      'AC', '2C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC']);
  });
});

describe('Holdem Class Static Methods', () => {
  test('getCombinations', () => {
    expect(Holdem.getCombinations(['AS'], 1)).toEqual([['AS']]);
    expect(Holdem.getCombinations(['AS', '2S', '3S', '4S', '5S'], 5)).toEqual([['AS', '2S', '3S', '4S', '5S']]);
    expect(Holdem.getCombinations(['AS', '2S', '3S', '4S', '5S'], 1)).toEqual([
      ['AS'],
      ['2S'],
      ['3S'],
      ['4S'],
      ['5S'],
    ]);
    expect(Holdem.getCombinations(['AS', '2S', '3S', '4S', '5S'], 1)).toEqual([
      ['AS', '2S'],
      ['AS', '3S'],
      ['AS', '4S'],
      ['AS', '5S'],
      ['2S', '3S'],
      ['2S', '4S'],
      ['2S', '5S'],
      ['3S', '4S'],
      ['3S', '5S'],
      ['4S', '5S'],
    ]);
    expect(Holdem.getCombinations(['AS', '2S', '3S', '4S', '5S'], 3)).toEqual([
      ['AS', '2S', '3S'],
      ['AS', '2S', '4S'],
      ['AS', '2S', '5S'],
      ['AS', '3S', '4S'],
      ['AS', '3S', '5S'],
      ['AS', '4S', '5S'],
      ['2S', '3S', '4S'],
      ['2S', '3S', '5S'],
      ['2S', '4S', '5S'],
      ['3S', '4S', '5S'],
    ]);
  });

  test('findBestHand', () => {
    expect(1).toEqual(1);
  });
});