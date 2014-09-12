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
    'cloak'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View, BoardController, RulesController, cloak) {

    var GameController = Module.extend({

      /**
       * constructor
       */
      constructor: function() {

        this.model = new Model(this);
        this.view = new View(this);

        this.numPlayers = 0;

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
      init: function(game, cloakService) {
        GameController.super.init.call(this, game);
        cloakService.lobbyPlayerJoined.add(this.onLobbyPlayerJoined, this);
        this.game.controller = this;
        this.rulesController = new RulesController();
        this.rulesController.init(game);
        this.boardController = new BoardController();
        this.rulesController.onInitialCardsDealt.add(this.boardController.initialCardsDealt, this.boardController);
        this.boardController.init(game, cloakService);
        this.view.init(game);
        this.view.countDownComplete.add(this.startGame, this);

      },

      onLobbyPlayerJoined: function(user) {
        this.numPlayers++;
        console.log('onLobbyPlayerJoined', this.numPlayers);
        if (this.numPlayers === 2)
        {
          this.startCountDown();
        }
      },

      drawGame: function() {
        this.rulesController.create3Decks();
        this.rulesController.createSpecialDeck();
        this.boardController.drawBoard();
      },

      startCountDown: function() {
        this.view.drawCountDown();
        this.view.startCountDown();
      },

      /**
       * startGame
       */
      startGame: function() {


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
        this.drawGame();



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