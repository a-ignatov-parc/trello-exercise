(function(window) {
	var Parser = function(string) {
		this._string = string;
		this._chars = [];
		this._pairs = [];
		this._endCharList = [];

		prepareString.call(this);
		this.process();
	};

	function prepareString() {
		this._chars = this._string.split('');
	}

	function sortByFarthest(pairs) {
		pairs.sort(function(a, b) {
			return b.distance - a.distance;
		});
		return pairs;
	}

	function processFarthestList(list) {
		for (var i = 0, length = list.length; i < length; i++) {
			processChar.call(this, list[i], list);
		}
	}

	function processChar(char, list) {
		console.log(char);
	}

	function updateDistance(char) {
		char.distance = char.positions[char.positions.length - 1] - char.positions[0];
	}

	function findCharWithNormalPositionsLength(list, char) {
		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i].symbol === char && list[i].positions.length < 3) {
				return list[i];
			}
		}
	}

	function checkInterseptions(list, char, end) {
		if (char.positions.length <= 1) {
			return false;
		}

		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i] !== char && list[i].positions.length > 1 && list[i].positions[0] > char.positions[0] && (list[i].positions[2] != null ? list[i].positions[2] < end : false || list[i].positions[1] < end)) {
				return true;
			}
		}
		return false;
	}

	Parser.prototype = {
		process: function() {
			console.log('Starting processing for: ' + this._string);

			for (var i = 0, length = this._chars.length; i < length; i++) {
				var char = this._chars[i],
					existingChar = findCharWithNormalPositionsLength(this._pairs, char);

				if (!existingChar || checkInterseptions(this._pairs, existingChar || char, i)) {
					this._pairs.push({
						distance: 0,
						symbol: char,
						positions: [i]
					});
				} else {
					existingChar.positions.push(i);
					updateDistance(existingChar);
				}
			}
			console.log(1, this._pairs);
			processFarthestList.call(this, sortByFarthest.call(this, this._pairs));
		}
	};

	window.Parser = Parser;
})(window);