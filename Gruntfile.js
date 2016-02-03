/**
 * Created by johni on 12/01/2016.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: '\n;\n'
            },
            build: {
                files: [
                    {
                        src: ['app/bower_components/**/*.min.js', '!app/**/*test.js', 'app/components/*.js', 'app/*.js', 'app/view1/*.js'],
                        dest: 'stage/app.js'
                    }
                ]
            }
        },
        clean: ['stage/', 'prod'],
        uglify: {
            options: {
                compress: {
                    warnings: true
                }
            },
            build: {
                files: [
                    {
                        'prod/app.min.js': ['stage/app.js']
                    }
                ]
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('minify', ['clean', 'uglify']);
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};
