define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/game/controller',
    'modules/board/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, GameController, BoardController) {

    var Main = Class.extend({

      constructor: function() {
        console.log('app entry point');

        this.gameController = new GameController();
      },

      init: function(game) {
        this.game = game;
        this.game.controller = this.gameController;
        this.gameController.init(game);
      },

      preload: function() {
        this.game.controller.preload();
      },

      create: function() {
        this.game.controller.create();
      },

      update: function() {
        this.game.controller.update();

      },
      render: function() {
        this.game.controller.render();
      }

    });

    return Main;
  });