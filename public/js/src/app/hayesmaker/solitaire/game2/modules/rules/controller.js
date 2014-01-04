define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/rules/view',
    'modules/rules/model',
    'modules/player/controller',
    'components/card',
    'utils/cardsHelper'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal, Module, View, Model, Player, Card, CardsHelper) {

    var RulesController = Module.extend({

      /**
       *
       */
      constructor: function() {
        this.model = new Model(this);
        this.view = new View(this);
      },

      /**
       *
       * @param game
       */
      init: function(game) {
        RulesController.super.init.call(this, game);

        this.view.init(game);

        this.onInitialCardsDealt = new Signal();
        this.onSpecialCardsDealt = new Signal();
      },

      createSpecialDeck: function() {

        this.createDeck(this.model.specialDeck);

      },

      /**
       *
       */
      create3Decks:function() {
        this.createDeck(this.model.deck);
        this.createDeck(this.model.deck);
        this.createDeck(this.model.deck);
      },

      /**
       *
       * random deck
       * @param deck
       */
      createDeck: function(deck) {
        var cardsHelper = new CardsHelper();
        for (var i = 0; i < 52; i++) {
          var card = new Card(cardsHelper.getRandom(), false);
          deck.push(card);
        }
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
