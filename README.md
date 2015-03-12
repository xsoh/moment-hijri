[![NPM version][npm-version-image]][npm-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]
moment-hijri
==============

A Hijri (Based on Umm al-Qura calculations) calendar system plugin for moment.js.

About
-----

Hijri is the Islamic lunar calendar used by Muslims everywhere to determine the proper days on which to observe the annual fasting, to attend Hajj, and to celebrate other Islamic holidays and festivals [more info at wiki](https://en.wikipedia.org/wiki/Islamic_calendar).

This plugin adds Hijri calendar support to [momentjs](http://momentjs.com) library.

Calendar conversion is based on the [Umm al-Qura calculations](http://www.ummulqura.org.sa/).

Where to use it?
---------------

Like `momentjs`, `moment-hijri` works in browser and in Node.js.

### Node.js

```shell
npm install moment-hijri
```


```js
var moment = require('moment-hijri');
moment().format('hYYYY/hM/hD');
```

### Browser
```html
<script src="moment.js"></script>
<script src="moment-hijri.js"></script>
<script>
	moment().format('hYYYY/hM/hD');
</script>
```

### Require.js

```js
require.config({
  paths: {
    "moment": "path/to/moment",
    "moment-hijri": "path/to/moment-hijri"
  }
});
define(["moment-hijri"], function (moment) {
  moment().format('hYYYY/hM/hD');
});
```

API
---

This plugin tries to mimic `momentjs` api. Basically, when you want to format or parse a string, just add a `h` to the format token like 'hYYYY' or 'hM'. For example:

```js
m = moment('1410/8/28', 'hYYYY/hM/hD'); // Parse a Hijri date.
m.format('hYYYY/hM/hD [is] YYYY/M/D'); // 1410/8/28 is 1990/3/25

m.hYear(); // 1410
m.hMonth(); // 7
m.hDate(); // 28
m.hDayOfYear(); // 236
m.hWeek(); // 35
m.hWeekYear(); // 1410

m.add(1, 'hYear');
m.add(2, 'hMonth');
m.format('hYYYY/hM/hD'); // 1411/10/28

m.hMonth(11);
m.startOf('hMonth');
m.format('hYYYY/hM/hD'); // 1411/12/1

m.hYear(1392);
m.startOf('hYear');
m.format('hYYYY/hM/hD'); // 1420/1/1

moment('1436/1/30', 'hYYYY/hMM/hDD').isValid(); // false (This month is only 29 days).
moment('1436/2/30', 'hYYYY/hMM/hDD').isValid(); // true (This month is 30 days).

moment('1436/2/6 16:40', 'hYYYY/hM/hD HH:mm').format('YYYY-M-D HH:mm:ss'); // 2014-11-28 16:40:00

moment('2014-11-28 16:40:00', 'YYYY-M-D HH:mm:ss').endOf('hMonth').format('hYYYY/hM/hD HH:mm:ss'); // 1436/2/30 23:59:59

// Complex parse:
moment('1990 5 25', 'YYYY hM D').format('YYYY/MM/DD'); // 1990/03/25
```

To display data in Arabic language, load 'ar-sa' locale first:

```html
<script src="locale/ar-sa.js"></script>
```

```js
m = moment('1410/8/28', 'hYYYY/hM/hD');
m.format('hYYYY/hM/hDهـ الموافق YYYY/M/Dم');
// ١٤١٠/٨/٢٨هـ الموافق ١٩٩٠/٣/٢٥م
```

Acknowledgements
-------
This project was built from the great work done by [@behrang](https://github.com/behrang) whose behind [moment-jalaali](https://github.com/jalaali/moment-jalaali) project. 

License
-------

MIT

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/moment-hijri
[npm-version-image]: http://img.shields.io/npm/v/moment-hijri.svg?style=flat

[travis-url]: https://travis-ci.org/xsoh/moment-hijri
[travis-image]: https://travis-ci.org/xsoh/moment-hijri.svg?style=flat