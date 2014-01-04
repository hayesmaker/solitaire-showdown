define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/specialPile/model'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, SpecialPileModel) {

    describe("RowStack.Model Tests", function() {

      var model;

      beforeEach(function() {
        model = new SpecialPileModel();


      });

      it("Make sure model is defined", function() {
        expect(model).toBeDefined();
      });

      describe("Make sure vars are initialised correctly", function() {



      });

      describe("Method tests", function() {

      });

    });


  });