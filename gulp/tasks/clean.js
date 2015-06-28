/**
 * clean dist folder
 *
 * @example
 * npm run gulp -- clean
 */
exports.task = function(cb) {
    del([
        'dist/**/*'
    ], cb);
};
