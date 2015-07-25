koa-sanitize-uri [![NPM version][npm-image]][npm-url]
============================

## Purpose

koa-sanitize-uri is a **KOA middleware to sanitize request uri**.

Request URI are checked. If they have a bad format, the middleware throw a redirect to the good uri with a 301 status (by default).

It's basically a good practice to keep consistant with URI and have only one URI per page content. It's aim is to avoid duplicate content (same content on 2 URI).

Read the [CHANGELOG](https://github.com/tilap/koa-sanitize-uri/blob/master/CHANGELOG.md)

## Usage

```js
import koa from 'koa';
import koaSanitizeUri from 'koa-sanitize-uri';

let app= koa();

app.use(koaSanitizeUri());

// ...

app.listen(1337);

```

## Options

All options at once:

```js
app.use(koaSanitizeUri({
  sanitize: {
    simpleChars : true,
    endingslash : false,
    doubleshash : true,
    lowercase : true,
  },
  code: 301,
  ignore: [/assets\/.*/, /.*\.(css|js|jpg|png)$/i]
}));
```

### Ignore paths

You can give the middleware an option to ignore file or paths matching regex.

Example with one regex:

```js
app.use(koaSanitizeUri({ignore: /\/assets/}));

```

Example with multi regex:

```js
app.use(koaSanitizeUri({ignore: [/assets\/.*/, /.*\.(css|js|jpg|png)$/i]}));
```

### Custom redirection status

```js
app.use(koaSanitizeUri({status: 301}));
```

### Sanitize options

You can pass all the [sanitizer options](https://github.com/tilap/piggy-sanitize-uri#options) with the key sanitize`


## Developer

Installing dev dependencies, you can edit the package source. Then run:
- ```npm run dev-compile``` for babel transpilation
- ```npm run dev-check``` for jshint check


[npm-image]: https://img.shields.io/npm/v/koa-sanitize-uri.svg?style=flat
[npm-url]: https://npmjs.org/package/koa-sanitize-uri
