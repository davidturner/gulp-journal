var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    insert = require('gulp-insert'),
    replace = require('gulp-replace'),
    // connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    // svgmin = require('gulp-svgmin'),
    changed = require('gulp-changed'),
    raster = require('gulp-raster'),
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include'),
    gzip = require('gulp-gzip'),
    imageResize = require('gulp-image-resize'),
    favicons = require('favicons');
var app = {
    title: 'Gulp Invited',
    url: 'https://getinvited.to/',
    author: 'Get Invited Ltd',
    version: '0.0.1.[stamp]',
    copyright: '© ' + new Date().getFullYear(),
    build: './build/',
    ship: './ship/'
};
favicons({
    // I/O
    source: app.build + 'portfolio.png',
    dest: app.ship + 'icons',
    // Icon Types
    android: true,
    apple: true,
    coast: true,
    favicons: true,
    firefox: true,
    windows: true,
    // Miscellaneous
    html: null,
    background: '#BD6A6A',
    tileBlackWhite: false,
    manifest: null,
    trueColor: false,
    logging: false,
    callback: null
});
var banner = {
    css: '@charset "UTF-8";\n' + '/*!\n' + ' * ' + app.title + '\n' + ' * ' + app.url + '\n' + ' * @author ' + app.author + '\n' + ' * @version ' + app.version + '\n' + ' * Copyright ' + app.copyright + '\n' + ' * Slate Framework v0.0.2 | MIT License | davidturner.name\n' + ' * normalize.css v2.1.0 | MIT License | git.io/normalize\n' + ' */\n',
    js: '/*!\n' + ' * ' + app.title + '\n' + ' * ' + app.url + '\n' + ' * @author ' + app.author + '\n' + ' * @version ' + app.version + '\n' + ' * Copyright ' + app.copyright + '\n' + ' */\n'
};
gulp.task('svg', function() {
  'use strict';
  gulp.src(app.build + 'img/*.svg')
      .pipe(changed(app.ship + 'img'))
      // .pipe(svgmin())
      .pipe(gulp.dest(app.ship + 'img'));
  gulp.start('svg2png');
});
gulp.task('svg2png', function() {
  'use strict';
  gulp.src(app.build + 'img/*.svg')
      .pipe(changed(app.ship + 'img'))
      .pipe(raster())
      .pipe(rename({
        extname: '.png'
      }))
      .pipe(imagemin())
      .pipe(gulp.dest(app.ship + 'img'));
});
gulp.task('images', function() {
  'use strict';
  gulp.src(app.build + 'img/*.{png,jpg,gif}')
      .pipe(changed(app.ship + 'img'))
      .pipe(imageResize({
        width: 1000
      }))
      .pipe(imagemin())
      .pipe(gulp.dest(app.ship + 'img'));
});
gulp.task('html', function() {
  'use strict';
  gulp.src([app.build + '**/*.html', '!' + app.build + '**/_*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(app.ship));
});
// Lint Task
gulp.task('lint', function() {
  'use strict';
  gulp.src(app.build + 'js/site.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});
// Compile Our Sass
gulp.task('sass', function() {
  'use strict';
  gulp.src(app.build + 'scss/site.live.scss').pipe(sass({
        noCache: true,
        style: 'compressed'
      }))
      .pipe(prefix('last 1 version', '> 1%', 'ie 8', { map: true, to: 'site.live.css' }))
      .pipe(insert.prepend(banner.css))
      .pipe(replace('*/@charset "UTF-8";', '*/\n'))
      .pipe(replace(banner.css + '{', '{'))
      .pipe(replace('[stamp]', new Date().getTime()))
      .pipe(gulp.dest(app.ship + 'css'))
      .pipe(gzip())
      .pipe(gulp.dest(app.ship + 'css'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
  'use strict';
  gulp.src(app.build + 'js/*.js')
      .pipe(concat('site.live.js'))
      .pipe(uglify())
      .pipe(insert.prepend(banner.js))
      .pipe(replace('[stamp]', new Date().getTime()))
      .pipe(gulp.dest(app.ship + 'js/'))
      .pipe(gzip())
      .pipe(gulp.dest(app.ship + 'js/'));
});
// Watch Files For Changes
gulp.task('watch', function() {
  'use strict';
  gulp.watch(app.build + 'js/*.js', ['lint', 'scripts']);
  gulp.watch(app.build + 'scss/**/**/*.scss', ['sass']);
  gulp.watch(app.build + 'img/**/*.svg', ['svg', 'images']);
  gulp.watch(app.build + '*.html', ['html']);
});
// Default Task
gulp.task('default', ['html', 'lint', 'scripts', 'sass', 'svg', 'images', 'watch']);