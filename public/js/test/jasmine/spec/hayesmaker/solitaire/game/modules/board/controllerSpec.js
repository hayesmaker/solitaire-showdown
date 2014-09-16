define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/board/controller',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, BoardController, Mocks) {


      //todo next

    describe("Board.Controller Tests", function() {

      var controller;
      var game;
      var RowStackModuleSpy;

      beforeEach(function() {
        controller = new BoardController();
        game = Mocks.mockGame;
        cloak = Mocks.mockCloak;

        controller.init(game, cloak);
      });

      afterEach(function() {
        controller = null;
        game = null;
      });

      describe("Board.Controller gets initialised correctly", function() {
        it("Controller is defined", function() {
          expect(controller).toBeDefined();
        });

        it("model is defined", function() {
          expect(controller.model).toBeDefined();
        });

        it("view is defined", function() {
          expect(controller.view).toBeDefined();
        });

        it("Phaser.Game object is defined", function() {
          expect(controller.game).toBeDefined();
          expect(controller.game).toEqual(game);
        });

        it("Make sure player modules are created", function() {
          expect(controller.player1).toBeDefined();
          expect(controller.player2).toBeDefined();
        });

        it("4 rowStacks get created on init", function() {
          expect(controller.model.rowStacks.length).toBe(8);
        });
      });

      describe("Method Tests", function() {

        describe("Cards are dealt evenly to each player", function() {
          beforeEach(function() {
            cards = [Mocks.getCard('ah'), Mocks.getCard('2h'), Mocks.getCard('3h'), Mocks.getCard('4h'), Mocks.getCard('5h')];
          });

          it("When initialCardsDealt is called, player 1 receives all odd cards from the deck", function() {
            var spy = spyOn(controller.player1, 'dealCard');
            controller.initialCardsDealt(cards);
            expect(spy.calls.length).toEqual(3);
          });

          it("When initialCards dealt is called, player 2 receives all even cards from the deck", function() {
            var spy = spyOn(controller.player2, 'dealCard');
            controller.initialCardsDealt(cards);
            expect(spy.calls.length).toEqual(2);
          });

        });

        describe("2.  Each player starts with a special 13 card pile from another deck of cards.", function() {

          var cards, onCardLandedSpy;

          describe("A Special pile is dealt to each player", function() {
            beforeEach(function() {
              cards = Mocks.mockDeck;

              onCardLandedSpy = spyOn(controller, 'onCardLanded');
            });

            afterEach(function() {
              cards = null;
            });

            it("When initialCardsDealt is called, player 1 receives 13 cards to his special deck", function() {

              var spy = spyOn(controller.player1, 'dealSpecialCard');

              controller.initialCardsDealt([], cards);

              expect(spy.calls.length).toBe(13);
            });

            it("When initialCardsDealt is called, player 2 receives 13 cards to his special deck", function() {

              var spy = spyOn(controller.player2, 'dealSpecialCard');

              controller.initialCardsDealt([], cards);

              expect(spy.calls.length).toBe(13);

            });

            it("When initialCardsDealt is called, special cards are set to special", function() {

              controller.initialCardsDealt([], cards);

              expect(cards[0].isSpecial).toBe(true);

            });

            it("When normal cards are dealt, card cardLanded signal listener is registered", function() {

              controller.initialCardsDealt(cards, []);

              _.each(cards, function(card) {
                card.cardLanded.dispatch(card);
              });

              expect(onCardLandedSpy.calls.length).toBe(52);
            });

            it("When special cards are dealt, card cardLanded signal listener is registered", function() {

              controller.initialCardsDealt([], cards);

              _.each(cards, function(card) {
                card.cardLanded.dispatch(card);
              });

              expect(onCardLandedSpy.calls.length).toBe(52);
            });

          });


        });

        describe("enableAllRowStacks", function() {
          it("when I call enableAllRowStacks, then all rowStacks dropZones should become enabled", function() {
            controller.enableAllRowStacks();
            expect(controller.model.rowStacks[0].model.dropZoneEnabled).toBe(true);
            expect(controller.model.rowStacks[1].model.dropZoneEnabled).toBe(true);
            expect(controller.model.rowStacks[2].model.dropZoneEnabled).toBe(true);
            expect(controller.model.rowStacks[3].model.dropZoneEnabled).toBe(true);
          });
        });

        describe("getAllRowStackDropPoints Method", function() {
          it("Given that rowStack 1 is enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.model.rowStacks[0].model.dropZoneEnabled = true;
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[0]).toEqual({x: 470, y: 50});
          });

          it("Given that rowStack 2 is enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.model.rowStacks[1].model.dropZoneEnabled = true;
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[1]).toEqual({x: 570, y: 50});
          });

          it("Given that rowStacks 3 and 4 are enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.model.rowStacks[2].model.dropZoneEnabled = true;
            controller.model.rowStacks[3].model.dropZoneEnabled = true;
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[2]).toEqual({x: 670, y: 50});
            expect(dropPoints[3]).toEqual({x: 770, y: 50});
          });

          it("Given that all rowStacks are enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.enableAllRowStacks();
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[0]).toEqual({x: 470, y: 50});
            expect(dropPoints[1]).toEqual({x: 570, y: 50});
            expect(dropPoints[2]).toEqual({x: 670, y: 50});
            expect(dropPoints[3]).toEqual({x: 770, y: 50});
          });

          it("Given that all acePiles are enabled, whenI call getAllAcePileDropPoints, I get an array of drop points", function() {
            controller.enableAllAcePiles();
            var dropPoints = controller.getAllAcePileDropPoints();
            expect(dropPoints[0]).toEqual({x: 300, y: 380});
            expect(dropPoints[1]).toEqual({x: 390, y: 380});
            expect(dropPoints[2]).toEqual({x: 480, y: 380});
            expect(dropPoints[3]).toEqual({x: 570, y: 380});
            expect(dropPoints[4]).toEqual({x: 660, y: 380});
            expect(dropPoints[5]).toEqual({x: 750, y: 380});
            expect(dropPoints[6]).toEqual({x: 840, y: 380});
            expect(dropPoints[7]).toEqual({x: 930, y: 380});

          });
        });

        describe("When cards are thrown", function() {

          it("When a card is thrown, and the drop was successful, onCardLanded should add the card to the dropped stack", function() {

            var card = Mocks.getCard("ah");
            card.dropSuccessful = true;

            controller.onCardLanded(card);

            expect(card.addToStack).toHaveBeenCalled();

          });

          it("When a card is thrown, and landed successfully, add dropStacks should be rechecked for available cards", function() {

            var card = Mocks.getCard("ah");
            card.dropSuccessful = true;

            controller.onCardLanded(card);




          });

        });

      });





    });


  });