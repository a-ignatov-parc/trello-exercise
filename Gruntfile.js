var pkg = require('./package.json'),
	gruntConfig = {
		pkg: pkg,
		qunit: {
			all: [pkg.testPath + '**/*.html']
		},
		jshint: {
			grunt: {
				src: 'Gruntfile.js',
				options: {
					jshintrc: '.jshintrc'
				}
			},
			src: {
				src: pkg.srcPath + '**/*.js',
				options: {
					jshintrc: pkg.srcPath + '.jshintrc'
				}
			},
			tests: {
				src: pkg.testPath + '*.js',
				options: {
					jshintrc: pkg.testPath + '.jshintrc'
				}
			}
		}
	};

module.exports = function(grunt) {
	grunt.initConfig(gruntConfig);
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Регистрируем таски
	grunt.registerTask('default', ['jshint', 'qunit']);
	grunt.registerTask('tests', 'qunit');
	grunt.registerTask('travis', ['jshint', 'qunit']);
};
