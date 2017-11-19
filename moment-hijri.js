// moment-hijri.js
// author: Suhail Alkowaileet
// This is a modified version of moment-jalaali by Behrang Noruzi Niya
// license: MIT

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
		module.exports = factory(require('moment'))
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
		ummalquraData: 	{	1300:[30,29,30,29,30,29,30,29,30,29,30,29], 1301:[30,30,29,30,29,30,29,30,29,30,29,29], 1302:[30,30,30,29,30,30,29,29,30,29,29,30],
                            1303:[29,30,30,29,30,30,29,30,29,30,29,29], 1304:[29,30,30,29,30,30,30,29,30,29,30,29], 1305:[29,29,30,30,29,30,30,29,30,30,29,29],
                            1306:[30,29,30,29,30,29,30,29,30,30,29,30], 1307:[29,30,29,30,29,30,29,30,29,30,29,30], 1308:[29,30,30,29,30,29,30,29,30,29,29,30],
                            1309:[29,30,30,30,30,29,29,30,29,29,30,29], 1310:[30,29,30,30,30,29,30,29,30,29,29,30], 1311:[29,30,29,30,30,30,29,30,29,30,29,29],
                            1312:[30,29,30,29,30,30,29,30,30,29,30,29], 1313:[29,30,29,30,29,30,29,30,30,30,29,29], 1314:[30,30,29,30,29,29,30,29,30,30,29,30],
                            1315:[29,30,30,29,30,29,29,30,29,30,29,30], 1316:[29,30,30,30,29,30,29,29,30,29,30,29], 1317:[30,29,30,30,29,30,29,30,29,30,29,29],
                            1318:[30,29,30,30,29,30,30,29,30,29,30,29], 1319:[29,30,29,30,30,29,30,29,30,30,29,30], 1320:[29,30,29,29,30,29,30,29,30,30,30,29],
                            1321:[30,29,30,29,29,30,29,29,30,30,30,30], 1322:[29,30,29,30,29,29,29,30,29,30,30,30], 1323:[29,30,30,29,30,29,29,29,30,29,30,30],
                            1324:[29,30,30,29,30,29,30,29,29,30,29,30], 1325:[30,29,30,29,30,30,29,30,29,30,29,30], 1326:[29,29,30,29,30,30,29,30,29,30,30,29],
                            1327:[30,29,29,30,29,30,29,30,30,29,30,30], 1328:[29,30,29,29,30,29,29,30,30,30,29,30], 1329:[30,29,30,29,29,30,29,29,30,30,29,30],
                            1330:[30,30,29,30,29,29,30,29,29,30,30,29], 1331:[30,30,29,30,30,29,29,30,29,30,29,30], 1332:[29,30,29,30,30,29,30,29,30,30,29,29],
                            1333:[30,29,29,30,30,29,30,30,29,30,30,29], 1334:[29,29,30,29,30,29,30,30,30,29,30,29], 1335:[30,29,30,29,29,30,29,30,30,29,30,30],
                            1336:[29,30,29,30,29,29,30,29,30,29,30,30], 1337:[30,29,30,29,30,29,29,30,29,30,29,30], 1338:[29,30,30,29,30,30,29,29,30,29,30,29],
                            1339:[30,29,30,29,30,30,30,29,30,29,29,30], 1340:[29,29,30,29,30,30,30,30,29,30,29,29], 1341:[30,29,29,30,29,30,30,30,29,30,30,29],
                            1342:[29,29,30,29,30,29,30,30,29,30,30,29], 1343:[30,29,29,30,29,30,29,30,29,30,30,29], 1344:[30,29,30,29,30,30,29,29,30,29,30,29],
                            1345:[30,29,30,30,30,29,30,29,29,30,29,29], 1346:[30,29,30,30,30,30,29,30,29,29,30,29], 1347:[29,30,29,30,30,30,29,30,30,29,29,30],
                            1348:[29,29,30,29,30,30,29,30,30,30,29,29], 1349:[30,29,29,30,29,30,30,29,30,30,29,30], 1350:[29,30,29,30,29,30,29,29,30,30,29,30],
                            1351:[30,29,30,29,30,29,30,29,29,30,29,30], 1352:[30,29,30,30,29,30,29,30,29,29,30,29], 1353:[30,29,30,30,30,29,30,29,29,30,29,30],
                            1354:[29,30,29,30,30,29,30,30,29,30,29,29], 1355:[30,29,29,30,30,29,30,30,29,30,30,29], 1356:[29,30,29,30,29,30,29,30,29,30,30,30],
                            1357:[29,29,30,29,30,29,29,30,29,30,30,30], 1358:[29,30,29,30,29,30,29,29,30,29,30,30], 1359:[29,30,30,29,30,29,30,29,29,29,30,30],
                            1360:[29,30,30,30,29,30,29,30,29,29,30,29], 1361:[30,29,30,30,29,30,30,29,29,30,29,30], 1362:[29,30,29,30,29,30,30,29,30,29,30,29],
                            1363:[30,29,30,29,30,29,30,29,30,29,30,30], 1364:[29,30,29,30,29,29,30,29,30,29,30,30], 1365:[30,30,29,29,30,29,29,30,29,30,29,30],
                            1366:[30,30,29,30,29,30,29,29,30,29,30,29], 1367:[30,30,29,30,30,29,30,29,29,30,29,30], 1368:[29,30,29,30,30,30,29,29,30,29,30,29],
                            1369:[30,29,30,29,30,30,29,30,29,30,30,29], 1370:[30,29,29,30,29,30,29,30,29,30,30,30], 1371:[29,30,29,29,30,29,30,29,30,29,30,30],
                            1372:[30,29,29,30,29,30,29,29,30,29,30,30], 1373:[30,29,30,29,30,29,30,29,29,30,29,30], 1374:[30,29,30,30,29,30,29,30,29,29,30,29],
                            1375:[30,29,30,30,29,30,30,29,30,29,30,29], 1376:[29,30,29,30,29,30,30,30,29,30,29,30], 1377:[29,29,30,29,29,30,30,30,29,30,30,29],
                            1378:[30,29,29,29,30,29,30,30,29,30,30,30], 1379:[29,30,29,29,29,30,29,30,30,29,30,30], 1380:[29,30,29,30,29,30,29,30,29,30,29,30],
                            1381:[29,30,29,30,30,29,30,29,30,29,29,30], 1382:[29,30,29,30,30,29,30,30,29,30,29,29], 1383:[30,29,29,30,30,30,29,30,30,29,30,29],
                            1384:[29,30,29,29,30,30,29,30,30,30,29,30], 1385:[29,29,30,29,29,30,30,29,30,30,30,29], 1386:[30,29,29,30,29,29,30,30,29,30,30,29],
                            1387:[30,29,30,29,30,29,30,29,30,29,30,29], 1388:[30,30,29,30,29,30,29,30,29,30,29,29], 1389:[30,30,29,30,30,29,30,30,29,29,30,29],
                            1390:[29,30,29,30,30,30,29,30,29,30,29,30], 1391:[29,29,30,29,30,30,29,30,30,29,30,29], 1392:[30,29,29,30,29,30,29,30,30,29,30,30],
                            1393:[29,30,29,29,30,29,30,29,30,29,30,30], 1394:[30,29,30,29,29,30,29,30,29,30,29,30], 1395:[30,29,30,30,29,30,29,29,30,29,29,30],
                            1396:[30,29,30,30,29,30,30,29,29,30,29,29], 1397:[30,29,30,30,29,30,30,30,29,29,29,30], 1398:[29,30,29,30,30,29,30,30,29,30,29,29],
                            1399:[30,29,30,29,30,29,30,30,29,30,29,30], 1400:[30,29,30,29,29,30,29,30,29,30,29,30], 1401:[30,30,29,30,29,29,30,29,29,30,29,30],
                            1402:[30,30,30,29,30,29,29,30,29,29,30,29], 1403:[30,30,30,29,30,30,29,29,30,29,29,30], 1404:[29,30,30,29,30,30,29,30,29,30,29,29],
                            1405:[30,29,30,29,30,30,30,29,30,29,29,30], 1406:[30,29,29,30,29,30,30,29,30,29,30,30], 1407:[29,30,29,29,30,29,30,29,30,29,30,30],
                            1408:[30,29,30,29,30,29,29,30,29,29,30,30], 1409:[30,30,29,30,29,30,29,29,30,29,29,30], 1410:[30,30,29,30,30,29,30,29,29,30,29,29],
                            1411:[30,30,29,30,30,29,30,30,29,29,30,29], 1412:[30,29,30,29,30,29,30,30,30,29,29,30], 1413:[29,30,29,29,30,29,30,30,30,29,30,29],
                            1414:[30,29,30,29,29,30,29,30,30,29,30,30], 1415:[29,30,29,30,29,29,30,29,30,29,30,30], 1416:[30,29,30,29,30,29,29,30,29,30,29,30],
                            1417:[30,29,30,30,29,29,30,29,30,29,30,29], 1418:[30,29,30,30,29,30,29,30,29,30,29,30], 1419:[29,30,29,30,29,30,29,30,30,30,29,29],
                            1420:[29,30,29,29,30,29,30,30,30,30,29,30], 1421:[29,29,30,29,29,29,30,30,30,30,29,30], 1422:[30,29,29,30,29,29,29,30,30,30,29,30],
                            1423:[30,29,30,29,30,29,29,30,29,30,29,30], 1424:[30,29,30,30,29,30,29,29,30,29,30,29], 1425:[30,29,30,30,29,30,29,30,30,29,30,29],
                            1426:[29,30,29,30,29,30,30,29,30,30,29,30], 1427:[29,29,30,29,30,29,30,30,29,30,30,29], 1428:[30,29,29,30,29,29,30,30,30,29,30,30],
                            1429:[29,30,29,29,30,29,29,30,30,29,30,30], 1430:[29,30,30,29,29,30,29,30,29,30,29,30], 1431:[29,30,30,29,30,29,30,29,30,29,29,30],
                            1432:[29,30,30,30,29,30,29,30,29,30,29,29], 1433:[30,29,30,30,29,30,30,29,30,29,30,29], 1434:[29,30,29,30,29,30,30,29,30,30,29,29],
                            1435:[30,29,30,29,30,29,30,29,30,30,29,30], 1436:[29,30,29,30,29,30,29,30,29,30,29,30], 1437:[30,29,30,30,29,29,30,29,30,29,29,30],
                            1438:[30,29,30,30,30,29,29,30,29,29,30,29], 1439:[30,29,30,30,30,29,30,29,30,29,29,30], 1440:[29,30,29,30,30,30,29,30,29,30,29,29],
                            1441:[30,29,30,29,30,30,29,30,30,29,30,29], 1442:[29,30,29,30,29,30,29,30,30,29,30,29], 1443:[30,29,30,29,30,29,30,29,30,29,30,30],
                            1444:[29,30,29,30,30,29,29,30,29,30,29,30], 1445:[29,30,30,30,29,30,29,29,30,29,29,30], 1446:[29,30,30,30,29,30,30,29,29,30,29,29],
                            1447:[30,29,30,30,30,29,30,29,30,29,30,29], 1448:[29,30,29,30,30,29,30,30,29,30,29,30], 1449:[29,29,30,29,30,29,30,30,29,30,30,29],
                            1450:[30,29,30,29,29,30,29,30,29,30,30,29], 1451:[30,30,30,29,29,30,29,29,30,30,29,30], 1452:[30,29,30,30,29,29,30,29,29,30,29,30],
                            1453:[30,29,30,30,29,30,29,30,29,29,30,29], 1454:[30,29,30,30,29,30,30,29,30,29,30,29], 1455:[29,30,29,30,30,29,30,29,30,30,29,30],
                            1456:[29,29,30,29,30,29,30,29,30,30,30,29], 1457:[30,29,29,30,29,29,30,29,30,30,30,30], 1458:[29,30,29,29,30,29,29,30,29,30,30,30],
                            1459:[29,30,30,29,29,30,29,29,30,29,30,30], 1460:[29,30,30,29,30,29,30,29,29,30,29,30], 1461:[29,30,30,29,30,29,30,29,30,30,29,29],
                            1462:[30,29,30,29,30,30,29,30,29,30,30,29], 1463:[29,30,29,30,29,30,29,30,30,30,29,30], 1464:[29,30,29,29,30,29,29,30,30,30,29,30],
                            1465:[30,29,30,29,29,30,29,29,30,30,29,30], 1466:[30,30,29,30,29,29,29,30,29,30,30,29], 1467:[30,30,29,30,30,29,29,30,29,30,29,30],
                            1468:[29,30,29,30,30,29,30,29,30,29,30,29], 1469:[29,30,29,30,30,29,30,30,29,30,29,30], 1470:[29,29,30,29,30,30,29,30,30,29,30,29],
                            1471:[30,29,29,30,29,30,29,30,30,29,30,30], 1472:[29,30,29,29,30,29,30,29,30,30,29,30], 1473:[29,30,29,30,30,29,29,30,29,30,29,30],
                            1474:[29,30,30,29,30,30,29,29,30,29,30,29], 1475:[29,30,30,29,30,30,30,29,29,30,29,29], 1476:[30,29,30,29,30,30,30,29,30,29,30,29],
                            1477:[29,30,29,29,30,30,30,30,29,30,29,30], 1478:[29,29,30,29,30,29,30,30,29,30,30,29], 1479:[30,29,29,30,29,30,29,30,29,30,30,29],
                            1480:[30,29,30,29,30,29,30,29,30,29,30,29], 1481:[30,29,30,30,29,30,29,30,29,30,29,29], 1482:[30,29,30,30,30,30,29,30,29,29,30,29],
                            1483:[29,30,29,30,30,30,29,30,30,29,29,30], 1484:[29,29,30,29,30,30,30,29,30,29,30,29], 1485:[30,29,29,30,29,30,30,29,30,30,29,30],
                            1486:[29,30,29,29,30,29,30,29,30,30,29,30], 1487:[30,29,30,29,30,29,29,30,29,30,29,30], 1488:[30,29,30,30,29,30,29,29,30,29,30,29],
                            1489:[30,29,30,30,30,29,30,29,29,30,29,30], 1490:[29,30,29,30,30,29,30,30,29,29,30,29], 1491:[30,29,29,30,30,29,30,30,29,30,29,30],
                            1492:[29,30,29,29,30,30,29,30,29,30,30,29], 1493:[30,29,30,29,30,29,29,30,29,30,30,30], 1494:[29,30,29,30,29,30,29,29,29,30,30,30],
                            1495:[29,30,30,29,30,29,29,30,29,29,30,30], 1496:[29,30,30,30,29,30,29,29,30,29,29,30], 1497:[30,29,30,30,29,30,29,30,29,30,29,30],
                            1498:[29,30,29,30,29,30,30,29,30,29,30,29], 1499:[30,29,30,29,29,30,30,29,30,29,30,30], 1500:[29,30,29,30,29,29,30,29,30,29,30,30],
                            1501:[30,29,30,29,30,29,29,29,30,29,30,30], 1502:[30,30,29,30,29,30,29,29,29,30,30,29], 1503:[30,30,29,30,30,29,30,29,29,29,30,30],
                            1504:[29,30,29,30,30,30,29,29,30,29,30,29], 1505:[30,29,30,29,30,30,29,30,29,30,30,29], 1506:[29,30,29,29,30,30,29,30,30,29,30,30],
                            1507:[29,29,30,29,29,30,30,29,30,29,30,30], 1508:[30,29,29,30,29,30,29,29,30,29,30,30], 1509:[30,29,30,29,30,29,30,29,29,30,29,30],
                            1510:[30,29,30,30,29,30,29,30,29,29,30,29], 1511:[30,29,30,30,29,30,30,29,30,29,29,30], 1512:[29,30,29,30,29,30,30,30,29,30,29,30],
                            1513:[29,29,29,30,29,30,30,30,29,30,30,29], 1514:[30,29,29,29,30,29,30,30,29,30,30,30], 1515:[29,29,30,29,29,30,29,30,30,29,30,30],
                            1516:[29,30,29,30,29,29,30,29,30,29,30,30], 1517:[29,30,29,30,29,30,30,29,29,30,29,30], 1518:[29,30,29,30,30,29,30,30,29,30,29,29],
                            1519:[30,29,29,30,30,30,29,30,30,29,30,29], 1520:[29,30,29,29,30,30,30,29,30,30,29,30], 1521:[29,29,29,30,29,30,30,29,30,30,29,30],
                            1522:[30,29,29,29,30,29,30,30,29,30,30,29], 1523:[30,29,30,29,30,29,30,29,29,30,30,29], 1524:[30,30,29,30,29,30,29,30,29,29,30,29],
                            1525:[30,30,29,30,30,29,30,29,30,29,29,30], 1526:[29,30,29,30,30,30,29,30,29,30,29,29], 1527:[30,29,30,29,30,30,29,30,30,29,30,29],
                            1528:[30,29,29,30,29,30,29,30,30,29,30,30], 1529:[29,30,29,29,30,29,30,29,30,29,30,30], 1530:[29,30,30,29,29,30,29,30,29,29,30,30],
                            1531:[29,30,30,30,29,29,30,29,30,29,29,30], 1532:[29,30,30,30,29,30,30,29,29,29,30,29], 1533:[30,29,30,30,30,29,30,29,30,29,29,30],
                            1534:[29,30,29,30,30,29,30,30,29,29,30,29], 1535:[30,29,30,29,30,29,30,30,29,30,29,30], 1536:[29,30,29,30,29,30,29,30,29,30,29,30],
                            1537:[30,29,30,30,29,29,30,29,29,30,29,30], 1538:[30,30,29,30,30,29,29,30,29,29,30,29], 1539:[30,30,30,29,30,30,29,29,30,29,29,30],
                            1540:[29,30,30,29,30,30,29,30,29,29,30,29], 1541:[30,29,30,29,30,30,30,29,30,29,29,30], 1542:[29,30,29,30,29,30,30,29,30,29,30,30],
                            1543:[29,30,29,29,30,29,30,29,30,29,30,30], 1544:[30,29,30,29,29,30,29,30,29,30,29,30], 1545:[30,30,29,30,29,29,30,29,30,29,29,30],
                            1546:[30,30,29,30,29,30,29,30,29,30,29,29], 1547:[30,30,29,30,30,29,30,29,30,29,30,29], 1548:[30,29,29,30,30,29,30,30,29,30,29,30],
                            1549:[29,30,29,29,30,29,30,30,30,29,30,29], 1550:[30,29,30,29,29,29,30,30,30,29,30,30], 1551:[29,30,29,29,30,29,29,30,30,29,30,30],
                            1552:[30,29,30,29,29,30,29,29,30,30,29,30], 1553:[30,29,30,29,30,29,30,29,30,29,30,29], 1554:[30,29,30,29,30,30,29,30,29,30,29,30],
                            1555:[29,29,30,29,30,30,29,30,30,29,30,29], 1556:[30,29,29,30,29,30,29,30,30,30,29,30], 1557:[29,30,29,29,29,30,29,30,30,30,30,29],
                            1558:[30,29,30,29,29,29,30,29,30,30,30,29], 1559:[30,30,29,29,30,29,29,30,30,29,30,29], 1560:[30,30,29,30,29,30,29,30,29,30,29,30],
                            1561:[29,30,30,29,30,29,30,30,29,29,30,29], 1562:[29,30,30,29,30,29,30,30,30,29,29,30], 1563:[29,30,29,29,30,29,30,30,30,29,30,29],
                            1564:[30,29,30,29,29,30,29,30,30,30,29,30], 1565:[29,30,29,30,29,29,30,29,30,30,29,30], 1566:[30,29,30,29,30,29,29,30,29,30,29,30],
                            1567:[30,29,30,30,29,30,29,30,29,29,30,29], 1568:[30,29,30,30,30,29,30,29,30,29,29,29], 1569:[30,29,30,30,30,29,30,30,29,30,29,29],
                            1570:[29,30,29,30,30,29,30,30,30,29,29,30], 1571:[29,29,30,29,30,30,29,30,30,29,30,29], 1572:[30,29,29,30,29,30,29,30,30,29,30,29],
                            1573:[30,29,30,30,29,30,29,29,30,29,30,29], 1574:[30,30,29,30,30,29,30,29,29,30,29,29], 1575:[30,30,30,29,30,30,29,30,29,29,29,30],
                            1576:[29,30,30,29,30,30,30,29,30,29,29,29], 1577:[30,29,30,30,29,30,30,29,30,29,30,29], 1578:[29,30,29,30,29,30,30,29,30,30,29,30],
                            1579:[29,30,29,30,29,29,30,30,29,30,29,30], 1580:[29,30,30,29,30,29,29,30,29,30,29,30], 1581:[30,30,29,30,29,30,29,29,30,29,30,29],
                            1582:[30,30,29,30,30,29,30,29,30,29,29,29], 1583:[30,30,29,30,30,30,29,30,29,30,29,29], 1584:[29,30,30,29,30,30,29,30,30,29,30,29],
                            1585:[29,30,29,30,29,30,29,30,30,29,30,30], 1586:[29,29,30,29,30,29,29,30,30,30,29,30], 1587:[29,30,30,29,29,29,30,29,30,29,30,30],
                            1588:[30,29,30,30,29,29,29,30,29,30,29,30], 1589:[30,29,30,30,29,30,29,29,30,29,30,29], 1590:[30,29,30,30,30,29,29,30,29,30,29,30],
                            1591:[29,30,29,30,30,29,30,29,30,29,30,29], 1592:[30,29,30,29,30,29,30,29,30,30,30,29], 1593:[30,29,29,30,29,29,30,29,30,30,30,29],
                            1594:[30,30,29,29,30,29,29,29,30,30,30,30], 1595:[29,30,29,30,29,29,30,29,29,30,30,30], 1596:[29,30,30,29,30,29,29,30,29,30,29,30],
                            1597:[29,30,30,29,30,29,30,29,30,29,30,29], 1598:[30,29,30,29,30,30,29,30,29,30,30,29], 1599:[29,30,29,30,29,30,29,30,30,30,29,30],
                            1600:[29,29,30,29,30,29,29,30,30,30,29,30]},
			maxYear: 1600,
			minYear: 1300,
			hijrahStartEpochMonth: 15600,
			isoStart: -31826
	}

	var minYearLength;
	var maxYearLength;
	var minMonthLength;
	var maxMonthLength;
	var epochMonthsStartDays;

	var formattingTokens = /(\[[^\[]*\])|(\\)?i(Mo|MM?M?M?|Do|DDDo|DD?D?D?|w[o|w]?|YYYYY|YYYY|YY|gg(ggg?)?)|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
		localFormattingTokens = /(\[[^\[]*\])|(\\)?(iLL?L?L?|LTS|LT|LL?L?L?|i?l{1,4})/g

	, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{1,4}/, parseTokenSixDigits = /[+\-]?\d{1,6}/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.?)|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/

	, unitAliases = {
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
				var format = me.localeData().longDateFormat(input.replace('i', ''));
				if (input.startsWith('i')) {
					format = format.replace(/(DD?D?D?|MM?M?M?|YY?Y?Y?|l{1,4})/g, function(token) {
						return 'i' + token;
					});
				}
				return format || input
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
			if (this.month() != g.gm || this.date() != g.gd || this.year() != g.gy) {
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
			var adjYear = h.hy + Math.floor(input / 12);
			var adjMonth = input % 12;
			if (input < 0) {
				adjMonth = 12 + (input % 12);
			}
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(adjYear, adjMonth))
			this.iYear(h.hy + div(input, 12))
			input = mod(input, 12)
			if (input < 0) {
				input += 12
				this.iYear(this.iYear() - 1)
			}
			g = toGregorian(this.iYear(), input, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() != g.gm || this.date() != g.gd || this.year() != g.gy) {
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
			if (this.month() != g.gm || this.date() != g.gd || this.year() != g.gy) {
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
		} else {
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
		var i = ummalqura.ummalquraData[year][month];
		return i;
	}

	function toHijri(gy, gm, gd) {
		var ed = toEpochDayFromGregorian(gy, gm, gd);
		var h = hijrihOfEpochDay(Math.floor(ed));
		return h
	}

	function toGregorian(hy, hm, hd) {
		var ed = toEpochDayFromHijrih(hy, hm, hd);
		var g = isoOfEpochDay(Math.floor(ed));
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


	function toEpochDayFromHijrih(year, month, day) {
		checkCalendarInit();    // ensure that the chronology is initialized
    var epochMonth = yearToEpochMonth(year) + (month);
    return epochMonthToEpochDay(epochMonth) + (day - 1);
	}

	function toEpochDayFromGregorian(year, month, day) {
    var y = year;
    var m = month + 1;
    var total = 0;
    total += 365 * y;
    if (y >= 0) {
        total += Math.floor((y + 3) / 4) - Math.floor((y + 99) / 100) + Math.floor((y + 399) / 400);
    } else {
        total -= Math.floor(y / -4) - Math.floor(y / -100) + Math.floor(y / -400);
    }
    total += Math.floor((367 * m - 362) / 12);
    total += day - 1;
    if (m > 2) {
        total--;
        if (isLeapYear(y) == false) {
            total--;
        }
    }
    return total - ((146097 * 5) - (30 * 365 + 7));
  }

	function isoOfEpochDay(epochDay) {
		var zeroDay = epochDay + ((146097 * 5) - (30 * 365 + 7));
		// find the march-based year
		zeroDay -= 60;  // adjust to 0000-03-01 so leap day is at end of four year cycle
		var adjust = 0;
		if (zeroDay < 0) {
				// adjust negative years to positive for calculation
				var adjustCycles = Math.floor((zeroDay + 1) / 146097) - 1;
				adjust = adjustCycles * 400;
				zeroDay += -adjustCycles * 146097;
		}
		var yearEst = Math.floor((400 * zeroDay + 591) / 146097);
		var doyEst = zeroDay - (365 * yearEst + Math.floor(yearEst / 4) - Math.floor(yearEst / 100) + Math.floor(yearEst / 400));
		if (doyEst < 0) {
				// fix estimate
				yearEst--;
				doyEst = zeroDay - (365 * yearEst + Math.floor(yearEst / 4) - Math.floor(yearEst / 100) + Math.floor(yearEst / 400));
		}
		yearEst += adjust;  // reset any negative year
		var marchDoy0 = doyEst;

		// convert march-based values back to january-based
		var marchMonth0 = Math.floor((marchDoy0 * 5 + 2) / 153);
		var month = (marchMonth0 + 2) % 12 + 1;
		var dom = marchDoy0 - Math.floor((marchMonth0 * 306 + 5) / 10) + 1;
		yearEst += Math.floor(marchMonth0 / 10);

		return {gy: yearEst, gm: month - 1, gd: dom};
	}

	function hijrihOfEpochDay(epochDay) {
		var dateInfo = getHijrahDateInfo(epochDay);
		return {hy: dateInfo[0], hm: dateInfo[1], hd: dateInfo[2]};
	}

	function getHijrahDateInfo(epochDay) {
		checkCalendarInit();

		var epochMonth = epochDayToEpochMonth(epochDay);
    var year = epochMonthToYear(epochMonth);
    var month = epochMonthToMonth(epochMonth);
    var day1 = epochMonthToEpochDay(epochMonth);
		var date = epochDay - day1;

		var dateInfo = [];
    dateInfo[0] = year;
    dateInfo[1] = month; // change to 1-based.
    dateInfo[2] = date + 1; // change to 1-based.
    return dateInfo;
	}

	function checkCalendarInit() {
		epochMonthsStartDays = createEpochMonths(ummalqura.isoStart, ummalqura.minYear, ummalqura.maxYear, ummalqura.ummalquraData);
		var maxEpochDay = epochMonthsStartDays[epochMonthsStartDays.length - 1];
		for (var year = ummalqura.minYear; year < ummalqura.maxYear; year++) {
    	var length = getYearLength(year);
      minYearLength = Math.min(minYearLength, length);
      maxYearLength = Math.max(maxYearLength, length);
    }
	}

	function createEpochMonths(epochDay, minYear, maxYear, years) {
		var numMonths = (maxYear - minYear + 1) * 12 + 1;

	  // Initialize the running epochDay as the corresponding ISO Epoch day
	  var epochMonth = 0; // index into array of epochMonths
	  var epochMonths = [];
	  minMonthLength = -99999999;
	  maxMonthLength = 99999999;

	  // Only whole years are valid, any zero's in the array are illegal
	  for (var year = minYear; year <= maxYear; year++) {
	      var months = ummalqura.ummalquraData[year];// must not be gaps
	      for (var month = 0; month < 12; month++) {
	          var length = months[month];
	          epochMonths[epochMonth++] = epochDay;

	          epochDay += length;
	          minMonthLength = Math.min(minMonthLength, length);
	          maxMonthLength = Math.max(maxMonthLength, length);
	      }
	  }

	  // Insert the final epochDay
	  epochMonths[epochMonth++] = epochDay;

	  return epochMonths;
	}

	function epochDayToEpochMonth(epochDay) {
		var i = binarySearch(epochMonthsStartDays, epochDay);
		if (i < 0) {
			i = -i - 2;
		}
		return i;
	}

	function epochMonthToYear(epochMonth) {
		return Math.floor((epochMonth + (ummalqura.minYear * 12)) / 12);
	}

	function epochMonthToMonth(epochMonth) {
		return (epochMonth + (ummalqura.minYear * 12)) % 12;
	}

	function epochMonthToEpochDay(epochMonth) {
		return epochMonthsStartDays[epochMonth];
  }

	function yearToEpochMonth(year) {
		return (year * 12) - (ummalqura.minYear * 12);
	}

	function yearMonthToDayOfYear(prolepticYear, month) {
  	var epochMonthFirst = yearToEpochMonth(prolepticYear);
    return epochMonthToEpochDay(epochMonthFirst + month) - epochMonthToEpochDay(epochMonthFirst);
  }

	function getYearLength(prolepticYear) {
		return yearMonthToDayOfYear(prolepticYear, 12);
	}

	function binarySearch(array, key) {
		var low = 0;
    var high = array.length - 1;

    while (low <= high) {
        var mid = (low + high) >>> 1;
        var midVal = array[mid];

        if (midVal < key)
            low = mid + 1;
        else if (midVal > key)
            high = mid - 1;
        else
            return mid; // key found
    }
    return -(low + 1);  // key not found.
	}

	function isLeapYear(prolepticYear) {
    return ((prolepticYear & 3) == 0) && ((prolepticYear % 100) != 0 || (prolepticYear % 400) == 0);
	}

});
