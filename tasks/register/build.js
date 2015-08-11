module.exports = function (grunt) {
	grunt.registerTask('build', [
		'clean:build',
		'copy:build'
	]);
};
