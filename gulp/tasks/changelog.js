var SHA = argv.sha;
var changelog = require('conventional-changelog');

/**
 * Generates Changelog.md
 *
 * @example
 * npm run gulp -- changelog
 */
exports.task = function() {
    var options = {
        repository: require(path.join(root, 'package.json')).repository.url,
        version: VERSION,
        file: 'CHANGELOG.md'
    };
    if (SHA) {
        options.from = SHA;
    }
    changelog(options, function(err, log) {
        fs.writeFileSync(root + '/CHANGELOG.md', log);
    });
};