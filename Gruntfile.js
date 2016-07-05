module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n',
        stripBanners: true,
        sourceMap: false,
        banner: ''
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'src/js/app.min.js'
        ],
        dest: 'dist/app.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: true
      },
      target: {
        files: {
          'dist/app.css': ['src/css/app.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/app.js'],
      options: {

      }
    },
    sass: {
      dist: {
        options: {

        },
        files: {
          'src/css/app.css': 'src/sass/app.scss'
        }
      }
    },
    ts: {
      default: {
        src: ['src/ts/*.ts'],
        dest: ['src/js/app.js']
      },
      options: {
        comments: false,
        compile: true,
        fast: 'never'
      }
    },
    uglify: {
      target: {
        files: {
          'src/js/app.min.js': ['src/js/app.js']
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint']
      },
      images: {
        files: 'src/images/*',
        tasks: ['imagemin']
      },
      html: {
        files: 'src/*.html',
        tasks: ['htmlmin']
      },
      css: {
        files: 'src/sass/*.scss',
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: '<%= ts.default.src %>',
        tasks: ['ts', 'jshint', 'uglify', 'concat']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['htmlmin', 'cssmin', 'ts', 'jshint', 'uglify', 'concat']);
};
