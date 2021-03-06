var pkg = require('./package.json'),
	gruntConfig = {
		pkg: pkg,

		srcDir: '<%= pkg.config.srcDir %>',
		testDir: '<%= pkg.config.testDir %>',
		buildDir: '<%= pkg.config.buildDir %>',
		packagesDir: '<%= pkg.config.packagesDir %>',

		qunit: {
			all: ['<%= testDir %>/**/*.html']
		},
		jshint: {
			grunt: {
				src: 'Gruntfile.js',
				options: {
					jshintrc: '.jshintrc'
				}
			},
			src: {
				src: '<%= srcDir %>/**/*.js',
				options: {
					jshintrc: '<%= srcDir %>/.jshintrc'
				}
			},
			tests: {
				src: '<%= testDir %>/*.js',
				options: {
					jshintrc: '<%= testDir %>/.jshintrc'
				}
			}
		},
		browserify: {
			dist: {
				files: {
					'<%= buildDir %>/iterator.js': '<%= srcDir %>/export.js'
				}
			}
		}
	};

module.exports = function(grunt) {
	grunt.initConfig(gruntConfig);
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');

	// Регистрируем таски
	grunt.registerTask('default', ['jshint', 'browserify', 'qunit']);
	grunt.registerTask('tests', ['browserify', 'qunit']);
	grunt.registerTask('travis', ['jshint', 'browserify', 'qunit']);
};
