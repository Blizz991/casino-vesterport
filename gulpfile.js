
/* Define general dependencies */
var gulp = require('gulp');
var requireDir = require('require-dir');

/* Pulling in all tasks from the tasks folder */
requireDir('./gulp/tasks', { recurse: true });

/* access local config */
var config = require('./gulp/config');
var base = config.base;
var browserSync = config.browserSync;
var deploymentName = config.deploymentName;
var tomcatWorkspace = config.tomcatWorkspace;

////                                            ////
//                   REMEMBER:                    //
// change deploymentName to local deployment path //
//                  in config.js                  //
////                                            ////


/* ========= TASKS ========== */

/**
 * Command: gulp watch
 * For live developing
 */
gulp.task('watch', ['sass', 'sass:cms', 'script', 'contenda:watch', 'modules:watch'], function() {
    console.log('Gulp task watch. Watching for changes.');

    // styles
    console.log('\tWatch local styles', base.web.local.sassWatch);
    gulp.watch(base.web.local.sassWatch, ['sass']);

    console.log('\tWatch cms styles', base.web.cms.sassWatch);
    gulp.watch(base.web.cms.sassWatch, ['sass:cms']);

    //scripts
    console.log('\tWatch cms js', base.web.cms.jsWatch, base.web.cms.htmlWatch, base.web.local.jsWatch);
    gulp.watch(base.web.cms.jsWatch, ['script']);
    gulp.watch(base.web.cms.htmlWatch, ['script']);
    gulp.watch(base.web.local.jsWatch, ['script']);
});

gulp.task('test', function() {
    console.log('test', tomcatWorkspace);
});

/**
 * Command: stream
 * For running a BrowserSync
 */
gulp.task('stream', function() {
    console.log('Gulp task stream. Watching for changes.');

    return gulp.src(tomcatWorkspace)
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', ['sass', 'sass:cms', 'script', 'contenda', 'modules'], function() {
    if (!tomcatWorkspace) throw "tomcatWorkspace is not set";
    console.log('Gulp task serve. Watching for changes.');

    browserSync.init({
        proxy: "localhost:8080",
        open: false
    });

    // styles
    console.log('\twatch local styles', base.web.local.sassWatch);
    gulp.watch(base.web.local.sassWatch, ['sass']);

    console.log('\twatch cms styles', base.web.cms.sassWatch);
    gulp.watch(base.web.cms.sassWatch, ['sass:cms']);

    // stream to browsersync
    console.log('\twatch workspace', tomcatWorkspace);
    gulp.watch(tomcatWorkspace, ['stream']);
});

/**
 * Command: gulp
 * For deploying to production
 */
gulp.task('default', ['sass', 'sass:cms', 'script', 'contenda', 'modules']);