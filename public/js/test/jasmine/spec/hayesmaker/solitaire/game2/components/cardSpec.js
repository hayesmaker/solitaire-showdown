define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'TweenPlugins/ThrowPropsPlugin',
    'pixijs',
    'signals',
    'jasmineSignals',
    'utils/cardsHelper',
    'components/card',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, ThrowPropsPlugin, PIXI, Signal, spyOnSignal, CardHelper, Card, Mocks) {

    describe("Card Component Tests", function() {

      console.log('throw: ', ThrowPropsPlugin);

      var card, game;

      beforeEach(function() {

        card = new Card('ah', true);
      });

      afterEach(function() {
        card = null;
      });



      it("card is constructed", function() {
        expect(card).toBeDefined();
      });

      it("cardsHelper is created", function() {
        expect(card.cardsHelper).toBeDefined();
      });

      it("layoutHelper is created", function() {
        expect(card.layoutHelper).toBeDefined();
      });

      it("backface is defined", function() {
        expect(card.backface).toBeDefined();
      });

      it("face is defined", function() {
        expect(card.face).toBeDefined();
      });

      it("name is defined", function() {
        expect(card.name).toBe('ah');
      });

      it("autoTurn is defined", function() {
        expect(card.autoTurn).toBe(true);

      });

      it("sprite is null", function() {
        expect(card.sprite).toBeNull();
      });

      it("drawerPileClicked signal is created", function() {
        expect(card.drawerPileClicked).toBeDefined();
      });

      it("cardLanded signal is created", function() {
        expect(card.cardLanded).toBeDefined();
      });

      it("droppedRowStackIndex is NaN", function() {
        expect(card.droppedRowStackIndex).toBeNaN();
      });

      it("card is special set to false", function() {
        expect(card.isSpecial).toBe(false);
      });

      describe("Initialisation", function() {

        beforeEach(function() {

          game = Mocks.mockGame;
          spyOn(game.add, 'sprite').andReturn({
            frameName: jasmine.createSpy('frameName')
          });
          card.init(game, {x: 0, y: 0});
        });

        it("game is defined", function() {
          expect(card.game).toBe(Mocks.mockGame);
        });

        it("sprite is added to Phaser.Game", function() {
          expect(game.add.sprite).toHaveBeenCalled();
        });

        it("sprite frame should be set to the backface", function() {
          card.backface = "harryMonk";
          card.init(game, {x: 0, y: 0});
          expect(card.sprite.frameName).toBe('harryMonk');
        });

        it("sprite input should be enabled on init", function() {
          expect(card.sprite.inputEnabled).toBe(true);
        });

        it("Ace of Hearts is recognised as an ace", function() {
          expect(card.isAce).toBe(true);
        });

        it("Two of hearts is recognised as not an ace", function() {
          card = new Card('2h', true);
          expect(card.isAce).toBe(false);
        });
      });

      describe("Methods", function() {


        /**
         * Metbods

         onMouseDown: function(sprite) {
         onMouseUp: function(sprite) {
         *
         */

        beforeEach(function() {

          game = Mocks.mockGame;

          spyOn(game.add, 'sprite').andReturn({
            frameName: jasmine.createSpy('frameName'),
            bringToTop: jasmine.createSpy('bringToTop'),
            input: {
              useHandCursor: null,
              enableDrag: jasmine.createSpy('enableDrag')
            },
            events: {
              onInputUp: new Signal(),
              onInputDown: new Signal(),
              onDragStop: new Signal(),
              onDragStart: new Signal()
            }

          });

          card.init(game, {x: 0, y: 0});
        });

        it("setDropPoints: When I pass dropPoints to this method layoutHelper dropPoints and dropPoints should update", function() {
          var dropPoints = [{x: 100, y: 200}, {x: 100, y: 200}, {x: 100, y: 200}, {x: 100, y: 200}, {x: 100, y: 200}];
          card.setDropPoints(dropPoints);
          expect(card.layoutHelper.dropPoints).toEqual(dropPoints);

        });

        it("showFace: when I call showFace I should see the card's face", function() {
          card.showFace();
          expect(card.sprite.frameName).toBe('card-26.png');
        });

        it("drawCard: when I call drawCard then update the sprite's x position", function() {
          card.drawCard(0);
          expect(card.sprite.x).toBe(185);
        });

        it("drawCard: when I call drawCard then disable the card click", function() {
          card.drawCard(0);
          expect(card.canClick).toBe(false);
        });

        it("drawCard: when I call drawCard then show the card's face", function() {
          spyOn(card, 'showFace');
          card.drawCard(0);
          expect(card.showFace).toHaveBeenCalled();
        });

        it("enableDrag: mouse dragging should be enabled", function() {
          card.enableDrag();
          expect(card.sprite.input.enableDrag).toHaveBeenCalledWith(false, true);
        });

        it("enableDrag: when dragging is started, call onDragStart", function() {
          spyOn(card, 'onDragStart');

          card.enableDrag();
          card.sprite.events.onDragStart.dispatch(card);

          expect(card.onDragStart).toHaveBeenCalledWith(card);
        });

        it("enableDrag: when dragging is stopped, call onDragStop", function() {
          spyOn(card, 'onDragStop');

          card.enableDrag();
          card.sprite.events.onDragStop.dispatch(card);

          expect(card.onDragStop).toHaveBeenCalledWith(card);
        });


        it("enableClick: mouse press up event is added", function() {
          spyOn(card, 'onMouseUp');

          card.enableClick();
          card.sprite.events.onInputUp.dispatch(card);

          expect(card.onMouseUp).toHaveBeenCalledWith(card);
        });

        it("enableClick: mouse press down event is added", function() {
          spyOn(card, 'onMouseDown');

          card.enableClick();
          card.sprite.events.onInputDown.dispatch(card);

          expect(card.onMouseDown).toHaveBeenCalledWith(card);
        });

        it("enableClick: hand cursor is used on click enabled sprite", function() {
          card.enableClick();
          expect(card.sprite.input.useHandCursor).toBe(true);
        });

        it("disableClick: mouse press up event is removed", function() {
          spyOn(card, 'onMouseUp');

          card.enableClick();
          card.disableClick();

          card.sprite.events.onInputUp.dispatch(card);

          expect(card.onMouseUp).not.toHaveBeenCalled();
        });

        it("disableClick: mouse press down event is removed", function() {
          spyOn(card, 'onMouseDown');

          card.enableClick();
          card.disableClick();

          card.sprite.events.onInputDown.dispatch(card);

          expect(card.onMouseDown).not.toHaveBeenCalled();
        });

        it("disableClick: hand cursor is not used when click is disabled", function() {
          card.enableClick();
          card.disableClick();

          expect(card.sprite.input.useHandCursor).toBe(false);
        });


        it("onDragUpdate velocity of sprite is tracked for the ThrowPropsPlugin", function() {
          spyOn(window.ThrowPropsPlugin, 'track');

          card.enableClick();
          card.onDragUpdate(card.sprite);

          expect(window.ThrowPropsPlugin.track).toHaveBeenCalledWith(card.sprite, 'x,y');
        });

        it("onDragStart : when dragging starts, track velocity of sprite with onDragUpdate every 100ms", function() {

          spyOn(card, 'onDragUpdate');
          jasmine.Clock.useMock();

          card.onDragStart(card);

          jasmine.Clock.tick(500);

          expect(card.onDragUpdate.calls.length).toBe(5);
          expect(card.onDragUpdate).toHaveBeenCalledWith(card);
        });

        //todo onDragStopTest

        it("onThrowTweenCompleted: when card lands dispatch cardLanded signal with it's row stack index", function() {

          var signal = spyOnSignal(card.cardLanded);

          card.droppedRowStackIndex = 2;

          card.onThrowTweenCompleted(card);

          expect(signal).toHaveBeenDispatchedWith(card, 2);

        });

        it("onMouseUp: when mouse button is released when it is clickable dispatch drawerPileClicked signal", function() {
          var signal = spyOnSignal(card.drawerPileClicked);

          card.onMouseUp(card);

          expect(signal).toHaveBeenDispatchedWith(card);

          //todo implement test
        });









      });






    });


  });

