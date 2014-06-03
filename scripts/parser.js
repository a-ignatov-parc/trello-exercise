(function(window) {
	var Parser = function(string, manual) {
		if (typeof(window.Perf) === 'function') {
			this.perf = new window.Perf();
		}

		this.string = string;
		this.underscores = false;
		this.iteration = 0;
		this.pairs = null;
		this.longestPairChar = null;
		this.prepare();

		if (!manual) {
			if (window) {
				document.body.innerHTML += 'Processing string:<br />' + this.string.replace(/(.{80})/g, '$1<br />') + '<br />';
			} else {
				console.log('Processing string:\n'.info + this.string.replace(/(.{80})/g, '$1\n').data);
			}

			while(this.hasNext()) {
				this.next();
			}
			this.updateResult();

			if (window) {
				document.body.innerHTML += 'Processed result: ' + this.result + '<br />';
				document.body.innerHTML += '-----<br /><br />';
			} else {
				console.log('Processed result: '.info + this.result.verbose);
			}
		}
	};

	Parser.prototype = {
		next: function() {
			if (this.pairs == null) {
				createPairs.call(this);
			}

			var char = this.longestPairChar,
				list = [],
				positions;

			if (char) {
				positions = [char.positions[0], char.positions[char.positions.length - 1]];

				for (var i = 0, length = this.chars.length; i < length; i++) {
					if (i !== positions[0] && i !== positions[1]) {
						list[list.length] = this.chars[i];
					}
				}
				list[list.length] = this.chars[positions[1]];
				this.chars = list;
			} else {
				sliceUnderscore.call(this);
			}
			this.iteration++;
			createPairs.call(this);
			return char;
		},

		hasNext: function() {
			if (this.pairs == null) {
				createPairs.call(this);
			}
			return !!this.longestPairChar || this.underscores;
		},

		updateResult: function() {
			return this.result = this.chars.join('');
		},

		prepare: function() {
			this.result = this.string;
			this.chars = this.string.split('');
			this.underscores = this.string.indexOf('_') >= 0;
		},

		reset: function() {
			this.pairs = [];
		}
	};

	function sliceUnderscore() {
		var list = [];

		for (var i = 0, length = this.chars.length; i < length; i++) {
			if (this.chars[i] === '_') {
				break;
			} else {
				list[list.length] = this.chars[i];
			}
		}
		this.chars = list;
		this.underscores = false;
		return this.chars;
	}

	function createPairs() {
		var longestPair = null,
			singleSymbols = {},
			lastChars = {};

		this.reset();

		if (this.perf) {
			this.perf.start();
		}

		// Creating symbol pairs.
		for (var i = 0, length = this.chars.length; i < length; i++) {
			var symbol = this.chars[i],
				existingChar = lastChars[symbol],
				hasInnerPairs = checkInnerPairs(this.pairs, singleSymbols, existingChar, existingChar ? existingChar.positions[0] : singleSymbols[symbol], i);

			if (hasInnerPairs && existingChar) {
				lastChars[symbol] = null;
			}

			if (!existingChar && singleSymbols[symbol] == null || hasInnerPairs) {
				singleSymbols[symbol] = i;
			} else if (!existingChar && singleSymbols[symbol] != null) {
				existingChar = updateDistance({
					distance: 0,
					symbol: symbol,
					positions: [singleSymbols[symbol], i]
				});
				this.pairs[this.pairs.length] = lastChars[symbol] = existingChar;
				singleSymbols[symbol] = null;
			} else {
				existingChar.positions[existingChar.positions.length] = i;
				updateDistance(existingChar);

				if (existingChar.positions.length === 3) {
					lastChars[symbol] = null;
				}
			}

			if (longestPair == null && existingChar || existingChar && this.pairs[longestPair].distance < existingChar.distance) {
				longestPair = this.pairs.length - 1;
			}
		}
		this.longestPairChar = this.pairs[longestPair];

		if (this.perf) {
			if (window) {
				document.body.innerHTML += this.pairs.length + ' pairs created in ' + this.perf.end() + 'ms<br />';
			} else {
				console.log(this.pairs.length + ' pairs created in ' + this.perf.end() + 'ms');
			}
		}
		lastChars = null;
		singleSymbols = null;
		return this.pairs;
	}

	function updateDistance(char) {
		char.distance = char.positions[char.positions.length - 1] - char.positions[0];
		return char;
	}

	function checkInnerPairs(list, singleSymbols, char, start, end) {
		if (char == null && (start == null || end == null) || char != null && char.positions.length < 1) {
			return false;
		}

		for (var i = list.length - 1; i >= 0; i--) {
			var item = list[i];

			if (item !== char) {
				if (item.positions[0] > start) {
					if (singleSymbols[item.symbol] != null && singleSymbols[item.symbol] < end || item.positions[2] != null && item.positions[2] < end || item.positions[1] < end) {
						return true;
					}
				} else if (item.positions[1] > start) {
					if (singleSymbols[item.symbol] != null && singleSymbols[item.symbol] < end || item.positions[2] != null && item.positions[2] < end) {
						return true;
					}
				} else if (item.positions[2] != null && item.positions[2] > start) {
					if (singleSymbols[item.symbol] != null && singleSymbols[item.symbol] < end) {
						return true;
					}
				} else {
					return false;
				}
			}
		}
		return false;
	}

	if (window) {
		window.Parser = Parser;
	} else {
		module.exports = Parser;
	}
})(typeof(window) === 'object' && window);