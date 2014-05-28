(function(window) {
	var Parser = function(string) {
		this.string = string;
		this.process();
	};

	function prepareString(string) {
		return string.split('');
	}

	function sortByFarthest(pairs) {
		var distanceSorting = 0;

		return pairs.sort(function(a, b) {
			distanceSorting = b.distance - a.distance;
			return distanceSorting + (!distanceSorting ? a.positions[0] - b.positions[0] : 0);
		});
	}

	function updateDistance(char) {
		char.distance = char.positions[char.positions.length - 1] - char.positions[0];
	}

	function findSuitableChar(list, symbol) {
		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i].symbol === symbol && list[i].positions.length < 3 && !list[i].sealed) {
				return list[i];
			}
		}
	}

	function checkInterseptions(list, char, start, end) {
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

	function createPairs(list) {
		var pairs = [],
			singleChars = {};

		for (var i = 0, length = list.length; i < length; i++) {
			var symbol = list[i],
				existingChar = findSuitableChar(pairs, symbol),
				hasInterseption = checkInterseptions(pairs, existingChar, existingChar ? existingChar.positions[0] : singleChars[symbol], i),
				char;

			if (hasInterseption && existingChar) {
				existingChar.sealed = true;
			}

			if (!existingChar && singleChars[symbol] == null || hasInterseption) {
				singleChars[symbol] = i;
			} else if (!existingChar && singleChars[symbol] != null) {
				pairs.push(char = {
					distance: 0,
					symbol: symbol,
					positions: [singleChars[symbol], i],
					sealed: false
				});
				updateDistance(char);
				singleChars[symbol] = null;
			} else {
				existingChar.positions.push(i);
				updateDistance(existingChar);
			}
		}
		return pairs;
	}

	Parser.prototype = {
		process: function() {
			var chars = prepareString(this.string),
				char,
				pairs,
				sortedPairs,
				processedString,
				underscoreIndex;

			console.log('Starting processing for: ' + this.string);

			for (var processNext = true; processNext;) {
				pairs = createPairs(chars);
				sortedPairs = sortByFarthest.call(this, pairs);
				char = sortedPairs[0];

				if (char) {
					positions = [char.positions[0], char.positions[char.positions.length - 1]];
					chars.push(chars[positions[1]]);
					chars.splice(positions[1], 1);
					chars.splice(positions[0], 1);
					processNext = true;
					// console.log(char, positions, chars.join(''));
				} else {
					processNext = false;
				}
			}
			processedString = chars.join('');
			underscoreIndex = processedString.indexOf('_');

			if (underscoreIndex >= 0) {
				processedString = processedString.substr(0, underscoreIndex);
			}

			console.log('Processing result: ' + processedString);
			console.log('-----');
		}
	};

	window.Parser = Parser;
})(window);