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
        this.detectAvailableSlots = new Signal();
        this.cardLanded = new Signal();
        this.isAce = name[0] === 'a';
        this.isSpecial = false;
        this.originPos = {x: 0, y: 0};

        this.dropSuccesful = false;
        this.droppedStack = null;

        this.isPlayer1 = false;
        this.isPlayer2 = false;

        if (name.indexOf('a') > -1) {
          this.value = 1;
        } else if (name.indexOf('2') > -1) {
          this.value = 2;
        } else if (name.indexOf('3') > -1) {
          this.value = 3;
        } else if (name.indexOf('4') > -1) {
          this.value = 4;
        } else if (name.indexOf('5') > -1) {
          this.value = 5;
        } else if (name.indexOf('6') > -1) {
          this.value = 6;
        } else if (name.indexOf('7') > -1) {
          this.value = 7;
        } else if (name.indexOf('8') > -1) {
          this.value = 8;
        } else if (name.indexOf('9') > -1) {
          this.value = 9;
        } else if (name.indexOf('10') > -1) {
          this.value = 10;
        } else if (name.indexOf('j') > -1) {
          this.value = 11;
        } else if (name.indexOf('q') > -1) {
          this.value = 12;
        } else if (name.indexOf('k') > -1) {
          this.value = 13;
        }

        if (name.indexOf('s') > -1) {
          this.suit = 's';
          this.isBlack = true;
        } else if (name.indexOf('h') > -1) {
          this.suit = 'h';
          this.isRed = true;
        } else if (name.indexOf('c') > -1) {
          this.suit = 'c';
          this.isBlack = true;
        } else if (name.indexOf('d') > -1) {
          this.suit = 'd';
          this.isRed = true;
        }

        this.nextCards = [];


      },

      init: function(game, point) {
        this.game = game;
        this.sprite = this.game.add.sprite(point.x, point.y, 'atlas');
        this.sprite.frameName = this.backface;
        this.sprite.inputEnabled = true;
      },

      /**
       * @deprecated
       * use dropStacks
       * @param dropPoints
       */
      setDropPoints: function(dropPoints) {
        this.layoutHelper.setDropPoints(dropPoints);

      },

      setDropStacks: function(dropStacks) {
        this.layoutHelper.setDropStacks(dropStacks);
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

        this.originPos = {x: this.sprite.x, y: this.sprite.y};

        this.detectAvailableSlots.dispatch(this);

      },

      disableDrag: function() {
        this.sprite.input.disableDrag();

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

      onDragStart: function(sprite) {
        var self = this;
        this.dragInterval = setInterval(function() {
          self.onDragUpdate(sprite);
        }, 100);
      },

      onDragStop: function(sprite) {
        var tweenDuration = 0.5;

        if (!this.layoutHelper.dropPoints.length) {
          this.layoutHelper.dropPoints = [this.originPos];
          this.dropSuccesful = false;
        } else {
          //this.dropSuccesful = true;
        }

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
          console.log('[ERROR] card not thrown :: return To Origin');
          this.resetCardVars();
          return;
        }

        var x = seekerTween.target.x;
        var y = seekerTween.target.y;
        seekerTween.seek(0).kill();

        if (isNaN(x) || isNaN(y))
        {
          console.log("[Card] :: isNan === true");
          x = this.originPos.x;
          y = this.originPos.y;
        }

        var closestDropPoint = this.layoutHelper.getNearestDropPointAndStack({
          x: x,
          y: y
        });


        console.log("[Card] :: closestDropPoint=", closestDropPoint);

        this.droppedStack = closestDropPoint.stack;

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
        //console.log('onThrowTweenCompleted', card.droppedRowStackIndex);
        card.cardLanded.dispatch(card);

        //card.resetCardVars();

      },

      onMouseDown: function(sprite) {

      },

      onMouseUp: function(sprite) {
        //throw "not implemented";
        this.drawerPileClicked.dispatch(this);
      },

      resetCardVars: function() {
        this.dropSuccesful = false;
        this.layoutHelper.dropPoints = [];
        this.layoutHelper.dropStacks = [];
      },

      setNextCards: function(cards) {
        for (var i = 0; i < cards.length; i++) {
          this.nextCards.push(cards[i]);
        }
      },

      enableNextCard: function() {

        if (this.nextCards.length) {
          var nextCard = this.nextCards.pop();
          nextCard.enableDrag();
          nextCard.setNextCards(this.nextCards);
        } else {
          console.log('no next cards');
        }


      }

    });

    return Card;
  });

