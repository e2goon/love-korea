const { src, dest, watch, parallel, series } = require("gulp");
const fileInclude = require("gulp-file-include");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const browserSync = require("browser-sync").create();

function html() {
  return src("src/pages/**/*.html")
    .pipe(
      fileInclude({
        basepath: "src/components/",
        prefix: "{{",
        suffix: "}}",
        context: {
          URL: ''
        }
      })
    )
    .pipe(dest("dist"));
}

function css() {
  const plugins = [
    cssnext()
  ];
  return src("assets/css/*.css")
    .pipe(postcss(plugins))
    .pipe(dest('dist/assets/css'))
}

function watches() {
  watch("src/**/*.html", { delay: 500 }, series(html, browserReload));
  watch("assets/css/**/*.css", { delay: 500 }, series(css, browserReload));
}

function browserReload(cb) {
  browserSync.reload();
  cb();
}

function server() {
  browserSync.init({
    server: "dist"
  });
}

exports.default = series(html, css, parallel(watches, server));
