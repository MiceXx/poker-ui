import { Card } from '../logic/card';

describe('Creates Cards from strings', () => {
  beforeEach(() => {
  });
  afterAll(() => {
  });
  test('Basic strings', () => {
    const card1 = new Card('10C');
    const card2 = new Card('AS');
    const card3 = new Card('3D');
    const card4 = new Card('QH');
    expect(card1.get()).toEqual('10C: 10 Clubs');
    expect(card2.get()).toEqual('AS: 14 Spades');
    expect(card3.get()).toEqual('3D: 3 Diamonds');
    expect(card4.get()).toEqual('QH: 12 Hearts');
  });

  test('Strings with cases', () => {
    const card1 = new Card('10c');
    const card2 = new Card('as');
    const card3 = new Card('3d');
    const card4 = new Card('qh');
    expect(card1.get()).toEqual('10c: 10 Clubs');
    expect(card2.get()).toEqual('as: 14 Spades');
    expect(card3.get()).toEqual('3d: 3 Diamonds');
    expect(card4.get()).toEqual('qh: 12 Hearts');
  });

  test('Error Checking Invalid Cards', () => {
    expect(() => new Card('')).toThrowError(/specify the Rank and Suit/);
    expect(() => new Card('3R')).toThrowError(/Invalid Card/);
    expect(() => new Card('BS')).toThrowError(/Invalid Card/);
    expect(() => new Card('QQ')).toThrowError(/Invalid Card/);
  });
});