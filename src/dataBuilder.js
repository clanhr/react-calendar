'use strict';

var moment = require('moment');
var _ = require('underscore');

var FORMAT = "YYYY-MM-DD";

module.exports = {

  build: function build(month, year, data) {

    var weeks = this.weekRanges(month, year);

    var _this = this;
    var getEventRows = this.getEventRows;
    var isOverlapping = this.isOverlapping;

    return { weeks: _.map(weeks, function(daysOfWeek){
      var weekStartDate = daysOfWeek[0],
          weekEndDate = daysOfWeek[daysOfWeek.length-1];
      var filteredData = _.filter(data, function(event){
        return isOverlapping.call(_this,
                                  weekStartDate,
                                  weekEndDate,
                                  moment(event["startDate"]),
                                  moment(event["endDate"]));
      });

      return {
        days: daysOfWeek,
        eventRows: getEventRows.call(_this,
                                     moment(weekStartDate),
                                     moment(weekEndDate),
                                     filteredData)
      }
    })};
  },

  fillWithMinimum: function fillWithMinimum(eventRows){
    var eventRowsLength = eventRows.length;
    if(eventRowsLength < 4){
      var diff = 4 - eventRowsLength;
      _.map(_.range(diff), function(){
        eventRows.push({});
      });
    }

    return eventRows;
  },

  getEventRows: function getEventRows(weekStartDate, weekEndDate, data){
    var eventRowBuilder = this.eventRowBuilder,
        getEventPosition = this.getEventPosition,
        _this = this,
        row = {};

    /*
    Input: [{event}{event}]

    Output: [{a: 123,
              b: 456},
             {c: 789},
             {},
             {}]
    */

   /*
    data = _.sortBy(data, function(evt){
      return getEventPosition(_this, weekStartDate, weekEndDate,
                              evt["start-date"], evt["end-date"]);
    });
    */

    return _.map(_.range(4), function(){
      var row = {};
      _.map(data, function(event){
        eventRowBuilder.call(_this,
                             moment(weekStartDate),
                             moment(weekEndDate),
                             event,
                             row);
        data = _.without(data, event);
      });

      return row;
    });
  },

  eventRowBuilder: function eventRowBuilder(weekStartDate, weekEndDate, event, row) {
    var position = this.getEventPosition(moment(weekStartDate),
                                         moment(weekEndDate),
                                         moment(event.startDate),
                                         moment(event.endDate));
    var eventRow = this.eventBuilder(weekStartDate, weekEndDate, event);

    var hash = {};
    row[position] = eventRow;

    return row;
  },

  getEventPosition: function getEventPosition(weekStartDate, weekEndDate,
                                              eventStartDate, eventEndDate){

    if(this.isInsideWeek(weekStartDate, weekEndDate,
                         eventStartDate, eventEndDate))
      return eventStartDate.diff(weekStartDate, 'days');

    if(this.isOverlappingRight(weekStartDate, weekEndDate,
                              eventStartDate, eventEndDate))
      return eventStartDate.diff(weekStartDate, 'days');

    if(this.isOverlappingLeft(weekStartDate, weekEndDate,
                              eventStartDate, eventEndDate))
      return 0;

    if(this.containsWeek(weekStartDate, weekEndDate,
                              eventStartDate, eventEndDate))
      return 0;
  },

  isOverlapping: function isOverlapping(weekStartDate, weekEndDate,
                                        eventStartDate, eventEndDate){
    return this.isInsideWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate)
        || this.containsWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate)
        || this.isOverlappingRight(weekStartDate, weekEndDate, eventStartDate, eventEndDate)
        || this.isOverlappingLeft(weekStartDate, weekEndDate, eventStartDate, eventEndDate);
  },

  isInsideWeek: function isInsideWeek(weekStartDate, weekEndDate,
                                      eventStartDate, eventEndDate){
    return (weekStartDate.isBefore(eventStartDate) ||
            weekStartDate.isSame(eventStartDate)) &&
           (weekEndDate.isAfter(eventEndDate) ||
            weekEndDate.isSame(eventEndDate));
  },

  isOverlappingRight: function isOverlappingRight(weekStartDate, weekEndDate,
                                        eventStartDate, eventEndDate){
    return (weekStartDate.isBefore(eventStartDate) || weekStartDate.isSame(eventStartDate))
         && weekEndDate.isBefore(eventEndDate)
        && (weekEndDate.isSame(eventStartDate) || eventStartDate.isBefore(weekEndDate));
  },

  isOverlappingLeft: function isOverlappingRigth(weekStartDate, weekEndDate,
                                        eventStartDate, eventEndDate){
    return weekStartDate.isAfter(eventStartDate)
       && (weekEndDate.isAfter(eventEndDate) || weekEndDate.isSame(eventEndDate))
       && (eventEndDate.isAfter(weekStartDate) || eventEndDate.isSame(weekStartDate));
  },

  containsWeek: function containsWeek(weekStartDate, weekEndDate,
                                        eventStartDate, eventEndDate){
    return weekStartDate.isAfter(eventStartDate) &&
           weekEndDate.isBefore(eventEndDate);
  },

  getEventSize: function getEventSize(weekStartDate, weekEndDate,
                                      eventStartDate, eventEndDate){
    if(this.isInsideWeek(weekStartDate, weekEndDate,
                         eventStartDate, eventEndDate))
      return eventEndDate.diff(eventStartDate, 'days') + 1;

    if(this.isOverlappingRight(weekStartDate, weekEndDate,
                              eventStartDate, eventEndDate))
      return weekEndDate.diff(eventStartDate, 'days') + 1;

    if(this.isOverlappingLeft(weekStartDate, weekEndDate,
                              eventStartDate, eventEndDate))
      return eventEndDate.diff(weekStartDate, 'days') + 1;

    if(this.containsWeek(weekStartDate, weekEndDate,
                              eventStartDate, eventEndDate))
      return 7;
  },

  eventBuilder: function eventBuilder(weekStartDate, weekEndDate, event) {

    var eventStartDate = moment(event.startDate);
    var eventEndDate = moment(event.endDate);

    return {eventId: event.eventId,
            size: this.getEventSize(weekStartDate, weekEndDate,
                                    eventStartDate, eventEndDate),
            label: event.label,
            type: event.type,
            status: event.status}
  },

  weekRange: function weekRange(startDate, endDate){
    var numberOfDays = moment(endDate).diff(moment(startDate), 'days');

    return _.map(_.range(numberOfDays), function(day){
             return moment(startDate).add(day, 'day');
           });
  },

  weekRanges: function weekRanges(month, year) {
    var start = this.calcStartMonth(month, year);
    var end = this.calcEndMonth(month, year);

    var count = end.diff(start, 'days')/7;

    var weekRange = this.weekRange;
    return _.map(_.range(count), function(weekNumber){
      var end = moment(start),
          range = weekRange(start, end.add(7, 'day'));
      start = end;
      return range;
    })
  },

  calcStartMonth: function(month, year) {
    var firstDayOfMonth =  moment().month(month)
                                   .year(year)
                                   .startOf("month");
    var weekDay = firstDayOfMonth.isoWeekday() -1;
    return firstDayOfMonth.subtract(weekDay, 'day');
  },

  calcEndMonth: function(month, year) {
    var lastDayOfMonth =  moment().month(month)
                                  .year(year)
                                  .endOf("month");
    var weekDay = 7 - lastDayOfMonth.isoWeekday();

    return lastDayOfMonth.add(weekDay, 'day');
  }
};
