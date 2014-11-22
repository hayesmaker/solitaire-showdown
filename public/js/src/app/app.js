requirejs.config({
  baseUrl: 'js/src/',
  paths: {
    'class' : 'lib/classjs/js/Class',
    'phaser': 'lib/phaserNew/phaser-no-libs',
    'signals': 'lib/signals/js/signals',
    'pixijs' : 'lib/phaserNew/pixi',
    'TweenMax' : 'lib/greensocks/uncompressed/TweenMax',
    'TweenPlugins' : 'lib/greensocks/uncompressed/plugins',
    'lodash' : 'lib/lodash/js/lodash',
    'game' : 'app/hayesmaker/solitaire/game',
    'lobby' : 'app/hayesmaker/solitaire/lobby',
    'modules' : 'app/hayesmaker/solitaire/game/modules',
    'components' : 'app/hayesmaker/solitaire/game/components',
    'utils' : 'app/hayesmaker/solitaire/game/utils',
    'socketio' : 'lib/socketio/js/socket.io',
    'cloak' : 'lib/cloak/js/cloak',
    'services' : 'app/hayesmaker/solitaire/game/services'
  },
  shim: {
    'socketio' : {
      exports: 'io',
      deps: ['lodash']
    },
    'cloak' : {
      deps: ['socketio']
    },
    'class' : {
      exports: 'Class'
    },
    'pixijs': {
      exports: 'PIXI'
    },
    'phaser': {
      exports: 'Phaser',
      deps: ['pixijs']
    },
    'TweenMax' : {
      exports: 'TweenMax'
    },
    'TweenPlugins/ThrowPropsPlugin' : {
      exports: 'ThrowPropsPlugin'
    }
  }
});

requirejs(
  [
    'phaser',
    'TweenPlugins/ThrowPropsPlugin',
    'game/main',
    'lobby/main',
    'socketio',
    'cloak',
    'services/cloakService'
  ],
  function(Phaser, ThrowPropsPlugin, GameMain, LobbyMain, io, cloak, CloakService) {

    console.log('Main Entry Point', Phaser, ThrowPropsPlugin, cloak);

    var gameMain = new GameMain();
    var lobbyMain = new LobbyMain();

    var mainStateConfig = {
      preload: gameMain.preload,
      create: gameMain.create,
      update: gameMain.update,
      render: gameMain.render
    };

    var lobbyStateConfig = {
      preload: lobbyMain.preload,
      create: lobbyMain.create,
      update: lobbyMain.update,
      render: lobbyMain.render
    };

    var width = window.innerWidth;
    var height = window.innerHeight;

    var cloakService = new CloakService();
    cloakService.init();
    cloakService.connect();

    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'solitaire-showdown');
    game.state.add('lobby', lobbyStateConfig);
    game.state.add('main', mainStateConfig);
    gameMain.init(game, cloakService);
    lobbyMain.init(game, cloakService);

    setTimeout(function() {
      console.log('send attempted');
      cloak.message('foo', {moo:'lol'});
    }, 3000)

  });