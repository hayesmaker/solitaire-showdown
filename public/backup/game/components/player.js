define(['lodash', 'class', 'signals', 'components/component', 'display/card', 'display/cards'], function(_, Class, Signal, Component, Card, cardsHelper) {
  'use strict';

  var Player = Class.extend({

    constructor: function() {
      //Player.super.constructor.call(this, controller);
      this.allCards = [];
      this.drawCardPile = [];
      this.specialCardsPile = [];
      this.playCardPile = [];

      this.controller = {
        initialCardDealt: new Signal(),
        drawn3Cards: new Signal()
      };

    },

    initialise: function() {

      this.controller.initialCardDealt.add(this.onInitialCardsDealt, this);

      /*
       deck: [],
       special: []
       */

      //this.controller.initialCardsDealt.add(this.onInitialCardsDealt, this);
      //this.controller.drawn3cards.add(this.onDrawn3cards, this);
      //this.id = id;
    },

    //deprecate
    draw3cards: function() {
      for (var i = 0; i < 3; i ++) {
        this.playCardPile.push(this.drawCardPile.pop());
      }
      this.controller.drawn3cards.dispatch(this, this.playCardPile);
      return this.playCardPile;
    },

    onDrawn3cards: function() {

    },

    onInitialCardsDealt: function(cardsPayload) {
      var self = this;

      /*
       player1: {
       deck: [],
       special: []
       },
       */

      this.drawCardPile = _.clone(cardsPayload.deck);
      this.specialCardsPile = _.clone(cardsPayload.special);
    }





  });

  return Player;
});