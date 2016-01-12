'use strict';

var React = require('react');
var _ = require('underscore');

var WeekDaysHeader = require('./WeekDaysHeader.react.js');
var Week = require('./Week.react.js');

module.exports = React.createClass({
  render: function render() {
    var data = this.props.rawData;
    return (
      <div className="calendarWrapper">
        {this.props.weekDaysHeader && <WeekDaysHeader />}
        {_.map(data.weeks, function weekToComponent(week, key) {
          return <Week key={key} data={week} />
        })}
      </div>
    );
  }
});
