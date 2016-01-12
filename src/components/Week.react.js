'use strict';

var React = require('react');
var DaysRow = require('./DaysRow.react.js');

module.exports = React.createClass({
  render: function render() {
    return (
      <div className="week">
        <table className="table eventsWrapper">
          <tbody>
            <DaysRow data={this.props.data} />
          </tbody>
        </table>
      </div>
    );
  }
});
