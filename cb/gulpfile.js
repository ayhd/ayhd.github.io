
var assetsPath 		= "assets/";

var gulp = require('gulp');
 var browserSync = require('browser-sync');
// var runSequence 	= require('run-sequence');
var	concat 			= require('gulp-concat');
var	uglify 			= require('gulp-uglify');
//var livereload = require('gulp-livereload');

var mergePaths 	=	{
						js: {
							site: {
								src: [	assetsPath+'js/jquery.js',
										assetsPath+'js/bootstrap.min.js',
										assetsPath+'js/scrolling-nav.js'
									],
								dest: assetsPath+'dist/js',
								name: 'jquery.siteCustom.min.js'
							}
							},
						css: {
							plugins: {
								src: [
									assetsPath+'css/plugins/jquery.bxslider.css',
									assetsPath+'css/plugins/jquery.qtip.css',
									assetsPath+'css/plugins/ngDialog.css',
									assetsPath+'css/plugins/ngDialog-theme-default.css',
									assetsPath+'css/plugins/ng-select2-selectize.default.css',
									'node_modules/ng-tiny-scrollbar/dist/ng-tiny-scrollbar.min.css'
									],
								dest: assetsPath+'dist/css',
								name: 'plugins.min.css'
							},
							site:{
								src: [	assetsPath+'fonts/style.css',
										assetsPath+'css/default.css'
									],
								dest: assetsPath+'dist/css',
								name: 'default.min.css'
							}
						}
					};
					
gulp.task('minify-libs-js', function () {
    gulp.src(mergePaths.js.site.src) // path to your files 							
    .pipe(concat(mergePaths.js.site.name))
	.pipe(uglify()) 
    .pipe(gulp.dest(mergePaths.js.site.dest));
});

// gulp.task('watch', function(){
// 
// 	gulp.watch(mergePaths.js.site.src, 	['minify-libs-js']);
// 
// });


// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
   //     .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['minify-libs-js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

    // Serve files from the root of this project
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("assets/js/*.js", ['js-watch']);
});



gulp.task('default', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", browserSync.reload);
});