
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function render() {
    return (
      <table className="table weekDays">
        <thead>
          <tr>
            <th className="text-center">Seg</th>
            <th className="text-center">Ter</th>
            <th className="text-center">Qua</th>
            <th className="text-center">Qui</th>
            <th className="text-center">Sex</th>
            <th className="text-center">Sab</th>
            <th className="text-center">Dom</th>
          </tr>
        </thead>
      </table>
    );
  }
});
