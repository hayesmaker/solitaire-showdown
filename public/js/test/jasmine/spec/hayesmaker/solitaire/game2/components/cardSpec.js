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

      it("detectAvailableSlots signal is created", function() {
        expect(card.detectAvailableSlots).toBeDefined();
      });

      it("cardLanded signal is created", function() {
        expect(card.cardLanded).toBeDefined();
      });

      it("dropSuccesful is false", function() {
        expect(card.dropSuccesful).toBe(false);
      });

      it("droppedStack is null", function() {
        expect(card.droppedStack).toBe(null);
      });

      it("isPlayer1 defaults to false", function() {
        expect(card.isPlayer1).toBe(false);
      });

      it("isPlayer2 defaults to false", function() {
        expect(card.isPlayer2).toBe(false);
      });

      it("card is special set to false", function() {
        expect(card.isSpecial).toBe(false);
      });

      it("card origin position is set to 0,0", function() {
        expect(card.originPos).toEqual({x: 0, y: 0});
      });

      it("nextCards container is created", function() {
        expect(card.nextCards).toEqual([]);
      });

      it("card is black if it's a club", function() {
        card = new Card('ac', true);
        expect(card.isBlack).toBe(true);
      });

      it("card is black if it's a spade", function() {
        card = new Card('as', true);
        expect(card.isBlack).toBe(true);

      });

      it("card is red if it's a diamond", function() {
        card = new Card('ad', true);
        expect(card.isRed).toBe(true);
      });

      it("card is red if it's a heart", function() {
        card = new Card('ah', true);
        expect(card.isRed).toBe(true);
      });

      describe("Card Value is set correct", function() {
        it("Ace card value is 1", function() {
          card = new Card('ah', true);
          expect(card.value).toBe(1);
        });

        it("Two card value is 2", function() {
          card = new Card('2h', true);
          expect(card.value).toBe(2);
        });

        it("Three card value is 3", function() {
          card = new Card('3h', true);
          expect(card.value).toBe(3);
        });

        it("Four card value is 4", function() {
          card = new Card('4h', true);
          expect(card.value).toBe(4);
        });

        it("Five card value is 5", function() {
          card = new Card('5h', true);
          expect(card.value).toBe(5);
        });

        it("Six card value is 6", function() {
          card = new Card('6h', true);
          expect(card.value).toBe(6);
        });

        it("Seven card value is 7", function() {
          card = new Card('7h', true);
          expect(card.value).toBe(7);
        });

        it("Eight card value is 8", function() {
          card = new Card('8h', true);
          expect(card.value).toBe(8);
        });

        it("Nine card value is 9", function() {
          card = new Card('9h', true);
          expect(card.value).toBe(9);
        });

        it("Ten card value is 10", function() {
          card = new Card('10h', true);
          expect(card.value).toBe(10);
        });

        it("Jack card value is 11", function() {
          card = new Card('jh', true);
          expect(card.value).toBe(11);
        });

        it("Queen card value is 12", function() {
          card = new Card('qh', true);
          expect(card.value).toBe(12);
        });

        it("King card value is 13", function() {
          card = new Card('kh', true);
          expect(card.value).toBe(13);
        });

        it("Heart card suit is h", function() {
          card = new Card('kh', true);
          expect(card.suit).toBe('h');
        });

        it("Diamond card value is d", function() {
          card = new Card('kd', true);
          expect(card.suit).toBe('d');
        });

        it("Club card value is c", function() {
          card = new Card('kc', true);
          expect(card.suit).toBe('c');
        });

        it("Spade card value is s", function() {
          card = new Card('ks', true);
          expect(card.suit).toBe('s');
        });
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

        beforeEach(function() {

          game = Mocks.mockGame;

          spyOn(game.add, 'sprite').andReturn({
            frameName: jasmine.createSpy('frameName'),
            bringToTop: jasmine.createSpy('bringToTop'),
            input: {
              useHandCursor: null,
              enableDrag: jasmine.createSpy('enableDrag')
            },
            x: 10,
            y: 10,
            events: {
              onInputUp: new Signal(),
              onInputDown: new Signal(),
              onDragStop: new Signal(),
              onDragStart: new Signal()
            }

          });

          card.init(game, {x: 10, y: 10});
        });

        it("setDropStacks: When I pass dropStacks in, then layoutHelper dropStacks should be updated", function() {
          var dropPoints = [{x: 100, y: 200}, {x: 100, y: 200}, {x: 100, y: 200}, {x: 100, y: 200}, {x: 100, y: 200}];
          card.setDropStacks(dropPoints);
          expect(card.layoutHelper.dropStacks).toEqual(dropPoints);
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

        it("enableDrag: when dragging is enabled, store the origin position", function() {
         card.enableDrag();
          expect(card.originPos).toEqual({x: 10, y: 10});
        });

        it("enableDrag: when dragging is stopped, call onDragStop", function() {
          spyOn(card, 'onDragStop');

          card.enableDrag();
          card.sprite.events.onDragStop.dispatch(card);

          expect(card.onDragStop).toHaveBeenCalledWith(card);
        });

        it("enableDrag: when dragging is enabled, send signal to detect available slots", function() {
          var spy = spyOnSignal(card.detectAvailableSlots);

          card.enableDrag();

          expect(spy).toHaveBeenDispatched();
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

          card.onThrowTweenCompleted(card);

          expect(signal).toHaveBeenDispatchedWith(card);

        });

        it("onMouseUp: when mouse button is released when it is clickable dispatch drawerPileClicked signal", function() {
          var signal = spyOnSignal(card.drawerPileClicked);

          card.onMouseUp(card);

          expect(signal).toHaveBeenDispatchedWith(card);

        });

        it("resetCardVars: dropSuccesful is reset when called", function() {
          card.dropSuccesful = true;
          card.resetCardVars();
          expect(card.dropSuccesful).toBe(false);
        });

        it("resetCardVars: dropSuccesful is reset when called", function() {
          card.setDropStacks([{mock:'mock'}]);
          card.resetCardVars();
          expect(card.layoutHelper.dropStacks.length).toBe(0);
        });

        it("setNextCards: I can set the nextCards array", function() {
          var nextCards = [Mocks.getCard('ah')];
          card.setNextCards(nextCards);
          expect(card.nextCards).toEqual(nextCards);
        });

        /**
         * enableNextCard: function() {

        if (this.nextCards.length) {
          var nextCard = this.nextCards.pop();
          nextCard.enableDrag();
          nextCard.setNextCards(this.nextCards);
        } else {
          console.log('no next cards');
        }
      }
         */

        it("enableNextCards: next card is enabled for dragging when called", function() {
          var mockCard = Mocks.getCard('ah');
          var nextCards = [mockCard];
          card.setNextCards(nextCards);

          card.enableNextCard();
          expect(mockCard.enableDrag).toHaveBeenCalled();
        });

        it("enableNextCards: next card is enabled for dragging when called", function() {
          var mockCard1 = Mocks.getCard('ah');
          var mockCard2 = Mocks.getCard('jh');
          var nextCards = [mockCard1, mockCard2];

          card.setNextCards(nextCards);
          card.enableNextCard();

          expect(mockCard2.setNextCards).toHaveBeenCalledWith(card.nextCards);
        });



      });

    });

  });

