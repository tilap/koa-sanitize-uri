import uriSanitize from 'piggy-sanitize-uri';
export default (options = {}) => {
  // Extract options
  let ignore = [];
  if (options.ignore) {
    if (options.ignore.constructor === String) {
      ignore.push(options.ignore);
    } else {
      ignore = options.ignore;
    }
  }
  const status = options.status || 301;
  const sanitizeOptions = options.sanitize || {};

  // Return middleware
  return async (ctx, next) => {
    let skip = false;

    ignore.forEach((regex) => {
      if (ctx.request.path.match(regex)) {
        skip = true;
      }
    });

    if (!skip) {
      let expectedUrl = uriSanitize(ctx.request.url, sanitizeOptions);
      if (expectedUrl !== ctx.request.url) {
        ctx.status = status;
        return ctx.redirect(expectedUrl);
      }
    }
    return await next();
  };
};
