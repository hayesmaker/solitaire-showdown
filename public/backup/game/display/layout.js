define(['class', 'lodash', 'pixijs'], function(Class, _, PIXI) {

  var Layout = Class.extend({
    constructor: function(game) {
      var self = this;
      this.game = game;
      this.stage = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      this.card = {
        width: 68,
        height: 92,
        scale:  {
          x: 1,
          y: 1
        }
      };
      this.padding = 20;
      this.gamePanelHeight = 0.45 * this.stage.height;

      this.gamePanel = {
        width: 0.75 * this.stage.width,
          height: this.gamePanelHeight
      };
      this.acesPanel = {
        width: 0.75 * this.stage.width,
          height: 0.1 * this.stage.height
      };
      this.playerPanel = {
        width: 0.25 * this.stage.width,
          height: 0.5 * this.stage.height
      };

      this.acesPanelRect = {
        x: this.padding,
        y: this.gamePanel.height,
        width: this.acesPanel.width - this.padding * 2,
        height: this.acesPanel.height
      };

      this.playerPanelRect = {
        x: this.stage.width - this.playerPanel.width + this.padding,
        y: function(index) {
          return self.padding + index * self.playerPanel.height;
        },
        width : this.playerPanel.width - this.padding * 2,
        height: this.playerPanel.height - this.padding * 2
      };

      /**
       * /*
       var pilesNum = 4;
       var config = {
        x: 20,
        y: 20,
        padding: 30,
        width: this.card.width,
        height: this.model.gamePanel.height - (this.padding * 2)
      }


       for (i = 0; i < pilesNum; i ++) {
        //graphics.moveTo(config.x, config.y);
        var x = config.x +(i * (config.width + config.padding));
        var y = this.getLayout().panels[1].y;
        var width = config.width;
        var height = config.height;
        graphics.drawRect(x,config.y, width, height);
        graphics.drawRect(x, y , width, height);
      }
       **/
      this.model = {
        backgroundPanels: [
        {
          id: 'playPanel1',
          x: this.padding,
          y: this.padding,
          width: this.gamePanel.width - this.padding * 2,
          height: this.gamePanel.height - this.padding * 2
        }, {
          id: 'playPanel2',
          x: this.padding,
          y: this.gamePanel.height + this.acesPanel.height + this.padding,
          width: this.gamePanel.width - this.padding * 2,
          height: this.gamePanel.height - this.padding * 2
        }, {
          id: 'aidePanel1',
          x: this.playerPanelRect.x,
          y: this.playerPanelRect.y(0),
          width: this.playerPanelRect.width,
          height: this.playerPanelRect.height
        }, {
          id: 'sidePanel2',
          x: this.playerPanelRect.x,
          y: this.playerPanelRect.y(1),
          width: this.playerPanelRect.width,
          height: this.playerPanelRect.height
        }, {
          id: 'acesPanel',
          x: this.acesPanelRect.x,
          y: this.acesPanelRect.y,
          width: this.acesPanelRect.width,
          height: this.acesPanelRect.height
        }],
        piles: [
          { _id: 'player1special', x: 600, y:50, width: this.card.width, height: this.card.height },
          { _id: 'player2special', x: 600, y:790, width: this.card.width, height: this.card.height },
          { _id: 'player1draw', x: 550, y:230, width: this.card.width, height: this.card.height },
          { _id: 'player1main', x: 650, y:230, width: this.card.width, height: this.card.height },
          { _id: 'player2draw', x: 550, y:600, width: this.card.width, height: this.card.height },
          { _id: 'player2main', x: 650, y:600, width: this.card.width, height: this.card.height }
        ],
        rowStacks: {
          num: 4,
          width: this.card.width,
          height: this.gamePanelHeight - this.padding * 2
        }
      };

    },

    drawPiles: function() {
      var i;
      var bgGraphics = this.game.add.graphics(0,0);

      bgGraphics.beginFill(0xD0E0CE, 1);
      bgGraphics.lineStyle(2, 0x666666 , 1);

      var len = this.model.backgroundPanels.length;

      for (i = 0; i < len; i++) {
        var bgPanel = this.model.backgroundPanels[i];
        console.log('bgPanel', i, bgPanel);
        bgGraphics.drawRect(bgPanel.x, bgPanel.y, bgPanel.width, bgPanel.height);
      }
      bgGraphics.endFill();

      var graphics = this.game.add.graphics(0,0);
      graphics.beginFill(0x000000, 0.15);
      graphics.lineStyle(1, 0xff0000, 0.2);

      for (i=0; i < this.model.piles.length; i++) {
        var pile = this.model.piles[i];
        graphics.drawRect(pile.x, pile.y, pile.width, pile.height);
      }
      var rowStacks = this.model.rowStacks;
      //use model vals
      for (i=0; i < rowStacks.num; i++) {
        var x = this.padding + i * (rowStacks.width + this.padding);
        graphics.drawRect( x, this.padding, rowStacks.width, rowStacks.height );
        graphics.drawRect( x, this.gamePanel.height + this.acesPanel.height + this.padding, rowStacks.width, rowStacks.height );
      }

      graphics.endFill();
    },

    /**
     *
     * @param point
     */
    getNearestDropPoint: function(point) {
      var dropPoints = [{
        x: 100,
        y: 100
      }, {
        x: 200,
        y: 200
      }, {
        x: 300,
        y: 300
      }, {
        x: 400,
        y: 400
      }, {
        x: 500,
        y: 500
      }];

      var distances = [];
      for (var i = 0; i < dropPoints.length; i++) {
        var dropPoint = dropPoints[i];
        var distance = this.distanceBetween(point, {x:dropPoint.x, y:dropPoint.y});
        distances.push({point: dropPoint, distance: distance});
      }
      var closestPoint =_.min(distances, 'distance');
      return closestPoint;
    },

    /**
     * Utils
     * @test: layoutSpec
     * @param a
     * @param b
     * @returns {number}
     */
    distanceBetween: function(a, b) {
      var d = {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y)
      };
      return Math.sqrt(d.x * d.x + d.y * d.y);
    }

  });

  return Layout;
});