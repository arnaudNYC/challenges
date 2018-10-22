const PokerHand = require('../src/PokerHand');

const Result = {
  win: 1,
  loss: 2,
  tie: 3,
};

const assert = (pokerHand, fn) => {
  expect(pokerHand.isStraightFlush()).toBe(pokerHand.isStraightFlush === fn);
  expect(pokerHand.isFourOfAKind()).toBe(pokerHand.isFourOfAKind === fn);
  expect(pokerHand.isFullHouse()).toBe(pokerHand.isFullHouse === fn);
  expect(pokerHand.isFlush()).toBe(pokerHand.isFlush === fn);
  expect(pokerHand.isStraight()).toBe(pokerHand.isStraight === fn);
  expect(pokerHand.isThreeOfAKind()).toBe(pokerHand.isThreeOfAKind === fn);
  expect(pokerHand.isTwoPairs()).toBe(pokerHand.isTwoPairs === fn);
  expect(pokerHand.isOnePair()).toBe(pokerHand.isOnePair === fn);
  expect(pokerHand.isHighCard()).toBe(pokerHand.isHighCard === fn);
};

test('scrap', () => {
  const aHand = new PokerHand('AH KH QH JH TH');
  const anotherHand = new PokerHand('KS QS JS TS 9S');
  aHand.compareWith(anotherHand);
});

describe('when identifying hands', () => {
  it('it should be a royal straight flush', () => {
    const aHand = new PokerHand('AH KH QH JH TH');
    assert(aHand, aHand.isStraightFlush);
  });
  it('it should be a straight flush', () => {
    const aHand = new PokerHand('KH QH JH TH 9H');
    assert(aHand, aHand.isStraightFlush);
  });
  it('it should be a straight flush (Ace is lowest)', () => {
    const aHand = new PokerHand('AH 2H 3H 4H 5H');
    assert(aHand, aHand.isStraightFlush);
  });
  it('it should be a four of a kind', () => {
    const aHand = new PokerHand('AH AD AS 4H AC');
    assert(aHand, aHand.isFourOfAKind);
  });
  it('it should be a full house', () => {
    const aHand = new PokerHand('AH AD AC KS KH');
    assert(aHand, aHand.isFullHouse);
  });
  it('it should be a flush', () => {
    const aHand = new PokerHand('AH QH 7H 8H 2H');
    assert(aHand, aHand.isFlush);
  });
  it('it should be a straight', () => {
    const aHand = new PokerHand('AH KH QS JH TC');
    assert(aHand, aHand.isStraight);
  });
  it('it should be a straight (Ace is lowest)', () => {
    const aHand = new PokerHand('AH 2H 4S 5H 3C');
    assert(aHand, aHand.isStraight);
  });
  it('it should be a three of a kind', () => {
    const aHand = new PokerHand('AH AD AC KS QH');
    assert(aHand, aHand.isThreeOfAKind);
  });
  it('it should be two pairs', () => {
    const aHand = new PokerHand('AH AD KC KS QH');
    assert(aHand, aHand.isTwoPairs);
  });
  it('it should be one pair', () => {
    const aHand = new PokerHand('AH AD KC QS 8H');
    assert(aHand, aHand.isOnePair);
  });
  it('it should be a high card', () => {
    const aHand = new PokerHand('AH JD TC 8S 6H');
    assert(aHand, aHand.isHighCard);
  });
  it('it should be a high card (with an ace)', () => {
    const aHand = new PokerHand('2S AH 4H 5S 6C');
    assert(aHand, aHand.isHighCard);
    expect(aHand.highCard).toEqual('1406050402');
  });
});

describe('when comparing hands of equal values', () => {
  describe('when hands are different', () => {
    const straightFlush = new PokerHand('AH KH QH JH TH');
    const fourOfAKind = new PokerHand('KH KC KD KS QH');
    const fullHouse = new PokerHand('QH QC QS TS TD');
    const flush = new PokerHand('AH QH JH 8H 2H');
    const straight = new PokerHand('AH KD QH JH TH');
    const threeOfAKind = new PokerHand('AH AD AS TD 8S');
    const twoPairs = new PokerHand('AH AD KD KH JH');
    const onePair = new PokerHand('AH AD KD 2H JH');
    const highCard = new PokerHand('AH JD TC 8S 6H');

    describe('royal flush', () => {
      it('should beat all lower hands', () => {
        expect(straightFlush.compareWith(fourOfAKind)).toEqual(Result.win);
        expect(straightFlush.compareWith(fullHouse)).toEqual(Result.win);
        expect(straightFlush.compareWith(flush)).toEqual(Result.win);
        expect(straightFlush.compareWith(straight)).toEqual(Result.win);
        expect(straightFlush.compareWith(threeOfAKind)).toEqual(Result.win);
        expect(straightFlush.compareWith(twoPairs)).toEqual(Result.win);
        expect(straightFlush.compareWith(onePair)).toEqual(Result.win);
        expect(straightFlush.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('fourOfAKind', () => {
      it('should beat all lower hands', () => {
        expect(fourOfAKind.compareWith(fullHouse)).toEqual(Result.win);
        expect(fourOfAKind.compareWith(flush)).toEqual(Result.win);
        expect(fourOfAKind.compareWith(straight)).toEqual(Result.win);
        expect(fourOfAKind.compareWith(threeOfAKind)).toEqual(Result.win);
        expect(fourOfAKind.compareWith(twoPairs)).toEqual(Result.win);
        expect(fourOfAKind.compareWith(onePair)).toEqual(Result.win);
        expect(fourOfAKind.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('fullHouse', () => {
      it('should beat all lower hands', () => {
        expect(fullHouse.compareWith(flush)).toEqual(Result.win);
        expect(fullHouse.compareWith(straight)).toEqual(Result.win);
        expect(fullHouse.compareWith(threeOfAKind)).toEqual(Result.win);
        expect(fullHouse.compareWith(twoPairs)).toEqual(Result.win);
        expect(fullHouse.compareWith(onePair)).toEqual(Result.win);
        expect(fullHouse.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('flush', () => {
      it('should beat all lower hands', () => {
        expect(flush.compareWith(straight)).toEqual(Result.win);
        expect(flush.compareWith(threeOfAKind)).toEqual(Result.win);
        expect(flush.compareWith(twoPairs)).toEqual(Result.win);
        expect(flush.compareWith(onePair)).toEqual(Result.win);
        expect(flush.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('straight', () => {
      it('should beat all lower hands', () => {
        expect(straight.compareWith(threeOfAKind)).toEqual(Result.win);
        expect(straight.compareWith(twoPairs)).toEqual(Result.win);
        expect(straight.compareWith(onePair)).toEqual(Result.win);
        expect(straight.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('threeOfAKind', () => {
      it('should beat all lower hands', () => {
        expect(threeOfAKind.compareWith(twoPairs)).toEqual(Result.win);
        expect(threeOfAKind.compareWith(onePair)).toEqual(Result.win);
        expect(threeOfAKind.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('twoPairs', () => {
      it('should beat all lower hands', () => {
        expect(twoPairs.compareWith(onePair)).toEqual(Result.win);
        expect(twoPairs.compareWith(highCard)).toEqual(Result.win);
      });
    });
    describe('onePair', () => {
      it('should beat all lower hands', () => {
        expect(onePair.compareWith(highCard)).toEqual(Result.win);
      });
    });
  });
  describe('when hands are the same', () => {
    describe('straight flush', () => {
      it('should lose (cw)', () => {
        const hand = new PokerHand('2H 3H 4H 5H 6H');
        const otherHand = new PokerHand('KS AS TS QS JS');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should win', () => {
        const hand = new PokerHand('AH KH QH JH TH');
        const otherHand = new PokerHand('KS QS JS TS 9S');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('KS QS JS TS 9S');
        const otherHand = new PokerHand('AH KH QH JH TH');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should tie', () => {
        const hand = new PokerHand('AH KH QH JH TH');
        const otherHand = new PokerHand('AC KC QC JC TC');
        expect(hand.compareWith(otherHand)).toEqual(Result.tie);
      });
    });
    describe('four of a kind', () => {
      it('should win', () => {
        const hand = new PokerHand('AH AC AS AD KH');
        const otherHand = new PokerHand('QH QC QS QD TH');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should win', () => {
        const hand = new PokerHand('AH AC AS AD TH');
        const otherHand = new PokerHand('QH QC QS QD KH');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('QH QC QS QD KH');
        const otherHand = new PokerHand('AH AC AS AD TS');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should lose', () => {
        const hand = new PokerHand('QH QC QS QD KH');
        const otherHand = new PokerHand('AH AC AS AD TS');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
    });
    describe('full house', () => {
      it('should win', () => {
        const hand = new PokerHand('AH AC AS KD KH');
        const otherHand = new PokerHand('QH QC QS TD TH');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('QH QC QS TD TH');
        const otherHand = new PokerHand('AH AC AS KD KH');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
    });
    describe('flush', () => {
      it('should win', () => {
        const hand = new PokerHand('3S 4S 5S 9S TS');
        const otherHand = new PokerHand('2H 3H 4H 6H 7H');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('2H 4H 5H 6H 7H');
        const otherHand = new PokerHand('AH KH JH 3H 8H');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should tie', () => {
        const hand = new PokerHand('2H 4H 5H 6H 7H');
        const otherHand = new PokerHand('2C 4C 5C 6C 7C');
        expect(hand.compareWith(otherHand)).toEqual(Result.tie);
      });
    });
    describe('straight', () => {
      it('should win', () => {
        const hand = new PokerHand('7S 8H 9S TH JS');
        const otherHand = new PokerHand('6C 7D 8D 9D TD');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should win', () => {
        const hand = new PokerHand('AH KD QS JC TH');
        const otherHand = new PokerHand('AH 2D 3H 4H 5H');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('2H 4H 5H 6H 7H');
        const otherHand = new PokerHand('AH KH JH 3H 8H');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should tie', () => {
        const hand = new PokerHand('2H 4H 5H 6H 7H');
        const otherHand = new PokerHand('2C 4C 5C 6C 7C');
        expect(hand.compareWith(otherHand)).toEqual(Result.tie);
      });
    });
    describe('three of a kind', () => {
      it('should win', () => {
        const hand = new PokerHand('Kx Kx 9x Kx 8y');
        const otherHand = new PokerHand('Ax Ty Qx Qx Qx');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('Qx Ax Qx Ty Qx');
        const otherHand = new PokerHand('Kx 9x 8y Kx Kx');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
    });
    describe('two pairs', () => {
      it('should win', () => {
        const hand = new PokerHand('AH AD TS KH KD');
        const otherHand = new PokerHand('AS AC 9S KS KC');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('AH AD 8S JH JD');
        const otherHand = new PokerHand('AS AC 9S KS KC');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should tie', () => {
        const hand = new PokerHand('AH AD 8S JH JD');
        const otherHand = new PokerHand('AS AC 8C JS JC');
        expect(hand.compareWith(otherHand)).toEqual(Result.tie);
      });
    });
    describe('one pair', () => {
      it('should win', () => {
        const hand = new PokerHand('AH AD TS KH 3D');
        const otherHand = new PokerHand('AS AC TC KD 2D');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('AH AD TS QH 2D');
        const otherHand = new PokerHand('AS AC TC KD 2D');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should tie', () => {
        const hand = new PokerHand('AH AD TS QH 2D');
        const otherHand = new PokerHand('AS AC TC QD 2H');
        expect(hand.compareWith(otherHand)).toEqual(Result.tie);
      });
    });
    describe('high card', () => {
      it('should win', () => {
        const hand = new PokerHand('AH 4D TS KH 3D');
        const otherHand = new PokerHand('QH 4H TC KD 3S');
        expect(hand.compareWith(otherHand)).toEqual(Result.win);
      });
      it('should lose', () => {
        const hand = new PokerHand('AH KH QH JH 8S');
        const otherHand = new PokerHand('AD KD QD JD 9C');
        expect(hand.compareWith(otherHand)).toEqual(Result.loss);
      });
      it('should tie', () => {
        const hand = new PokerHand('AH AD TS QH 2D');
        const otherHand = new PokerHand('AD AH TC QD 2H');
        expect(hand.compareWith(otherHand)).toEqual(Result.tie);
      });
    });
  });
});

describe('If a poker hand is compared to another poker hand then:', () => {
  const assert = (expected, player, opponent) => {
    var p = new PokerHand(player);
    var o = new PokerHand(opponent);
    expect(p.compareWith(o)).toEqual(expected);
  };
  it('Highest straight flush wins', function () {
    assert(Result.loss, '2H 3H 4H 5H 6H', 'KS AS TS QS JS');
  });
  it('Straight flush wins of 4 of a kind', function () {
    assert(Result.win, '2H 3H 4H 5H 6H', 'AS AD AC AH JD');
  });
  it('Highest 4 of a kind wins', function () {
    assert(Result.win, 'AS AH 2H AD AC', 'JS JD JC JH 3D');
  });
  it('4 Of a kind wins of full house', function () {
    assert(Result.loss, '2S AH 2H AS AC', 'JS JD JC JH AD');
  });
  it('Full house wins of flush', function () {
    assert(Result.win, '2S AH 2H AS AC', '2H 3H 5H 6H 7H');
  });
  it('Highest flush wins', function () {
    assert(Result.win, 'AS 3S 4S 8S 2S', '2H 3H 5H 6H 7H');
  });
  it('Flush wins of straight', function () {
    assert(Result.win, '2H 3H 5H 6H 7H', '2S 3H 4H 5S 6C');
  });
  it('Equal straight is tie', function () {
    assert(Result.tie, '2S 3H 4H 5S 6C', '3D 4C 5H 6H 2S');
  });
  it('Straight wins of three of a kind', function () {
    assert(Result.win, '2S 3H 4H 5S 6C', 'AH AC 5H 6H AS');
  });
  it('3 Of a kind wins of two pair', function () {
    assert(Result.loss, '2S 2H 4H 5S 4C', 'AH AC 5H 6H AS');
  });
  it('2 Pair wins of pair', function () {
    assert(Result.win, '2S 2H 4H 5S 4C', 'AH AC 5H 6H 7S');
  });
  it('Highest pair wins', function () {
    assert(Result.loss, '6S AD 7H 4S AS', 'AH AC 5H 6H 7S');
  });
  it('Pair wins of nothing', function () {
    assert(Result.loss, '2S AH 4H 5S KC', 'AH AC 5H 6H 7S');
  });
  it('Highest card loses', function () {
    assert(Result.loss, '2S 3H 6H 7S 9C', '7H 3C TH 6H 9S');
  });
  it('Highest card wins', function () {
    assert(Result.win, '4S 5H 6H TS AC', '3S 5H 6H TS AC');
  });
  it('Equal cards is tie', function () {
    assert(Result.tie, '2S AH 4H 5S 6C', 'AD 4C 5H 6H 2C');
  });
});

describe('failing random codewars test', () => {
  const assertHands = (p, o, expected) => {
    const playerHand = new PokerHand(p);
    const otherHand = new PokerHand(o);
    expect(playerHand.compareWith(otherHand)).toEqual(expected);
  };

  it('should not fail', () => {
    assertHands('4C 5C 9C 8C KC', '3S 8S 9S 5S KS', 1);
  });
  it('should not fail', () => {
    assertHands('QC KH TS JS AH', 'JS QS 9H TS KH', 1);
    assertHands('QC KH TS JS AH', '2S 3S 4H 5S AH', 1);
  });
  it('should not fail', () => {
    assertHands('JC KH JS JD JH', 'JC 6H JS JD JH', 1);
  });
  it('should not fail', () => {
    assertHands('JC 6H JS JD JH', 'JC 7H JS JD JH', 2);
  });
  it('should not fail', () => {
    assertHands('JC 7H JS JD JH', 'JC KH JS JD JH', 2);
  });
  it('should not fail', () => {
    assertHands('2H 2C 3S 3H 3D', 'KH KC 3S 3H 3D', 2);
  });
});
