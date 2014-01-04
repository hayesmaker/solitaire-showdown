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

    var RulesView = View.extend({

      constructor: function(controller) {
        RulesView.super.constructor.call(this, controller);
      }

    });

    return RulesView;
  });