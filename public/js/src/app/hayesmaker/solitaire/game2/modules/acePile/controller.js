define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/acePile/model',
    'modules/acePile/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View) {

    var AcePileController = Module.extend({

      constructor: function() {
        this.model = new Model(this);
        this.view = new View(this);
      },

      init: function(game, box) {
        AcePileController.super.init.call(this, game);
        this.view.init(game);

        this.model.setBox(box.x, box.y, box.width, box.height);
      },

      renderView: function() {
        this.view.drawStack(this.model.box);
      }


    });

    return AcePileController;
  });