'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var RenderUtils = require('./RenderUtils.js');

module.exports = React.createClass({
  render: function render() {
    var data = this.props.data;
    var days = data.days;
    var component = this;
    return (
      <tr className="monthDay">
        {_.map(days, function daysToComponent(day, key) {
          var className = RenderUtils.getDayClassName(day, component.props.calendar) || "";
          var isToday = moment().isSame(day, 'day');
          var spanClassName = null;
          if(isToday) {
            spanClassName = "today";
          }
          if(day.month() !== component.props.calendar.props.month) {
            className += " otherMonth";
          }

          return (
            <td key={key} className={className}>
              <span className={spanClassName}>{day.date()}</span>
            </td>
          );
        })}
      </tr>
    );
  }
});
