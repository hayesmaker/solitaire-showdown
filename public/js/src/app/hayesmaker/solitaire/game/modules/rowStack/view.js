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

        this.graphics = null;
        this.highlightGraphic = null;
      },

      renderView: function(model) {
        RowStackView.super.renderView.call(this, model);
        this.container = this.game.add.sprite(0,0);
        this.graphics = this.game.add.graphics(0,0);
        this.graphics.beginFill(0xff0000, 0.2);
        this.graphics.lineStyle(2, 0xff0000 , 1);
        this.graphics.drawRect(0,0,model.width,100);
        this.graphics.endFill();
        this.container.addChild(this.graphics);

        this.highlightGraphic = this.game.add.graphics(0,0);
        this.highlightGraphic.beginFill(0x00ff00, 0.5);
        this.highlightGraphic.drawRect(0,0,model.width, model.height);
        this.highlightGraphic.endFill();
        this.container.addChild(this.highlightGraphic);
        this.highlightGraphic.visible = false;

        this.container.x = model.x;
        this.container.y = model.y;
      },
      
      addCard: function(card) {
        //console.log('{RowStackView} :: addCard :: ', card.sprite);
        //this.container.addChild(card.sprite);
        //card.sprite.x = 0;
        //card.sprite.y = 0;
      },

      highlight: function(value) {
        console.log('{RowStackController} :: highlight=', this.controller.model.index, value);
        //this.container.tint = 0.2 * 0x00ff00;
        this.highlightGraphic.visible = value;
      }


    });

    return RowStackView;
  });