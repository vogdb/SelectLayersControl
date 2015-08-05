/*global module:false*/
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

    , banner: '/*!\n <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
      + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
      + ' <%= (pkg.homepage ? "* " + pkg.homepage : pkg.repository.url) + "\\n" %>'
      + ' Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;'
      + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n*/\n'

    , uglify: {
        options: {
          banner: '<%= banner %>'
        }
        , dist: {
            src: 'src/SelectLayers.js'
            , dest: 'dist/<%= pkg.name %>.min.js'
      }
    }

    , watch: {
        gruntfile: {
          files: '<%= uglify.dist.src %>'
          , tasks: ['default']
        }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Default task.
  grunt.registerTask('default', ['uglify'])

}
