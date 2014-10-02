define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/board/model',
    'modules/board/view',
    'modules/rowStack/controller',
    'modules/acePile/controller',
    'modules/player/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signals, Module, Model, View, RowStackController, AcePileController, PlayerController) {

    /**
     * @type {BoardController}
     */
    var BoardController = Module.extend({

      constructor: function() {
        this.model = new Model(this);
        this.view = new View(this);
        this.cloakService = null;
      },

      init: function(game, cloakService) {
        BoardController.super.init.call(this, game);

        this.cloakService = cloakService;
        this.cloakService.roomPlayerJoined.add(this.onRoomPlayerJoined, this);
        this.cloakService.gameMove.add(this.onGameMove, this);
        this.cloakService.cardsDrawn.add(this.onCardsDrawn, this);

        this.player1 = new PlayerController({x: 100, y: 50});
        this.player1.init(game, this, 1);
        this.player2 = new PlayerController({x: 100, y: 500});
        this.player2.init(game, this, 2);

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
          rowStack.setIndex(i);
          rowStack.setType('rowStack');
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
          rowStack.setIndex(i);
          rowStack.setType('rowStack');
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
          acePile.setIndex(i);
          acePile.setType('acePile');
          this.model.acePiles.push(acePile);
        }
      },

      onRoomPlayerJoined: function(user, i, currentUser)
      {
        console.log('{BoardController} :: onLobbyPlayerJoined :: user=', user);

        switch(this.model.playersJoined.length)
        {
          case 0 :
            this.model.joinPlayer(this.player1);
            this.player1.drawStacks();
            break;
          case 1 :
            this.model.joinPlayer(this.player2);
            this.player2.drawStacks();
            break;
          case 2 :
            console.warn('{BoardController} :: max players Joined');
            break;
        }
      },

      onGameMove: function(data)
      {
        var playerIsMe = this.cloakService.user.isMeByPlayerNum(data.player);
        console.log('{BoardController} :: onGameMove :: data, playerIsMe', data, playerIsMe);
        // {cardName: "7d", player: 1, dropStackIndexFrom: -1, dropStackIndexTo: 1, type: "rowStack"}
        if (!playerIsMe)
        {
          if (data.dropStackIndexFrom === -1) {
            if (data.player === 1) {
              this.player1.moveCard(data);
            } else if (data.player === 2) {
              this.player2.moveCard(data);
            }
          }
        }
      },

      onCardsDrawn: function(data)
      {
        var playerIsMe = this.cloakService.user.isMeByPlayerNum(data);
        console.log('{BoardController} :: onCardsDrawn :: playerIsMe, data=', playerIsMe, data);
        if (!playerIsMe)
        {
          switch(data.playerNum)
          {
            case 1 :
              this.player1.draw3Cards();
              break;
            case 2 :
              this.player2.draw3Cards();
              break;
          }
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

      /**
       * startGame!
       */
      startGame: function() {
        this.player1.startGame(this.cloakService.user.isMeByPlayerNum(1));
        this.player2.startGame(this.cloakService.user.isMeByPlayerNum(2));
      },

      /**
       * 'initialCardsDealt' signal inside rules.controller
       * @param cards
       */
      initialCardsDealt: function(cards, specialDeck) {
        var self = this;
        _.each(cards, function(card, i) {
          card.cardLanded.add(self.onCardLanded, self);
          card.cardThrown.add(self.onCardThrown, self);

          //add test
          if (i % 2 === 0) {
            card.isPlayer1 = true;
            card.refreshAvailableDropStacks.add(self.player1.onRefreshAvailableDropStacks, self.player1);
            self.player1.dealCard(card);
          } else {
            card.isPlayer2 = true;
            card.refreshAvailableDropStacks.add(self.player2.onRefreshAvailableDropStacks, self.player2);
            self.player2.dealCard(card);
          }
        });

        _.each(specialDeck, function(card, i) {
          card.isSpecial = true;
          card.cardLanded.add(self.onCardLanded, self);
          card.cardThrown.add(self.onCardThrown, self);
          //add test
          if (i < 26) {
            if (i % 2 === 0) {
              card.isPlayer1 = true;
              card.refreshAvailableDropStacks.add(self.player1.onRefreshAvailableDropStacks, self.player1);
              self.player1.dealSpecialCard(card);
            } else {
              card.isPlayer2 = true;
              card.refreshAvailableDropStacks.add(self.player2.onRefreshAvailableDropStacks, self.player2);
              self.player2.dealSpecialCard(card);
            }
          }
        });

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
        var dropPoints = [];
        for (var i = 0; i < this.model.acePiles.length; i++) {
          dropPoints.push(this.model.acePiles[i].model.dropPoint);
        }

        return dropPoints;
      },

      onDrawPileClicked: function(data)
      {
        console.log('{BoardController} onDrawPileClicked :: data', data);
        this.cloakService.draw3Cards(data);
      },

      onCardThrown: function(card) {
        var player = card.isPlayer1? 1 : 2;
        var stack = card.droppedStack;
        var originStack = card.originalStack;

        var fromType = card.isSpecial? 'special' : 'draw';

        this.cloakService.sendMove(card.name, player, originStack ? originStack.model.index : -1, fromType, stack.model.index, stack.model.type);
      },

      onCardLanded: function(card) {
        console.log('[BoardController] onCardLanded :: card=', card);
        if (card.dropSuccessful) {
          card.addToStack();
        }
      },

      getStackByIndex: function(index, type, player)
      {
        console.log('{BoardController} getStackByIndex :: index, type, player', index, type, player)
        if (type === 'acePile')
        {
          return this.model.acePiles[index];
        } else if (type === 'rowStack')
        {
          return this.model.rowStacks[index + (player === 1)? 0 : 4];
        }
      }



    });

    return BoardController;
  });