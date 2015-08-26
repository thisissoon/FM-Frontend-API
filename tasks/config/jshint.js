/**
 * Validate JSHint rules
 *
 * ---------------------------------------------------------------
 *
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = function(grunt) {

	grunt.config.set('jshint', {
        options: {
          jshintrc: '.jshintrc'
        },
		dev: {
          src: ['api/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
