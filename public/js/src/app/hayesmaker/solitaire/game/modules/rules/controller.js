define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/rules/model',
    'modules/player/controller',
    'components/card',
    'utils/cardsHelper'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal, Module, Model, Player, Card, CardsHelper) {

    var RulesController = Module.extend({

      /**
       *
       */
      constructor: function() {
        this.model = new Model(this);
      },

      /**
       *
       * @param game
       */
      init: function(game) {
        RulesController.super.init.call(this, game);
        this.onInitialCardsDealt = new Signal();
      },

      setNormalDeck: function(normalDeck) {
        var self = this;
        _.each(normalDeck, function(cardName) {
          self.model.deck.push(new Card(cardName, false));
        });
      },

      setSpecialDeck: function(specialDeck) {
        var self = this;
        _.each(specialDeck, function(cardName) {
          self.model.specialDeck.push(new Card(cardName, false));
        });
      },

      /**
       *
       */
      dealCards: function() {
        this.onInitialCardsDealt.dispatch(this.model.deck, this.model.specialDeck);
      }



    });

    return RulesController;
  });
