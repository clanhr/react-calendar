'use strict';

var moment = require('moment');
var _ = require('underscore');

var FORMAT = "YYYY-MM-DD";

function weekRange(startDate, endDate){
  var numberOfDays = moment(endDate).diff(moment(startDate), 'days');

  return _.map(_.range(numberOfDays), function(day){
           return moment(startDate).add(day, 'day');
         });
}

function weekRanges(month, year) {
  var start = calcStartMonth(month, year);
  var end = calcEndMonth(month, year);

  var count = end.diff(start, 'days')/7;

  return _.map(_.range(count), function(weekNumber){
    var end = moment(start),
        range = weekRange(start, end.add(7, 'day'));
    start = end;
    return range;
  })
}

function calcStartMonth(month, year) {
  var firstDayOfMonth =  moment().month(month)
                                 .year(year)
                                 .startOf("month");
  var weekDay = firstDayOfMonth.isoWeekday() -1;
  return firstDayOfMonth.subtract(weekDay, 'day');
}

function calcEndMonth(month, year) {
  var lastDayOfMonth =  moment().month(month)
                                .year(year)
                                .endOf("month");
  var weekDay = 7 - lastDayOfMonth.isoWeekday();

  return lastDayOfMonth.add(weekDay, 'day');
}


function getEventPosition(weekStartDate, weekEndDate, eventStartDate, eventEndDate){

  if(isInsideWeek(weekStartDate, weekEndDate,
                  eventStartDate, eventEndDate))
    return eventStartDate.diff(weekStartDate, 'days');

  if(isOverlappingRight(weekStartDate, weekEndDate,
                        eventStartDate, eventEndDate))
    return eventStartDate.diff(weekStartDate, 'days');

  if(isOverlappingLeft(weekStartDate, weekEndDate,
                       eventStartDate, eventEndDate))
    return 0;

  if(containsWeek(weekStartDate, weekEndDate,
                  eventStartDate, eventEndDate))
    return 0;
}

function isOverlapping(weekStartDate, weekEndDate, eventStartDate, eventEndDate){
  return isInsideWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate)
      || containsWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate)
      || isOverlappingRight(weekStartDate, weekEndDate, eventStartDate, eventEndDate)
      || isOverlappingLeft(weekStartDate, weekEndDate, eventStartDate, eventEndDate);
}

function isInsideWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate){
  return (weekStartDate.isBefore(eventStartDate) ||
          weekStartDate.isSame(eventStartDate)) &&
         (weekEndDate.isAfter(eventEndDate) ||
          weekEndDate.isSame(eventEndDate));
}

function isOverlappingRight(weekStartDate, weekEndDate, eventStartDate, eventEndDate){
  return (weekStartDate.isBefore(eventStartDate) || weekStartDate.isSame(eventStartDate))
       && weekEndDate.isBefore(eventEndDate)
      && (weekEndDate.isSame(eventStartDate) || eventStartDate.isBefore(weekEndDate));
}

function isOverlappingLeft(weekStartDate, weekEndDate, eventStartDate, eventEndDate){
  return weekStartDate.isAfter(eventStartDate)
     && (weekEndDate.isAfter(eventEndDate) || weekEndDate.isSame(eventEndDate))
     && (eventEndDate.isAfter(weekStartDate) || eventEndDate.isSame(weekStartDate));
}

function containsWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate){
  return weekStartDate.isAfter(eventStartDate) &&
         weekEndDate.isBefore(eventEndDate);
}

function getEventSize(weekStartDate, weekEndDate, eventStartDate, eventEndDate){
  if(isInsideWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate))
    return eventEndDate.diff(eventStartDate, 'days') + 1;

  if(isOverlappingRight(weekStartDate, weekEndDate, eventStartDate, eventEndDate))
    return weekEndDate.diff(eventStartDate, 'days') + 1;

  if(isOverlappingLeft(weekStartDate, weekEndDate, eventStartDate, eventEndDate))
    return eventEndDate.diff(weekStartDate, 'days') + 1;

  if(containsWeek(weekStartDate, weekEndDate, eventStartDate, eventEndDate))
    return 7;
}

function eventBuilder(weekStartDate, weekEndDate, event) {

  var eventStartDate = moment(event.startDate);
  var eventEndDate = moment(event.endDate);

  return {eventId: event.eventId,
          viewer: event.viewer,
          size: getEventSize(weekStartDate, weekEndDate, eventStartDate, eventEndDate),
          label: event.label,
          type: event.type,
          event: event,
          status: event.status}
}

function getEventRows(weekStartDate, weekEndDate, data){
  var overlappPositions = [];
  var eventRows = [];

  while(!_.isEmpty(data)) {
    var row = {},
        processed = [];
    _.each(data, function(event){
      if(canProcess(processed, event)){
        overlappPositions = overlappPositions.concat(getOverlappPositions(
                                                      moment(weekStartDate),
                                                      moment(weekEndDate),
                                                      moment(event.startDate),
                                                      moment(event.endDate)));
        eventRowBuilder(moment(weekStartDate),
                        moment(weekEndDate),
                        event,
                        row);
        processed.push(event);
        data = _.without(data, event);
      }
    });

    eventRows.push(row);
  }

  return {eventRows: fillWithMinimum(eventRows),
          shouldExpand: shouldExpand(overlappPositions)};
}

function eventRowBuilder(weekStartDate, weekEndDate, event, row) {
  var position = getEventPosition(moment(weekStartDate),
                                  moment(weekEndDate),
                                  moment(event.startDate),
                                  moment(event.endDate));

  row[position] = eventBuilder(weekStartDate, weekEndDate, event);

  return row;
}

function canProcess(processed, event){

  var process = true;
  _.each(processed, function(processedEvent){
    if(isOverlapping(moment(processedEvent.startDate),
                     moment(processedEvent.endDate),
                     moment(event.startDate),
                     moment(event.endDate)))
      process = false;
  });

  return process;
}

function getOverlappPositions(weekStartDate, weekEndDate, eventStartDate, eventEndDate){

  var position = getEventPosition(weekStartDate, weekEndDate, eventStartDate, eventEndDate);
  var size = getEventSize(weekStartDate, weekEndDate, eventStartDate, eventEndDate);

  return _.map(_.range(size), function(elem){
    return position + elem;
  });
}

function shouldExpand(overlapps){
  return _.chain(overlapps)
          .countBy()
          .pairs()
          .max(_.last)
          .last()
          .value() > 4;
}

function fillWithMinimum(eventRow){
  var eventRowLength = eventRow.length;
  if(eventRowLength < 4){
    var diff = 4 - eventRowLength;
    _.each(_.range(diff), function(){
      eventRow.push({});
    });
  }

  return eventRow;
}

function build(month, year, data, config) {

  var weeks = this.weekRanges(month, year);
  config = config ? config : {};
  var numberOfRowsToShow = config.numberOfRowsToShow ?
                           config.numberOfRowsToShow : 4;

  return { weeks: _.map(weeks, function(daysOfWeek){
    var weekStartDate = daysOfWeek[0],
        weekEndDate = daysOfWeek[daysOfWeek.length-1];
    var filteredData = _.filter(data, function(event){
      return isOverlapping(weekStartDate,
                           weekEndDate,
                           moment(event["startDate"]),
                           moment(event["endDate"]));
    });

    var rows = getEventRows(moment(weekStartDate),
                            moment(weekEndDate),
                            filteredData);
    return {
      collapseLabel: config.collapseLabel,
      expandLabel: config.expandLabel,
      days: daysOfWeek,
      numberOfRowsToShow: numberOfRowsToShow,
      shouldExpand: rows.shouldExpand,
      eventRows: rows.eventRows
    }
  })};
}

module.exports = {

  build: build,

  canProcess: canProcess,

  getOverlappPositions: getOverlappPositions,

  shouldExpand: shouldExpand,

  fillWithMinimum: fillWithMinimum,

  getEventRows: getEventRows,

  eventRowBuilder: eventRowBuilder,

  getEventPosition: getEventPosition,

  isOverlapping: isOverlapping,

  isInsideWeek: isInsideWeek,

  isOverlappingRight: isOverlappingRight,

  isOverlappingLeft: isOverlappingLeft,

  containsWeek: containsWeek,

  getEventSize: getEventSize,

  eventBuilder: eventBuilder,

  weekRange: weekRange,

  weekRanges: weekRanges,

  calcStartMonth: calcStartMonth,

  calcEndMonth: calcEndMonth
};
