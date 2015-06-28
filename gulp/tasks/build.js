/**
 * Builds Development version
 *
 * @example
 * npm run gulp -- build
 */
exports.task = function() {
  return gulp.src(['./assets/**/*', './bower_components/**/*', './js/**/*', './index.html'])
      .pipe(copy('./dist'));
};
