module.exports = function(grunt) {
	
	grunt.initConfig({
		babel: {
			options: {
				modules: "amd",
				sourceMap: false
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: "dev/public/assets/scripts/src/",
						src: ["**/*.js"],
						dest: "dev/public/assets/scripts/dist/",
						ext: ".js"
					}
				]
			}
		},
		sass: {
			dist: {
				files: {
					'dev/public/assets/css/app.css': 'dev/public/assets/scss/app.scss'
				}
			}
		},
		develop: {
			server: {
				file: 'dev/server.js'
			}
		},
		watch: {
			js: {
				files: [
					'dev/public/assets/scripts/dist/**/*.js'
				],
				tasks: ['develop'],
				options: {
        			livereload: true
				}
			},
			es6: {
				files: [
					'dev/public/assets/scripts/src/**/*.js'
				],
				tasks: ["babel", "copy:lib"]
			},
			sass: {
				files: [
					'dev/public/assets/scss/**/*.scss'
				],
				tasks: ["sass"],
				options: {
        			livereload: true
				}
			}
		},
		copy: {
			lib: {
				files: [
					{
						expand: true,
						cwd: "dev/public/assets/scripts/dist/",
						src: ["**"],
						dest: "lib/"
					}
				]
			}
		}
	});

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-develop");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask("default", ["compile", "develop", "watch"]);

	grunt.registerTask("compile", ["babel", "copy:lib", "sass"]);

};