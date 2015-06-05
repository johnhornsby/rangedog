module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		babel: {
			options: {
				modules: "amd",
				sourceMap: true
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: "public/assets/scripts/src/",
						src: ["**/*.js"],
						dest: "public/assets/scripts/dist/",
						ext: ".js"
					}
				]
			}
		},
		sass: {
			dist: {
				files: {
					'public/assets/css/app.css': 'public/assets/scss/app.scss'
				}
			}
		},
		develop: {
			server: {
				file: 'server.js'
			}
		},
		watch: {
			js: {
				files: [
					'public/assets/scripts/dist/**/*.js'
				],
				tasks: ['develop'],
				options: {
        			livereload: true
				}
			},
			es6: {
				files: [
					'public/assets/scripts/src/**/*.js'
				],
				tasks: ["babel"]
			},
			sass: {
				files: [
					'public/assets/scss/**/*.scss'
				],
				tasks: ["sass"],
				options: {
        			livereload: true
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					// url that is relative to the require paths
					baseUrl: "public/assets/scripts/dist/",
					mainConfigFile: "public/assets/scripts/js/almond-config.js",
					out: "public/assets/scripts/js/app.js"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-develop");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask("default", ["compile", "develop", "watch"]);

	grunt.registerTask("compile", ["babel", "sass"]);
	grunt.registerTask("build", ["compile", "requirejs"]);

};