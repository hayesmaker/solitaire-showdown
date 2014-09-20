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
        /**
         * @deprecated
         * @type {signals}
         */
        this.detectAvailableSlots = new Signal();
        /**
         * untested
         * unmocked
         * @type {signals}
         */
        this.refreshAvailableDropStacks = new Signal();
        this.cardThrown = new Signal();
        this.cardLanded = new Signal();
        this.isAce = name[0] === 'a';
        this.isSpecial = false;
        this.originPos = {x: 0, y: 0};

        this.dropSuccessful = false;
        this.droppedStack = null;
        this.originalStack = null;

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

      cardIsSameSuitAndOneHigher: function(card) {

        console.log('{Card} :: cardIsSameSuitAndOneHigher :: this.value + 1 =', this.value + 1);

        if (card.suit === this.suit && card.value === this.value + 1)
        {
          return true;
        } else {
          return false;
        }
      },

      addToStack: function() {
        this.droppedStack.addCard(this);
        this.originalStack = this.droppedStack;

        console.log('[Card] addToStack :: this=', this);

        this.resetCardVars();
        this.disableDrag();
        this.enableNextCard();
        /*
         card.resetCardVars();
         card.disableDrag();
         card.enableNextCard();
         */
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
        console.log('[Card] :: enableDrag :: detectAvailableSlots dispatch');
        //this.setDropPoints(dropPoints? dropPoints : [{x:0, y:0}] );
        this.sprite.input.enableDrag(false, true);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
        this.sprite.events.onDragStart.add(this.onDragStart, this);
        this.originPos = {x: this.sprite.x, y: this.sprite.y};

        this.refreshAvailableDropStacks.dispatch();
      },

      softEnableDrag: function() {
        this.sprite.input.enableDrag();
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
        this.sprite.bringToTop();
        var self = this;
        this.dragInterval = setInterval(function() {
          self.onDragUpdate(sprite);
        }, 100);
      },

      onDragStop: function(sprite) {
        var tweenDuration = 0.5;

        if (!this.layoutHelper.dropStacks.length) {
          //this.layoutHelper.dropStacks = [this.originPos];
          throw new Error("drop not succesful");
        } else {
          //this.dropSuccessful = true;
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
              /**
               *
               [LayoutHelper] :: getNearestDropPointAndStack1 :: distances=
               Array[0]
               [LayoutHelper] :: getNearestDropPointAndStack2 :: distances=
               Array[0]
               [LayoutHelper] :: getNearestDropPointAndStack3 :: point=
               Object
               x: 484.0229118250669
               y: 17.035749181529674
               __proto__: Object
               closestPoint= Infinity
               [Card] :: closestDropPoint= Infinity
               Uncaught TypeError: Cannot read property 'x' of undefined localhost:3000/js/src/app/hayesmaker/solitaire/game2/components/card.js:223
               end:closestDropPoint.point.x

               */
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

        this.cardThrown.dispatch(this);

      },

      onThrowTweenCompleted: function(card) {
        console.log('**************************************');
        console.log('{Card} :: onThrowTweenCompleted :: ', card.name, ' originalStack.index=', card.originalStack);
        console.log('**************************************');

        if (card.originalStack)
        {
          card.originalStack.removeCard(card);
          card.originalStack = null;
        }

        card.dropSuccessful = true;
        card.cardLanded.dispatch(card);
        //todo test
        card.refreshAvailableDropStacks.dispatch();
        card.dropSuccessful = false;
      },

      onMouseDown: function(sprite) {

      },

      onMouseUp: function(sprite) {
        this.drawerPileClicked.dispatch(this);
      },

      resetCardVars: function() {
        console.log('{Card} :: resetCardVars');
        //this.dropSuccessful = false;
        // Could give a default drop point to the array so it is not empty, but then change test to show it.
        this.layoutHelper.dropPoints = [];
        this.layoutHelper.dropStacks = [];
      },

      setNextCards: function(cards) {
        for (var i = 0; i < cards.length; i++) {
          this.nextCards.push(cards[i]);
        }
      },

      /**
       * this is for draw cards only... Special pile cards are all enabled already... not the best
       */
      enableNextCard: function() {
        console.log('[Card] :: enableNextCard :: ', this.nextCards);

        if (this.nextCards.length) {

          var nextCard = this.nextCards.pop();

          console.log('[Card] enableNextCard :: nextCard=', nextCard);

          nextCard.enableDrag();
          nextCard.setNextCards(this.nextCards);
        } else {
          console.log('no next cards');
        }


      }

    });

    return Card;
  });

