/**
 * Configuration for running mocha unit and integration tests.
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('mocha_istanbul', {
    options: {
        coverage: true,
        coverageFolder: './coverage',
        reportFormats: ['cobertura','lcov'],
        root: 'api/',
        timeout: 15000,
        mochaOptions: {
            reporter: 'spec',
            growl: true,
            recursive: true
        }
    },
    unit: {
        src: ['./tests/bootstrap.js', './tests/unit/**/*.js'],
    },
    integration: {
        src: ['./tests/bootstrap.js', './tests/integration/**/*.js']
    }
	});

	grunt.loadNpmTasks('grunt-mocha-istanbul');
};
