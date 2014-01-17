define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/specialPile/model',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, SpecialPileModel, Mocks) {

    describe("SpecialPile.Model Tests", function() {

      var model;

      beforeEach(function() {
        model = new SpecialPileModel();


      });

      it("Make sure model is defined", function() {
        expect(model).toBeDefined();
      });

      describe("Make sure vars are initialised correctly", function() {

        it("Box is defined with defaults", function() {
          var box = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };

          expect(model.box).toEqual(box);
        });

        it("An empty array is created to store cards", function() {
          expect(model.cards).toEqual([]);
        });

      });

      describe("Method tests", function() {

        it("When setBox is called, box is updated with box values", function() {
          var newBox = {x: 10, y: 10, width: 200, height: 200};
          model.setBox(10,10,200,200);
          expect(model.box).toEqual(newBox);
        });

        it("When addCard is called, card is stored in the cards array", function() {
          var card = Mocks.getCard('ah');
          model.addCard(card);
          expect(model.cards[0]).toEqual(card);
        });

      });

    });


  });