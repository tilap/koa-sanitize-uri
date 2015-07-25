import uriSanitize from 'piggy-sanitize-uri';

export default function(options={}) {

  // Extract options
  let ignore = [];
  if (options.ignore) {
    if (options.ignore.constructor===String) {
      ignore.push(options.ignore);
    }
    else {
      ignore = options.ignore;
    }
  }
  let status = options.status || 301;

  let sanitizeOptions = options.sanitize || {};

  // Return middleware
  return function* sanitizeUri(next) {
    let skip = false;

    ignore.forEach(regex => {
      if (this.request.path.match(regex)) {
        skip=true;
      }
    });

    if (skip) {
      return yield next;
    }

    let expectedUrl = uriSanitize(this.request.url, sanitizeOptions);
    if (expectedUrl!==this.request.url) {
      this.status = status;
      return this.redirect(expectedUrl);
    }

    return yield next;
  };
}
