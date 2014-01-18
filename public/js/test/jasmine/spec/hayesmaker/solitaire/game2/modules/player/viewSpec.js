define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/player/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View) {

    describe('Player.View tests', function() {

      var view;

      beforeEach(function() {
        view = new View();
      });

      afterEach(function() {
        view = null;
      });

      it("Make sure game is initialised correctly", function() {
        expect(view).toBeDefined();
      });

      it("Given I have cards in the draw pile, when I draw 3 cards, 3 cards from the top are shown to the player", function() {
        var card = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var cards = [card, card, card];
        view.draw3Cards(cards);
        expect(card.drawCard.calls.length).toBe(3);
      });

      it("Given I have drawn 3 cards, I expect click event to be removed from these 3 cards", function() {
        var card = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var cards = [card, card, card];
        view.draw3Cards(cards);
        expect(card.disableClick.calls.length).toBe(3);
      });

      it("Given I have drawn 3 cards, I expect the first card to not be enabled for play", function() {
        var card1 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var card2 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var card3 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var cards = [card1, card2, card3];
        view.draw3Cards(cards);
        expect(card1.enableDrag).not.toHaveBeenCalled();
      });

      it("Given I have drawn 3 cards, I expect the second card to not be enabled for play", function() {
        var card1 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var card2 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var card3 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var cards = [card1, card2, card3];
        view.draw3Cards(cards);
        expect(card2.enableDrag).not.toHaveBeenCalled();
      });

      it("Given I have drawn 3 cards, I expect the top card to be enabled for play", function() {
        var card1 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var card2 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var card3 = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);
        var cards = [card1, card2, card3];
        view.draw3Cards(cards);
        expect(card3.enableDrag).toHaveBeenCalled();
      });

    });

  });