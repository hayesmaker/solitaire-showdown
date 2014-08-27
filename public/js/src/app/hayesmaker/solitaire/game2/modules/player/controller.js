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
      },

      init: function(game) {
        PlayerController.super.init.call(this, game);
        this.view.init(game);
        this.specialPile.init(game);
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
        console.log('[PlayerController] :: onRefreshAvailableDropStacks');
        var topSpecialCard = this.specialPile.getTopSpecialCard();
        var topVisibleDrawCard = this.model.getNextVisibleDrawCard();
        console.log('onRefreshAvailableDrawStacks :: topSpecial=', topSpecialCard, 'topVisible=', topVisibleDrawCard);




      }





    });

    return PlayerController;
  });