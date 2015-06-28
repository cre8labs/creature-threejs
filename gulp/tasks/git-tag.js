var git = require('gulp-git'),
    tag_version = require('gulp-tag-version');

/**
 * Commits changes and creates TAG
 * based on 'version' taken from package.json
 *
 * @example
 * npm run gulp -- git-tag
 */
exports.task = function() {
    return gulp.src('./package.json')
        .pipe(git.commit('bumps package version'))
        .pipe(tag_version());
};