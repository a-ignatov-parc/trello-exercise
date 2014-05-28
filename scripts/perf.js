(function(window) {
	var Perf = function() {
		var startTime,
			method,
			methods = ['now', 'webkitNow', 'msNow', 'mozNow'],
			perfNow = function() {
				if (method) {
					return window.performance[method]();
				} else {
					return Date.now();
				}
			};

		if (window.performance != null) {
			for (var i = 0, length = methods.length; i < length; i++) {
				if (methods[i] && methods[i] in window.performance) {
					method = methods[i];
					break;
				}
			}
		}

		this.start = function() {
			startTime = perfNow();
		};

		this.end = function() {
			if (!startTime) {
				return 0;
			}
			return perfNow() - startTime;
		};
	};

	window.Perf = Perf;
})(window);