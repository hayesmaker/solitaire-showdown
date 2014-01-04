define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'utils/cardsHelper',
    'utils/layoutHelper'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal, CardHelper, LayoutHelper) {

    var Card = Class.extend({

      constructor: function(name, autoTurn) {
        this.cardsHelper = new CardHelper();
        this.layoutHelper = new LayoutHelper();
        this.backface = this.cardsHelper.backFace;
        this.face = this.cardsHelper.getByName(name);
        this.name = name;
        this.autoTurn = autoTurn;
        this.sprite = null;
        this.drawerPileClicked = new Signal();
        this.cardLanded = new Signal();
        this.dropPoints = [];
        this.droppedRowStackIndex = NaN;
        this.isAce = name[0] === 'a';
      },

      init: function(game, point) {
        this.game = game;
        this.sprite = this.game.add.sprite(point.x, point.y, 'atlas');
        this.sprite.frameName = this.backface;
        this.sprite.inputEnabled = true;
      },

      setDropPoints: function(dropPoints) {
        this.dropPoints = this.layoutHelper.dropPoints = _.clone(dropPoints);
      },

      showFace: function() {
        this.sprite.frameName = this.face;
      },

      drawCard: function(i) {
        this.sprite.x = 185 + 10 * i;
        this.sprite.bringToTop();
        this.canClick = false;
        this.showFace();
      },

      enableDrag: function() {
        //this.setDropPoints(dropPoints? dropPoints : [{x:0, y:0}] );
        this.sprite.input.enableDrag(false, true);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
        this.sprite.events.onDragStart.add(this.onDragStart, this);
      },

      enableClick: function() {
        this.sprite.events.onInputUp.add(this.onMouseUp, this);
        this.sprite.events.onInputDown.add(this.onMouseDown, this);
        this.sprite.input.useHandCursor = true;
      },

      disableClick: function() {
        this.canClick = false;
        this.sprite.events.onInputUp.remove(this.onMouseUp, this);
        this.sprite.events.onInputDown.remove(this.onMouseDown, this);
        this.sprite.input.useHandCursor = false;
      },

      onDragUpdate: function(sprite) {
        ThrowPropsPlugin.track(sprite, 'x,y');
      },

      onDragStart: function(card) {
        var self = this;
        this.dragInterval = setInterval(function() {
          self.onDragUpdate(card);
        }, 100);
      },

      onDragStop: function(sprite) {
        var tweenDuration = 0.5;
        var seekerTween = new TweenMax(sprite, tweenDuration, {
          throwProps:{
            resistance:100,
            y:{
              velocity:"auto",
              min:sprite.yMin,
              max:sprite.yMax,
              end:"auto"
            },
            x:{
              velocity:"auto",
              min:sprite.xMin,
              max:sprite.xMax,
              end:"auto"
            }
          },
          ease:Power3.easeOut
        });
        clearInterval(this.dragInterval);

        try {
          seekerTween.seek(tweenDuration, true);
        } catch(e) {
          console.log('card not thrown');
          return;
        }

        var x = seekerTween.target.x;
        var y = seekerTween.target.y;
        seekerTween.seek(0).kill();

        var closestDropPoint = this.layoutHelper.getNearestDropPoint({
          x: x,
          y: y
        });

        this.droppedRowStackIndex = closestDropPoint.index;

        TweenMax.to(sprite, tweenDuration, {
          throwProps:{
            resistance:100, //increase or decrease this number to add more or less friction/resistance.
            x:{
              velocity:"auto", //since we're tracking "x", the tracked value will be calculated and used automatically.
              min:sprite.xMin,
              max:sprite.xMax,
              end:closestDropPoint.point.x
            },
            y:{
              velocity:"auto", //since we're tracking "y", the tracked value will be calculated and used automatically.
              min:sprite.yMin, //Draggable instances auto-populate xMax, yMax, xMin, and yMin if you define "bounds" which makes it easy to tap into.
              max:sprite.yMax,
              end:closestDropPoint.point.y
            }
          },
          onComplete: this.onThrowTweenCompleted,
          onCompleteParams: [this],
          ease:Power3.easeOut
        });
      },

      onThrowTweenCompleted: function(card) {
        console.log('onThrowTweenCompleted', card.droppedRowStackIndex);
        card.cardLanded.dispatch(card, card.droppedRowStackIndex);
      },

      onMouseDown: function(sprite) {

      },

      onMouseUp: function(sprite) {
        //throw "not implemented";
        this.drawerPileClicked.dispatch(this);
      }

    });

    return Card;
  });

