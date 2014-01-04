define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/rowStack/model'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, RowStackModel) {

    describe("RowStack.Model Tests", function() {

      var model;

      beforeEach(function() {
        model = new RowStackModel();


      });

      it("Make sure model is defined", function() {
        expect(model).toBeDefined();
      });

      describe("Make sure vars are initialised correctly", function() {

        it("View graphics box area is initialised", function() {
          expect(model.box).toEqual({ x: 0, y: 0, width: 0, height: 0});
        });

        it("dropZoneEnabled var is initialised", function() {
          expect(model.dropZoneEnabled).toBe(false);
        });

        it("dropPoint is initialised", function() {
          expect(model.dropPoint).toEqual({x: 0, y: 0});
        });

      });

      describe("Method tests", function() {
        it("When I call setBox, model.box is updated with correct values", function() {
          model.setBox(10, 10, 200, 300);
          expect(model.box).toEqual({x: 10, y: 10, width: 200, height: 300});
        });

        it("When I call setBox, dropPoints is updated with correct values", function() {
          model.setBox(10,30, 200, 300);
          expect(model.dropPoint).toEqual({x: 10, y: 30});
        });
      });

    });


  });