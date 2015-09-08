module.exports = function (grunt) {
	grunt.registerTask('test', [
      'jshint',
      'mocha_istanbul:unit',
      'mocha_istanbul:integration'
	]);

  grunt.registerTask('test:dev', [
      'watch:api'
	]);

};
