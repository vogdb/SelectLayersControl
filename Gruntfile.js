/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                unused:true,
                boss:true,
                eqnull:true,
                browser:true,
                asi:true,
                globals:{}
            },
            gruntfile:{
                src:'Gruntfile.js'
            },
            lib_test:{
                src:['lib/**/*.js', 'test/**/*.js']
            }
        },
        uglify:{
            options:{
                banner:'<%= banner %>'
            },
            dist:{
                src:'src/SelectLayers.js',
                dest:'dist/<%= pkg.name %>.min.js'
            }
        },
        watch:{
            gruntfile:{
                files:'<%= jshint.gruntfile.src %>',
                tasks:['jshint:gruntfile']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    // Default task.
    grunt.registerTask('default', ['jshint', 'uglify'])

}
