var gulp = require('gulp'),
    jade = require('gulp-jade');
    sass = require('gulp-sass'),
    del = require('del'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

var outputDir = 'dist';

gulp.task('html', function() {
  gulp.src('app/templates/*.jade')
    .pipe(jade({
        // pretty: true
    }))
    .pipe(gulp.dest(outputDir))
});

gulp.task('css', function(){
    return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(outputDir + '/css'))
});

gulp.task('clean', function() {
    return del.sync(outputDir);
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.scss', ['css']);
    gulp.watch('app/**/*.jade', ['html']);
});

gulp.task('build', ['clean', 'html', 'css'], function() {
    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ])
    .pipe(gulp.dest(outputDir + '/fonts'))
});
