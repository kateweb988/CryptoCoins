const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', styles);
gulp.task('sctipts', sctipts);
gulp.task('htmls', htmls);
gulp.task('init', gulp.parallel('styles', 'sctipts', 'htmls'));

gulp.task('serve', watch);


// Dev
function styles() {
	return gulp.src('src/sass/main.sass')
		.pipe(sourcemaps.init({ largeFile: true }))
		.pipe(sass({
			errorLogToConsole: true
		}))
		.on('error', console.error.bind(console))
		.pipe(autoprefix({
			overrideBrowserslist: ['last 4 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('dev/css'))
		.pipe(browserSync.stream());
}

function sctipts() {
	return gulp.src(['src/js/jquery-3.6.0.min.js', 'src/js/slick.min.js', 'src/js/main.js'])
		.pipe(sourcemaps.init({ largeFile: true }))
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('dev/js/'))
		.pipe(browserSync.stream());
}

function htmls() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dev/'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './dev'
		},
		//tunnel: true
	});
	gulp.watch('src/sass/**/*.sass', styles);
	gulp.watch('src/js/**/*.js', sctipts);
	gulp.watch('src/*.html', htmls);
}