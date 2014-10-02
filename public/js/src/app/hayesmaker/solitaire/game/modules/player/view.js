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

      enableDrawPileClick: function(card) {
        card.enableClick();
        card.drawerPileClicked.add(this.controller.onDrawerPileClicked, this.controller);
      },

      dealCard: function(card) {
        card.init(this.game, this.origin);
      },

      draw3Cards: function(cards, isMe) {
        _.each(cards, function(card, i) {
          card.drawCard(i);
          card.disableClick();
          if (isMe) {
            if (i === 2) {
              card.enableDrag();
              card.setNextCards([cards[0], cards[1]]);
            }
          }
        });
      }



    });

    return PlayerView;
  });