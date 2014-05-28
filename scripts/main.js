(function(window) {
	var Parser = function(string) {
		this.perf = new window.Perf();
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

	function findCharWithNormalPositionsLength(list, symbol) {
		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i].symbol === symbol && list[i].positions.length < 3 && !list[i].sealed) {
				return list[i];
			}
		}
	}

	function checkInterseptions(list, char, end) {
		if (char == null || char.positions.length < 1) {
			return false;
		}

		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i] !== char && list[i].positions.length > 1 && list[i].positions[0] > char.positions[0] && (list[i].positions[2] != null ? list[i].positions[2] < end : false || list[i].positions[1] < end)) {
				return true;
			}
		}
		return false;
	}

	function createPairs(list) {
		var pairs = [];

		this.perf.start();

		for (var i = 0, length = list.length; i < length; i++) {
			var symbol = list[i],
				existingChar = findCharWithNormalPositionsLength(pairs, symbol),
				hasInterseption = checkInterseptions(pairs, existingChar, i);

			if (hasInterseption && existingChar) {
				existingChar.sealed = true;
			}

			if (typeof(symbol) === 'string') {
				if (!existingChar || hasInterseption) {
					pairs.push({
						distance: 0,
						symbol: symbol,
						positions: [i],
						sealed: false
					});
				} else {
					existingChar.positions.push(i);
					updateDistance(existingChar);
				}
			}
		}
		console.log('Pairs created in: ' + this.perf.end() + 'ms');
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
				pairs = createPairs.call(this, chars);
				sortedPairs = sortByFarthest.call(this, pairs);
				char = sortedPairs[0];

				if (char.distance) {
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