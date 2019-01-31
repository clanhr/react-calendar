'use strict';

var _ = require('underscore');
var React = require('react');

module.exports = React.createClass({
  render: function render() {
    var className = "status " + this.props.data.status;
    var label = this.props.data.label;
    return (
      <div className="specialDay">
        <p>{label}</p>
      </div>
    );
  }
});
