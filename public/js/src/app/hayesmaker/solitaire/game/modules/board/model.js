define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var BoardModel = Class.extend({

      constructor: function() {
        /**
         * @deprecated
         * @type {{points: Array, width: number, height: number}}
         */
        this.rowStacksModel = {
          points: [],
          width: 0,
          height: 0
        };

        this.rowStacks = [];
        this.acePiles = [];
        this.playersJoined = [];


      },

      joinPlayer: function(player)
      {
        this.playersJoined.push(player);
      },

      /**
       * @deprecated
       * @param point
       * @param width
       * @param height
       */
      initRowStacks: function(point, width, height) {
        var point1 = point;
        var point2 = {x: point1.x + 100, y: point.y};
        var point3 = {x: point2.x + 100, y: point.y};
        var point4 = {x: point3.x + 100, y: point.y};
        this.rowStacksModel.points = [point1, point2, point3, point4];
        this.rowStacksModel.width = width;
        this.rowStacksModel.height = height;
      },


      checkAllDrawPilesForMoves: function(player) {
        var j;
        var cardsInPileLen;
        var card;
        var self = this;

        if (player === 1)
        {
          _.each(this.rowStacks, function (rowStack, i) {
            if (i < 4)
            {
              cardsInPileLen = rowStack.model.cards.length;
              console.log('{BoardModel} Checking RowStack :: ', i, ' length=', cardsInPileLen);
              for (j = 0; j < cardsInPileLen; j++)
              {
                card = rowStack.model.cards[j];
                self.checkAvailableStacks(card);
                card.softEnableDrag();
              }
            }
          });
        }

        if (player === 2)
        {
          _.each(this.rowStacks, function(rowStack, i) {
            if (i >= 4)
            {
              console.log('{BoardModel} :: Checking RowStacks :: player2 ::', i, ' length=', rowStack.model.cards.length);
              cardsInPileLen = rowStack.model.cards.length;
              for (j = 0; j < cardsInPileLen; j++)
              {
                card = rowStack.model.cards[j];
                self.checkAvailableStacks(card);
                card.softEnableDrag();
              }
            }
          });
        }






      },


      checkAvailableStacks: function(card) {

        var availableStacks = [];

        if (card.isPlayer1)
        {
          _.each(this.rowStacks, function(rowStack, i) {
            if (i < 4)
            {
              rowStack.checkAvailable(card);
              if (rowStack.model.dropZoneEnabled)
              {
                availableStacks.push(rowStack);
              }
            }
          });
        }

        if (card.isPlayer2)
        {
          _.each(this.rowStacks, function(rowStack, i) {
            if (i >= 4)
            {
              rowStack.checkAvailable(card);
              if (rowStack.model.dropZoneEnabled)
              {
                availableStacks.push(rowStack);
              }
            }
          });
        }



        _.each(this.acePiles, function(aceStack, i) {
          aceStack.checkAvailable(card);
          if (aceStack.model.dropZoneEnabled)
          {
            availableStacks.push(aceStack);
          }
        });

        card.setDropStacks(availableStacks);
        card.softEnableDrag();




      }




    });

    return BoardModel;
  });