define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view',
    'components/card'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View, Card) {

    var DroppableStackView = View.extend({

      constructor: function(controller) {
        DroppableStackView.super.constructor.call(this, controller);
      },

      renderView: function(model) {
        var sprite = this.game.add.sprite(0,0);
        var graphics = this.game.add.graphics(0,0);
        graphics.beginFill(0x00ff00, 0.2);
        graphics.lineStyle(2, 0xff0000 , 1);
        graphics.drawRect(model.x, model.y, model.width, model.height);
        graphics.endFill();
        graphics.inputEnabled = true;
        graphics.hitArea = new PIXI.Rectangle(model.x, model.y, model.width, model.height);
        sprite.inputEnabled = true;
        sprite.addChild(graphics);
        sprite.events.onInputDown.add(this.controller.onMouseDown, this.controller);
        sprite.events.onInputUp.add(this.controller.onMouseUp, this.controller);
      }

    });

    return DroppableStackView;
  });