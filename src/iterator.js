var Iterator = function(str) {
	this._source = ('' + str).split('');
}

Iterator.prototype = {
	next: function(hasNext) {
		var nextStep = hasNext != null ? hasNext : this.hasNext(),
			pendingPairsQueue = [],
			longestPairIndex = 0,
			pairs = {},
			pair;

		if (nextStep === 'pair') {
			for (var i = 0, length = this._source.length; i < length; i++) {
				var letter = this._source[i],
					symbol = {
						letter: letter,
						positions: [i]
					},
					longestPair = pairs[longestPairIndex],
					foundPair = false;

				for (var index = pendingPairsQueue.length - 1; index >= 0; index--) {
					var item = pendingPairsQueue[index];

					if (item.letter === letter) {
						item.positions[item.positions.length] = i;
						calculateDistance(item);
						foundPair = true;
					}

					if (item.positions.length > 1) {
						pairs[item.positions[0]] = item;
					}

					if (foundPair && (item.letter !== letter || item.letter === letter && item.positions.length > 1)) {
						if (!item.distance) {
							calculateDistance(item);
						}

						if (longestPair && longestPair.distance < item.distance || !longestPair) {
							longestPair = pairs[longestPairIndex = item.positions[0]];
						}

						if (item.letter !== letter || item.positions.length > 2) {
							pendingPairsQueue.splice(index, 1);
						}
					}
				}
				pendingPairsQueue[pendingPairsQueue.length] = symbol;

				// console.log('pendingPairsQueue', pendingPairsQueue);
				// console.log('pairs', pairs);
				// console.log('---');
			}

			pair = pairs[longestPairIndex];

			// console.log('\nLongestPair'.data, pair);

			if (pair) {
				this._source.splice(pair.positions[pair.positions.length - 1], 1);
				this._source.splice(pair.positions[0], 1);
				this._source[this._source.length] = pair.letter;
			}
		} else if (nextStep === 'underscore') {
			for (var i = 0, length = this._source.length; i < length; i++) {
				if (this._source[i] === '_') {
					this._source.length = i;
					break;
				}
			}
		}
		// console.log('\nUpdated source: '.info + this.toString().data);
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

function calculateDistance(symbol) {
	symbol.distance = symbol.positions[symbol.positions.length - 1] - symbol.positions[0];
	return symbol;
}

module.exports = Iterator;