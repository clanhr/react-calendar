'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var MAX_WEEK_DAYS = 7;

function daysAsCollection(start, end) {
  var current = moment(start);
  var days = [start];
  while(days.length < MAX_WEEK_DAYS) {
    var anotherDay = current.add(1, 'days');
    days.push(moment(anotherDay));
  }
  return days;
}

function getDayClassName(day) {
  var isoWeekday = day.isoWeekday();
  var weekend = isoWeekday === 6 || isoWeekday === 7;
  var className = null;
  if(weekend) {
    className = "weekend";
  }
  return className;
}

module.exports = React.createClass({
  render: function render() {
    var data = this.props.data;
    var days = daysAsCollection(data.startDay, data.endDay);
    return (
      <tr className="monthDay">
        {_.map(days, function daysToComponent(day, key) {
          var className = getDayClassName(day);
          return (
            <td key={key} className={className}>
              <span>{day.date()}</span>
            </td>
          );
        })}
      </tr>
    );
  }
});
