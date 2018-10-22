const Result = {
  win: 1,
  loss: 2,
  tie: 3,
};

const rankValues = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const areConsecutive = arr => {
  // using a variation of the visited array algorithm
  // https://www.geeksforgeeks.org/check-if-array-elements-are-consecutive/
  const min = Math.min.apply(null, arr);
  const max = Math.max.apply(null, arr);
  if (max - min + 1 === arr.length) {
    return arr.every((num, idx) => idx === arr.lastIndexOf(num));
  }
  return false;
};

const consecutiveRanks = ranks => {
  if (ranks.includes('14')) {
    return areConsecutive(ranks) ||
      areConsecutive(ranks.map((r) => {
        return r === '14' ? '01' : r;
      }));
  }
  return areConsecutive(ranks);
};

const leftPad = (v, length = 2) => {
  const vLen = `${v}`.length;
  if (vLen >= length) {
    return `${v}`;
  }
  return `${Array.from({ length: length - vLen }, () => 0).join('')}${v}`;
};

const breakTie = function (that) {
  if (this.highCard > that.highCard) {
    return Result.win;
  } else if (this.highCard < that.highCard) {
    return Result.loss;
  } else {
    return Result.tie;
  }
};

class PokerHand {
  constructor(hand) {
    this.handValues = {
      isStraightFlush: {
        value: 9,
        breakTie: breakTie.bind(this),
      },
      isFourOfAKind: {
        value: 8,
        breakTie: breakTie.bind(this),
      },
      isFullHouse: {
        value: 7,
        breakTie: breakTie.bind(this),
      },
      isFlush: {
        value: 6,
        breakTie: breakTie.bind(this),
      },
      isStraight: {
        value: 5,
        breakTie: breakTie.bind(this),
      },
      isThreeOfAKind: {
        value: 4,
        breakTie: breakTie.bind(this),
      },
      isTwoPairs: {
        value: 3,
        breakTie: breakTie.bind(this),
      },
      isOnePair: {
        value: 2,
        breakTie: breakTie.bind(this),
      },
      isHighCard: {
        value: 1,
        breakTie: breakTie.bind(this),
      },
    };

    this.suits = [];
    this.ranks = [];

    hand.split(' ').forEach((card) => {
      const suit = card.slice(-1);
      const rank = card.slice(0, 1);
      this.suits.push(suit);
      this.ranks.push(leftPad(rankValues[rank] || rank));
    });

    this.rankOccurences = this.ranks.reduce((acc, curr) => {
      if (!acc[curr]) {
        acc[curr] = 0;
      }
      acc[curr] += 1;
      return acc;
    }, {});

    this.highCard = this.ranks
      .sort((a, b) => `${this.rankOccurences[b]}${b}` -
        `${this.rankOccurences[a]}${a}`)
      .join('');

    const match = Object.keys(this.handValues).find(fn => this[fn]());
    this.handValue = this.handValues[match];
  }

  isStraightFlush() {
    return [...new Set(this.suits)].length === 1 && consecutiveRanks(this.ranks);
  }

  isFourOfAKind() {
    return Object.values(this.rankOccurences).includes(4);
  }

  isFullHouse() {
    const uniqueOccurrences = Object.values(this.rankOccurences);
    return uniqueOccurrences.includes(3) && uniqueOccurrences.includes(2);
  }

  isFlush() {
    return [...new Set(this.suits)].length === 1 && !consecutiveRanks(this.ranks);
  }

  isStraight() {
    return [...new Set(this.suits)].length > 1 && consecutiveRanks(this.ranks);
  }

  isThreeOfAKind() {
    const uniqueOccurrences = Object.values(this.rankOccurences);
    return uniqueOccurrences.includes(1) && uniqueOccurrences.includes(3);
  }

  isTwoPairs() {
    const uniqueOccurrences = Object.values(this.rankOccurences);
    return uniqueOccurrences.indexOf(2) !== uniqueOccurrences.lastIndexOf(2);
  }

  isOnePair() {
    return [...new Set(this.ranks)].length === 4;
  }

  isHighCard() {
    return Object.values(this.rankOccurences).length === 5 &&
      !consecutiveRanks(this.ranks) &&
      [...new Set(this.suits)].length >= 2;
  }

  compareWith(anotherHand) {
    if (this.handValue.value > anotherHand.handValue.value) {
      return Result.win;
    } else if (this.handValue.value < anotherHand.handValue.value) {
      return Result.loss;
    } else {
      return this.handValue.breakTie(anotherHand);
    }
  }
}

module.exports = PokerHand;
