module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'copy:dev'
	]);
};
