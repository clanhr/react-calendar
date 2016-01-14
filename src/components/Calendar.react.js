'use strict';

var React = require('react');
var _ = require('underscore');

var WeekDaysHeader = require('./WeekDaysHeader.react.js');
var Week = require('./Week.react.js');
var MonthNavigationHeader = require('./MonthNavigationHeader.react.js');

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {};
  },

  overEvent: function getOverEvent() {
    return this.state.overEvent;
  },

  render: function render() {
    var data = this.props.rawData;
    var component = this;
    return (
      <div className="calendarWrapper">
        {this.props.monthNavigationHeader && <MonthNavigationHeader month={this.props.month}
                                                                    year={this.props.year}
                                                                    onPreviousMonth={this.props.onPreviousMonth}
                                                                    onNextMonth={this.props.onNextMonth} />}
        {this.props.weekDaysHeader && <WeekDaysHeader data={data} />}
        {_.map(data.weeks, function weekToComponent(week, key) {
          return <Week key={key} data={week} calendar={component} />
        })}
      </div>
    );
  }
});
