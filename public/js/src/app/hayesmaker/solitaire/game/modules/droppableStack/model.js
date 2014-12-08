/**
 * Created by hayesmaker on 16/01/14.
 */
define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var DroppableStackModel = Class.extend({

      constructor: function(controller) {
        this.controller = controller;
        this.box = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        this.dropZoneEnabled = false;
        this.dropPoint = {
          x: 0,
          y: 0
        };

        this.origin = {
          x: 0,
          y: 0
        }

        this.index = null;
        this.type = null;
        this.cards = [];
      },

      setDropZoneEnabled: function(bool) {
        this.dropZoneEnabled = bool;
      },

      setBox: function(x, y, width, height) {
        this.box.x = x;
        this.box.y = y;
        this.box.width = width;
        this.box.height = height;
        this.dropPoint.x = this.origin.x = x;
        this.dropPoint.y = this.origin.y = y;
      },

      getLastCard: function() {
        return this.cards[this.cards.length-1];
      },

      getCardByName: function(name) {
        var card = _.find(this.cards, function(card) {
          return card.name === name;
        });
        return card;
      },

      //TODO fix bug here
      addCard: function(card) {
        var i, existingCard, len;
        len = this.cards.length;
        console.log('{DroppableStackModel} :: addCard :: cardName,this.cards.length=', card.name, len);
        for (i = 0; i < len; i++) {
          existingCard = this.cards[i];
          existingCard.addToPileCards(card);
        }
        this.cards.push(card);
      },

      removeCard: function(card) {
        var cardIndex = this.cards.indexOf(card);
        var pileLen = 1 + card.pileCards.length;
        if (cardIndex >= 0) {
          this.cards.splice(cardIndex, pileLen);
          console.log('{DroppableStack} removeCard :: cardIndex', cardIndex, ' cards=', this.cards);
        }
      }


    });

    return DroppableStackModel;
  });