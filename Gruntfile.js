
'use strict'

module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	}

	grunt.initConfig({

		config: config,

		sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './public/scss/',
                    src: ['*.scss'],
                    dest: './public/css/',
                    ext: '.css'
                }]
            }
        },
        
        nodemon: {
        	dev: {
        		options: {
        			file: 'app.js',
        			args: [],
        			ignoredFiles: ['README.md', 'node_models/**', '.DS_Store'],
        			watchedExtensions: ['js'],
        			watchedFolders: ['app', 'config'],
        			debug: true,
        			delayTime: 1,
        			env: {
        				PORT:3000
        			},
        			cwd: __dirname
        		}
        	}
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
        	tasks: ['nodemon', 'watch'],
        	options: {
        		logConcurrentOutput: true
        	}
        }
	});

	grunt.registerTask('default', ['concurrent']);

	
}