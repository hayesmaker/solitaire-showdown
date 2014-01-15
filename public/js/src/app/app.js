requirejs.config({
  baseUrl: 'js/src/',
  paths: {
    'class' : 'lib/classjs/js/Class',
    'phaser': 'lib/phaser/js/phaser-solo',
    'signals': 'lib/signals/js/signals',
    'pixijs' : 'lib/pixijs/js/pixi.dev',
    'TweenMax' : 'lib/greensocks/uncompressed/TweenMax',
    'TweenPlugins' : 'lib/greensocks/uncompressed/plugins',
    'lodash' : 'lib/lodash/js/lodash',
    'game' : 'app/hayesmaker/solitaire/game2',
    'modules' : 'app/hayesmaker/solitaire/game2/modules',
    'components' : 'app/hayesmaker/solitaire/game2/components',
    'utils' : 'app/hayesmaker/solitaire/game2/utils'
  },
  shim: {
    'class' : {
      exports: 'Class'
    },
    'pixijs': {
      exports: 'PIXI'
    },
    'phaser': {
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
    'game/main'
  ],
  function(Phaser, ThrowPropsPlugin, Main) {

    console.log('Main Entry Point', Phaser, ThrowPropsPlugin);

    var main = new Main();

    var config = {
      preload: main.preload,
      create: main.create,
      update: main.update,
      render: main.render
    };

    var width = window.innerWidth;
    var height = window.innerHeight;

    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'solitaire-showdown', config);


    main.init(game);


  });