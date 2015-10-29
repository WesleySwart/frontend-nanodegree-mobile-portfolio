// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
	// configure jshint to validate js files
	jshint: {
		options: {
			reporter: require('jshint-stylish')//use jshint-stylish to make our errors look and read well
		},
		
		//when this task is run lint the gruntfile and all js files
		files: ['Gruntfile.js', 'js/*.js', 'views/js/*.js']
	},
	
	// configure uglify to minify js files
	uglify: {
		options: {
			banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
		},
		build: {
			files: {
				'js/perfmatters.min.js': 'js/perfmatters.js',
				'views/js/main.min.js': 'views/js/main.js'
			}
		}
	},
	
	// configure cssmin to minify css files
	cssmin: {
		options: {
			banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
		},
		build: {
			files: {
				'css/style.min.css': 'css/style.css',
				'css/print.min.css': 'css/print.css',
				'views/css/bootstrap-grid.min.css': 'views/css/bootstrap-grid.css',
				'views/css/style.min.css': 'views/css/style.css'
			}
		}
	},

	watch: {
		stylesheets: {
			files: ['css/*.css', 'views/css/*.css'],
			tasks: ['cssmin']
		},
		scripts: {
			files: ['js/*.js', 'views/js/*.js'],
			tasks: ['jshint', 'uglify']
		}
	}
  });

  //=============== Create Tasks ========================== //
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

};