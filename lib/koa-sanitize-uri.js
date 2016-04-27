'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _piggySanitizeUri = require('piggy-sanitize-uri');

var _piggySanitizeUri2 = _interopRequireDefault(_piggySanitizeUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
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
  return function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var skip, expectedUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              skip = false;


              ignore.forEach(function (regex) {
                if (ctx.request.path.match(regex)) {
                  skip = true;
                }
              });

              if (skip) {
                _context.next = 7;
                break;
              }

              expectedUrl = (0, _piggySanitizeUri2.default)(ctx.request.url, sanitizeOptions);

              if (!(expectedUrl !== ctx.request.url)) {
                _context.next = 7;
                break;
              }

              ctx.status = status;
              return _context.abrupt('return', ctx.redirect(expectedUrl));

            case 7:
              _context.next = 9;
              return next();

            case 9:
              return _context.abrupt('return', _context.sent);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x2, _x3) {
      return ref.apply(this, arguments);
    };
  }();
};