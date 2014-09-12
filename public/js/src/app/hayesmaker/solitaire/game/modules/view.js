define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module) {

    var View = Module.extend({

      constructor: function(controller) {
        this.controller = controller;
      },

      init: function(game) {
        this.game = game;
      }

    });

    return View;
  });
