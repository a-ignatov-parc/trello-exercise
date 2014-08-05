var Iterator = require('./iterator');

module.exports = function(str) {
	var iterator = new Iterator(str),
		hasNext,
		result;

	console.log('Processing string:\n'.info + str.replace(/(.{80})/g, '$1\n').data);

	// for (;hasNext = iterator.hasNext();) {
	// 	iterator.next(hasNext);
	// }
	iterator.next();
	result = iterator.toString();

	console.log('Processed result: '.info + result.verbose);

	return result;
}