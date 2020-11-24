"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _pluginJson = _interopRequireDefault(require("@rollup/plugin-json"));

var _path = _interopRequireDefault(require("path"));

var _rollupPluginPostcss = _interopRequireDefault(require("rollup-plugin-postcss"));

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _rollupPluginSvelte = _interopRequireDefault(require("rollup-plugin-svelte"));

var _rollupPluginTerser = require("rollup-plugin-terser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var purgecss = require("@fullhuman/postcss-purgecss");

var tailwindcss = require("tailwindcss");

var IS_PRODUCTION = process.env.NODE_ENV === "production";
var extensions = [".js", ".svelte"];
var _default = {
  input: "src/App.svelte",
  output: {
    dir: "build",
    format: "cjs"
  },
  watch: {
    include: "src/**"
  },
  plugins: [resolveRootImports({
    root: "src",
    extensions: extensions
  }), (0, _rollupPluginPostcss["default"])({
    plugins: [require("postcss-import"), tailwindcss("./tailwind.config.js"), require("autoprefixer"), purgecss({
      content: ["./**/*.html", "./**/*.js", "./**/*.svelte"]
    })]
  }), (0, _rollupPluginCommonjs["default"])({
    // non-CommonJS modules will be ignored, but you can also
    // specifically include/exclude files
    include: 'node_modules/**',
    // Default: undefined
    exclude: ['node_modules/foo/**', 'node_modules/bar/**'],
    // Default: undefined
    // these values can also be regular expressions
    // include: /node_modules/
    // search for files other than .js files (must already
    // be transpiled by a previous plugin!)
    extensions: ['.js', '.coffee'],
    // Default: [ '.js' ]
    // if true then uses of `global` won't be dealt with by this plugin
    ignoreGlobal: false,
    // Default: false
    // if false then skip sourceMap generation for CommonJS modules
    sourceMap: false,
    // Default: true
    // explicitly specify unresolvable named exports
    // (see below for more details)
    namedExports: {
      'react': ['createElement', 'Component']
    },
    // Default: undefined
    // sometimes you have to leave require statements
    // unconverted. Pass an array containing the IDs
    // or a `id => boolean` function. Only use this
    // option if you know what you're doing!
    ignore: ['conditional-runtime-dependency']
  }), (0, _pluginJson["default"])(), (0, _rollupPluginSvelte["default"])({
    dev: !IS_PRODUCTION,
    include: "src/**/*.svelte"
  }), (0, _pluginNodeResolve["default"])({
    extensions: extensions
  }), IS_PRODUCTION && (0, _rollupPluginTerser.terser)()]
};
exports["default"] = _default;

function resolveRootImports(_ref) {
  var root = _ref.root,
      extensions = _ref.extensions;
  return {
    resolveId: function resolveId(importee) {
      if (importee[0] === "/") {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ext = _step.value;
            var rootPath = "".concat(root).concat(importee).concat(ext);

            var fullPath = _path["default"].resolve(__dirname, rootPath);

            if (_fs["default"].existsSync(fullPath)) return fullPath;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return null;
    }
  };
}