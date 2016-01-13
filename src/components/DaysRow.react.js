'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');

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
    var days = data.days;
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
