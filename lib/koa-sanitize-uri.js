'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _piggySanitizeUri = require('piggy-sanitize-uri');

var _piggySanitizeUri2 = _interopRequireDefault(_piggySanitizeUri);

exports['default'] = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  // Extract options
  var ignorePaths = [];
  if (options.ignore) {
    if (options.ignore.constructor === String) {
      ignorePaths.push(options.ignore);
    } else {
      ignorePaths = options.ignore;
    }
  }
  var status = options.status || 301;

  // Return middleware
  return function* sanitizeUri(next) {
    var _this = this;

    var skip = false;

    ignorePaths.forEach(function (path) {
      if (_this.request.path.substr(0, path.length) === path) {
        skip = true;
      }
    });

    if (skip) {
      return yield next;
    }

    var expectedUrl = (0, _piggySanitizeUri2['default'])(this.request.url);
    if (expectedUrl !== this.request.url) {
      this.status = status;
      return this.redirect(expectedUrl);
    }

    return yield next;
  };
};

module.exports = exports['default'];