define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/rowStack/model',
    'modules/rowStack/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View) {

    /**
     * @type {*|extend|extend|void|Object|extend}
     */
    var RowStackController = Module.extend({

      constructor: function() {
        this.model = new Model(this);
        this.view = new View(this);

      },

      init: function(game, box) {
        RowStackController.super.init.call(this, game);
        this.view.init(game);

        this.model.setBox(box.x, box.y, box.width, box.height);
      },

      renderView: function() {
        this.view.drawStack(this.model.box);
      },

      setDropZoneEnabled: function(bool) {
        this.model.setDropZoneEnabled(bool);
      },

      addCard: function() {
        this.model.addCardHeightToDropPoint();
      },

      removeCard: function() {
        this.model.removeCardHeightFromDropPoint();
      }





    });

    return RowStackController;
  });