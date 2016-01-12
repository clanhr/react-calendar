
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function render() {
    return (
      <table className="table weekDays">
        <thead>
          <tr>
            <th className="smallTitle text-center">Seg</th>
            <th className="smallTitle text-center">Ter</th>
            <th className="smallTitle text-center">Qua</th>
            <th className="smallTitle text-center">Qui</th>
            <th className="smallTitle text-center">Sex</th>
            <th className="smallTitle text-center">Sab</th>
            <th className="smallTitle text-center">Dom</th>
          </tr>
        </thead>
      </table>
    );
  }
});
