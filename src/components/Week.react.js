'use strict';

var _ = require('underscore');
var React = require('react');
var DaysRow = require('./DaysRow.react.js');
var EventRow = require('./EventRow.react.js');

module.exports = React.createClass({
  render: function render() {
    var component = this;

    return (
      <div className="week">
        <table className="table eventsWrapper">
          <tbody>
            <DaysRow calendar={this.props.calendar} data={this.props.data} />
            {_.map(this.props.data.eventRows, function eventRowsToComponent(eventRow, key) {
              return <EventRow key={key} data={component.props.data} eventRow={eventRow} calendar={component.props.calendar} />
            })}
          </tbody>
        </table>
      </div>
    );
  }
});
