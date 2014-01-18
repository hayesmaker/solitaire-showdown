define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/specialPile/controller',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, SpecialPileController, Mocks) {

    describe("SpecialPile.Controller Tests", function() {

      var controller;
      var game;

      beforeEach(function() {
        controller = new SpecialPileController({x: 0, y: 0, width: 200, height: 200  });
        game = Mocks.mockGame;
        controller.init(game);
      });

      afterEach(function() {
        controller = null;
        game = null;
      });

      describe("SpecialPile.Controller gets initted correctly", function() {
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

      });

      describe("Method Tests", function() {

        var card;

        beforeEach(function() {
          card = Mocks.getCard('ah');
        });

        afterEach(function() {
          card = null;
        });

        it("When addCard is called, card.landed signal is registered", function() {
          controller.addCard(card);
          expect(card.cardLanded.getNumListeners()).toBe(1);
        });

        it("When add card is called, addCard is called on the model", function() {
          var spy = spyOn(controller.model, 'addCard');

          controller.addCard(card);

          expect(spy).toHaveBeenCalledWith(card);

          //this.view.dealCard(card);
        });

        it("When add card is called, dealCard is called on the view", function() {
          var spy = spyOn(controller.view, 'dealCard');

          controller.addCard(card);

          expect(spy).toHaveBeenCalledWith(card);
        });

        /*
        it("When specialCardPlaced is called, and card is dropped succesfully, card becomes non special", function() {

          var spy = spyOn(controller.view, 'removeCard');
          card.dropSuccesful = true;
          card.isSpecial = true;
          controller.specialCardPlaced(card);

          //expect(card.isSpecial).toBe(false);

        });
        */

        /*
        it("When specialCardPlaced is called, and card is dropped succesfully, removeCard is called on the vie w", function() {

          var spy = spyOn(controller.view, 'removeCard');
          card.dropSuccesful = true;
          card.isSpecial = true;
          controller.specialCardPlaced(card);

          //expect(spy).toHaveBeenCalled();

        });
        */

        it("When specialCardPlaced is called, and card is dropped succesfully, card remains in special pile", function() {

          var spy = spyOn(controller.view, 'removeCard');
          card.dropSuccesful = false;
          card.isSpecial = true;
          controller.specialCardPlaced(card);

          expect(card.isSpecial).toBe(true);

        });

        it("When specialCardPlaced is called, and card is not dropped succesfully, removeCard is not called", function() {

          var spy = spyOn(controller.view, 'removeCard');
          card.dropSuccesful = false;
          card.isSpecial = true;
          controller.specialCardPlaced(card);

          expect(spy).not.toHaveBeenCalled();

        });


      });




    });


  });