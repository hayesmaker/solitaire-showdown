var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      console.log('file', file);
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/src',

  paths: {
    'app' : 'app',
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
    'utils' : 'app/hayesmaker/solitaire/game2/utils',

    //tests
    'jquery' : '../test/jasmine/lib/jquery/jquery-2.0.3',
    'jasmineSignals': '../test/jasmine/lib/jasmine/jasmine-signals',
    'testHelpers' : '../test/jasmine/spec/hayesmaker/solitaire/game2/testHelpers'
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
  },
  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});