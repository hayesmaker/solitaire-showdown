define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/game/controller',
    'modules/game/model',
    'modules/game/view',
    'modules/board/controller',
    'modules/rules/controller',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, GameController, Model, View, BoardController, RulesController, Mocks) {

    /**
     * rules
     * 1.  Game starts with a triple deck of shuffled cards dealt evenly to each player's draw pile.
     * 2.  //Each player starts with a special 13 card pile from another deck of cards.
     * 3.  Cards are drawn 3 at a time from the draw pile when a player clicks on it, or removes all 3 of the current shown cards.
     * 4.  Game ends either when 1 player removes all of their special card pile or when both players become 'stuck'.
     * 5.  The winner is the player who has removed most cards from their special card pile when the game ends.
     * 6.  Each player has 4 empty row stacks to which they may move any card.
     * 7.  When there is 1 or more cards on a row stack, then the player may only put on a card of 1 value lower with a different colour.
     * 8.  There are also 8 shared stacks to which any player may move their cards.
     * 9.  A player may only put an Ace on an empty shared stack.
     * 10. If the shared stack contains 1 or more cards the player may only move a card of the same suit and 1 value higher.
     **/

    describe('Game.Controller tests', function() {

      var controller;
      var cards;
      var game;

      beforeEach(function() {
        game = Mocks.mockGame;
        controller = new GameController();
        controller.init(game);

      });

      afterEach(function() {
        controller = null;
        game = null;
        cards = null;
      });

      describe("Make sure game controller is initialised correctly", function() {
        it("Make sure game controller is initialised correctly", function() {
          expect(controller).toBeDefined();
          expect(controller.game).toBeDefined();
        });

        it("Make sure rules module is created", function() {
          expect(controller.rulesController).toBeDefined();
        });

        it("Make sure board module is created", function() {
          expect(controller.boardController).toBeDefined();
        });

        it("Make sure player modules are created", function() {
          expect(controller.player1).toBeDefined();
          expect(controller.player2).toBeDefined();
        });

        describe("1. Game starts with a triple deck of shuffled cards dealt evenly to each player's draw pile.", function() {

          var spy, spy1, spy2, spy3, spy4, spy5;

          beforeEach(function() {
            spy = spyOn(controller.rulesController, 'create3Decks');
            spy1 = spyOn(controller.boardController, 'drawBoard');
            spy2 = spyOn(controller.boardController, 'enableAllRowStacks');
            spy3 = spyOn(controller.player1, 'startGame');
            spy4 = spyOn(controller.player2, 'startGame');
            spy5 = spyOn(controller.rulesController, 'dealCards');
          });

          it("When startGame is called, create3Decks is called on the rules module", function() {

            controller.startGame();
            expect(spy).toHaveBeenCalled();
          });

          it("When startGame is called, dealCards is called on the rules module", function() {
            //var spy = spyOn(controller.rulesController, 'dealCards');
            controller.startGame();
            expect(spy5).toHaveBeenCalled();
          });

          it("onInitialCardsDealt signal is being listened to by the game controller:", function() {
            expect(controller.rulesController.onInitialCardsDealt.getNumListeners()).toBe(1);
          });

          describe("Cards are dealt evenly to each player", function() {
            beforeEach(function() {
              //var card = jasmine.createSpyObj('card', ['init', 'enableClick', 'onDrawerPileClicked']);
              cards = [Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard];
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

        });

        describe("2. Game starts with a triple deck of shuffled cards dealt evenly to each player's draw pile.", function() {

          var cards;

          describe("A Special pile is dealt to each player", function() {
            beforeEach(function() {
              cards = Mocks.mockDeck;
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
          });

        });

        describe("3. Cards are drawn 3 at a time from the draw pile when a player clicks on it, or removes all 3 of the current shown cards", function() {

        });
      });






    });





  });