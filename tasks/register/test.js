module.exports = function (grunt) {
	grunt.registerTask('test', [
      'jshint',
      'mocha_istanbul:all'
	]);

    grunt.registerTask('test:dev', [
      'watch:api'
	]);

};
