var gulp = require('gulp'),
del = require('del'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
connect = require('gulp-connect'),
imagemin = require('gulp-imagemin'),
minifycss = require('gulp-minify-css'),
minifyhtml = require('gulp-minify-html'),
processhtml = require('gulp-processhtml'),
autoprefixer = require('gulp-autoprefixer');

gulp.task('server', function(){
    connect.server({
        root:['./src'],
        port: 3000,
        livereload: true
    });
});
gulp.task('copy', function(){
    gulp.src('/data/*.json')
    .pipe(gulp.dest('dist/data'))
    .pipe(connect.reload())
});

gulp.task('html', function(){
    gulp.src(['src/app/*.html','src/app/**/*.html'])
    .pipe(gulp.dest('dist/app'))
    .pipe(connect.reload());
});

gulp.task('images', function(){
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('scripts', function () {
    gulp.src(['js/*.js','js/**'])
    .pipe(jshint())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
});

gulp.task('watch', function () {
    // body...
    gulp.watch(['/src/app/*.html'], ['html']);
    gulp.watch(['/src/js/*.js'], ['scripts']);
});

gulp.task('dist', function(){
    gulp.src('dist/app/*.html')
    .pipe(processhtml())
    .pipe(minifyhtml())
    .pipe(gulp.dest('dist/app'));

    gulp.src('dist/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

    gulp.src('dist/images/*')
    .pipe(gulp.dest('dist/images'));
});
gulp.task('default', ['server', 'html','images', 'scripts', 'copy', 'watch']);