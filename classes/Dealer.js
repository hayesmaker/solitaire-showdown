function Dealer(decks, suits, cards) {
  /**
   * cards alread dealt
   * @type {number}
   */
  this.played = 0;

  /**
   * cards yet to be dealt
   * @type {Array}
   */
  this.pack = [];

  // pack defaults
  this.decks = decks || 1;
  this.suits = suits || ['h', 'c', 'd', 's'];
  this.cards = cards || ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
  var suitsLen, cardsLen, i, j,
  suitsLen = j = this.suits.length;
  cardsLen = this.cards.length;

  // generate single deck
  while (j--) {
    for (i = 0; i < cardsLen; i++) {
      this.pack.push(this.cards[i] + this.suits[j]);
    }
  }

  // put the right number of decks in the pack
  while (--this.decks) {
    this.pack = this.pack.concat(this.pack.slice(0, suitsLen * cardsLen));
  }

  // shuffle the new pack
  this.shuffle();
};

/**
 * Fisher-Yates shuffle - http://jsfromhell.com/array/shuffle
 */
Dealer.prototype.shuffle = function() {
  for (var j, x, p = this.pack, i = p.length; i; j = ~~(Math.random() * i), x = p[--i], p[i] = p[j], p[j] = x);
};

/**
 * // deals from the top of the deck, defaults to 1 card
 * @param num
 * @returns {*}
 */
Dealer.prototype.deal = function (num) {
  num = num || 1;
  this.played += num;
  return this.pack.slice(this.played - num, this.played);
}

/**
 * put the played cards back in the deck and reshuffle
 */
Dealer.prototype.resetDecks = function () {
  this.played = 0;
  this.shuffle();
}

module.exports = Dealer;