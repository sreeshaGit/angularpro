module.exports = function (grunt) {
    //Configure main project settings
    grunt.initConfig({

        //Basic settings and info about our plugins.
        pkg: grunt.file.readJSON('package.json'),

        //Name of plugin (plugin name without the 'grunt-contrib-')

        clean: {
            target: {
                src: "build/",
                options: { force: true },
                all: {
                    //..
                }
            },
            otherFolder: {
                src: "comtojs/",
                options: { force: true },
                all: {
                    //..
                }
            }
        },
        react: {
            dynamic_mappings: {
                files: [
                  {
                      expand: true,
                      cwd: './',
                      src: ['./common/**/*.jsx'],
                      dest: './comtojs',
                      ext: '.js'
                  },
                   {
                       expand: true,
                       cwd: './',
                       src: ['./views/**/*.jsx'],
                       dest: './comtojs',
                       ext: '.js'
                   }
                ]
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: './comtojs',
                    src: '**/*.js',
                    dest: 'build/'
                }]
            }
        },
        copy: {
            main: {
                files: [
                 //{ expand: true, src: ['js/**'], dest: 'build/' },
                 //{ expand: true, src: ['css/**'], dest: 'build/' },
                 //{ expand: true, src: ['fonts/**'], dest: 'build/' },
                 //{ expand: true, src: ['images/**'], dest: 'build/' },
                 {cwd: 'views', src: '**/*.html',dest: 'build/views',expand: true}
                ],
            },
        },

    });

    //Load the plugin
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean:target', 'react', 'uglify', 'clean:otherFolder','copy']);
};