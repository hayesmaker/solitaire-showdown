define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'jasmineSignals',
    'modules/module',
    'modules/rules/controller',
    'modules/rules/model',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, spyOnSignal, Module, Rules, Model, Mocks) {

    /**
     * rules
     * 1.  Game starts with a triple deck of shuffled cards dealt evenly to each player's draw pile.
     * 2.  Each player starts with a special 13 card pile from another deck of cards.
     * 3.  Cards are drawn 3 at a time from the draw pile when a player clicks on it, or removes all 3 of the current shown cards.
     * 4.  Game ends either when 1 player removes all of their special card pile or when both players become 'stuck'.
     * 5.  The winner is the player who has removed most cards from their special card pile when the game ends.
     * 6.  Each player has 4 empty row stacks to which they may move any card.
     * 7.  When there is 1 or more cards on a row stack, then the player may only put on a card of 1 value lower with a different colour.
     * 8.  There are also 8 shared stacks to which any player may move their cards.
     * 9.  A player may only put an Ace on an empty shared stack.
     * 10. If the shared stack contains 1 or more cards the player may only move a card of the same suit and 1 value higher.
     **/

    describe('Rules.Controller tests', function() {

      var rules;

      describe("Make sure Rules Module is initialised correctly", function() {

        beforeEach(function() {
          rules = new Rules();
        });

        it("Rules Model is created", function() {
          expect(rules.model).toBeDefined();
        });

        it("Rules component can be initiated with game", function() {
          var game = jasmine.createSpyObj('game', ['boot']);
          rules.init(game);
          expect(rules.game).toBeDefined();
        });

      });

      /**
       * createDeck: function(deck) {
        var cardsHelper = new CardsHelper();
        for (var i = 0; i < 52; i++) {
          var card = new Card(cardsHelper.getRandom(), false);
          deck.push(card);
        }
      },

       dealCards: function() {
        this.onInitialCardsDealt.dispatch(this.model.deck);
      }
       */

      describe("1.  Game Starts with a triple deck of shuffled cards dealt evenly to each player's draw pile", function() {
        beforeEach(function() {
          //rules = new Rules();
          var game = jasmine.createSpyObj('game', ['boot']);
          rules.init(game);
        });

        it("create3Decks should create a triple deck of cards", function() {
          var spy = spyOn(rules, 'createDeck');

          rules.create3Decks();

          expect(spy.calls.length).toBe(3);
        });

        it("create deck should create a deck of 52 cards", function() {
          var deck = [];
          rules.createDeck(deck);
          expect(deck.length).toBe(52);
        });

        it("When dealCards is called, then onInitialCardsDealt signal should be dispatched", function() {
          var spy = spyOnSignal(rules.onInitialCardsDealt);
          rules.model.deck = [Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard];
          rules.model.specialDeck = [Mocks.mockCard];
          rules.dealCards();
          expect(spy).toHaveBeenDispatchedWith(rules.model.deck, rules.model.specialDeck);
        });

      });

      describe("2.  Each player starts with a special 13 card pile from another deck of cards.", function() {
        beforeEach(function() {

        });

        it("When I create special deck, 1 new 52 card deck is created", function() {
          var spy = spyOn(rules, 'createDeck');

          rules.createSpecialDeck();

          expect(spy).toHaveBeenCalled();
        });

        it("When dealCards is called, then onInitialCardsDealt signal should be dispatched", function() {
          var spy = spyOnSignal(rules.onInitialCardsDealt);
          rules.model.deck = [Mocks.mockCard];
          rules.model.specialDeck = [Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard, Mocks.mockCard];
          rules.dealCards();
          expect(spy).toHaveBeenDispatchedWith(rules.model.deck, rules.model.specialDeck);
        });
      });

      describe("4.   Game ends when 1 player has removed all 13 cards from their special pile", function() {

        it("", function() {

        });

      });


    });

  });
