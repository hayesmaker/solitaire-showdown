require.config({
  baseUrl: '',
  paths: {
    'app' : '../../src/app',
    'jasmine': 'lib/jasmine/jasmine',
    'jasmine-html': 'lib/jasmine/jasmine-html',
    'spec': '/spec/',
    'jquery' : 'lib/jquery/jquery-2.0.3',
    'jasmineSignals': 'lib/jasmine/jasmine-signals',

    'class' : '../../src/lib/classjs/js/Class',
    'phaser': '../../src/lib/phaser/js/phaser-solo',
    'signals': '../../src/lib/signals/js/signals',
    'pixijs' : '../../src/lib/pixijs/js/pixi.dev',
    'TweenMax' : '../../src/lib/greensocks/uncompressed/TweenMax',
    'TweenPlugins' : '../../src/lib/greensocks/uncompressed/plugins',
    'lodash' : '../../src/lib/lodash/js/lodash',
    'socketio' : '../../src/lib/socketio/js/socket.io',
    'cloak' : '../../src/lib/cloak/js/cloak',
    'game' : '../../src/app/hayesmaker/solitaire/game',
    'modules' : '../../src/app/hayesmaker/solitaire/game/modules',
    'components' : '../../src/app/hayesmaker/solitaire/game/components',
    'utils' : '../../src/app/hayesmaker/solitaire/game/utils',
    'testHelpers' : 'spec/hayesmaker/solitaire/game/testHelpers'
  },
  shim: {
    'jasmineSignals' : {
      deps: ['signals']
    },
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
    },
    'jquery': {
      exports: 'jquery'
    },
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});


require(['jquery', 'jasmine-html'], function ($, jasmine) {

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function (spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];
  specs.push('spec/hayesmaker/solitaire/game/mainSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/components/cardSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/game/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/game/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/game/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/rules/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/rules/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/player/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/player/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/player/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/board/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/board/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/board/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/rowStack/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/rowStack/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/rowStack/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/acePile/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/acePile/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/acePile/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/specialPile/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/specialPile/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game/modules/specialPile/controllerSpec.js');

  $(function () {
    require(specs, function () {
      console.log('*** Specs ready ');
      jasmineEnv.execute();
    });
  });

});