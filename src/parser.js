var Iterator = require('./iterator');

module.exports = function(str) {
	var iterator = new Iterator(str);

	return iterator.run() || '';
}