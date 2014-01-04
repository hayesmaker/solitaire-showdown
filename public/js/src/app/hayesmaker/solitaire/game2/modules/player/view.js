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

    var PlayerView = View.extend({

      constructor: function(controller, origin) {
        PlayerView.super.constructor.call(this, controller);
        this.origin = origin;
      },

      dealCard: function(card) {
        card.init(this.game, this.origin);
        card.enableClick();
        card.drawerPileClicked.add(this.controller.onDrawerPileClicked, this.controller);
      },

      draw3Cards: function(cards) {
        _.each(cards, function(card, i) {
          card.drawCard(i);
          card.enableDrag();
          card.disableClick();
        });
      }



    });

    return PlayerView;
  });