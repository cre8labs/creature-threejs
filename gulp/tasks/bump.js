var IMPORTANCE = argv.importance;
var PREID = argv.preid;

var bump = require('gulp-bump'),
    semver = require('semver'),
    packageVersion = require(path.join(root, 'package.json')).version,
    importances = ['major', 'minor', 'patch', 'prerelease'];

/**
 * Bumps software version
 *
 * @example
 * npm run gulp -- bump
 * npm run gulp -- bump --importance major
 * npm run gulp -- bump --importance minor
 * npm run gulp -- bump --importance patch
 * npm run gulp -- bump --preid RC
 * npm run gulp -- bump --preid BETA
 * npm run gulp -- bump --version 2.1.3
 */
exports.task = function () {
    var options = {
        type: 'prerelease',
        preid: 'RC'
    };

    if(IMPORTANCE) {
        if(importances.indexOf(IMPORTANCE) < 0) {
            throw new gutil.PluginError("bump", 'Wrong parameter: --importance\nChoose one: major|minor|patch|prerelease\nProvided value: ' + IMPORTANCE);
        }
        options.type = IMPORTANCE;
    }

    if(PREID) {
        options.preid = PREID;
    }

    if(argv.version || packageVersion !== VERSION) {
        options = {
            version: VERSION
        };
    } else {
        VERSION = semver.inc(packageVersion, options.type, options.preid)
    }

    gulp.src(['./package.json', './bower.json'])
        .pipe(bump(options))
        .pipe(gulp.dest('./'));
};
