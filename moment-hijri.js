// moment-hijri.js
// author: Suhail Alkowaileet
// This is a modified version of moment-jalaali by Behrang Noruzi Niya
// license: MIT
/* jshint esversion: 6 */
'use strict';

/************************************
    Expose Moment Hijri
************************************/
(function (root, factory) {
	/* global define */
	if (typeof define === 'function' && define.amd) {
		define(['moment'], function (moment) {
			root.moment = factory(moment)
			return root.moment
		})
	} else if (typeof exports === 'object') {
		module.exports = factory(require('moment/moment'))
	} else {
		root.moment = factory(root.moment)
	}
})(this, function (moment) { // jshint ignore:line

	if (moment == null) {
		throw new Error('Cannot find moment')
	}

	/************************************
      Constants
  ************************************/

	var ummalqura = {
		ummalquraData : (function (){
			let ummalquraDatByMonth = [
					/* 1356= */29, 29, 30, 29, 30, 29, 30, 30, 29, 29, 30, 29,
					/* 1357= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1358= */30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29,
					/* 1359= */30, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 29,
					/* 1360= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1361= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1362= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1363= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1364= */30, 29, 30, 29, 30, 29, 30, 28, 30, 30, 30, 29,
					/* 1365= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1366= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1367= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1368= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1369= */30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29,
					/* 1370= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1371= */30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30,
					/* 1372= */29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 30,
					/* 1373= */29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1374= */30, 29, 30, 29, 30, 29, 30, 30, 29, 29, 30, 30,
					/* 1375= */30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 30, 29,
					/* 1376= */29, 30, 29, 29, 30, 30, 30, 29, 30, 29, 30, 29,
					/* 1377= */30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30,
					/* 1378= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1379= */29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1380= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1381= */30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1382= */30, 29, 30, 30, 29, 30, 30, 29, 29, 30, 29, 30,
					/* 1383= */29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1384= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1385= */30, 29, 30, 30, 29, 29, 30, 29, 30, 30, 30, 29,
					/* 1386= */30, 30, 29, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1387= */29, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1388= */29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1389= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1390= */30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 29,
					/* 1391= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1392= */29, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1393= */30, 29, 30, 29, 29, 29, 30, 29, 30, 29, 30, 30,
					/* 1394= */30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 30, 29,
					/* 1395= */30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1396= */30, 29, 30, 30, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1397= */29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1398= */30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30,
					/* 1399= */29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29,
					/* 1400= */30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30,
					/* 1401= */29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1402= */30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1403= */29, 30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29,
					/* 1404= */29, 30, 30, 29, 30, 30, 30, 29, 30, 29, 29, 30,
					/* 1405= */29, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29,
					/* 1406= */30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30,
					/* 1407= */29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1408= */30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1409= */30, 29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29,
					/* 1410= */30, 29, 30, 30, 30, 29, 30, 29, 30, 29, 29, 30,
					/* 1411= */29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 29,
					/* 1412= */30, 29, 29, 30, 30, 29, 30, 30, 30, 29, 30, 29,
					/* 1413= */29, 30, 29, 29, 30, 30, 29, 30, 30, 29, 30, 30,
					/* 1414= */29, 29, 30, 29, 29, 30, 29, 30, 30, 30, 29, 30,
					/* 1415= */29, 30, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30,
					/* 1416= */30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1417= */30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 29,
					/* 1418= */30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30, 29,
					/* 1419= */29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30,
					/* 1420= */29, 30, 29, 29, 30, 29, 30, 30, 30, 30, 29, 30,
					/* 1421= */29, 29, 30, 29, 29, 29, 30, 30, 30, 30, 29, 30,
					/* 1422= */30, 29, 29, 30, 29, 29, 29, 30, 30, 30, 29, 30,
					/* 1423= */30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30,
					/* 1424= */30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1425= */30, 29, 30, 30, 29, 30, 29, 30, 30, 29, 30, 29,
					/* 1426= */29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30,
					/* 1427= */29, 29, 30, 29, 29, 30, 30, 30, 29, 30, 30, 29,
					/* 1428= */30, 29, 29, 30, 29, 29, 30, 30, 30, 29, 30, 30,
					/* 1429= */29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30,
					/* 1430= */29, 30, 30, 29, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1431= */29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30,
					/* 1432= */29, 30, 30, 30, 29, 30, 29, 30, 29, 30, 29, 29,
					/* 1433= */30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29,
					/* 1434= */29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 29,
					/* 1435= */30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30,
					/* 1436= */29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1437= */30, 29, 30, 30, 29, 29, 30, 29, 30, 29, 29, 30,
					/* 1438= */30, 29, 30, 30, 30, 29, 29, 30, 29, 29, 30, 29,
					/* 1439= */30, 29, 30, 30, 30, 29, 30, 29, 30, 29, 29, 30,
					/* 1440= */29, 30, 29, 30, 30, 30, 29, 30, 29, 30, 29, 29,
					/* 1441= */30, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29,
					/* 1442= */29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29,
					/* 1443= */30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1444= */29, 30, 29, 30, 30, 29, 29, 30, 29, 30, 29, 30,
					/* 1445= */29, 30, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30,
					/* 1446= */29, 30, 30, 30, 29, 30, 30, 29, 29, 30, 29, 29,
					/* 1447= */30, 29, 30, 30, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1448= */29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30,
					/* 1449= */29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29,
					/* 1450= */30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29,
					/* 1451= */30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 29,
					/* 1452= */30, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30,
					/* 1453= */29, 30, 30, 30, 29, 29, 30, 29, 30, 29, 30, 29,
					/* 1454= */29, 30, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1455= */29, 29, 30, 30, 29, 30, 29, 30, 30, 29, 30, 29,
					/* 1456= */30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29, 30,
					/* 1457= */29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30, 30,
					/* 1458= */30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29, 30,
					/* 1459= */30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 29,
					/* 1460= */30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 30,
					/* 1461= */29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29,
					/* 1462= */30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30,
					/* 1463= */29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29,
					/* 1464= */30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30,
					/* 1465= */29, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 30,
					/* 1466= */30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30,
					/* 1467= */30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1468= */30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1469= */29, 29, 30, 30, 29, 30, 30, 29, 30, 30, 29, 29,
					/* 1470= */30, 29, 29, 30, 30, 29, 30, 29, 30, 30, 30, 29,
					/* 1471= */29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29,
					/* 1472= */30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 30, 29,
					/* 1473= */30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1474= */30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1475= */29, 30, 29, 30, 30, 30, 29, 30, 29, 29, 30, 29,
					/* 1476= */29, 30, 29, 30, 30, 30, 29, 30, 30, 29, 29, 30,
					/* 1477= */29, 29, 30, 29, 30, 30, 29, 30, 30, 30, 29, 29,
					/* 1478= */30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30,
					/* 1479= */29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30,
					/* 1480= */29, 30, 30, 29, 29, 30, 29, 30, 29, 30, 29, 30,
					/* 1481= */29, 30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29,
					/* 1482= */30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 29, 30,
					/* 1483= */29, 29, 30, 30, 29, 30, 30, 30, 29, 30, 29, 29,
					/* 1484= */30, 29, 29, 30, 30, 29, 30, 30, 29, 30, 30, 29,
					/* 1485= */29, 30, 29, 29, 30, 30, 29, 30, 29, 30, 30, 30,
					/* 1486= */29, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30,
					/* 1487= */29, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 30,
					/* 1488= */29, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1489= */29, 30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29,
					/* 1490= */30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 29, 30,
					/* 1491= */29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 30,
					/* 1492= */29, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30,
					/* 1493= */30, 29, 29, 30, 29, 30, 29, 29, 30, 30, 29, 30,
					/* 1494= */30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 29, 30,
					/* 1495= */30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29,
					/* 1496= */30, 30, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30,
					/* 1497= */29, 30, 30, 29, 30, 30, 29, 29, 30, 29, 30, 29,
					/* 1498= */30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30,
					/* 1499= */29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29,
					/* 1500= */30, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 30 ];
			let sum = 28607;
			const dat = [sum];
			ummalquraDatByMonth.forEach((value) => {
				sum += value;
				dat.push(sum);
			});
			return dat;
		})()
	}

	var formattingTokens = /(\[[^\[]*\])|(\\)?i(Mo|MM?M?M?|Do|DDDo|DD?D?D?|w[o|w]?|YYYYY|YYYY|YY|gg(ggg?)?)|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
		localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g

	, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{1,4}/, parseTokenSixDigits = /[+\-]?\d{1,6}/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.?)|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/

	, unitAliases = {
		hd: 'idate',
		hm: 'imonth',
		hy: 'iyear'
	}

	, formatFunctions = {}

	, ordinalizeTokens = 'DDD w M D'.split(' '), paddedTokens = 'M D w'.split(' ')

	, formatTokenFunctions = {
		iM: function () {
			return this.iMonth() + 1
		},
		iMMM: function (format) {
			return this.localeData().iMonthsShort(this, format)
		},
		iMMMM: function (format) {
			return this.localeData().iMonths(this, format)
		},
		iD: function () {
			return this.iDate()
		},
		iDDD: function () {
			return this.iDayOfYear()
		},
		iw: function () {
			return this.iWeek()
		},
		iYY: function () {
			return leftZeroFill(this.iYear() % 100, 2)
		},
		iYYYY: function () {
			return leftZeroFill(this.iYear(), 4)
		},
		iYYYYY: function () {
			return leftZeroFill(this.iYear(), 5)
		},
		igg: function () {
			return leftZeroFill(this.iWeekYear() % 100, 2)
		},
		igggg: function () {
			return this.iWeekYear()
		},
		iggggg: function () {
			return leftZeroFill(this.iWeekYear(), 5)
		}
	}, i

	function padToken(func, count) {
		return function (a) {
			return leftZeroFill(func.call(this, a), count)
		}
	}

	function ordinalizeToken(func, period) {
		return function (a) {
			return this.localeData().ordinal(func.call(this, a), period)
		}
	}

	while (ordinalizeTokens.length) {
		i = ordinalizeTokens.pop()
		formatTokenFunctions['i' + i + 'o'] = ordinalizeToken(formatTokenFunctions['i' + i], i)
	}
	while (paddedTokens.length) {
		i = paddedTokens.pop()
		formatTokenFunctions['i' + i + i] = padToken(formatTokenFunctions['i' + i], 2)
	}
	formatTokenFunctions.iDDDD = padToken(formatTokenFunctions.iDDD, 3)

	/************************************
      Helpers
  ************************************/

	function extend(a, b) {
		var key
		for (key in b)
			if (b.hasOwnProperty(key))
				a[key] = b[key]
		return a
	}

	function leftZeroFill(number, targetLength) {
		var output = number + ''
		while (output.length < targetLength)
			output = '0' + output
		return output
	}

	function isArray(input) {
		return Object.prototype.toString.call(input) === '[object Array]'
	}

	function normalizeUnits(units) {
		return units ? unitAliases[units] || units.toLowerCase().replace(/(.)s$/, '$1') : units
	}

	function setDate(moment, year, month, date) {
		var utc = moment._isUTC ? 'UTC' : ''
		moment._d['set' + utc + 'FullYear'](year)
		moment._d['set' + utc + 'Month'](month)
		moment._d['set' + utc + 'Date'](date)
	}

	function objectCreate(parent) {
		function F() {}
		F.prototype = parent
		return new F()
	}

	function getPrototypeOf(object) {
		if (Object.getPrototypeOf)
			return Object.getPrototypeOf(object)
		else if (''.__proto__) // jshint ignore:line
			return object.__proto__ // jshint ignore:line
		else
			return object.constructor.prototype
	}

	/************************************
      Languages
  ************************************/
	extend(getPrototypeOf(moment.localeData()), {
		_iMonths: ['Muharram'
                , 'Safar'
                , 'Rabi\' al-Awwal'
                , 'Rabi\' al-Thani'
                , 'Jumada al-Ula'
                , 'Jumada al-Alkhirah'
                , 'Rajab'
                , 'Sha’ban'
                , 'Ramadhan'
                , 'Shawwal'
                , 'Thul-Qi’dah'
                , 'Thul-Hijjah'
                ],
		iMonths: function (m) {
			return this._iMonths[m.iMonth()]
		}

		,
		_iMonthsShort: ['Muh'
                      , 'Saf'
                      , 'Rab-I'
                      , 'Rab-II'
                      , 'Jum-I'
                      , 'Jum-II'
                      , 'Raj'
                      , 'Sha'
                      , 'Ram'
                      , 'Shw'
                      , 'Dhu-Q'
                      , 'Dhu-H'
                      ],
		iMonthsShort: function (m) {
			return this._iMonthsShort[m.iMonth()]
		}

		,
		iMonthsParse: function (monthName) {
			var i, mom, regex
			if (!this._iMonthsParse)
				this._iMonthsParse = []
			for (i = 0; i < 12; i += 1) {
				// Make the regex if we don't have it already.
				if (!this._iMonthsParse[i]) {
					mom = hMoment([2000, (2 + i) % 12, 25])
					regex = '^' + this.iMonths(mom, '') + '$|^' + this.iMonthsShort(mom, '') + '$'
					this._iMonthsParse[i] = new RegExp(regex.replace('.', ''), 'i')
				}
				// Test the regex.
				if (this._iMonthsParse[i].test(monthName))
					return i
			}
		}
	});
	var iMonthNames = {
		iMonths: 'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأولى_جمادى الآخرة_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_'),
		iMonthsShort: 'محرم_صفر_ربيع ١_ربيع ٢_جمادى ١_جمادى ٢_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_')
	};

	// Default to the momentjs 2.12+ API
	if (typeof moment.updateLocale === 'function') {
		moment.updateLocale('ar-sa', iMonthNames);
	} else {
		var oldLocale = moment.locale();
		moment.defineLocale('ar-sa', iMonthNames);
		moment.locale(oldLocale);
	}

	/************************************
      Formatting
  ************************************/

	function makeFormatFunction(format) {
		var array = format.match(formattingTokens),
			length = array.length,
			i

		for (i = 0; i < length; i += 1)
			if (formatTokenFunctions[array[i]])
				array[i] = formatTokenFunctions[array[i]]

		return function (mom) {
			var output = ''
			for (i = 0; i < length; i += 1)
				output += array[i] instanceof Function ? '[' + array[i].call(mom, format) + ']' : array[i]
			return output
		}
	}

	/************************************
      Parsing
  ************************************/

	function getParseRegexForToken(token, config) {
		switch (token) {
		case 'iDDDD':
			return parseTokenThreeDigits
		case 'iYYYY':
			return parseTokenFourDigits
		case 'iYYYYY':
			return parseTokenSixDigits
		case 'iDDD':
			return parseTokenOneToThreeDigits
		case 'iMMM':
		case 'iMMMM':
			return parseTokenWord
		case 'iMM':
		case 'iDD':
		case 'iYY':
		case 'iM':
		case 'iD':
			return parseTokenOneOrTwoDigits
		case 'DDDD':
			return parseTokenThreeDigits
		case 'YYYY':
			return parseTokenFourDigits
		case 'YYYYY':
			return parseTokenSixDigits
		case 'S':
		case 'SS':
		case 'SSS':
		case 'DDD':
			return parseTokenOneToThreeDigits
		case 'MMM':
		case 'MMMM':
		case 'dd':
		case 'ddd':
		case 'dddd':
			return parseTokenWord
		case 'a':
		case 'A':
			return moment.localeData(config._l)._meridiemParse
		case 'X':
			return parseTokenTimestampMs
		case 'Z':
		case 'ZZ':
			return parseTokenTimezone
		case 'T':
			return parseTokenT
		case 'MM':
		case 'DD':
		case 'YY':
		case 'HH':
		case 'hh':
		case 'mm':
		case 'ss':
		case 'M':
		case 'D':
		case 'd':
		case 'H':
		case 'h':
		case 'm':
		case 's':
			return parseTokenOneOrTwoDigits
		default:
			return new RegExp(token.replace('\\', ''))
		}
	}

	function addTimeToArrayFromToken(token, input, config) {
		var a, datePartArray = config._a

		switch (token) {
		case 'iM':
		case 'iMM':
			datePartArray[1] = input == null ? 0 : ~~input - 1
			break
		case 'iMMM':
		case 'iMMMM':
			a = moment.localeData(config._l).iMonthsParse(input)
			if (a != null)
				datePartArray[1] = a
			else
				config._isValid = false
			break
		case 'iD':
		case 'iDD':
		case 'iDDD':
		case 'iDDDD':
			if (input != null)
				datePartArray[2] = ~~input
			break
		case 'iYY':
			datePartArray[0] = ~~input + (~~input > 47 ? 1300 : 1400)
			break
		case 'iYYYY':
		case 'iYYYYY':
			datePartArray[0] = ~~input
		}
		if (input == null)
			config._isValid = false
	}

	function dateFromArray(config) {
		var g, h, hy = config._a[0],
			hm = config._a[1],
			hd = config._a[2]

		if ((hy == null) && (hm == null) && (hd == null))
			return [0, 0, 1]
		hy = hy || 0
		hm = hm || 0
		hd = hd || 1
		if (hd < 1 || hd > hMoment.iDaysInMonth(hy, hm))
			config._isValid = false
		g = toGregorian(hy, hm, hd)
		h = toHijri(g.gy, g.gm, g.gd)
		config._hDiff = 0
		if (~~h.hy !== hy)
			config._hDiff += 1
		if (~~h.hm !== hm)
			config._hDiff += 1
		if (~~h.hd !== hd)
			config._hDiff += 1
		return [g.gy, g.gm, g.gd]
	}

	function makeDateFromStringAndFormat(config) {
		var tokens = config._f.match(formattingTokens),
			string = config._i,
			len = tokens.length,
			i, token, parsedInput

		config._a = []

		for (i = 0; i < len; i += 1) {
			token = tokens[i]
			parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0];
			if (parsedInput)
				string = string.slice(string.indexOf(parsedInput) + parsedInput.length)
			if (formatTokenFunctions[token])
				addTimeToArrayFromToken(token, parsedInput, config)
		}
		if (string)
			config._il = string

		return dateFromArray(config)
	}

	function makeDateFromStringAndArray(config, utc) {
		var len = config._f.length
		, i
		, format
		, tempMoment
		, bestMoment
		, currentScore
		, scoreToBeat

		if (len === 0) {
			return makeMoment(new Date(NaN))
		}

		for (i = 0; i < len; i += 1) {
			format = config._f[i]
			currentScore = 0
			tempMoment = makeMoment(config._i, format, config._l, utc)

			if (!tempMoment.isValid()) continue

			currentScore += tempMoment._hDiff
			if (tempMoment._il)
				currentScore += tempMoment._il.length
			if (scoreToBeat == null || currentScore < scoreToBeat) {
				scoreToBeat = currentScore
				bestMoment = tempMoment
			}
		}

		return bestMoment
	}

	function removeParsedTokens(config) {
		var string = config._i,
			input = '',
			format = '',
			array = config._f.match(formattingTokens),
			len = array.length,
			i, match, parsed

		for (i = 0; i < len; i += 1) {
			match = array[i]
			parsed = (getParseRegexForToken(match, config).exec(string) || [])[0]
			if (parsed)
				string = string.slice(string.indexOf(parsed) + parsed.length)
			if (!(formatTokenFunctions[match] instanceof Function)) {
				format += match
				if (parsed)
					input += parsed
			}
		}
		config._i = input
		config._f = format
	}

	/************************************
      Week of Year
  ************************************/

	function iWeekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
		var end = firstDayOfWeekOfYear - firstDayOfWeek,
			daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
			adjustedMoment

		if (daysToDayOfWeek > end) {
			daysToDayOfWeek -= 7
		}
		if (daysToDayOfWeek < end - 7) {
			daysToDayOfWeek += 7
		}
		adjustedMoment = hMoment(mom).add(daysToDayOfWeek, 'd')
		return {
			week: Math.ceil(adjustedMoment.iDayOfYear() / 7),
			year: adjustedMoment.iYear()
		}
	}

	/************************************
      Top Level Functions
  ************************************/

	function makeMoment(input, format, lang, utc) {
		var config =
			{ _i: input
			, _f: format
			, _l: lang
			}
			, date
			, m
			, hm
		if (format) {
			if (isArray(format)) {
				return makeDateFromStringAndArray(config, utc)
			} else {
				date = makeDateFromStringAndFormat(config)
				removeParsedTokens(config)
				format = 'YYYY-MM-DD-' + config._f
				input = leftZeroFill(date[0], 4) + '-'
					+ leftZeroFill(date[1] + 1, 2) + '-'
					+ leftZeroFill(date[2], 2) + '-'
					+ config._i
			}
		}
		if (utc)
			m = moment.utc(input, format, lang)
		else
			m = moment(input, format, lang)
		if (config._isValid === false)
			m._isValid = false
		m._hDiff = config._hDiff || 0
		hm = objectCreate(hMoment.fn)
		extend(hm, m)
		return hm
	}

	function hMoment(input, format, lang) {
		return makeMoment(input, format, lang, false)
	}

	extend(hMoment, moment)
	hMoment.fn = objectCreate(moment.fn)

	hMoment.utc = function (input, format, lang) {
		return makeMoment(input, format, lang, true)
	}

	/************************************
      hMoment Prototype
  ************************************/

	hMoment.fn.format = function (format) {
		var i, replace, me = this

		if (format) {
			i = 5
			replace = function (input) {
				return me.localeData().longDateFormat(input) || input
			}
			while (i > 0 && localFormattingTokens.test(format)) {
				i -= 1
				format = format.replace(localFormattingTokens, replace)
			}
			if (!formatFunctions[format]) {
				formatFunctions[format] = makeFormatFunction(format)
			}
			format = formatFunctions[format](this)
		}
		return moment.fn.format.call(this, format)
	}

	hMoment.fn.iYear = function (input) {
		var lastDay, h, g
		if (typeof input === 'number') {
			h = toHijri(this.year(), this.month(), this.date())
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(input, h.hm))
			g = toGregorian(input, h.hm, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hy
		}
	}

	hMoment.fn.iMonth = function (input) {
		var lastDay, h, g
		if (input != null) {
			if (typeof input === 'string') {
				input = this.localeData().iMonthsParse(input)
				if(input >= 0) {
					input -= 1
				} else {
					return this
				}
			}
			h = toHijri(this.year(), this.month(), this.date())
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(h.hy, input))
			this.iYear(h.hy + div(input, 12))
			input = mod(input, 12)
			if (input < 0) {
				input += 12
				this.iYear(this.iYear() - 1)
			}
			g = toGregorian(this.iYear(), input, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hm
		}
	}

	hMoment.fn.iDate = function (input) {
		var h, g
		if (typeof input === 'number') {
			h = toHijri(this.year(), this.month(), this.date())
			g = toGregorian(h.hy, h.hm, input)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hd
		}
	}

	hMoment.fn.iDayOfYear = function (input) {
		var dayOfYear = Math.round((hMoment(this).startOf('day') - hMoment(this).startOf('iYear')) / 864e5) + 1
		return input == null ? dayOfYear : this.add(input - dayOfYear, 'd')
	}

	hMoment.fn.iDaysInMonth = function () {
		return parseInt(hMoment(this).endOf('iMonth').format('iDD'));
	}

	hMoment.fn.iWeek = function (input) {
		var week = iWeekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).week
		return input == null ? week : this.add( (input - week) * 7, 'd')
	}

	hMoment.fn.iWeekYear = function (input) {
		var year = iWeekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year
		return input == null ? year : this.add(input - year, 'y')
	}

	hMoment.fn.add = function (val, units) {
		var temp
		if (units !== null && !isNaN(+units)) {
			temp = val
			val = units
			units = temp
		}
		units = normalizeUnits(units)
		if (units === 'iyear') {
			this.iYear(this.iYear() + val)
		} else if (units === 'imonth') {
			this.iMonth(this.iMonth() + val)
		} else if (units === 'idate') {
			this.iDate(this.iDate() + val)
		}
		 else {
			moment.fn.add.call(this, val, units)
		}
		return this
	}

	hMoment.fn.subtract = function (val, units) {
		var temp
		if (units !== null && !isNaN(+units)) {
			temp = val
			val = units
			units = temp
		}
		units = normalizeUnits(units)
		if (units === 'iyear') {
			this.iYear(this.iYear() - val)
		} else if (units === 'imonth') {
			this.iMonth(this.iMonth() - val)
		} else if (units === 'idate') {
			this.iDate(this.iDate() - val)
		} else {
			moment.fn.subtract.call(this, val, units)
		}
		return this
	}

	hMoment.fn.startOf = function (units) {
		units = normalizeUnits(units)
		if (units === 'iyear' || units === 'imonth') {
			if (units === 'iyear') {
				this.iMonth(0)
			}
			this.iDate(1)
			this.hours(0)
			this.minutes(0)
			this.seconds(0)
			this.milliseconds(0)
			return this
		} else {
			return moment.fn.startOf.call(this, units)
		}
	}

	hMoment.fn.endOf = function (units) {
		units = normalizeUnits(units)
		if (units === undefined || units === 'milisecond') {
			return this
		}
		return this.startOf(units).add(1, (units === 'isoweek' ? 'week' : units)).subtract(1, 'milliseconds')
	}

	hMoment.fn.clone = function () {
		return hMoment(this)
	}

	hMoment.fn.iYears = hMoment.fn.iYear
	hMoment.fn.iMonths = hMoment.fn.iMonth
	hMoment.fn.iDates = hMoment.fn.iDate
	hMoment.fn.iWeeks = hMoment.fn.iWeek

	/************************************
      hMoment Statics
  ************************************/

	hMoment.iDaysInMonth = function (year, month) {
		var i = getNewMoonMJDNIndex(year, month + 1),
			daysInMonth = ummalqura.ummalquraData[i] - ummalqura.ummalquraData[i - 1]
		return daysInMonth
	}

	function toHijri(gy, gm, gd) {
		var h = d2h(g2d(gy, gm + 1, gd))
		h.hm -= 1
		return h
	}

	function toGregorian(hy, hm, hd) {
		var g = d2g(h2d(hy, hm + 1, hd))
		g.gm -= 1
		return g
	}

	hMoment.iConvert = {
		toHijri: toHijri,
		toGregorian: toGregorian
	}

	return hMoment

	/************************************
      Hijri Conversion
  ************************************/

	/*
    Utility helper functions.
  */

	function div(a, b) {
		return~~ (a / b)
	}

	function mod(a, b) {
		return a - ~~(a / b) * b
	}

	/*
    Converts a date of the Hijri calendar to the Julian Day number.

    @param hy Hijri year (1356 to 1500)
    @param hm Hijri month (1 to 12)
    @param hd Hijri day (1 to 29/30)
    @return Julian Day number
  */

	function h2d(hy, hm, hd) {
		var i = getNewMoonMJDNIndex(hy, hm),
			mjdn = hd + ummalqura.ummalquraData[i - 1] - 1,
			jdn = mjdn + 2400000;
		return jdn
	}

	/*
    Converts the Julian Day number to a date in the Hijri calendar.

    @param jdn Julian Day number
    @return
      hy: Hijri year (1356 to 1500)
      hm: Hijri month (1 to 12)
      hd: Hijri day (1 to 29/30)
  */

	function d2h(jdn) {
		var mjdn = jdn - 2400000,
			i = getNewMoonMJDNIndexByJDN(mjdn),
			totalMonths = i + 16260,
			cYears = Math.floor((totalMonths - 1) / 12),
			hy = cYears + 1,
			hm = totalMonths - 12 * cYears,
			hd = mjdn - ummalqura.ummalquraData[i - 1] + 1

		return {
			hy: hy,
			hm: hm,
			hd: hd
		}
	}

	/*
    Calculates the Julian Day number from Gregorian or Julian
    calendar dates. This integer number corresponds to the noon of
    the date (i.e. 12 hours of Universal Time).
    The procedure was tested to be good since 1 March, -100100 (of both
    calendars) up to a few million years into the future.

    @param gy Calendar year (years BC numbered 0, -1, -2, ...)
    @param gm Calendar month (1 to 12)
    @param gd Calendar day of the month (1 to 28/29/30/31)
    @return Julian Day number
  */

	function g2d(gy, gm, gd) {
		var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408
		d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
		return d
	}

	/*
    Calculates Gregorian and Julian calendar dates from the Julian Day number
    (hdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
    calendars) to some millions years ahead of the present.

    @param jdn Julian Day number
    @return
      gy: Calendar year (years BC numbered 0, -1, -2, ...)
      gm: Calendar month (1 to 12)
      gd: Calendar day of the month M (1 to 28/29/30/31)
  */

	function d2g(jdn) {
		var j, i, gd, gm, gy
		j = 4 * jdn + 139361631
		j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
		i = div(mod(j, 1461), 4) * 5 + 308
		gd = div(mod(i, 153), 5) + 1
		gm = mod(div(i, 153), 12) + 1
		gy = div(j, 1461) - 100100 + div(8 - gm, 6)
		return {
			gy: gy,
			gm: gm,
			gd: gd
		}
	}

	/*
    Returns the index of the modified Julian day number of the new moon
    by the given year and month

    @param hy: Hijri year (1356 to 1500)
    @param hm: Hijri month (1 to 12)
    @return
        i: the index of the new moon in modified Julian day number.
  */
	function getNewMoonMJDNIndex(hy, hm) {
		var cYears = hy - 1,
			totalMonths = (cYears * 12) + 1 + (hm - 1),
			i = totalMonths - 16260
		return i
	}

	/*
    Returns the nearest new moon

    @param jdn Julian Day number
    @return
      i: the index of a modified Julian day number.
  */
	function getNewMoonMJDNIndexByJDN(mjdn) {
		for (var i = 0; i < ummalqura.ummalquraData.length; i=i+1) {
			if (ummalqura.ummalquraData[i] > mjdn)
				return i
		}
	}

});
