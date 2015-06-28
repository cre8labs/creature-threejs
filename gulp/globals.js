global.gulp             = require('gulp');
global.gutil            = require('gulp-util');
global.argv             = require('minimist')(process.argv.slice(2));
global.path             = require('path');
global.runSequence      = require('run-sequence');
global.fs               = require('fs');
global.copy             = require('gulp-copy');
global.del              = require('del');

global.VERSION          = argv.version || require('../package.json').version;
