define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/player/model',
    'modules/player/view',
    'modules/specialPile/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal, Module, Model, View, SpecialPileController) {

    var PlayerController = Module.extend({

      constructor: function(origin) {
        this.model = new Model(this);
        this.view = new View(this, origin);
        this.origin = origin;
        this.specialPile = new SpecialPileController(origin);
        this.boardController = null;
        this.player = 0;
      },

      init: function(game, boardController, player) {
        PlayerController.super.init.call(this, game);
        this.player = player;
        this.view.init(game);
        this.specialPile.init(game);
        this.boardController = boardController;
      },

      drawStacks: function() {
        this.specialPile.drawStack();
      },

      startGame: function() {
        this.specialPile.startGame();
      },

      /**
       * @param card
       */
      dealCard: function(card) {
        this.model.addToDrawPile(card);
        this.view.dealCard(card);
      },

      /**
       * @param card
       */
      dealSpecialCard: function(card) {
        this.specialPile.addCard(card);

      },

      onDrawerPileClicked: function(card) {
        this.view.draw3Cards(this.model.get3FromPile());
      },

      onRefreshAvailableDropStacks: function() {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
        var topSpecialCard = this.specialPile.getTopSpecialCard();
        var topVisibleDrawCard = this.model.getNextVisibleDrawCard();
        console.log('{PlayerController} onRefreshAvailableDrawStacks :: topSpecial=', topSpecialCard && topSpecialCard.name, 'topVisible=', topVisibleDrawCard && topVisibleDrawCard.name);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');

        if (topSpecialCard)
        {
          this.reCheckAvailableStacks(topSpecialCard);
        }

        if (topVisibleDrawCard)
        {
          this.reCheckAvailableStacks(topVisibleDrawCard);
        }


        this.boardController.model.checkAllDrawPilesForMoves(this.player);


      },

      reCheckAvailableStacks: function(card) {
        this.boardController.model.checkAvailableStacks(card);
      }





    });

    return PlayerController;
  });