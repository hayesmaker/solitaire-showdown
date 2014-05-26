define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/board/model',
    'modules/board/view',
    'modules/rowStack/controller',
    'modules/acePile/controller',
    'modules/specialPile/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, Model, View, RowStackController, AcePileController, SpecialPileController) {

    /**
     * @type {BoardController}
     */
    var BoardController = Module.extend({

      constructor: function() {
        this.model = new Model(this);
        this.view = new View(this);

        //this.rowStacks = [];
      },

      init: function(game) {
        BoardController.super.init.call(this, game);
        this.view.init(game);

        //todo keep this if handing over view drawing to this.view
        //this.model.initRowStacks({x:400,y:200}, 70, 300);

        var i, rowStack, box, acePile, specialPile;
        for (i = 0; i < 4; i++) {
          rowStack = new RowStackController();
          box = {
            x: 470 + i * 100,
            y: 50,
            width: 70,
            height: 300
          };
          rowStack.init(game, box);
          //this.rowStacks.push(rowStack);
          this.model.rowStacks.push(rowStack);
        }

        for (i = 0; i < 4; i++) {
          rowStack = new RowStackController();
          box = {
            x: 470 + i * 100,
            y: 510,
            width: 70,
            height: 300
          };
          rowStack.init(game, box);
          this.model.rowStacks.push(rowStack);
        }

        for (i = 0; i < 8; i++) {
          acePile = new AcePileController();
          box = {
            x: 300 + i * 90,
            y: 380,
            width: 70,
            height: 95
          };
          acePile.init(game, box);
          this.model.acePiles.push(acePile);
        }


      },

      drawBoard: function() {

        //todo make this.view responsible for drawing rowStacks.view ??
        //this.view.drawRowStacks(this.model.rowStacksModel);
        var i;
        for (i = 0; i < this.model.rowStacks.length; i++) {
          this.model.rowStacks[i].renderView();
        }

        for (i = 0; i < this.model.acePiles.length; i++) {
          this.model.acePiles[i].renderView();
        }
      },

      enableAllRowStacks: function() {
        for (var i = 0; i < this.model.rowStacks.length; i++) {
          var rowStack = this.model.rowStacks[i];
          rowStack.setDropZoneEnabled(true);
        }
      },

      enableAllAcePiles: function() {
        for (var i = 0; i < this.model.acePiles.length; i++) {
          var acePile = this.model.acePiles[i];
          acePile.setDropZoneEnabled(true);
        }
      },

      getAllRowStackDropPoints: function() {
        var dropPoints = [];
        for (var i = 0; i < this.model.rowStacks.length; i++) {

          dropPoints.push(this.model.rowStacks[i].model.dropPoint);
        }
        return dropPoints;
      },

      getAllAcePileDropPoints: function() {

        console.log('getAllAcePileDropPoints :: this.model.acePiles', this.model.acePiles);

        var dropPoints = [];
        for (var i = 0; i < this.model.acePiles.length; i++) {
          dropPoints.push(this.model.acePiles[i].model.dropPoint);
        }

        return dropPoints;
      },

      onCardLanded: function(card) {
        console.log('BoardController :: onCardLanded', card);

        if (card.dropSuccessful) {
          card.resetCardVars();
          card.disableDrag();
          card.addToStack();
          card.enableNextCard();
        }
      },

      onDetectAvailableSlots: function(card) {
        console.log('[BoardController] :: onDetectAvailableSlots :: card.name', card.name, 'card.isPlayer1', card.isPlayer1);
        var dropPoints = [];
        var dropStacks = [];
        var i, stackModel, stack;

        if (card.isPlayer1) {

          for (i = 0; i < 8; i++) {
            stackModel = this.model.acePiles[i].model;
            stack = this.model.acePiles[i];
            stack.checkAvailable(card);

            console.log('AcePile', i, ' available: ', stack.model.dropZoneEnabled);

            if (stackModel.dropZoneEnabled) {
              dropStacks.push(stack);

            }
          }

          for (i = 0; i < 4; i ++) {
            stackModel = this.model.rowStacks[i].model;
            stack = this.model.rowStacks[i];
            stack.checkAvailable(card);

            if (stackModel.dropZoneEnabled) {
              dropStacks.push(stack);
              dropPoints.push(stackModel.dropPoint);
            }
          }
        }

        if (card.isPlayer2) {

          for (i = 0; i < 8; i ++) {
            stackModel = this.model.acePiles[i].model;
            stack = this.model.acePiles[i];
            stack.checkAvailable(card);

            if (stackModel.dropZoneEnabled) {
              dropStacks.push(stack);
            }
          }

          for (i = 4; i < 8; i ++) {

            stackModel = this.model.rowStacks[i].model;
            stack = this.model.rowStacks[i];

            stack.checkAvailable(card);
            if (stackModel.dropZoneEnabled) {
              dropStacks.push(stack);
              dropPoints.push(stackModel.dropPoint);
            }
          }
        }

        if (dropStacks.length) {
          card.dropSuccessful = true;
        }

        console.log("[BoardController] :: setDropStacks :: ", dropStacks);
        card.setDropPoints(dropPoints);
        card.setDropStacks(dropStacks);

      }

    });

    return BoardController;
  });