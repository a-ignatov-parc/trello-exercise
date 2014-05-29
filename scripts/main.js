(function(window) {
	var Parser = function(string, manual) {
		if (typeof(window.Perf) === 'function') {
			this.perf = new window.Perf();
		}
		this.string = string;
		this.collection = null;
		this.iteration = 0;
		this.pairs = null;
		this.prepare();

		if (!manual) {
			console.log('Processing string: ' + this.string);

			while(this.hasNext()) {
				this.next();
			}
			this.updateResult();

			console.log('Processed result: ' + this.result);
		}
	};

	Parser.prototype = {
		next: function() {
			var char,
				positions;

			if (!this.iteration && this.pairs != null) {
				char = this.pairs[0];
			} else {
				char = createPairs.call(this)[0];
			}

			if (char) {
				positions = [char.positions[0], char.positions[char.positions.length - 1]];
				this.chars.push(this.chars[positions[1]]);
				this.chars.splice(positions[1], 1);
				this.chars.splice(positions[0], 1);
				this.iteration++;
				// console.log(char, positions, this.chars.join(''));
			} else {
				sliceUnderscore.call(this);
			}
			return char;
		},

		hasNext: function() {
			if (this.pairs == null) {
				createPairs.call(this);
			}
			return !!this.pairs[0];
		},

		updateResult: function() {
			return this.result = this.chars.join('');
		},

		prepare: function() {
			this.result = this.string;
			this.chars = this.result.split('');
		},

		reset: function() {
			this.collection = {};
			this.pairs = [];
		}
	};

	function sliceUnderscore() {
		for (var i = 0, length = this.chars.length; i < length; i++) {
			if (this.chars[i] === '_') {
				this.chars.splice(i, length - (i + 1));
				break;
			}
		}
		return this.chars;
	}

	function createPairs() {
		this.reset();

		if (this.perf) {
			this.perf.start();
		}

		// Creating symbol pairs.
		for (var i = 0, length = this.chars.length; i < length; i++) {
			var symbol = this.chars[i],
				existingChar = findCharBySymbol(this.pairs, symbol),
				hasInnerPairs = checkInnerPairs(this.pairs, existingChar, existingChar ? existingChar.positions[0] : this.collection[symbol], i),
				newChar;

			if (hasInnerPairs && existingChar) {
				existingChar.sealed = true;
			}

			if (!existingChar && this.collection[symbol] == null || hasInnerPairs) {
				this.collection[symbol] = i;
			} else if (!existingChar && this.collection[symbol] != null) {
				this.pairs.push(newChar = {
					distance: 0,
					symbol: symbol,
					positions: [this.collection[symbol], i],
					sealed: false
				});
				updateDistance(newChar);
				this.collection[symbol] = null;
			} else {
				existingChar.positions.push(i);
				updateDistance(existingChar);
			}
		}

		// Sorting created pairs by distance.
		this.pairs.sort(sortByFarthest);

		if (this.perf) {
			console.log('Pairs created in: ' + this.perf.end() + 'ms');
		}
		return this.pairs;
	}

	function sortByFarthest(a, b, distance) {
		distance = b.distance - a.distance;
		return distance + (!distance ? a.positions[0] - b.positions[0] : 0);
	}

	function updateDistance(char) {
		char.distance = char.positions[char.positions.length - 1] - char.positions[0];
	}

	function findCharBySymbol(list, symbol) {
		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i].symbol === symbol && list[i].positions.length < 3 && !list[i].sealed) {
				return list[i];
			}
		}
	}

	function checkInnerPairs(list, char, start, end) {
		if (char == null && (start == null || end == null) || char != null && char.positions.length < 1) {
			return false;
		}

		for (var i = 0, length = list.length, item; i < length; i++) {
			item = list[i];

			if (item !== char && item.positions[0] > start) {
				if (item.positions[2] != null && item.positions[2] < end || item.positions[1] < end) {
					return true;
				}
			}
		}
		return false;
	}

	window.Parser = Parser;
})(window);