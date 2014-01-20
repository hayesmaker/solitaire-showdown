/**
 * Created by hayesmaker on 16/01/14.
 */
define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/droppableStack/model',
    'modules/droppableStack/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View) {

    /**
     * @type {*|extend|extend|void|Object|extend}
     */
    var DroppableStackController = Module.extend({

      constructor: function() {
        this.model = new Model(this);
        this.view = new View(this);

      },

      init: function(game, box) {
        DroppableStackController.super.init.call(this, game);
        this.view.init(game);
        this.model.setBox(box.x, box.y, box.width, box.height);
      },

      renderView: function() {
        this.view.drawStack(this.model.box);
      },

      setDropZoneEnabled: function(bool) {
        this.model.setDropZoneEnabled(bool);
      },

      checkAvailable: function(cardName) {




      },

      addCard: function(card) {
        this.model.cards.push(card);
      }

    });

    return DroppableStackController;
  });