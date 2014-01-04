define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'components/controller',
    'components/state',
    'components/rules',
    'utils/canvas',
    'display/cards',
    'display/layout'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Controller, State, Rules, draw , cards, Layout) {

    var Main = Class.extend({

      constructor: function() {
        this.allCards = [];
        this.gameCards = [];
        this.specialCards = [];
        this.dragInterval = null;
      },

      initialise: function(game) {
        this.game = game;
        this.game.main = this;
        this.layout = new Layout(this.game);
        this.controller = new Controller();
        this.rules = new Rules(this.controller);
        this.state = new State(this.controller);
        this.controller.initialise();
        this.state.initialise();
      },

      registerListeners : function() {

        this.controller.initialCardsDealt.add(this.onInitialCardsDealt, this);
        this.controller.drawn3cards.add(this.onDrawn3cards, this);



      },


      /**
       * Class methods
       */

      /**
       *
       * @param cardFrame
       * @param point
       */
      addTestCard: function(cardFrame, point, autoTurn) {
        var card = this.game.add.sprite(point.x, point.y ,'atlas');
        _.assign(card, {
          backFace: cards.getBackFace(),
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
        card.inputEnabled = true;
        card.scale.setTo(this.layout.card.scale.x, this.layout.card.scale.y);
        card.input.enableDrag(false, true);
        card.body.customSeparateX = true;
        card.body.customSeparateY = true;
        card.events.onDragStop.add(this.onDragStop, this);
        card.events.onDragStart.add(this.onDragStart, this);
        this.allCards.push(card);
        this.cardsGroup.add(card);
        return card;
      },

      /**
       *
       * @param playerId
       */
      onDrawn3cards: function(playerId) {

        var playCards = [];
        for (var i = 0; i < 3; i ++) {
          playCards.push(this.gameCards.pop());
        }

        var pile = this.layout.model.piles[2];

        _.each(playCards, function(gameCard) {
          //var t = new TweenMax(gameCard, 0.5, { x: pile.x, y: pile.y, onComplete: gameCard.onDealComplete });
        });
      },

      /**
       * onInitialCardsDealt //change this to deal the cards to each player
       * @param cards
       */
      onInitialCardsDealt: function(normalCards, specialCards) {

        var self = this;
        var gameCard;
        _.each(normalCards, function(cardFace) {
          gameCard = self.addTestCard(cardFace, {x:0, y:0}, false);
          self.gameCards.push(gameCard);
        });

        _.each(specialCards, function(cardFace, i) {
          if (i < 26) {
            gameCard = self.addTestCard(cardFace, {x:0, y:0}, true);
            self.specialCards.push(gameCard);
          }
        });

        var timeline = new TimelineLite();
        var tweenDuration = 0.0;
        var animComplete;

        _.each(this.allCards, function(gameCard, i) {
          var player1pile, player2pile;
          if (i < 156) {
            player1pile = self.layout.model.piles[3];
            player2pile = self.layout.model.piles[5];
            animComplete = function() {

            };
          } else {
            player1pile = self.layout.model.piles[0];
            player2pile = self.layout.model.piles[1];
          }

          var pile = (i % 2 === 0) ? player1pile : player2pile;

          var t = new TweenMax(gameCard, tweenDuration, { x: pile.x, y: pile.y, onComplete: gameCard.onDealComplete });
          timeline.add(t);
        });
      },


      onDragUpdate: function(card) {
        ThrowPropsPlugin.track(card, "x,y");
      },

      onDragStart: function(card) {
        var self = this;
        this.dragInterval = setInterval(function() {
          self.onDragUpdate(card);
        }, 10);
        this.onDragUpdate(card);
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
      },

      /**
       * framework methods
       * this = this.game.main
       */
      preload: function() {
        this.game.load.atlas('atlas', 'images/solitaire-showdown-assets.png', 'images/solitaire-showdown-assets.json');
        this.game.load.image('round-rect', 'images/round-rect.png');
      },

      /**
       * create
       * this = this.game.main
       */
      create: function() {
        console.log('mofo', this);
        this.game.stage.backgroundColor = '#999999';
        //this.game.stage.scale.setShowAll();
        var i;
        this.game.main.layout.drawPiles();
        this.game.main.cardsGroup = this.game.add.group();
        this.game.main.rules.createThreeDecks();
        this.game.main.rules.createSpecialDeck();
        this.game.main.rules.dealCards();

        this.game.main.rules.draw3cards(1);

      },

      update: function() {

      },

      render: function() {
        //this.game.debug.renderQuadTree(game.physics.quadTree);
      }

    });

    return Main;
  });