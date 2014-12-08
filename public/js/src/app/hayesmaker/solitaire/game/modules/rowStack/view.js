define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view',
    'components/card',
    'modules/droppableStack/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View, Card, DroppableStackView) {

    var RowStackView = DroppableStackView.extend({

      constructor: function(controller) {
        RowStackView.super.constructor.call(this, controller);
        this.container = null;
      },

      renderView: function(model) {
        RowStackView.super.renderView.call(this, model);
        this.container = this.game.add.sprite(0,0);
        var graphics = this.game.add.graphics(0,0);
        graphics.beginFill(0xff0000, 0.2);
        graphics.lineStyle(2, 0xff0000 , 1);
        graphics.drawRect(0,0,model.width,100);
        graphics.endFill();
        this.container.addChild(graphics);
        this.container.x = model.x;
        this.container.y = model.y;
      },
      
      addCard: function(card) {
        //console.log('{RowStackView} :: addCard :: ', card.sprite);
        //this.container.addChild(card.sprite);
        //card.sprite.x = 0;
        //card.sprite.y = 0;


      }


    });

    return RowStackView;
  });