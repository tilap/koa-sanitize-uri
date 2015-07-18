import uriSanitize from 'piggy-sanitize-uri';

export default function(options={}) {

  // Extract options
  let ignorePaths = [];
  if (options.ignore) {
    if (options.ignore.constructor===String) {
      ignorePaths.push(options.ignore);
    }
    else {
      ignorePaths = options.ignore;
    }
  }
  let status = options.status || 301;

  // Return middleware
  return function* sanitizeUri(next) {
    let skip = false;

    ignorePaths.forEach(path => {
      if (this.request.path.substr(0, path.length)===path) {
        skip=true;
      }
    });

    if (skip) {
      return yield next;
    }

    let expectedUrl = uriSanitize(this.request.url);
    if (expectedUrl!==this.request.url) {
      this.status = status;
      return this.redirect(expectedUrl);
    }

    return yield next;
  };
}
