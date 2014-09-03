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
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View, BoardController, RulesController) {

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
       * because the context of this becomes the Phaser.Game object in these
       * methods.
       *
       * @param game
       */
      init: function(game) {
        GameController.super.init.call(this, game);
        this.game.controller = this;
        this.rulesController = new RulesController();
        this.rulesController.init(game);
        this.boardController = new BoardController();
        this.rulesController.onInitialCardsDealt.add(this.boardController.initialCardsDealt, this.boardController);
        this.boardController.init(game);
      },

      /**
       * startGame
       */
      startGame: function() {
        this.rulesController.create3Decks();
        this.rulesController.createSpecialDeck();
        this.boardController.drawBoard();
        this.boardController.startGame();
        this.boardController.enableAllRowStacks();
        this.rulesController.dealCards();
      },



      onRefreshAvailableDropStacks : function() {
        console.log('[GameController] :: onRefreshAvailableDropStacks');



      },

      /**
       * Phaser.Game Framework methods, scope to 'this' becomes the Phaser.Game instance inside these methods.
       */
      preload: function() {
        console.log('preload game', this.game, 'this: ', this);
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