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

      });



      it("Make sure game is initialised correctly", function() {
        expect(view).toBeDefined();
      });



      it("Given I have cards in the draw pile, when I draw 3 cards, 3 cards from the top are shown to the player", function() {

        var card = jasmine.createSpyObj('card', ['init', 'drawCard', 'enableDrag', 'disableClick']);


        var cards = [card];

        view.draw3Cards(cards);

        expect(card.drawCard).toHaveBeenCalled();




      });

    });

  });