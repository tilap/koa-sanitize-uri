koa-sanitize-uri [![NPM version][npm-image]][npm-url] [![Build Status][build-status-image]][build-status-url]
============================

## Purpose

koa-sanitize-uri is a **KOA middleware to sanitize request uri**.

Request URI are checked. If they have a bad format, the middleware throw a redirect to the good uri with a 301 status (by default).

It's basically a good practice to keep consistant with URI and have only one URI per page content. It's aim is to avoid duplicate content (same content on 2 URI).

## Usage

```js
import koa from 'koa';
import koaSanitizeUri from 'koa-sanitize-uri';

let app= koa();

app.use(sanitizeUri());

// ...

app.listen(1337);

```

## Options

### Ignore paths

You can give the middleware an option to ignore some paths.

Example with one path:

```js
app.use(sanitizeUri({ignore: '/assets'}));

```

Example with multi paths:

```js
app.use(sanitizeUri({ignore: ['/assets', '/other/folder/']}));
```

### Custom redirection status

```js
app.use(sanitizeUri({status: 301}));
```

## Developer

Installing dev dependencies, you can edit the package source. Then run:
- ```npm run dev-compile``` for babel transpilation
- ```npm run dev-check``` for jshint check


[npm-image]: https://img.shields.io/npm/v/koa-sanitize-uri.svg?style=flat
[npm-url]: https://npmjs.org/package/koa-sanitize-uri
