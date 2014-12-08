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

      onMouseDown: function() {
        //console.log('onMouseDown', this);
      },

      onMouseUp: function(sprite) {

        var rowCards = _.map(this.model.cards, 'name');
        console.log('** HEALTH CHECK ROW ***', rowCards);
        var pileCards = _.map(this.model.cards, 'pileCards');

        var i, len = rowCards.length, c;
        for (i = 0; i < len; i++)
        {
          c = rowCards[i];
          console.log('DroppableStackView :: Card', i, c, _.map(pileCards[i], 'name'));
        }
      },


      renderView: function() {
        //this.view.drawStack(this.model.box);
        this.view.renderView(this.model.box);
      },

      setDropZoneEnabled: function(bool) {
        this.model.setDropZoneEnabled(bool);
      },

      checkAvailable: function(cardName) {

      },

      setType: function(type) {
        console.log('{DroppableStack} :: type=', type);
        this.model.type = type;
      },

      setIndex: function(index) {
        this.model.index = index;
      },

      addCard: function(card) {
        this.model.addCard(card);

      },

      removeCard: function(card) {
        this.model.removeCard(card);
      }

    });

    return DroppableStackController;
  });