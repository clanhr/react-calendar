var assert = require('assert');
var dataBuilder = require('../src/dataBuilder.js');
var moment = require('moment');

var FORMAT = "YYYY-MM-DD";

describe('calc first date of month', function() {
  it('should return first day of the week 2015-12-28', function () {
    assert.equal("2015-12-28",
                 dataBuilder.calcStartMonth(0, 2016).format(FORMAT));
  });
});

describe('calc last date of month', function() {
  it('should return last day of the week 2016-01-31', function () {
    assert.equal("2016-01-31",
                 dataBuilder.calcEndMonth(0, 2016).format(FORMAT));
  });
});

describe('week builder', function() {
  var result = dataBuilder.weekRange(moment("2016-01-21"), moment("2016-01-23"));
  it('should get 2016-01-21', function () {
    assert.equal("2016-01-21",
                 result[0].format(FORMAT));
  });
  it('should get 2016-01-22', function () {
    assert.equal("2016-01-22",
                 result[1].format(FORMAT));
  });
});

describe('event position', function() {
  it('should be 2', function () {
    assert.equal(2,
                 dataBuilder.getEventPosition(moment("2016-01-18"),
                                              moment("2016-01-24"),
                                              moment("2016-01-20"),
                                              moment("2016-01-21")));
  });
  it('should get 0', function () {
    assert.equal(0,
                 dataBuilder.getEventPosition(moment("2016-01-25"),
                                              moment("2016-01-31"),
                                              moment("2016-01-20"),
                                              moment("2016-01-26")));
  });

  it('should get 1', function () {
    assert.equal(1,
                 dataBuilder.getEventPosition(moment("2016-01-25"),
                                              moment("2016-01-31"),
                                              moment("2016-01-26"),
                                              moment("2016-01-27")));
  });

  it('should get 0', function () {
    assert.equal(0,
                 dataBuilder.getEventPosition(moment("2016-01-18"),
                                              moment("2016-01-24"),
                                              moment("2016-01-17"),
                                              moment("2016-01-25")));
  });

  it('should be 0', function () {
    assert.equal(0,
                 dataBuilder.getEventPosition(moment("2016-04-11"),
                                              moment("2016-04-17"),
                                              moment("2016-04-07"),
                                              moment("2016-04-11")));
  });

  it('should be 6', function () {
    assert.equal(6,
                 dataBuilder.getEventPosition(moment("2016-04-11"),
                                              moment("2016-04-17"),
                                              moment("2016-04-17"),
                                              moment("2016-05-08")));
  });
});

describe('inside week', function() {
  it('should be true', function () {
    assert.equal(true,
                 dataBuilder.isInsideWeek(moment("2016-01-18"),
                                          moment("2016-01-24"),
                                          moment("2016-01-18"),
                                          moment("2016-01-20")));
  });

  it('should be false', function () {
    assert.equal(false,
                 dataBuilder.isInsideWeek(moment("2016-01-18"),
                                          moment("2016-01-24"),
                                          moment("2016-01-18"),
                                          moment("2016-01-25")));
  });
});

describe('contains week', function() {
  it('should be true', function () {
    assert.equal(true,
                 dataBuilder.containsWeek(moment("2016-01-18"),
                                          moment("2016-01-24"),
                                          moment("2016-01-17"),
                                          moment("2016-01-25")));
  });

  it('should be false', function () {
    assert.equal(false,
                 dataBuilder.isInsideWeek(moment("2016-01-18"),
                                          moment("2016-01-24"),
                                          moment("2016-01-17"),
                                          moment("2016-01-28")));
  });
});

describe("is overlapping", function(){
  it('should return false', function () {
    assert.equal(false,
                 dataBuilder.isOverlapping(moment("2016-01-04"),
                                           moment("2016-01-10"),
                                           moment("2016-01-01"),
                                           moment("2016-01-02")));
  });

  it('overlapps should return true', function () {
    assert.equal(true,
                 dataBuilder.isOverlapping(moment("2016-01-25"),
                                           moment("2016-01-31"),
                                           moment("2016-01-26"),
                                           moment("2016-01-27")));
  });

  it('left overlapps should return true', function () {
    assert.equal(true,
                 dataBuilder.isOverlapping(moment("2016-01-04"),
                                           moment("2016-01-10"),
                                           moment("2016-01-01"),
                                           moment("2016-01-05")));
  });

  it('rigth overlapps should return true', function () {
    assert.equal(true,
                 dataBuilder.isOverlapping(moment("2016-01-04"),
                                           moment("2016-01-10"),
                                           moment("2016-01-09"),
                                           moment("2016-01-11")));
  });

  it('contains week should return true', function () {
    assert.equal(true,
                 dataBuilder.isOverlapping(moment("2016-01-04"),
                                           moment("2016-01-10"),
                                           moment("2016-01-03"),
                                           moment("2016-01-11")));
  });
});

describe('event size', function() {

  describe('inside week', function(){
    it('should return 6', function () {
      assert.equal(6,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-18"),
                                            moment("2016-01-23")));
    });

    it('should return 3', function () {
      assert.equal(3,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-22"),
                                            moment("2016-01-24")));
    });

    it('should return 2', function () {
      assert.equal(2,
                   dataBuilder.getEventSize(moment("2016-01-25"),
                                            moment("2016-01-31"),
                                            moment("2016-01-26"),
                                            moment("2016-01-27")));
    });
  });

  describe('contains week', function(){
    it('should return 7', function () {
      assert.equal(7,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-17"),
                                            moment("2016-01-25")));
    });
  });

  describe('left overlapping', function(){
    it('should return 5', function () {
      assert.equal(5,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-17"),
                                            moment("2016-01-22")));
    });

    it('should return 7', function () {
      assert.equal(7,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-17"),
                                            moment("2016-01-24")));
    });
  });

  describe('rigth overlapping', function(){
    it('should return 3', function () {
      assert.equal(3,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-22"),
                                            moment("2016-01-26")));
    });

    it('should return 7', function () {
      assert.equal(7,
                   dataBuilder.getEventSize(moment("2016-01-18"),
                                            moment("2016-01-24"),
                                            moment("2016-01-18"),
                                            moment("2016-01-26")));
    });
  });
});

describe('week ranges', function() {
  var result = dataBuilder.weekRanges(0, 2016);

  it('first week should be ok', function () {
    assert.equal("2015-12-28", result[0][0].format(FORMAT));
    assert.equal("2016-01-03", result[0][6].format(FORMAT));
  });

  it('second week should be ok', function () {
    assert.equal("2016-01-04", result[1][0].format(FORMAT));
    assert.equal("2016-01-10", result[1][6].format(FORMAT));
  });

  it('third week should be ok', function () {
    assert.equal("2016-01-11", result[2][0].format(FORMAT));
    assert.equal("2016-01-17", result[2][6].format(FORMAT));
  });

  it('fourth week should be ok', function () {
    assert.equal("2016-01-18", result[3][0].format(FORMAT));
    assert.equal("2016-01-24", result[3][6].format(FORMAT));
  });
  it('fifth week should be ok', function () {
    assert.equal("2016-01-25", result[4][0].format(FORMAT));
    assert.equal("2016-01-31", result[4][6].format(FORMAT));
  });
});

describe('data builder', function() {
  describe("simple example", function(){
    var data = [{eventId: 1,
                 startDate: "2016-01-26",
                 endDate: "2016-01-27",
                 label: "summary test",
                 type: "vacations",
                 status: "approved"}];

    var result = dataBuilder.build(0, 2016, data);
    it('fifth week should be ok', function () {
      var week = result.weeks[4];
      assert.equal(1, week.eventRows[0][1].eventId);
      assert.equal(2, week.eventRows[0][1].size);
      assert.equal("summary test", week.eventRows[0][1].label);
      assert.equal("vacations", week.eventRows[0][1].type);
      assert.equal("approved", week.eventRows[0][1].status);

    });
  });
});

describe("get event rows", function(){
  var data = [{eventId: 1,
               startDate: "2016-01-26",
               endDate: "2016-01-27",
               label: "summary test",
               type: "vacations",
               status: "approved"},
              {eventId: 2,
               startDate: "2016-01-29",
               endDate: "2016-01-30",
               label: "summary bubu",
               type: "vacations",
               status: "approved"}];

  var result = dataBuilder.getEventRows("2016-01-25", "2016-01-31", data).eventRows;
  it('first event should', function () {
    assert.equal(1, result[0][1].eventId);
  });
  it('second event should', function () {
    assert.equal(2, result[0][4].eventId);
  });
});


describe("can process", function(){
  var processed = [{eventId: 1,
                    startDate: "2016-01-26",
                    endDate: "2016-01-27",
                    label: "summary test",
                    type: "vacations",
                    status: "approved"}];

  it('should return false to overlapping case', function () {
    assert.equal(false, dataBuilder.canProcess(processed,
                                     {eventId: 2,
                                      startDate: "2016-01-27",
                                      endDate: "2016-01-30",
                                      label: "ahahahahahah",
                                      type: "vacations",
                                      status: "approved"}));
  });
});
