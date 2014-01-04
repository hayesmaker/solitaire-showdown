define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View) {

    var AcePileView = View.extend({

      constructor: function(controller) {
        View.super.constructor.call(this, controller);
      },


      drawStack: function(model) {
        var graphics = this.game.add.graphics(0,0);
        graphics.beginFill(0x00ff00, 0.2);
        graphics.lineStyle(2, 0xff0000 , 1);
        graphics.drawRect(model.x, model.y, model.width, model.height);
        graphics.endFill();
      }



    });

    return AcePileView;
  });