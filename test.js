'use strict';

var chai = require('chai')
  , moment = require('./moment-hijri')

chai.should()

moment.lang('en'
, { week:
    { dow: 6
    , doy: 12
    }
  , longDateFormat:
    { LT: 'h:mm A'
    , L: 'hYYYY/hMM/hDD'
    , LL: 'hD hMMMM hYYYY'
    , LLL: 'hD hMMMM hYYYY LT'
    , LLLL: 'dddd, hD hMMMM hYYYY LT'
    }
  }
)

describe('moment', function() {
  describe('#parse', function() {
    it('should parse gregorian dates', function() {
      var m = moment('1981/8/17 07:10:20', 'YYYY/M/D hh:mm:ss')
      m.format('YYYY-MM-DD hh:mm:ss').should.be.equal('1981-08-17 07:10:20')
      m.milliseconds().should.be.equal(0)
    })

    it('should parse correctly when input is only time', function() {
      var m = moment('07:10:20', 'hh:mm:ss')
      m.format('YYYY-MM-DD hh:mm:ss').should.be.equal('0000-01-01 07:10:20')
    })

/*    it('should parse when only Hijri year is in the format', function() {
      var m = moment('08 1401 17', 'MM hYYYY DD')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-17')
      m = moment('08 01 17', 'MM hYY DD')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-17')
    })

    it('should parse when only Hijri month is in the format', function() {
      var m = moment('1981 10 17', 'YYYY hM D')
      m.format('YYYY-MM-DD').should.be.equal('1981-07-17')
    })

    it('should parse when only Hijri month string is in the format', function() {
      var m = moment('1981 Amo 17', 'YYYY hMMM D')
      m.format('YYYY-MM-DD').should.be.equal('1981-07-17')
      m = moment('1981 Amordaad 17', 'YYYY hMMMM D')
      m.format('YYYY-MM-DD').should.be.equal('1981-07-17')
    })

    it('should parse when only Hijri date is in the format', function() {
      var m = moment('1981 26 8', 'YYYY hD M')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-15')
    })

    it('should parse when Hijri year and month are in the format', function() {
      var m = moment('17 1360 5', 'D hYYYY hM')
      m.format('YYYY-MM-DD').should.be.equal('1981-07-17')
      m = moment('1392 7', 'hYYYY hM')
      m.format('YYYY-MM-DD').should.be.equal('2013-09-23')
    })

    it('should parse when Hijri year and date are in the format', function() {
      var m = moment('26 1360 8', 'hD hYYYY M')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-15')
    })

    it('should parse when Hijri month and date are in the format', function() {
      var m = moment('26 1981 5', 'hD YYYY hM')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-17')
    })*/

    it('should parse when Hijri year, month and date are in the format', function() {
      var m = moment('17 1401 10', 'hD hYYYY hM')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-17')
    })

    it('should parse with complex format', function() {
      var m = moment('17 26 50 1981 50 8 50', 'D hD hYYYY YYYY M M hM')
      m.format('YYYY-MM-DD').should.be.equal('1981-08-17')
    })

    it('should parse format result', function() {
      var format = 'hYYYY/hM/hD hh:mm:ss.SSS a'
        , m = moment()
      moment(m.format(format), format).isSame(m).should.be['true']
    })

    it('should be able to parse in utc', function() {
      var m = moment.utc('1401/10/17 07:10:20', 'hYYYY/hM/hD hh:mm:ss')
      m.format('YYYY-MM-DD hh:mm:ss Z').should.be.equal('1981-08-17 07:10:20 +00:00')
    })

    it('should parse with a format array', function() {
      var p1 = 'hYY hM hD'
        , p2 = 'hM hD hYY'
        , p3 = 'hD hYY hM'
        , m
      m = moment('60 11 12', ['D YY M', 'M D YY', 'YY M D'])
      m.format('YY-MM-DD').should.be.equal('60-11-12')
      m = moment('10 11 12', [p1, p2, p3])
      m.format('hYY-hMM-hDD').should.be.equal('10-11-12')
      m = moment('10 11 12', [p2, p3, p1])
      m.format('hYY-hMM-hDD').should.be.equal('12-10-11')
      m = moment('10 11 12', [p3, p1, p2])
      m.format('hYY-hMM-hDD').should.be.equal('11-12-10')
      m = moment('10 11 12', [p3, p2, p1])
      m.format('hYY-hMM-hDD').should.be.equal('11-12-10')
      m = moment('60-11-12', [p3, p2, p1])
      m.format('hYY-hMM-hDD').should.be.equal('60-11-12')
      m = moment('60 11 12', [p3, p2, p1])
      m.format('hYY-hMM-hDD').should.be.equal('60-11-12')
      m = moment('60 8 31', ['YY M D', 'hYY hM hD'])
      m.format('YY-MM-DD').should.be.equal('60-08-31')
      m = moment('60 8 31', ['hYY hM hD', 'YY M D'])
      m.format('YY-MM-DD').should.be.equal('60-08-31')
      m = moment('60 5 31', ['YY M D', 'hYY hM hD'])
      m.format('YY-MM-DD').should.be.equal('60-05-31')
      m = moment('60 5 30', ['hYY hM hD', 'YY M D'])
      m.format('hYY-hMM-hDD').should.be.equal('60-05-30')
    })
  })

  describe('#format', function() {
    it('should work normally when there is no Hijri token', function() {
      var m = moment('1981-08-17 07:10:20')
      m.format('YYYY-MM-DD hh:mm:ss').should.be.equal('1981-08-17 07:10:20')
    })

    it('should format to Hijri with Hijri tokens', function() {
      var m = moment('1981-08-17 07:10:20')
      m.format('hYYYY-hMM-hDD hh:mm:ss').should.be.equal('1401-10-17 07:10:20')
    })

    it('should format with escaped and unescaped tokens', function() {
      var m = moment('1981-08-17')
      m.format('[My] birt\\h y[ea]r [is] hYYYY or YYYY').should.be.equal('My birth year is 1401 or 1981')
    })

    it('should format with mixed tokens', function() {
      var m = moment('1981-08-17')
      m.format('hYYYY/hMM/hDD = YYYY-MM-DD').should.be.equal('1401/10/17 = 1981-08-17')
    })

    it('should format with hMo', function() {
      var m = moment('1981-08-17')
      m.format('hMo').should.be.equal('10th')
    })

    it('should format with hM', function() {
      var m = moment('1981-05-17')// Note: The date is different here
      m.format('hM').should.be.equal('7')
    })

    it('should format with hMM', function() {
      var m = moment('1981-05-17')// Note: The date is different here
      m.format('hMM').should.be.equal('07')
    })

    it('should format with hMMM', function() {
      var m = moment('1981-08-17')
      m.format('hMMM').should.be.equal('Shw')
    })

    it('should format with hMMMM', function() {
      var m = moment('1981-08-17')
      m.format('hMMMM').should.be.equal('Shawwal')
    })

    it('should format with hDo', function() {
      var m = moment('1981-08-17')
      m.format('hDo').should.be.equal('17th')
    })

    it('should format with hD', function() {
      var m = moment('1981-08-17')
      m.format('hD').should.be.equal('17')
    })

    it('should format with hDD', function() {
      var m = moment('1981-05-17')// Note: The date is different here
      m.format('hDD').should.be.equal('13')
      m = moment('1981-05-13')// Note: The date is different here
      m.format('hDD').should.be.equal('09')
    })

    it('should format with hDDD', function() {
      var m = moment('1981-11-17')// Note: The date is different here
      m.format('hDDD').should.be.equal('21')
    })

    it('should format with hDDDo', function() {
      var m = moment('1981-11-17')
      m.format('hDDDo').should.be.equal('21st')
    })

    it('should format with hDDDD', function() {
      var m = moment('1981-08-17')
      m.format('hDDDD').should.be.equal('282')
      m = moment('1981-11-17')
      m.format('hDDDD').should.be.equal('021')
    })

    it('should format with hwo', function() {
      var m = moment('1981-08-17')
      m.format('hwo').should.be.equal('41st')
    })

    it('should format with hw', function() {
      var m = moment('1981-08-17')
      m.format('hw').should.be.equal('41')
    })

    it('should format with hww', function() {
      var m = moment('1981-08-17')
      m.format('hww').should.be.equal('41')
      m = moment('1981-11-17')
      m.format('hww').should.be.equal('04')
    })

    it('should format with hYY', function() {
      var m = moment('1981-08-17')
      m.format('hYY').should.be.equal('01')
    })

    it('should format with hYYYY', function() {
      var m = moment('1981-08-17')
      m.format('hYYYY').should.be.equal('1401')
    })

    it('should format with hYYYYY', function() {
      var m = moment('1981-08-17')
      m.format('hYYYYY').should.be.equal('01401')
    })

    it('should format with hgg', function() {
      var m = moment('1981-08-17')
      m.format('hgg').should.be.equal('01')
    })

    it('should format with hgggg', function() {
      var m = moment('1981-08-17')
      m.format('hgggg').should.be.equal('1401')
    })

    it('should format with hggggg', function() {
      var m = moment('1981-08-17')
      m.format('hggggg').should.be.equal('01401')
    })

    it('should work with long date formats too', function() {
      var m = moment('1981-08-17')// TODO: Not working
      m.format('LT').should.be.equal('12:00 AM')
      m.format('L').should.be.equal('1401/10/17')
      m.format('l').should.be.equal('1401/10/17')
      m.format('LL').should.be.equal('17 Shawwal 1401')
      m.format('ll').should.be.equal('17 Shw 1401')
      m.format('LLL').should.be.equal('17 Shawwal 1401 12:00 AM')
      m.format('lll').should.be.equal('17 Shw 1401 12:00 AM')
      m.format('LLLL').should.be.equal('Monday, 17 Shawwal 1401 12:00 AM')
      m.format('llll').should.be.equal('Mon, 17 Shw 1401 12:00 AM')
    })
  })

  describe('#hYear', function() {
    it('should return Hijri year', function() {
      var m = moment('1981-08-17')
      m.hYear().should.be.equal(1401)
    })

    it('should set Hijri year', function() {
      var m = moment('1981-08-17')
      m.hYear(1435)
      m.format('hYYYY/hM/hD').should.be.equal('1435/10/17')
      m = moment('2013-03-20')
      m.format('hYY/hM/hD').should.be.equal('34/5/8')
      m.hYear(1392)
      m.format('hYY/hM/hD').should.be.equal('92/5/8')
    })

    it('should also has hYears alias', function() {
      moment.fn.hYear.should.be.equal(moment.fn.hYears)
    })
  })
	
  describe('#hMonth', function() {
    it('should return Hijri month', function() {
      var m = moment('1981-08-17')
      m.hMonth().should.be.equal(9)
    })

    it('should set Hijri month', function() {
      var m = moment('1981-08-17')
      m.hMonth(7)
      m.format('hYYYY/hM/hD').should.be.equal('1401/8/17')
      m = moment('2012-08-21')
      m.format('hYY/hM/hD').should.be.equal('33/10/3')
      m.hMonth(11)
      m.format('hYY/hM/hD').should.be.equal('33/12/3')
      m = moment('2013-08-22')
      m.format('hYY/hM/hD').should.be.equal('34/10/15')
      m.hMonth(11)
      m.format('hYY/hM/hD').should.be.equal('34/12/15')
    })

    it('should also has hMonths alias', function() {
      moment.fn.hMonth.should.be.equal(moment.fn.hMonths)
    })
  })

  describe('#hDate', function() {
    it('should return Hijri date', function() {
      var m = moment('1981-08-17')
      m.hDate().should.be.equal(17)
    })

    it('should set Hijri date', function() {
      var m = moment('1981-08-17')
      m.hDate(29)
      m.format('hYYYY/hM/hD').should.be.equal('1401/10/29')
      m = moment('1981-07-17')
      m.format('hYY/hM/hD').should.be.equal('01/9/16')
      m.hDate(29)
      m.format('hYY/hM/hD').should.be.equal('01/9/29')
      m.hDate(30)
      m.format('hYY/hM/hD').should.be.equal('01/9/30')
      m.hDate(30)
      m.format('hYY/hM/hD').should.be.equal('01/9/30')
      m.hDate(31)
      m.format('hYY/hM/hD').should.be.equal('01/10/1')
      m.hDate(90)
      m.format('hYY/hM/hD').should.be.equal('02/1/2')
    })

    it('should also has hDates alias', function() {
      moment.fn.hDate.should.be.equal(moment.fn.hDates)
    })
  })

  describe('#hDayOfYear', function() {
    it('should return Hijri date of year', function() {
      var m = moment('1981-08-17')
      m.hDayOfYear().should.be.equal(282)
      m = moment('1980-11-9')
      m.hDayOfYear().should.be.equal(1)
      m = moment('2013-11-03')//1434
      m.hDayOfYear().should.be.equal(354)
      m = moment('2014-10-24')//1435
      m.hDayOfYear().should.be.equal(355)
			m = moment('2014-10-25')//1436
      m.hDayOfYear().should.be.equal(1)
    })

    it('should set Hijri date of year', function() {
      var m = moment('2014-10-24')
      m.hDayOfYear(30)
      m.format('hYYYY/hM/hD').should.be.equal('1435/1/30')
      m.hDayOfYear(354)
      m.format('hYY/hM/hD').should.be.equal('35/12/29')
      m.hDayOfYear(355)
      m.format('hYY/hM/hD').should.be.equal('35/12/30')
      m.hDayOfYear(356)
      m.format('hYY/hM/hD').should.be.equal('36/1/1')
      m.hDayOfYear(1)
      m.format('hYY/hM/hD').should.be.equal('36/1/1')
      m.hDayOfYear(90)
      m.format('hYY/hM/hD').should.be.equal('36/4/2')
      m.hDayOfYear(354 + 354)
      m.format('hYY/hM/hD').should.be.equal('37/12/30')
    })
  })
	
})
