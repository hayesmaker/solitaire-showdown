define(['lodash', 'class', 'display/cards'], function(_, Class, cardsHelper) {
  'use strict';

  var Card = Class.extend({
    constructor: function(cardFrame, autoTurn) {

      this.sprite = null;
      this.backface = cardsHelper.getBackFace();
      this.face = cardsHelper.getByName(cardFrame);
      this.name = cardFrame;
      this.autoTurn = autoTurn;
      this.layout = null;
      //this.value = cardFrame[0];
      //this.suit = ;
    },

    initialise: function(game, layout, point) {
      this.layout = layout;
      this.sprite = game.add.sprite(point.x, point.y, 'atlas');
      this.sprite.inputEnabled = true;

    },

    enableDrag: function() {
      this.sprite.enableDrag(false, true);
      this.sprite.events.onDragStop.add(this.onDragStop, this);
      this.sprite.events.onDragStart.add(this.onDragStart, this);
    },

    onDealComplete: function() {
      if (this.autoTurn) {
        this.showFace();
      }
    },

    showFace: function() {
      this.sprite.frameName = cardsHelper.getName(this.name);
    },

    onDragUpdate: function(card) {
      ThrowPropsPlugin.track(card);
    },

    onDragStart: function(card) {
      var self = this;
      this.dragInterval = setInterval(function() {
        self.onDragUpdate(card);
      }, 100);
    },

    onDragStop: function(card) {
      var tweenDuration = 0.5;
      var seekerTween = new TweenMax(card, tweenDuration, {
        throwProps:{
          resistance:100,
          y:{
            velocity:"auto",
            min:card.yMin,
            max:card.yMax,
            end:"auto"
          },
          x:{
            velocity:"auto",
            min:card.xMin,
            max:card.xMax,
            end:"auto"
          }
        },
        ease:Power3.easeOut
      });
      clearInterval(this.dragInterval);

      seekerTween.seek(tweenDuration, true);
      var x = seekerTween.target.x;
      var y = seekerTween.target.y;
      seekerTween.seek(0).kill();

      var closestDropPoint = this.layout.getNearestDropPoint({
        x: x,
        y: y
      });

      TweenMax.to(card, tweenDuration, {
        throwProps:{
          resistance:100, //increase or decrease this number to add more or less friction/resistance.
          y:{
            velocity:"auto", //since we're tracking "y", the tracked value will be calculated and used automatically.
            min:card.yMin, //Draggable instances auto-populate xMax, yMax, xMin, and yMin if you define "bounds" which makes it easy to tap into.
            max:card.yMax,
            end:closestDropPoint.point.x
          },
          x:{
            velocity:"auto", //since we're tracking "x", the tracked value will be calculated and used automatically.
            min:card.xMin,
            max:card.xMax,
            end:closestDropPoint.point.y
          }
        },
        onComplete: this.onCardLanded,
        onCompleteParams: [card],
        ease:Power3.easeOut
      });
    }




  });

  return Card;
});

/**
 var card = this.game.add.sprite(point.x, point.y ,'atlas');
 _.assign(card, {
  face: cards.getByName(cardFrame),
  name: cardFrame,
  autoTurn: autoTurn,
  onDealComplete: function() {
    if (autoTurn) {
      card.frameName = cards.getByName(cardFrame);
    }
  }
});
 card.frameName = card.backFace;

 this.gameCards.push(card);
 this.cardsGroup.add(card);
 return card;
 **/