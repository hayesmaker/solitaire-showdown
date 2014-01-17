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
      }


    });

    return RowStackView;
  });