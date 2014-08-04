var Iterator = function(str) {
	this._source = ('' + str).split('');
}

Iterator.prototype = {
	// init: function() {
		
	// },

	next: function() {
		var nextStep = this.hasNext(),
			pendingSymbols = [],
			pairs = {};

		if (nextStep === 'pairs') {
			for (var i = 0, length = this._source.length; i < length; i++) {
				var letter = this._source[i],
					symbol = {
						letter: letter,
						positions: [i]
					},
					splice = false;

				// if (!pairs[letter]) {
				// 	pairs[letter] = {};
				// }

				// pendingSymbols[pendingSymbols.length] = {
				// 	letter: letter,
				// 	positions: [i]
				// };

				pendingSymbols.unshift(symbol);

				for (var index = pendingSymbols.length; index; index--) {
					if (pendingSymbols[index].letter === letter) {
						pendingSymbols[index].positions[pendingSymbols[index].positions.length] = i;
						splice = true;
					} else if (splice) {
						pendingSymbols.splice(index, 1);
					}
				}
				// pendingSymbols[pendingSymbols.length];
			}
		} else if (nextStep === 'underscore') {
			for (var i = 0, length = this._source.length; i < length; i++) {
				if (this._source[i] === '_') {
					this._source.length = i + 1;
					break;
				}
			}
		}
	},

	hasNext: function() {
		var pairs = {};

		for (var i = 0, length = this._source.length, letter; i < length; i++) {
			letter = this._source[i];

			if (!pairs[letter]) {
				pairs[letter] = letter;
			} else {
				return 'pair';
			}
		}

		if (pairs._) {
			return 'underscore';
		}
		return false;
	},

	toString: function() {
		return this._source.join('');
	}
}

module.exports = Iterator;