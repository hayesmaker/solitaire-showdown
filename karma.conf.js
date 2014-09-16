// Karma configuration
// Generated on Thu Dec 19 2013 11:04:05 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: 'public/js',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/app/**/*.js', included: false},
      {pattern: 'src/lib/**/*.js', included: false},
      {pattern: 'test/jasmine/spec/**/*Spec.js', included: false},
      {pattern: 'test/jasmine/lib/**/*.js', included: false},
      {pattern: 'test/jasmine/spec/hayesmaker/solitaire/game/testHelpers/*.js', included: false},
      'test/jasmine/karmaMain.js'
    ],


    // list of files to exclude
    exclude: [
      'src/app/app.js',
      'test/jasmine/specRunner.js'

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'growl'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
