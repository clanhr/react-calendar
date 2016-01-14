'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var RenderUtils = require('./RenderUtils.js');

module.exports = React.createClass({
  render: function render() {
    var data = this.props.data;
    var days = data.days;
    return (
      <tr className="monthDay">
        {_.map(days, function daysToComponent(day, key) {
          var className = RenderUtils.getDayClassName(day);
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
