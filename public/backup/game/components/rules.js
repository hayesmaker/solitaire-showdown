define(['lodash', 'display/cards', 'display/card', 'components/component', 'components/player'], function(_, cards, Card, Component, Player) {
  'use strict';
  /**
   * rules
   * |_________________________________________________________________________________________________________________________________
   * 1.  Game starts with a triple deck of shuffled cards dealt evenly to each player's draw pile.
   * 2.  Each player starts with a special 13 card pile from another deck of cards.
   * 3.  Cards are drawn 3 at a time from the draw pile when a player clicks on it, or removes all 3 of the current shown cards.
   * 4.  Each player has 4 empty row stacks to which they may move any card.
   * 5.  When there is 1 or more cards on a row stack, then the player may only put on a card of 1 value lower with a different colour.
   * 6.  There are also 8 shared stacks to which any player may move their cards.
   * 7.  A player may only put an Ace on an empty shared stack.
   * 8.  If the shared stack contains 1 or more cards the player may only move a card of the same suit and 1 value higher.
   * 9.  Game ends either when 1 player removes all of their special card pile or when both players become 'stuck'.
   * 10. The winner is the player who has removed most cards from their special card pile when the game ends.
   * |________________________________________________________________________________________________________________________________
   */

  var Rules = Component.extend({
    constructor: function(controller) {
      Rules.super.constructor.call(this, controller);
      this.deck = [];
      this.oldDeck = [];
      this.specialDeck = [];

      this.player1 = new Player();
      this.player2 = new Player();


    },

    createThreeDecks: function() {
      for (var i = 0; i < 52; i++) {

        this.deck.push(cards.getRandom());
        this.deck.push(cards.getRandom());
        this.deck.push(cards.getRandom());
      }
    },

    createSpecialDeck: function() {
      for (var i = 0; i < 52; i++) {
        this.specialDeck.push(cards.getRandom());
      }
    },

    dealCards: function() {
      //var self = this;

      var cardsPayload = {
        player1: {
          deck: [],
          special: []
        },
        player2: {
          deck: [],
          special: []
        }
      };

      _.each(this.deck, function(card, i) {
        if (i % 2 === 0) {
          cardsPayload.player1.deck.push(new Card(card, false));
        } else {
          cardsPayload.player2.deck.push(new Card(card, false));
        }
      });

      _.each(this.specialDeck, function(card, i) {
        if (i % 2 === 0) {
          cardsPayload.player1.special.push(new Card(card, true));
        } else {
          cardsPayload.player2.special.push(new Card(card, true));
        }
      });

      this.controller.initialCardsDealt.dispatch(this.deck, this.specialDeck, cardsPayload);

      this.player1.controller.initialCardDealt.dispatch(cardsPayload.player1);
      this.player2.controller.initialCardDealt.dispatch(cardsPayload.player2);


    },

    draw3cards: function(playerId) {
      this.controller.drawn3cards.dispatch(playerId);
    }
  });

  return Rules;
});