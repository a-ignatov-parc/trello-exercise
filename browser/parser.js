(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof(window) !== 'undefined') {
	window.Parser = require('./parser');
}
},{"./parser":3}],2:[function(require,module,exports){
var Iterator = function(str) {
	this._source = ('' + str).split('');
};

Iterator.prototype = {
	next: function(hasNext) {
		var nextStep = hasNext != null ? hasNext : this.hasNext(),
			length,
			i;

		if (nextStep === 'pair') {
			var pendingPairsQueue = [],
				longestPairIndex = 0,
				pairs = {},
				pair;

			for (i = 0, length = this._source.length; i < length; i++) {
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
			for (i = 0, length = this._source.length; i < length; i++) {
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
};

function calculateDistance(symbol) {
	symbol.distance = symbol.positions[symbol.positions.length - 1] - symbol.positions[0];
	return symbol;
}

module.exports = Iterator;
},{}],3:[function(require,module,exports){
var Iterator = require('./iterator');

module.exports = function(str) {
	var iterator = new Iterator(str),
		hasNext,
		result;

	console.log('Processing string:\n'.info + str.replace(/(.{80})/g, '$1\n').data);
	console.time('Parsed in');

	for (;hasNext = iterator.hasNext();) {
		iterator.next(hasNext);
	}

	console.timeEnd('Parsed in');

	result = iterator.toString();

	console.log('Processed result: '.info + result.verbose);

	return result;
};
},{"./iterator":2}]},{},[1]);