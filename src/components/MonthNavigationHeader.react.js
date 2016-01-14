'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');

var WeekDaysHeader = require('./WeekDaysHeader.react.js');
var Week = require('./Week.react.js');

module.exports = React.createClass({
  render: function render() {
    var month = moment().month(this.props.month).format("MMMM");
    return (
      <div className="monthName">
        <p className="smallTitle text-center">
          <a href="#" onClick={this.props.onPreviousMonth}><i className="icon-left-open"></i></a>
          {month} {this.props.year}
          <a href="#" onClick={this.props.onNextMonth}><i className="icon-right-open"></i></a></p>
      </div>
    );
  }
});
