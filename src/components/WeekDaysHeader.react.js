
'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');

module.exports = React.createClass({
  render: function render() {
    var days = this.props.data.weeks[0].days;
    return (
      <table className="table weekDays">
        <thead>
          <tr>
            {_.map(days, function dayToComponent(day, key) {
              return <th key={key} className="text-center">{day.format("ddd")}</th>;
            })}
          </tr>
        </thead>
      </table>
    );
  }
});
