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

    var SpecialPileView = View.extend({

      constructor: function(controller, origin) {
        SpecialPileView.super.constructor.call(this, controller);
        this.origin = origin;
      },

      drawStack: function(box) {
        var graphics = this.game.add.graphics(0,0);
        graphics.beginFill(0x00ff00, 0.2);
        graphics.lineStyle(2, 0xff0000 , 1);
        graphics.drawRect(box.x, box.y, box.width, box.height);
        graphics.endFill();
      },

      dealCard: function(card) {
        card.init(this.game, this.origin);
        card.showFace();
        card.enableDrag();
        //card.showFace();
      }

      /**
       * dealCard: function(card) {
        card.init(this.game, this.origin);
        card.enableClick();
        card.drawerPileClicked.add(this.controller.onDrawerPileClicked, this.controller);
      },
       */

    });

    return SpecialPileView;
  });