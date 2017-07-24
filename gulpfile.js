var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var named = require('vinyl-named');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');
var util = require('gulp-util');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var base64 = require('gulp-base64');

var isProd = process.env.NODE_ENV === 'production';
var processors = [
  autoprefixer({browsers: [
    'last 4 versions',
    'ie > 7'
  ]})
];
if (isProd) {
  processors.push(cssnano());
}

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log(isProd);

var ROOT_PATH = __dirname;
var SRC_PATH = path.join(ROOT_PATH, 'src');
var BUILT_PATH = path.join(ROOT_PATH, 'built');
var SCRIPT = 'script';
var STYLE = 'style';
var IMAGE = 'image';
var SCRIPT_SRC_PATH = path.join(SRC_PATH, SCRIPT);
var STYLE_SRC_PATH = path.join(SRC_PATH, STYLE);
var IMAGE_SRC_PATH = path.join(SRC_PATH, IMAGE);
var SCRIPT_BUILT_PATH = path.join(BUILT_PATH, SCRIPT);
var STYLE_BUILT_PATH = path.join(BUILT_PATH, STYLE);
var IMAGE_BUILT_PATH = path.join(BUILT_PATH, IMAGE);

var webpackConfig = isProd
  ? require('./webpack.prod.config.js')
  : require('./webpack.dev.config.js');

gulp.task('clean', function() {
  del([BUILT_PATH]).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('script', function() {
  var entrys = getEntry();
  console.log(entrys);
  return gulp.src(entrys)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(SCRIPT_BUILT_PATH))
    .pipe(connect.reload());
});

gulp.task('image', function () {
  return gulp.src(path.join(IMAGE_SRC_PATH, '**/*'))
    .pipe(plumber())
    .pipe(gulp.dest(IMAGE_BUILT_PATH))
    .pipe(connect.reload());
});

gulp.task('style', function () {
  return gulp.src(path.join(STYLE_SRC_PATH, '*.less'))
    .pipe(plumber(function(err) {
      util.log(util.colors.red(err.message));
      this.emit('end');
    }))
    .pipe(isProd
      ? util.noop()
      : sourcemaps.init()
    )
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(base64({
      baseDir: 'src',
      extensions: [/base64\//, /\?base64$/],
      debug: true
    }))
    .pipe(isProd
      ? util.noop()
      : sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(STYLE_BUILT_PATH)))
    .pipe(connect.reload());
});

gulp.task('server', function(){
  connect.server({
    livereload: true,
    port: 9999
  });
});

gulp.task('default', ['script', 'image', 'style']);

gulp.task('watch', ['default', 'server'], function() {
  gulp.watch([path.join(SCRIPT_SRC_PATH, '**/*')], ['script']);
  gulp.watch([path.join(IMAGE_SRC_PATH, '**/*')], ['image']);
  gulp.watch([path.join(STYLE_SRC_PATH, '**/*')], ['style']);
});

function getEntry() {
    var tsPath = path.join(SRC_PATH, SCRIPT);
    var dirs = fs.readdirSync(tsPath);
    var files = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.tsx?$/);
        if (matchs) {
            files.push(path.resolve(tsPath, item));
        }
    });
    return files;
}
