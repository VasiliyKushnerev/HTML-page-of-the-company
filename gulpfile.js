const 	gulp = require('gulp'),
     	autoprefixer  = require('gulp-autoprefixer'),
        cleanCSS = require('gulp-clean-css'),
        imagemin = require('gulp-imagemin'),
        jsmin = require('gulp-jsmin'),
        less = require('gulp-less'),
        browserSync = require('browser-sync').create();

// html task

function html() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
}

// style task

function styles(){
    return gulp.src('src/assets/css/style.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
}
exports.styles = styles;

// images task
function images() {
    return gulp.src('src/assets/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));
}
exports.images = images;
// fonts task
function font() {
    return gulp.src('src/assets/fonts/**')
        .pipe(gulp.dest('dist/assets/fonts'));
}
// webfonts task
function webfont() {
    return gulp.src('src/assets/webfonts/**')
        .pipe(gulp.dest('dist/assets/webfonts'));
}

//js task
function js() {
    return gulp.src('src/assets/js/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/assets/js'))
}


// browser-sync task
function bs() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
    gulp.watch('src/assets/css/*.less',styles);
    browserSync.watch('src/*.html').on('change',browserSync.reload);

}
exports.bs = bs;


exports.default = gulp.series(html,styles,images,font,webfont,js);







