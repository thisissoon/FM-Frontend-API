module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'clean:build',
		'copy:build'
	]);
};
