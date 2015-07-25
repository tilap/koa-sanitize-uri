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
  var ignore = [];
  if (options.ignore) {
    if (options.ignore.constructor === String) {
      ignore.push(options.ignore);
    } else {
      ignore = options.ignore;
    }
  }
  var status = options.status || 301;

  var sanitizeOptions = options.sanitize || {};

  // Return middleware
  return function* sanitizeUri(next) {
    var _this = this;

    var skip = false;

    ignore.forEach(function (regex) {
      if (_this.request.path.match(regex)) {
        skip = true;
      }
    });

    if (skip) {
      return yield next;
    }

    var expectedUrl = (0, _piggySanitizeUri2['default'])(this.request.url, sanitizeOptions);
    if (expectedUrl !== this.request.url) {
      this.status = status;
      return this.redirect(expectedUrl);
    }

    return yield next;
  };
};

module.exports = exports['default'];