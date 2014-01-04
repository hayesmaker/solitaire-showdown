define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/game/model',
    'modules/game/view',
    'modules/board/controller',
    'modules/rules/controller',
    'modules/player/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View, BoardController, RulesController, PlayerController) {

    var GameController = Module.extend({

      /**
       * constructor
       */
      constructor: function() {

        this.model = new Model(this);
        this.view = new View(this);

      },

      /**
       * init initialise this module with the Phaser.Game instance
       *
       * nb: pointer to 'this' required in Phaser.Game methods: preload, create, update & render
       *
       * @param game
       */
      init: function(game) {

        GameController.super.init.call(this, game);
        this.game.controller = this;

        this.rulesController = new RulesController();
        this.rulesController.init(game);
        this.rulesController.onInitialCardsDealt.add(this.initialCardsDealt, this);

        this.boardController = new BoardController();
        this.boardController.init(game);

        this.player1 = new PlayerController({x: 100, y: 50});
        this.player1.init(this.game);
        this.player2 = new PlayerController({x: 100, y: 500});
        this.player2.init(this.game);
      },

      /**
       * startGame
       */
      startGame: function() {
        this.rulesController.create3Decks();
        this.rulesController.createSpecialDeck();
        this.boardController.drawBoard();
        this.boardController.enableAllRowStacks();
        this.player1.startGame();
        this.player2.startGame();
        this.rulesController.dealCards();
      },

      /**
       * 'initialCardsDealt' signal inside rules.controller
       * @param cards
       */
      initialCardsDealt: function(cards, specialDeck) {

        var self = this;
        _.each(cards, function(card, i) {

          card.cardLanded.add(self.boardController.addCardToRowStack, self.boardController);

          if (i % 2 === 0) {
            self.player1.dealCard(card, self.boardController.getAllRowStackDropPoints());
          } else {
            self.player2.dealCard(card, self.boardController.getAllRowStackDropPoints());
          }
        });

        _.each(specialDeck, function(card, i) {

          card.cardLanded.add(self.boardController.addCardToRowStack, self.boardController);

            if (i < 26) {
              if (i % 2 === 0) {
                self.player1.dealSpecialCard(card, self.boardController.getAllAcePileDropPoints());
              } else {
                self.player2.dealSpecialCard(card, self.boardController.getAllAcePileDropPoints());
              }
            }
        });

      },

      /**
       * Phaser.Game Framework methods, scope to 'this' becomes the Phaser.Game instance inside these methods.
       */
      preload: function() {
        console.log('preload game', this.game);
        this.game.load.atlas('atlas', 'images/solitaire-showdown-assets.png', 'images/solitaire-showdown-assets.json');
      },

      create: function() {
        console.log('create game', this.game);
        this.startGame();


      },

      update: function() {



      },

      render: function() {

      }

      /**
       * End of Phaser.Game framework methods
       */



    });

    /**
     *
     */
    return GameController;
  });