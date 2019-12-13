const { src, dest, watch, parallel, series } = require("gulp");
const fileInclude = require("gulp-file-include");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const atImport = require("postcss-import");
const cssnano = require("cssnano");
const prettier = require("gulp-prettier");
const del = require("del");
const browserSync = require("browser-sync").create();

function devHTML() {
  return src("src/pages/**/*.html")
    .pipe(
      fileInclude({
        basepath: "src/components/",
        prefix: "{{",
        suffix: "}}",
        context: {
          URL: ""
        }
      })
    )
    .pipe(dest("dist"));
}

function devCSS() {
  const plugins = [atImport(), cssnext()];
  return src("assets/css/*.css")
    .pipe(postcss(plugins))
    .pipe(dest("dist/assets/css"));
}

function clean() {
  return del('build');
}

function prodHTML() {
  return src("src/pages/**/*.html")
    .pipe(
      fileInclude({
        basepath: "src/components/",
        prefix: "{{",
        suffix: "}}",
        context: {
          URL: ""
        }
      })
    )
    .pipe(dest("build"));
}

function validate() {
  return src("build/**/*.html")
    .pipe(prettier({
      printWidth: 600,
    }))
    .pipe(dest("build"));
}

function copy() {
  return src('assets/!(css)**/**/*').pipe(dest("build/assets"));
}

function prodCSS() {
  const plugins = [atImport(), cssnext(), cssnano()];
  return src("assets/css/*.css")
    .pipe(postcss(plugins))
    .pipe(dest("build/assets/css"));
}

function watches() {
  watch("src/**/*.html", { delay: 500 }, series(html, browserReload));
  watch("assets/css/**/*.css", { delay: 500 }, series(css, browserReload));
  watch("assets/js/*.js", { delay: 500 }, browserReload);
}

function browserReload(cb) {
  browserSync.reload();
  cb();
}

function server() {
  browserSync.init({
    server: {
      baseDir: "/",
      routes: {
        "/": "dist",
        "/assets/fonts": "assets/fonts",
        "/assets/js": "assets/js",
        "/assets/img": "assets/img",
        "/assets/vendors": "assets/vendors"
      }
    }
  });
}

exports.default = series(devHTML, devCSS, parallel(watches, server));
exports.build = series(clean, prodHTML, prodCSS, validate, copy);
