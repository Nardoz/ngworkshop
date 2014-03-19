var gulp        = require('gulp'),
    karma       = require('gulp-karma'),
    refresh     = require('gulp-livereload'),
    server      = require('tiny-lr')(),
    connect     = require('connect'),
    rewrite     = require('connect-modrewrite'),
    http        = require('http'),
    path        = require('path');

gulp.task('server', function () {
    var port        = 3000,
        hostname    = null,
        base        = path.resolve('src'),
        directory   = path.resolve('src');

    var routes = [
            '^/[^\.]*$ /index.html'
    ];

    var app = connect()
                .use(rewrite(routes))
                .use(connect.static(base, { hidden: true }))
                .use(connect.directory(directory));

    http.createServer(app).listen(port, hostname);
});

gulp.task('livereload', function() {
    server.listen(35729, function (error) {
        console.log(error || 'Livereload server started');
    });
});

gulp.task('test', function () {
    var files = [
        'src/vendor/angular/angular.js',
        'src/vendor/angular-mocks/angular-mocks.js',
        'src/app/**/*.js'
    ];

    return gulp.src(files).pipe(karma({ configFile: 'karma.conf.js', action: 'watch' }));
});

gulp.task('build', function () {
    gulp.src('src')
        .pipe(refresh(server));
});

gulp.task('watch', function () {
    gulp.watch(['src/*.html', 'src/**/*.js'], ['build']);
});

gulp.task('default', ['livereload', 'server', 'watch', 'test']);
