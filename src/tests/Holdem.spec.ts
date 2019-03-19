import { Holdem } from '../classes/Holdem';

describe('Creates Holdem Class', () => {
  test('addCommunityCard/removeCommunityCard', () => {
    const holdem = new Holdem({});
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
    const holdem = new Holdem({});
    expect(() => holdem.removeCommunityCard('AS')).toThrowError(/not a community card/);
    holdem.addCommunityCard('6S');
    expect(() => holdem.addCommunityCard('6S')).toThrowError(/not an available card/);
    holdem.addCommunityCard('3C');
    holdem.addCommunityCard('KD');
    holdem.addCommunityCard('4S');
    holdem.addCommunityCard('5S');
    expect(() => holdem.addCommunityCard('7S')).toThrowError(/Only 5/);
    expect(() => holdem.removeCommunityCard('AS')).toThrowError(/not a community card/);
  });

  test('addPlayers/removePlayers ', () => {
    const holdem = new Holdem({});
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
    expect(holdem.numAvailableCards).toBe(44);
    holdem.addPlayers(1);
    expect(holdem.numPlayers).toBe(5);
    expect(holdem.numAvailableCards).toBe(42);
  });

  test('addPlayers/removePlayers Error Handling', () => {
    const holdem = new Holdem({});
    expect(() => holdem.removePlayers(3)).toThrowError(/No more players/);
    expect(() => holdem.removePlayers(-3)).toThrowError(/Enter a number between 1 and 9/);
    expect(() => holdem.addPlayers(-3)).toThrowError(/Enter a number between 1 and 9/);
    holdem.addPlayers(9);
    expect(() => holdem.addPlayers(9)).toThrowError(/Max 9/);
  })

  test('setPlayerCards', () => {
    const holdem = new Holdem({});
    holdem.addPlayers(1);
    holdem.addCommunityCard('7H');
    holdem.addCommunityCard('2C');
    expect(() => holdem.setPlayerCards(0, ['8H', '9C', '3H'])).toThrowError(/specify exactly 2/);
    expect(() => holdem.setPlayerCards(0, ['7H', '2C'])).toThrowError(/not an available/);
    expect(() => holdem.setPlayerCards(0, ['3H', '2C'])).toThrowError(/not an available/);
    expect(() => holdem.setPlayerCards(1, ['10H', 'JC'])).toThrowError(/does not exist/);
    holdem.setPlayerCards(0, ['AH', 'AD']);
    expect(holdem.playerCards).toEqual([['AH', 'AD']]);
    expect(holdem.availableCards).toEqual(['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
      '2H', '3H', '4H', '5H', '6H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
      'AC', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC']);
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
    expect(Holdem.getCombinations(['AS', '2S', '3S', '4S', '5S'], 2)).toEqual([
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
    expect(Holdem.findBestHand(['4C', '9C'], ['AS', '2S', '3S', '4S', '5S']).raw)
      .toEqual(['AS', '2S', '3S', '4S', '5S']);
    expect(Holdem.findBestHand(['4C', '4S'], ['AS', '2S', '3S', '9C', '5S']).raw)
      .toEqual(['4S', 'AS', '2S', '3S', '5S']);
    expect(Holdem.findBestHand(['5C', '9C'], ['AS', '2S', '3D', '4S', '9D']).raw)
      .toEqual(['5C', 'AS', '2S', '3D', '4S']);
    expect(Holdem.findBestHand(['5C', '5S'], ['AS', '2S', '6D', '7S', '9D']).raw)
      .toEqual(['5C', '5S', 'AS', '7S', '9D']);
    expect(Holdem.findBestHand(['QS', '7H'], ['8S', '3D', '6D', '8H', 'AC']).raw)
      .toEqual(['QS', '7H', '8S', '8H', 'AC']);
  });

  test('computeHandScore', () => {
    expect(Holdem.computeHandScore(['4C', '9C'], ['AS', '2S', '3S', '4S', '5S']))
      .toEqual(9000000);
    expect(Holdem.computeHandScore(['4C', '4S'], ['AS', '2S', '3S', '9C', '5S']))
      .toEqual(9000000);
    expect(Holdem.computeHandScore(['5C', '9C'], ['AS', '2S', '3D', '4S', '9D']))
      .toEqual(5939058);
    expect(Holdem.computeHandScore(['5C', '5S'], ['AS', '2S', '6D', '7S', '9D']))
      .toEqual(2351895);
    expect(Holdem.computeHandScore(['QS', '7H'], ['8S', '3D', '6D', '8H', 'AC']))
      .toEqual(2560839);  //SET AS AVERAGE
  });

  test('computeWinnerDistributions', () => {
    expect(Holdem.computeWinnerDistributions([324, 1234, 4, 3])).toEqual([0, 1, 0, 0]);
    expect(Holdem.computeWinnerDistributions([9, 4, 3])).toEqual([1, 0, 0]);
    expect(Holdem.computeWinnerDistributions([3, 4, 9])).toEqual([0, 0, 1]);
    expect(Holdem.computeWinnerDistributions([1234, 1234, 4, 3])).toEqual([0.5, 0.5, 0, 0]);
    expect(Holdem.computeWinnerDistributions([4, 4, 4, 3])).toEqual([0.3333333333333333, 0.3333333333333333, 0.3333333333333333, 0]);
  });
});


describe('computeWinPercents', () => {
  test('5 community cards 3 player 1 win', () => {
    const availableCards = ['2S', '5S', '6S', '7S', '8S', '9S', '10S', 'QS', 'KS',
      '4H', '5H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD',
      '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC'];
    const communityCards = ['AC', 'KD', 'JS', '3S', '2H'];
    const playerCards = [['AH', 'AS'], ['3H', '4S'], ['6H', 'AD']];
    const holdem = new Holdem({ availableCards, communityCards, playerCards });
    expect(holdem.computeWinPercents()).toEqual([1, 0, 0]);
  });
  test('5 community cards 3 player draw', () => {
    const availableCards = ['2S', '5S', '6S', '7S', '8S', '9S', '10S', 'QS', 'KS',
      '4H', '5H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD',
      '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC'];
    const communityCards = ['6C', 'KD', 'JS', '3S', '2H'];
    const playerCards = [['AH', 'AS'], ['3H', '4S'], ['AC', 'AD']];
    const holdem = new Holdem({ availableCards, communityCards, playerCards });
    expect(holdem.computeWinPercents()).toEqual([0.5, 0, 0.5]);
  });
  test('3 community cards 2 player (1)', () => {
    const availableCards = ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'QS', 'KS',
      '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      'AD', '2D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD',
      'AC', '3C', '4C', '5C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC'];
    const communityCards = ['6C', 'KD', 'JS'];
    const playerCards = [['2C', '3D'], ['AH', 'AS']];
    const holdem = new Holdem({ availableCards, communityCards, playerCards });
    let winPercents = holdem.computeWinPercents()
    expect(winPercents[0]).toBeGreaterThan(0);
    expect(winPercents[1]).toBeGreaterThan(0.7);
  });
  test('3 community cards 2 player (2)', () => {
    const availableCards = ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'QS', 'KS',
      '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      'AD', '2D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD',
      'AC', '3C', '4C', '5C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC'];
    const communityCards = ['6C', 'KD', 'JS'];
    const playerCards = [['2C', 'AS'], ['AH', '3D']];
    const holdem = new Holdem({ availableCards, communityCards, playerCards });
    let winPercents = holdem.computeWinPercents()
    expect(winPercents[0]).toBeGreaterThan(0);
    expect(winPercents[1]).toBeGreaterThan(0);
  });
  test('3 community cards 2 player (3)', () => {
    const availableCards = ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
      '2D', '4D', '5D', '7D', '8D', '9D', '10D', 'QD',
      'AC', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC'];
    const communityCards = ['6D', 'KD', 'JD'];
    const playerCards = [['2C', 'AS'], ['AD', '3D']];
    const holdem = new Holdem({ availableCards, communityCards, playerCards });
    expect(holdem.computeWinPercents()).toEqual([0, 1]);
  });
});
